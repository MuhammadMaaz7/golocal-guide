import mongoose from 'mongoose';

const guidePackageSchema = new mongoose.Schema({
    
    guideID: { type: mongoose.Schema.Types.ObjectId, ref: 'Guide' },
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    availableDates: [{ type: Date }],
    includedServices: [{ type: String }], // E.g., meals, transport
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('GuidePackage', guidePackageSchema);
