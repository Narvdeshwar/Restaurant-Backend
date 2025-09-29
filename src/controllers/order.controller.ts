import { Controller } from "@/types/expressRouteHandlerTypes";
import { successResponse } from "@/utils/response";

export const createOrder: Controller = async (req, res, next) => {
    try {
        const { userId, restaurantId, items } = req.body;
        
        return successResponse(res, "Order received successfully")
    } catch (error) {
        next(error)
    }
}