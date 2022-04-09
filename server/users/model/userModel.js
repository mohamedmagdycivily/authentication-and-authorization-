import UserSchema from '../schema';
import _ from 'lodash';

class User {
    async findOne(selector = {}, projection = {}, user = {}) {
      let { fields } = projection;
      let allowedFields = {};


      return UserSchema.findOne(selector).select(fields).lean();
    }

    async create(params) {
        return UserSchema.create(params);
    }
}

export default new User();
