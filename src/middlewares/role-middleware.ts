import { NextFunction, Response, Request } from "express";
import ApiError from "../exceptions/api-error";
import tokenService from "../services/tokenService";

export default function (allowedRoles: string[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.user || !Array.isArray(req.user.roles)) {
                return next(ApiError.UnauthorizedError());
            }
            
            const hasAccess = req.user.roles.some((role: string) =>
                allowedRoles.includes(role)
            );

            if (!hasAccess) {
                return next(ApiError.Forbidden('У вас нет доступа'));
            }

            next();
        } catch (e) {
            return next(ApiError.UnauthorizedError())
        }
    }
}