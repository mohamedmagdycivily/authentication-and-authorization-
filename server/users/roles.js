import {
    USER__UPDATE_PERSONAL_INFO,
    ADMIN, SUPER_ADMIN,
    USER__SUPER_ADMIN_ONLY,
} from './helpers/constant';

export default {
    [USER__UPDATE_PERSONAL_INFO]: [
        ADMIN,
        SUPER_ADMIN,
    ],
    [USER__SUPER_ADMIN_ONLY]: [
        SUPER_ADMIN,
    ]
};
  