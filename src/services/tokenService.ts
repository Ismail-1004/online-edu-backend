import jwt from 'jsonwebtoken'
import UserDto from '../dtos/user-dto'
import { Token } from '../db/models'
import { MyJwtPayload } from '../types/global'

class TokenService {
    generateTokens (payload: UserDto) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, { expiresIn: '15m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: '30d' })

        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken (token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET!)
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken (token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as MyJwtPayload
            return userData
        } catch (e) {
            return null
        }
    }

    async saveToken (userId: number, refreshToken: string) {
        try {
            const tokenData = await Token.findOne({ where: { userId: userId } })

            if (tokenData) {
                tokenData.refreshToken = refreshToken
                return await tokenData.save()
            }

            const token = await Token.create({ userId, refreshToken })
            return token
        } catch (e) {
            throw e
        }
    }

    async removeToken (refreshToken: string) {
        try {
            const tokenData = await Token.destroy({ where: { refreshToken } })
            return tokenData
        } catch (e) {
            throw e
        }
    }

    async findToken (refreshToken: string) {
        try {
            const tokenData = await Token.findOne({ where: { refreshToken } })
            return tokenData
        } catch (e) {
            throw e
        }
    }
}

export default new TokenService()