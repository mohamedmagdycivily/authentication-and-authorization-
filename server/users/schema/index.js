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
          _id: false,
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
          _id: false,
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
      resetPasswordToken: {
        type: String,
      },
      resetPasswordExpires: {
        type: Date,
      },
    },
    { collection: 'users', timestamps: true },
  );
  
  const User = mongoose.model('users', UserSchema);
  
  export default User;