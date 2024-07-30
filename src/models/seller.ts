import { Schema, model, models } from "mongoose";
const { promisify } = require('util');
const argon2 = require('argon2');
const crypto = require('crypto');


const SellerSchema = new Schema({
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
  role: {
    type: String,
    default: "seller",
  },
  pancard: String,
  GSTNO: String,
  address: String,
  phone: Number,
  bank: {
    name: String,
    account: String,
    ifsc: String,
    holdername: String,
  },
  pincode: Number,
  city: String,
  state: String,
  Banquets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Banquet",
    },
  ],
  Photographers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Photographer",
    },
  ],
  Decorators: [
    {
      type: Schema.Types.ObjectId,
      ref: "Decorator",
    },
  ],
  Caterers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Caterer",
    },
  ],
  createdAt: { type: Date, default: Date.now },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

SellerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await argon2.hash(this.password);
    next();
  });
  
  SellerSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = new Date(Date.now() - 10000); // Subtracting 10 seconds
    next();
  });
  
  SellerSchema.methods.correctPassword = async function (
    candidatePassword: string,
    userPassword: string,
  ) {
    return await argon2.verify(userPassword, candidatePassword);
  };
  
  SellerSchema.methods.changedPasswordAfter = function(JWTTimestamp: number): boolean {
    if (this.passwordChangedAt) {
      const changedTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000);
      return JWTTimestamp < changedTimestamp;
    }
    return false;
  };
  
  
  SellerSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
      this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };
  





const Seller = models.Seller || model("Seller", SellerSchema);

export default Seller;
