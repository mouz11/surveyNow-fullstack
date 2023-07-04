const mongoose = require('mongoose')

const surveyQuestionSchema = new mongoose.Schema({
    surveyId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Survey",
        required: true,
    },
    type: {
        type: String,
        maxLength: 45
    },
    question: {
        type: String,
        maxLength: 2000
    },
    description: {
        type: String,
        required: false
    },
    data: {
        type: String,
        required: false
    },


}, {timestamps: true})

const SurveyQuestionModel = mongoose.model('SurveyQuestion', surveyQuestionSchema)

module.exports = SurveyQuestionModel
