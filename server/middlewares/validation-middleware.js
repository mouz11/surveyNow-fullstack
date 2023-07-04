const validator = require('../helpers/validate')
const register =  async (req, res, next)=>{
    const validationRule = {
        "email": "required|string|email|exist:User.js,email",
        "firstName": "required|string",
        "lastName": "required|string",
        "password": "required|string|strict|min:6",
    };

    await validator(req.body, validationRule, {}, (err, status)=>{
        if (!status) {
            res.status(400).send({
                ok: false,
                message: 'validation failed',
                data: err
            })
        }else {
         next()
        }
    }).catch(err=>console.log(err))
}
const login = async (req, res, next)=>{
    const validationRule = {
        email: "required",
        password: "required"
    }
    await validator(req.body, validationRule, {}, (errors,status)=>{
        if (!status) {
            res.status(412).send({
                ok: false,
                message: "required inputs are messing",
                data: errors
            })
            return
        }else {
            next()
        }
    })
}

module.exports = {register, login}
