import mongoose from "mongoose";
const eventScheema = new mongoose.Schema({
    eventTitle: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Work", "Personal", "School", "Other"],
        trim: true
    }
}, { timestamps: true })

const eventModel = mongoose.models.event || mongoose.model('event', eventScheema)

export default eventModel;