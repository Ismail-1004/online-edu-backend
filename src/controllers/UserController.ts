import { Request, Response } from "express"
import UserService from "../services/UserService"

class UserController {
    async registration (req: Request, res: Response) {
        try {
            const { email, password } = req.body
            const userData = await UserService.registration(email, password)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

            res.json(userData)
        } catch (e) {
            throw e
        }
    }

    async login (req: Request, res: Response) {
        try {

        } catch (e) {
            throw e
        }
    }

    async logout (req: Request, res: Response) {
        try {

        } catch (e) {
            throw e
        }
    }

    async activate (req: Request, res: Response) {
        try {

        } catch (e) {
            throw e
        }
    }

    async refresh (req: Request, res: Response) {
        try {

        } catch (e) {
            throw e
        }
    }

    async getUsers (req: Request, res: Response) {
        try {
            res.json(['123', '456'])
        } catch (e) {
            throw e
        }
    }
}

export default new UserController()