import { User } from "../db/models"
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import mailService from "./mailService";
import tokenService from "./tokenService";
import UserDto from "../dtos/user-dto";

class UserService {
    async registration(email: string, password: string) {
        const candidate = await User.findOne({ where: { email } })

        if (candidate) {
            throw new Error(`Пользовтель с почтовым адресом ${email} уже существует`)
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuidv4()
        const user = await User.create({ email, passwordHash: hashPassword, activationLink })
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }
}

export default new UserService()