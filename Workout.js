

const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    duration: {
        type: Number, 
        required: true
    },
    intensity: {
        type: String,
        required: true
    },
    caloriesBurned: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Workout', WorkoutSchema);