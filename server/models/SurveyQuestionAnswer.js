const mongoose = require('mongoose')

const surveyQuestionAnswerSchema = new mongoose.Schema({
    surveyQuestionId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SurveyQuestion",
        required: true,
    },
    surveyAnswerId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SurveyAnswer",
        required: true,
    },
    answer: {
        type: String
    }
}, {timestamps: true})

const SurveyQuestionAnswerModel = mongoose.model('SurveyQuestionAnswer', surveyQuestionAnswerSchema)

module.exports = SurveyQuestionAnswerModel
