import { Schema, model, models } from "mongoose";
const { promisify } = require('util');
const argon2 = require('argon2');
const crypto = require('crypto');

const AdminSchema = new Schema({

  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
    match: [/.+\@.+\..+/, "please use a valid email address"],
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
  name: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: { type: Date, default: Date.now },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});


AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await argon2.hash(this.password);
  next();
});

AdminSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = new Date(Date.now() - 10000); // Subtracting 10 seconds
  next();
});

AdminSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string,
) {
  return await argon2.verify(userPassword, candidatePassword);
};

AdminSchema.methods.changedPasswordAfter = function(JWTTimestamp: number): boolean {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};


AdminSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};




const Admin = models.User || model("Admin", AdminSchema);

export default Admin;
