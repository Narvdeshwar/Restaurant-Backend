import { order } from "@/services/order.services";
import { Controller } from "@/types/expressRouteHandlerTypes";
import { successResponse } from "@/utils/response";

export const createOrder: Controller = async (req, res, next) => {
    try {
        const { userId, restaurantId, items } = req.body;
        const orders = await order(userId,restaurantId,items)
        return successResponse(res, "Order received successfully", orders)
    } catch (error) {
        next(error)
    }
}