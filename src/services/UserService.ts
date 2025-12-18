import { Role, User } from "../db/models"
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import mailService from "./mailService";
import tokenService from "./tokenService";
import UserDto from "../dtos/user-dto";
import ApiError from "../exceptions/api-error";
import { RoleModel } from "../types/models";
import sequelize from '../db/config'

class UserService {
    async registration(firstName: string, email: string, password: string) {
        const t = await sequelize.transaction()
        const candidate = await User.findOne({ where: { email }, transaction: t })

        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }

        const hashPassword = await bcrypt.hash(password, 12)
        const activationLink = uuidv4()

        const user = await User.create({ firstName, email, passwordHash: hashPassword, activationLink }, { transaction: t })

        // Назначаем роль USER
        const userRole = await Role.findOne({ where: { value: "USER" }, transaction: t },)
        if (!userRole) {
            throw ApiError.BadRequest('Роль не найдена в систме')
        }
        await user.addRole(userRole as RoleModel, { transaction: t })

        const userWithRoles = await User.findByPk(user.id, {
            include: {
                model: Role,
                as: 'roles',
                attributes: ['id', 'value'],
                through: { attributes: [] }
            },
            transaction: t
        })

        if (!userWithRoles) {
            throw ApiError.BadRequest("Ошибка при загрузке пользователя после создания")
        }

        await t.commit()

        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`).catch(err => {
            console.error('Eamil failed', err)
        })

        const userDto = new UserDto(userWithRoles)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        
        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink: string) {
        const user = await User.findOne({ where: { activationLink } })
        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
        user.emailVerified = true
        await user.save()
    }

    async login(email: string, password: string) {
        const user = await User.findOne({
            where: { email }
        })

        if (!user) {
            throw ApiError.BadRequest(`Пользоватлеь с почтовым адресом ${email} не найден`)
        }

        const userWithRoles = await User.findByPk(user.id, {
            include: {
                model: Role,
                as: 'roles',
                attributes: ['id', 'value'],
                through: { attributes: [] }
            }
        })

        if (!userWithRoles) {
            throw ApiError.BadRequest("Ошибка при получении ролей")
        }

        const isPasswordEquals = await bcrypt.compare(password, user.passwordHash)
        if (!isPasswordEquals) {
            throw ApiError.BadRequest('Неверный пароль')
        }

        const userDto = new UserDto(userWithRoles)
        const tokens = tokenService.generateTokens({ ...userDto })

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken: string) {
        const token = await tokenService.removeToken(refreshToken)
        return token;
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken)

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }

        const user = await User.findByPk(userData.id)
        if (!user) {
            throw ApiError.BadRequest('Пользователь не найден')
        }

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers() {
        const users = await User.findAll()
        return users;
    }
}

export default new UserService()