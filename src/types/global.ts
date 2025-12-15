import { JwtPayload } from "jsonwebtoken"

declare global {
  namespace Express {
    export interface Request {
      user?: any;
      file?: Express.Multer.File
    }
  }
}

export interface MyJwtPayload extends JwtPayload {
  id: number,
  email: string,
  email_is_verified: boolean;
}

export interface IUserDto {
  id: number
  email: string
  role: 'user' | 'agent' | 'admin'
  emailVerified: boolean
}