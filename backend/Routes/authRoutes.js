import express from "express";
import { login, logout, signUp,verifyEmail } from "../controllers/authController.js";

const router = express.Router();

router.post('/signup', signUp)
router.post('/login', login)
router.post('/logout', logout)

router.post('verify-email',verifyEmail)


export default router ;