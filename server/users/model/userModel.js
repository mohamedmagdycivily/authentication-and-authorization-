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

    async update(_id, newParams, options = {}) {
      options.runValidators = true;
      return UserSchema.findByIdAndUpdate(_id, newParams, options);
    }
}

export default new User();
