import mongoose from 'mongoose';

const guideExperienceSchema = new mongoose.Schema({
    guideID: { type: mongoose.Schema.Types.ObjectId, ref: 'Guide', required: true },
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    status: { 
        type: String, 
        enum: ['completed', 'in-progress', 'upcoming'], 
        default: 'in-progress' 
    },
    location: { type: String },
    tags: [String],  // Tags to categorize experience
    images: [{ type: String }], // URLs
    videos: [{ type: String }], // URLs
}, {
    timestamps: true,  // Automatically add createdAt and updatedAt fields
});

export default mongoose.model('GuideExperience', guideExperienceSchema);
