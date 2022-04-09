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
export default {
    register,
}