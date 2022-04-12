import Joi from 'joi';
import {
    USER__REGISTER,
    USER__LOGIN,
    USER__UPDATE_PERSONAL_INFO,
    USER_REFRESH_TOKENS,
    USER__FORGOT__PASSWORD,
    USER__RESET__PASSWORD,
    USER__CONFIRM_EMAIL_TOKEN
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
  [USER__LOGIN]: {
    body: Joi.object()
    .keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    })
  },
  [USER__UPDATE_PERSONAL_INFO]: {
    body: Joi.object().keys({
      firstName: Joi.string().optional(),
      lastName: Joi.string().optional(),
    })
  },
  [USER_REFRESH_TOKENS]: {
    body: Joi.object()
      .keys({
        refreshToken: Joi.string().required(),
      })
      .required(),
  },
  [USER__CONFIRM_EMAIL_TOKEN]: {
    params: Joi.object().keys({
      token: Joi.string().required(),
    }),
  },
  [USER__FORGOT__PASSWORD]: {
    body: Joi.object()
      .keys({
        email: Joi.string(),
      })
      .required(),
  },
  [USER__RESET__PASSWORD]: {
    params: Joi.object()
      .keys({
        token: Joi.string().required(),
      })
      .required(),
    body: Joi.object()
      .keys({
        password: Joi.string().regex(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*(\W|_)).{8})/, {
          name: '(at least 8 characters, upper case, lower case, numbers and special characters)',
        }),
      })
      .required(),
  },
}