import express from "express";
import validateRequest from "../../common/middleware/joi"
import validationSchemas from "./validation/users";
import{USER__REGISTER, USER__LOGIN, USER__UPDATE_PERSONAL_INFO} from "./helpers/constant"
import  middleware from "./middleware/index"
import AuthAPI from '../../common/middleware/auth';

const {
    register,
    login,
    updatePersonalInfo,
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
module.exports = Router;