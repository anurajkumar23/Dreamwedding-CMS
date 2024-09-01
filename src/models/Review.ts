import { Schema, model, models } from 'mongoose';

const ReviewSchema = new Schema({
    content: {
        type: String,
        required: [true, 'Review content cannot be blank']
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: 1,
        max: 5
    },
 
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Review = models.Review || model("Review", ReviewSchema);

export default Review;