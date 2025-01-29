import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String },
    profilePicture: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
