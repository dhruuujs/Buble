//Buble
import express from 'express';
//import {storeMsgs,deleteMsg} from '../controllers/'
import {login,signup} from '../controllers/authControllers.js'
import {authenticate} from '../middleware/auth.js'

const router = express.Router();

router.post("/chat",storeMsgs);
router.post("/login",login);
router.post("/signup",signup);

router.get("/auth",authenticate);

export default router;