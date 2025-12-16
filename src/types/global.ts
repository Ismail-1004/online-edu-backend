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
  roles: string[];
  emailVerified: boolean;
}

export interface IUserDto {
  id: number
  email: string
  roles: string[]
  emailVerified: boolean
}