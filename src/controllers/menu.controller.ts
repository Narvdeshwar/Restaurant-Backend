import { Controller } from "../types/expressRouteHandlerTypes";
import { successResponse } from "../utils/response";
import * as menuServices from "../services/menu.services"
import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError";
import { validEntity } from "../utils/validEntity";

export const createMenu: Controller = async (req, res, next) => {
    try {
        const RestaurantId = req.params.id;
        if (!isValidObjectId(RestaurantId))
            throw new ApiError(404, "Invalid object Id")
        validEntity(RestaurantId, "Restaurant id");
        const { title, items } = req.body;
        validEntity(title, "Title")
        if (items.length === 0 || !Array.isArray(items))
            throw new ApiError(422, "Menu items must be non empty!")
        const menu = await menuServices.createMenu(title, items, RestaurantId);
        return successResponse(res, "Menu created successfully", menu, 200)
    } catch (error) {
        next(error)
    }
}

export const getAllMenuById: Controller = async (req, res, next) => {
    try {
        const RestaurantId = req.params.id
        if (!isValidObjectId(RestaurantId))
            throw new ApiError(422, "Invalid Restaurant Id")

        validEntity(RestaurantId, "Restaurant id")

        const menuList = await menuServices.getAllMenuById(RestaurantId)
        return successResponse(res, "Menu list fetched successfully", menuList, 201)
    } catch (error) {
        next(error)
    }
}