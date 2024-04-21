import { Schema, model, models } from "mongoose";

import Review from "./Review";

const GallerySectionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  photos: [String],
});

const BanquetSchema = new Schema({
  photo: [
    {
      type: String,
      maxlength: 255,
    },
  ],
  name: {
    type: String,
    lowercase: true,
    required: [true, "Name is required!"],
    maxlength: 40,
  },
  rating: {
    type: Number,
    required: true,
    default: 4.5,
    min: 1,
    max: 5,
  },
  location: {city:String,pincode:String,area:String},
  locationUrl: String,
  description: String,
  price: Number,
  like: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  capacity: Number,
  specialFeature: [String],
  contactUs: Number,
  yearOfEstd: Number,
  services: [String],
  type: {
    type: String,
    enum: ["AC", "Non-AC"],
    default: "AC",
  },
  availability: [String],
  reviews: [Review.schema],
  billboard: {
    type: String,
    maxlength: 255,
  },
  openHours: {
    type: String,
  },
  operatingDays: {
    type: [String],
    enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    default: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  gallery: [GallerySectionSchema],
});

const Banquet = models.Banquet || model("Banquet", BanquetSchema);

export default Banquet;
