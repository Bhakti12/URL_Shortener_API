import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: 'Please enter email'
    },
    password: {
        type: String,
        required: 'please enter password'
    },
    token: {
        type: String
    },
    sId: {
        type: String
    },
    lastLoginAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

export default mongoose.model('User',userSchema);