import { Schema, model, models } from "mongoose";
import argon2 from 'argon2';
import crypto from 'crypto';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password must be at least 8 characters long"],
    select: false,
  },
  image: {
    type: String,
  },
  address: String,
  pincode: Number,
  city: String,
  state: String,
  name: {
    type: String,
  },
  googleLogIn: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "user",
    required:true,
    enum: ["admin", "user", "seller"]
  },
  createdAt: { type: Date, default: Date.now },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// Hash the password before saving the user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await argon2.hash(this.password);
  next();
});

// Set the passwordChangedAt timestamp if the password was modified
UserSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = new Date(Date.now() - 10000);
  next();
});

// Method to verify password during login
UserSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string,
) {
  return await argon2.verify(userPassword, candidatePassword);
};

// Method to check if the password was changed after the JWT was issued
UserSchema.methods.changedPasswordAfter = function(JWTTimestamp: number): boolean {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Method to generate a password reset token
UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  return resetToken;
};

const User = models.User || model("User", UserSchema);

export default User;
