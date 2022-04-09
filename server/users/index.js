import express from "express";
import validateRequest from "../../common/middleware/joi"
import validationSchemas from "./validation/users";
import{USER__REGISTER, USER__LOGIN} from "./helpers/constant"
import  middleware from "./middleware/index"
const {
    register,
    login
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
module.exports = Router;