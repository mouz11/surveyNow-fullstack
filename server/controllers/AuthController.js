const bcrypt = require('bcrypt')
const {hash} = require("bcrypt");
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const register = (req, res)=>{
    const {email, password, firstName, lastName} = req.body
    console.log(password)
    const cipherPassword = bcrypt.hash(password, 10, async (err, hash)=>{
        if (err) {
            console.error(err);
            return;
        }
        const newUser= new User({
            email,
            firstName,
            lastName,
            password: hash
        })
        try {
            await newUser.save()
            const {data, password} = newUser
            const token = jwt.sign({id: newUser._id, email: newUser.email}, process.env.JWT_KEY,{expiresIn: '365d'})
            return res.status(201).json({
                ok: true,
                message: "register successful",
                user: data,
                token
            })
        }catch (err) {
            return res.status(500).json({
                ok: false,
                message: err.message
            })
        }
    })
}
const login = async (req,res) => {
    const {email, password} = req.body
    try{
        const user = await User.findOne({email: email})
        if (!user) {
            return res.status(401).json({
                ok:false,
                message: "incorrect email or password"
            })
        }else{
            bcrypt.compare(password, user.password, (err, isMatch)=>{
                if (err) {
                    console.error(err)
                    return
                }
                if (isMatch) {
                    const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_KEY,{expiresIn: '365d'})
                    const {password, ...data} = user._doc
                    return res.status(200).json({
                        ok:true,
                        user: data,
                        token
                    })
                }else {
                    return res.status(401).json({
                        ok: false,
                        message: "incorrect email or password"
                    })
                }
            })
        }
    }catch (err) {
        res.status(500).json({
            message: "internal error occurred",
            err: err.message
        })
    }
}
module.exports = {register, login}
