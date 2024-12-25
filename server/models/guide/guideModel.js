import mongoose from 'mongoose';

const guideSchema = new mongoose.Schema({
    userID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Reference the User model
        required: true 
    },
    guideType: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    fee: { type: Number},
    languages: [{ type: String }],
    expertiseAreas: [{ type: String }],
    profilePictureURL: { type: String },
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Guide', guideSchema);
