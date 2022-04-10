import UserSchema from '../schema';
import _ from 'lodash';

class User {
    async findOne(selector = {}, projection = {}) {
      let { fields } = projection;

      return UserSchema.findOne(selector).select(fields);
    }

    async create(params) {
        return UserSchema.create(params);
    }
}

export default new User();
