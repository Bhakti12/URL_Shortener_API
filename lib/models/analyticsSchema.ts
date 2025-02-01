import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
    alias: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    ipAddress: { type: String },
    userAgent: { type: String },
    osName: { type: String },
    deviceType: { type: String },
    location: {
        country: { type: String },
        city: { type: String },
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Analytics', analyticsSchema);
