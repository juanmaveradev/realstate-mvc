import express from 'express';
import { formLogin  } from '../controllers/userController.js';
import { formRegister } from '../controllers/userController.js';
import { registerUser } from '../controllers/userController.js';
import {formForgetPass} from '../controllers/userController.js'; 


const router = express.Router();



router.get('/login', formLogin);

router.get('/register', formRegister)
router.post('/register', registerUser)

router.get('/password-forgot', formForgetPass)




export default router 