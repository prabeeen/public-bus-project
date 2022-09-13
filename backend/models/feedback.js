const mongoose = require("mongoose");

// Feedback Schema

const FeedbackSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    feedback_message: {
        type: String,
        required: true,
    },
    user_rater: {
        type: String,
        required: true,
    },
    rated_bus: {
        type: String,
        required: true,
    },

});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

// Exporting Models

module.exports = Feedback;
