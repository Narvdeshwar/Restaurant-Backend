import { Controller } from "@/types/expressRouteHandlerTypes";
import { ApiError } from "@/utils/ApiError";
import { NextFunction, Request, Response } from "express";


export const authorizeRole = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = (req as any).user;
            if (!user) throw new ApiError(401, "You are not authorised")
            if (!allowedRoles.includes(user.role)) throw new ApiError(403, "You have not access rights")
            next()
        } catch (error) {
            next(error)
        }
    }
}