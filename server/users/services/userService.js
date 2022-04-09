import {
  BAD_REQUEST, INTERNAL_SERVER_ERROR, OK, CREATED, NO_CONTENT,
} from 'http-status';
import _ from 'lodash';
import bcrypt from 'bcryptjs';
import sha256 from 'sha256';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import ErrorResponse from '../../../common/utils/errorResponse';
import { errorCodes, SALT_ROUNDS } from '../../../common/constants';
import User from '../model/userModel';
import { ADMIN } from '../helpers/constant';
const userService = {
    async register({
        email,
        password,
        profile,

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
    
          const userEmail = await User.findOne({"email.address": email});

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
            roles: [ADMIN, ADMIN],
            email: { address: email, verified: false },
            password,
            profile,
            hashedPassword,
            emailToken,
            emailTokenExpiration,
          };
    
          let result = await User.create(payload);
          result = result.toObject();
          delete result.emailToken;
          delete result.emailTokenExpiration;
          // TODO: send mail to the user
          const accessTokenPayload = await this.prepareUserObjectForJWTSigning(result);
          const accessToken = this.generateJWTAccessToken(accessTokenPayload);
          const refreshToken = this.generateJWTRefreshToken(accessTokenPayload);
    
          return {
            refreshToken,
            token: `Bearer ${accessToken}`,
            user: result,
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
      return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION });
    },

    generateJWTRefreshToken(payload) {
      return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION });
    },
}

export default userService;