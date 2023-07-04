const Validator = require('validatorjs')
const User = require('../models/User')

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/
Validator.register('strict', value=>{
    passwordRegex.test(value)
}, 'password must contain at least one uppercase letter, one lowercase letter and one number')

Validator.registerAsync('exist', function(value, attribute, req, passes) {
    if (!attribute) throw new Error('Specify Requirements i.e fieldName: exist:table,column')
    let attArr = attribute.split(',')
    if (attArr.length !== 2) throw new Error(`Invalid format for validation rule on ${attribute}`)
    const {0: table, 1:column} = attArr
    let msg = (column === "email") ? `${column} has already been taken `: `${column} already in use`
    if (table === "User.js") {
        User.exists({[column]: value}).then(result=>{
            if (result) {
                passes(false, msg)
            }
            passes()
        })
    }
})

const validator = async (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages)
    validation.passes(()=>{
        callback(null, true)
    })
    validation.fails(()=>{
        callback(validation.errors, false)
    })
}
module.exports = validator
