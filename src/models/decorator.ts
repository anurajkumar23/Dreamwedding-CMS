import { Schema, model, models } from "mongoose";

import Review from "./Review";


const DecoratorSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: [true, "Name is required!"],
    maxlength: 40,
  },
 description:String,
  rating: {
    type: Number,
    required: true,
    default: 4.5,
    min: 1,
    max: 5,
  },
  adminRating:{
    type: Number,
    select: false,
    min: 1,
    max: 5
},
  location: { city: String, pincode: String, area: String },

  price: [Number],
  like: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  contactUs: Number,
  yearOfEstd: Number,


  reviews: [Review.schema],
  billboard: {
    type: String,
    maxlength: 255,
  },

  photos: {
    type: [String],
    default: [], 
  },
 
});

const Decorator = models.Decorator || model("Decorator", DecoratorSchema);

export default Decorator;
