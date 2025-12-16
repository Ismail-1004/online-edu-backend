import { Router } from "express";
import UserController from "../controllers/UserController";
import { body } from 'express-validator'
import authMiddleware from "../middlewares/auth-middleware";
import roleMiddleware from "../middlewares/role-middleware";

const router = Router()

router.post('/registration', 
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 32 }),
    UserController.registration)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)
router.get('/', authMiddleware, UserController.getUsers)

export default router