import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
      type: String,
      unique: [true, 'Email already exists!'],
      required: [true, 'Email is required!'],
      match:[/.+\@.+\..+/,'please use a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false,
    },
    username: {
      type: String,
      required: [true, 'Username is required!'],
      match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
      lowercase: true
    },
    image: {
      type: String,
    },
    role: {
        type: String,
        enum: ['banquet', 'admin','decorator','caterer','photographer','user'],
        default: 'user',
      },
      createdAt: { type: Date, default: Date.now }

  });
  
  const User = models.User || model("User", UserSchema);
  
  export default User;