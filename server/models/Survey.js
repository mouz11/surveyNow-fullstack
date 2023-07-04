const mongoose = require('mongoose')

const surveySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User.js",
        required: true
    },
    title: {
        type: String,
        maxLength: 1000
    },
    slug: {
        type: String,
        maxLength: 1000
    },
    status: {
        type: Number,
    },
    description: {
        type: String,
        required: false
    },
    expire_date: {
        type: Date,
        required: false
    },

}, {timestamps: true})

const SurveyModel = mongoose.model('Survey', surveySchema)

module.exports = SurveyModel
