import {
  BAD_REQUEST, INTERNAL_SERVER_ERROR, OK, CREATED, UNAUTHORIZED,
} from 'http-status';
import _ from 'lodash';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import ErrorResponse from '../../../common/utils/errorResponse';
import { errorCodes, SALT_ROUNDS } from '../../../common/constants';
import User from '../model/userModel';
import { ADMIN } from '../helpers/constant';
const Email = require("./../../../common/utils/email");
const secret = process.env.JWT_SECRET || 'BGWWgrUmlx';
const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION || '1d';
const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION || '30d';
const userService = {
    async register({
        email,
        password,
        profile,
        req
      }) {
        try {
          if (
            !email
            || !profile
            || !profile.firstName
            || !profile.lastName
            || !profile.phone
            || !password
          ) {
            throw new ErrorResponse(
              errorCodes.ILLEGAL_ARGUMENT_EXCEPTION.message,
              BAD_REQUEST,
              errorCodes.ILLEGAL_ARGUMENT_EXCEPTION.code,
            );
          }
    
          const userEmail = await this.getUser({ 'email.address': email });

          if (userEmail) {
            throw new ErrorResponse(
              errorCodes.EMAIL_USED_BEFORE.message,
              BAD_REQUEST,
              errorCodes.EMAIL_USED_BEFORE.code,
            );
          }

          const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
          const emailToken = crypto.randomBytes(20).toString('hex');
          const emailTokenExpiration = Date.now() + 3600000;

          const payload = {
            roles: [ADMIN],
            email: { address: email, verified: false },
            password,
            profile,
            hashedPassword,
            emailToken,
            emailTokenExpiration,
          };
    
          let newUser = await User.create(payload);
          newUser = newUser.toObject();
          delete newUser.emailToken;

          const accessTokenPayload = await this.prepareUserObjectForJWTSigning(newUser);
          const accessToken = this.generateJWTAccessToken(accessTokenPayload);
          const refreshToken = this.generateJWTRefreshToken(accessTokenPayload);
    
          // send mail to the user
          const url = `
          please hit the LINK to activate your account on auth website
           ${req.protocol}://${req.get("host")}/api/v0/users/activateAccount/${
            emailToken
          }
            if you did not registered on the website then please ignore this mail
          `;
          new Email(newUser, url).sendMail("Welcome to the auth !");
          return {
            refreshToken,
            token: `Bearer ${accessToken}`,
            user: newUser,
          };
        } catch (err) {
          throw new ErrorResponse(err.message, err.status || INTERNAL_SERVER_ERROR, err.errorCode);
        }
      },

    async prepareUserObjectForJWTSigning(user) {
      const payload = {
        id: user._id,
        roles: user.roles,
        email: user.email
      };
  
      delete user.hashedPassword;
      return payload;
    },

    generateJWTAccessToken(payload) {
      return jwt.sign(payload, secret, { expiresIn: accessTokenExpiration });
    },

    generateJWTRefreshToken(payload) {
      return jwt.sign(payload, secret, { expiresIn: refreshTokenExpiration });
    },

    async login({email, password}){
      try {
        const user  = await this.getUser({ 'email.address': email });
        if (!user) {
          throw new ErrorResponse(
            errorCodes.USER_NOT_FOUND.message,
            BAD_REQUEST,
            errorCodes.USER_NOT_FOUND.code,
          );
        }
        if (!user.email.verified) {
          throw new ErrorResponse(
            errorCodes.USER_IS_NOT_VERFIED.message,
            BAD_REQUEST,
            errorCodes.USER_IS_NOT_VERFIED.code,
          );
        }
        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (isMatch) {
          const payload = await this.prepareUserObjectForJWTSigning(user);
          const accessToken = this.generateJWTAccessToken(payload);
          const refreshToken = this.generateJWTRefreshToken(payload);
  
          const {
            _id,
            email,
            profile,
            roles,
          } = user;

          return {
            token: `Bearer ${accessToken}`,
            refreshToken,
            user: {
              _id,
              email,
              profile,
              roles,
            },
          };
        }
        throw new ErrorResponse(
          errorCodes.LOGIN_FAILED.message,
          BAD_REQUEST,
          errorCodes.LOGIN_FAILED.code,
        );
      } catch (err) {
        throw new ErrorResponse(err.message, err.status || INTERNAL_SERVER_ERROR, err.errorCode);
      }
    },

    async getUser(selector) {
      const projection = {
        fields: {
          _id: 1,
          hashedPassword: 1,
          roles: 1,
          email: 1,
          profile: 1,
          createdAt: 1,
          lastSessionResetDate: 1,
        },
      };
      return User.findOne(selector, projection);
    },
    async refreshToken({ refreshToken }) {
      try {
        let decodedToken;
        try {
          decodedToken = jwt.verify(refreshToken, secret);
        } catch (err) {
          throw new ErrorResponse(
            errorCodes.INVALID_SIGNATURE.message,
            UNAUTHORIZED,
            errorCodes.INVALID_SIGNATURE.code,
          );
        }
  
        const user = await User.findOne({ _id: decodedToken.id }, {});
        if (!user) {
          throw new ErrorResponse(
            errorCodes.USER_NOT_FOUND.message,
            UNAUTHORIZED,
            errorCodes.USER_NOT_FOUND.code,
          );
        }
  
        const payload = await this.prepareUserObjectForJWTSigning(user);
  
        return this.generateJWTAccessToken(payload);
      } catch (err) {
        throw new ErrorResponse(err.message, err.status || INTERNAL_SERVER_ERROR, err.errorCode);
      }
    },

    async confirmEmailToken(token) {
      let selector = {};
      selector = {
        emailToken: token,
        emailTokenExpiration: { $gt: Date.now() },
      };
      const user = await User.findOne(selector);
      if (!user) {
        throw new ErrorResponse('No valid token found', BAD_REQUEST);
      }
      const params = {
        'email.verified': true,
        emailToken: null,
        emailTokenExpiration: null,
      };
      return User.update(user._id, { $set: params });
    },
}

export default userService;