import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    alias: { type: String, required: true, unique: true },
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    topic: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalClicks: { type: Number, default: 0 },
    uniqueUsers: { type: Number, default: 0 }
}, {
    timestamps: true
});

export default mongoose.model('Url',urlSchema);