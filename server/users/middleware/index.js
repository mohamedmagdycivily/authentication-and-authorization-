import {
    BAD_REQUEST, INTERNAL_SERVER_ERROR, OK, CREATED, NO_CONTENT,
  } from 'http-status';
import ErrorResponse from '../../../common/utils/errorResponse';
import UserService from '../services/userService';
import { errorCodes, MESSAGES } from '../../../common/constants';
const register = async(req, res, next)=>{
    try{
        const {
            email, password, profile,
        } = req.body;
        const { refreshToken, token, user } = await UserService.register({
            email,
            password,
            profile,
            req,
        });
        return res.status(CREATED).json({
            success: true,
            message: MESSAGES.DONE_SUCCESSFULLY,
            data: { refreshToken, token, user },
          });
    }catch(err){
        return next(new ErrorResponse(err.message, err.status || INTERNAL_SERVER_ERROR, err.errorCode));
    }
}

const login = async(req, res, next)=>{
    try{
        const {
            email, password,
        } = req.body;

        const data = await UserService.login({email, password});
        return res.status(OK).json({
            success: true,
            message: MESSAGES.DONE_SUCCESSFULLY,
            data
        });
    }catch(err){
        return next(new ErrorResponse(err.message, err.status || INTERNAL_SERVER_ERROR, err.errorCode));
    }
}

const updatePersonalInfo = async(req, res, next)=>{
    try{
        return res.status(OK).json({
            success: true,
            message: 'you have access to this api !!',
        });
    }catch(err){
        return next(new ErrorResponse(err.message, err.status || INTERNAL_SERVER_ERROR, err.errorCode));
    }
}

const superAdminOnly = async(req, res, next)=>{
    try{
        return res.status(OK).json({
            success: true,
            message: 'you have access to this api !!',
        });
    }catch(err){
        return next(new ErrorResponse(err.message, err.status || INTERNAL_SERVER_ERROR, err.errorCode));
    }
}

const refreshTokens = async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      const newAccessToken = await UserService.refreshToken({
        refreshToken,
      });
  
      return res.status(OK).json({
        success: true,
        message: MESSAGES.DONE_SUCCESSFULLY,
        data: { token: `Bearer ${newAccessToken}`},
      });
    } catch (err) {
      return next(new ErrorResponse(err.message, err.status || INTERNAL_SERVER_ERROR, err.errorCode));
    }
  };
export default {
    register,
    login,
    updatePersonalInfo,
    superAdminOnly,
    refreshTokens,
}