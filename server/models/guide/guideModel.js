import mongoose from 'mongoose';

const guideSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    guideType: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    fee: { type: Number, required: true },
    languages: [{ type: String }],
    expertiseAreas: [{ type: String }],
    profilePictureURL: { type: String },
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Guide', guideSchema);
