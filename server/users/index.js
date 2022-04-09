import express from "express";
import validateRequest from "../../common/middleware/joi"
import validationSchemas from "./validation/users";
import{USER__REGISTER} from "./helpers/constant"
import  middleware from "./middleware/index"
const {
    register
} = middleware;

const Router = express.Router();
Router.post(
    '/register',
    validateRequest(validationSchemas[USER__REGISTER]),
    register,
)
module.exports = Router;