import { NextFunction, Request, Response } from "express"
import userService from "../services/userService"
import { validationResult } from 'express-validator'
import ApiError from "../exceptions/api-error"

class UserController {
    async registration (req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }

            const { firstName, email, password } = req.body
            const userData = await userService.registration(firstName, email, password)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login (req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            const userData = await userService.login(email, password)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout (req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.status(200).json({ message: 'Вы успешно вышли с системы' })
        } catch (e) {
            next(e)
        }
    }

    async activate (req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL!)
        } catch (e) {
            console.log(e);
            next(e)
        }
    }

    async refresh (req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async getUsers (req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAllUsers()
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }
}

export default new UserController()