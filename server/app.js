const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const cors = require('cors')
//import Routes
const authRoute = require('./routes/auth')

const app = express()
app.use(cors())
app.use(express.json())
//setting some headers
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        res.status(200).json({})
    }
    next()
})

mongoose.connect(process.env.MONGODB_CONNEXION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use('/api/auth', authRoute)

module.exports = app


