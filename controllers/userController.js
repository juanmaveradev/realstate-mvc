import User from '../models/User.js'
import { check, validationResult } from 'express-validator'

const formLogin = (req, res) => {
    res.render('auth/login', {
        page: 'Login'
    }) 
}

const formRegister = (req, res) => {
    res.render('auth/register', {
        page: 'Register'
    }) 
}

const formForgetPass = (req, res) => {
    res.render('auth/password-forgot', {
        page: 'Recover your access to RealState'
    }) 
} 


const registerUser = async(req, res) => {

     await check('name').notEmpty().withMessage('Name is required').run(req)
     await check('email').isEmail().withMessage('Enter a valid Email').run(req)
     await check('password').isLength({min: 7}).withMessage('Password must have minimum 7 characteres').run(req)
     await check('rPassword').equals('password').withMessage('The passwords are not the same').run(req)

    let result = validationResult(req)

    if(!result.isEmpty()) {
        return res.render('auth/register', {
            page: 'Register',
            errors: result.array(),
            user: {
                name: req.body.name,
                email: req.body.email
            }
        })  
    }

    const { name, email, password } = req.body

    const existUser = await User.findOne( { where: {email}})
    if (existUser) {
        return res.render('auth/register', {
            page: 'Register',
            errors: [{msg: 'The email already has a user'}],
            user: {
                name: req.body.name,
                email: req.body.email
            }
        })  
    }

    await User.create ({
        name,
        email,
        password,
        token: 123
    })
}


export {
    formLogin, 
    formRegister, 
    registerUser,
    formForgetPass
}