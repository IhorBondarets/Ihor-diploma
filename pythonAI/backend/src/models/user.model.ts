import mongoose, { Types } from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    // _id: {
    //   type: Types.ObjectId,
    //   unique: true,
    //   auto: true,
    //   required: true,
    // },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      minlength: 8,
      required: true
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
