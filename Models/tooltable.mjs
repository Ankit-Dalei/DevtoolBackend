import mongoose from 'mongoose';

export const toolSchema = new mongoose.Schema({
    toolLogo: {
        type: Buffer,
        contentType: String,
    },
    toolName: {
        type: String,
        required: true,
    },
    toolMainCatagory: {
        type: String,
        required: true,
    },
    toolStatus: {
        type: String,
        enum: ['Active', 'Not Working', 'Under Development'],
        required: true,
    },
    toolSubCatagory: {
        type: String,
        required: true,
    },
    toolSubSubCatagory: {
        type: String,
        required: true,
    },
    toolColorCode: {
        type: String,
        match: /^#[0-9A-Fa-f]{6}$/,
        required: true,
    },
    toolCode: {
        type: String,
        required: true,
    },
    toolDeveloperEmail: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Timestamp: {
        type: Date,
        default: Date.now, // Automatically set to the current date and time
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});
