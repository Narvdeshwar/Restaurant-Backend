import User from "@/models/user.models";
import { Controller } from "@/types/expressRouteHandlerTypes";
import { ApiError } from "@/utils/ApiError";
import jwt from "jsonwebtoken";

interface jwtPayload {
    id: string,
    role: string[]
}
const userAuth: Controller = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) throw new ApiError(401, "Authentication token is required");
        const decodedId = jwt.verify(token, process.env.JWT_SECRET || "havethiswillbeword") as jwtPayload;

        if (!decodedId) throw new ApiError(401, "Invalid token id");
        const user = await User.findById(decodedId);

        if (!user) throw new ApiError(404, "User not found");
        (req as any).user = user;

        next();
    } catch (error) {
        next(error)
    }
}

export default userAuth;