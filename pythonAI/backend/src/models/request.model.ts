import mongoose, { Types } from 'mongoose';

const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    image_name: {
      type: String,
      unique: false,
      required: true
    },
    text_file: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

export const Request = mongoose.model('Request', requestSchema);
