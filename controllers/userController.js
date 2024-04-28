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

const registerUser = async(req, res) => {
    //Validation
    await check('name').notEmpty().withMessage('Name is required').run(req)
    await check('email').isEmail().withMessage('Enter a valid Email').run(req)
    await check('password').isLength({min: 7}).withMessage('Password must have minimun 7 characteres').run(req)
    await check('r-password').equals('password').withMessage('The passwords are not the same').run(req)

    let result = validationResult(req)

    if(!result.isEmpty()) {
        return res.render('auth/register', {
            page: 'Register',
            errors: result.array()
        }) 
    }

    const user = await User.create(req.body)

}

const formForgetPass = (req, res) => {
    res.render('auth/password-forgot', {
        page: 'Recover your access to RealState'
    }) 
} 


export {
    formLogin, 
    formRegister, 
    registerUser,
    formForgetPass
}