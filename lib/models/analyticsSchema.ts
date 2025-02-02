import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
    alias: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    ipAddress: { type: String },
    userAgent: { type: String },
    osName: { type: String },
    location: {
        country: { type: String },
        city: { type: String },
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    totalClicks: { type: Number, default: 0 },
    uniqueUsers: { type: Number, default: 0 },
    clicksByDate: [{
        date: { type: String, required: true },
        count: { type: Number, required: true }
    }],
    osType: [{
        osName: { type: String, required: true },
        uniqueClicks: { type: Number, required: true },
        uniqueUsers: { type: Number, required: true }
    }], // OS-based analytics
    deviceType: [{
        deviceName: { type: String, required: true },
        uniqueClicks: { type: Number, required: true },
        uniqueUsers: { type: Number, required: true }
    }]
}, { timestamps: true });

export default mongoose.model('Analytics', analyticsSchema);
