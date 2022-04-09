import Joi from 'joi';
import {
    USER__REGISTER
} from '../helpers/constant';

export default {
    [USER__REGISTER]: {
        body: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string()
              .required()
              .regex(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*(\W|_)).{8})/, {
                name: '(at least 8 characters, upper case, lower case, numbers and special characters)',
              }),
            profile: Joi.object()
              .keys({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
              })
              .required(),
          }),
    },
}