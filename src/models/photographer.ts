import { Schema, model, models } from "mongoose";

import Review from "./Review";


const PhotographerSchema = new Schema({
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
  location: { city: String, pincode: String, area: String },
  locationUrl: String,
  description: String,
  price: [Number],
  like: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  contactUs: Number,
  yearOfEstd: Number,
  services: [String],

  reviews: [Review.schema],
  billboard: {
    type: String,
    maxlength: 255,
  },

  occasion: { type: String, required: true },
  gallery: [
    {
      name: {
        type: String,
        required: true,
      },
      photos: [String],
    },
  ],
});

const Photographer = models.Photographer || model("Photographer", PhotographerSchema);

export default Photographer;