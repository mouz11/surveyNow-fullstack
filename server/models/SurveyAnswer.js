const mongoose = require('mongoose')

const surveyAnswerSchema = new mongoose.Schema({
    surveyId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Survey",
        required: true,
    },
    startDate: {
        type: Date,
        required: false
    },
    endDate: {
        type: Date,
        required: false
    }


})

const SurveyAnswerModel = mongoose.model('SurveyAnswer', surveyAnswerSchema)

module.exports = SurveyAnswerModel
