import express from "express";
import validateRequest from "../../common/middleware/joi"
import validationSchemas from "./validation/users";
import{
    USER__REGISTER, 
    USER__LOGIN, 
    USER__UPDATE_PERSONAL_INFO, 
    USER__SUPER_ADMIN_ONLY, 
    USER_REFRESH_TOKENS,
    USER__CONFIRM_EMAIL_TOKEN,
    USER__FORGOT__PASSWORD,
    USER__RESET__PASSWORD
} from "./helpers/constant"
import  middleware from "./middleware/index"
import AuthAPI from '../../common/middleware/auth';

const {
    register,
    login,
    updatePersonalInfo,
    superAdminOnly,
    refreshTokens,
    confirmEmailToken,
    forgetPassword,
    resetPassword,
} = middleware;

const Router = express.Router();
Router.post(
    '/register',
    validateRequest(validationSchemas[USER__REGISTER]),
    register,
)
Router.post(
    '/login',
    validateRequest(validationSchemas[USER__LOGIN]),
    login,
)

Router.put(
    '/personal-info',
    AuthAPI(USER__UPDATE_PERSONAL_INFO),
    validateRequest(validationSchemas[USER__UPDATE_PERSONAL_INFO]),
    updatePersonalInfo,
);

Router.get(
    '/super-admin-only',
    AuthAPI(USER__SUPER_ADMIN_ONLY),
    superAdminOnly,
);

Router.post(
    '/refresh-token',
    validateRequest(validationSchemas[USER_REFRESH_TOKENS]),
    refreshTokens,
  );

Router.patch(
    '/activate-account/:token',
    validateRequest(validationSchemas[USER__CONFIRM_EMAIL_TOKEN]),
    confirmEmailToken,
);

Router.post(
    '/forget-password',
    validateRequest(validationSchemas[USER__FORGOT__PASSWORD]),
    forgetPassword,
)

Router.patch(
    '/password-reset/:token',
     validateRequest(validationSchemas[USER__RESET__PASSWORD]), 
     resetPassword,
);
module.exports = Router;