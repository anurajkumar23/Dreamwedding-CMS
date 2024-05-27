import { Schema, model, models } from 'mongoose';
import Banquet from './banquet';
import Photographer from './photographer';
import Decorator from './decorator';
import Caterer from './caterer';

const SellerSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
        match: [/.+\@.+\..+/, 'Please use a valid email address'],
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
        lowercase: true,
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        default: 'seller',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    Banquets: [{
        type: Schema.Types.ObjectId,
        ref: 'Banquet',
    }],
    Photographers: [{
        type: Schema.Types.ObjectId,
        ref: 'Photographer',
    }],
    Decorators: [{
        type: Schema.Types.ObjectId,
        ref: 'Decorator',
    }],
    Caterers: [{
        type: Schema.Types.ObjectId,
        ref: 'Caterer',
    }],
});

const Seller = models.Seller || model("Seller", SellerSchema);

export default Seller;
