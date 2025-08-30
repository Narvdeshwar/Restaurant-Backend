import { Controller } from "../types/expressRouteHandlerTypes";
import { successResponse } from "../utils/response";
import * as menuServices from "../services/menu.services"

export const createMenu: Controller = async (req, res, next) => {
    try {
        const menu = await menuServices.createMenu();
        return successResponse(res, "Menu created successfully", menu, 200)
    } catch (error) {
        next(error)
    }
}