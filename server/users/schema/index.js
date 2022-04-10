import mongoose from 'mongoose';
import nanoid from '../../../common/config/nanoid';
import {
  ROLES
} from '../helpers/constant';
const { Schema } = mongoose;
const UserSchema = new Schema(
    {
      _id: {
        type: String,
        default: () => nanoid(),
      },
      email: {
        type: {
          address: {
            type: String,
            lowercase: true,
            trim: true,
          },
          verified: { type: Boolean, default: false },
        },
      },
      emailToken: {
        type: String,
      },
      emailTokenExpiration: {
        type: String,
      },
      profile: {
        type: {
          firstName: {
            type: String,
            required: true,
          },
          lastName: {
            type: String,
            required: true,
          },
        },
      },
      roles: {
        type: [{ type: String }],
        enum: ROLES,
        default: [],
      },
      hashedPassword: {
        type: String,
      },
      group: {
        type: {
          _id: {
            type: String,
          },
          name: {
            type: String,
          },
          code: {
            type: Number,
          },
        },
      },
      lastSessionResetDate: {
        type: Date,
        required: false,
        default: new Date(),
      },
      emailToken: {
        type: String,
      },
      emailTokenExpiration: {
        type: String,
      },
    },
    { collection: 'users', timestamps: true },
  );
  
  const User = mongoose.model('users', UserSchema);
  
  export default User;