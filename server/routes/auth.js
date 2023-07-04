const Router = require('express').Router()
const AuthController = require('../controllers/AuthController')
const ValidationMiddleware = require('../middlewares/validation-middleware')

Router.post('/register', ValidationMiddleware.register, AuthController.register)
Router.post('/login', ValidationMiddleware.login, AuthController.login)

module.exports = Router
