  import { Schema, model, models } from "mongoose";

  


  const CatererSchema = new Schema({
    name: {
      type: String,
      lowercase: true,
      required: [true, "Name is required!"],
      maxlength: 40,
    },
   

    price: Number,
   

    veg:{
      starter:[String],
      maincourse:[String],
      desert:[String],
      welcomedrink:[String],
      breads:[String],
      rice:[String]
    },
    nonveg:{
      starter:[String],
      maincourse:[String],
      desert:[String],
      welcomedrink:[String],
      breads:[String],
      rice:[String]
    },
    addon:{
      starter:[String],
      maincourse:[String],
      desert:[String],
      welcomedrink:[String],
      breads:[String],
      rice:[String]
    }
  });

  const Caterer = models.Caterers || model("Caterer", CatererSchema);

  export default Caterer;
