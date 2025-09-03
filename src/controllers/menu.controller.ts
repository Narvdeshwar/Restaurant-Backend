import { Controller } from "@/types/expressRouteHandlerTypes";
import { successResponse } from "@/utils/response";
import * as menuServices from "@/services/menu.services"
import { isValidObjectId } from "mongoose";
import { ApiError } from "@/utils/ApiError";
import { validEntity } from "@/utils/validEntity";
import { menuItemDto } from "@/dto/menuitem.dto";

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
        return successResponse(res, "Menu list fetched successfully", menuList, 200)
    } catch (error) {
        next(error)
    }
}

export const getMenuById: Controller = async (req, res, next) => {
    try {
        const MenuId = req.params.id;
        if (!isValidObjectId(MenuId)) throw new ApiError(404, "Invalid Menu Id");
        validEntity(MenuId, "Menu Id is invalid");
        const menuList = await menuServices.getMenuById(MenuId)
        return successResponse(res, "Menu list fetched successfully", menuList, 200);
    } catch (error) {
        next(error)
    }
}

export const updateMenuItem: Controller = async (req, res, next) => {
    try {
        const RestaurantId = req.params.resId;
        if (!isValidObjectId(RestaurantId)) throw new ApiError(422, "Invalid Object ID")
        validEntity(RestaurantId, "Resturant id")

        const menuId = req.params.menuId;
        if (!isValidObjectId(menuId)) throw new ApiError(422, "Invalid Object ID")
        validEntity(menuId, "Menu id")

        const update: Partial<{ name: string, isAvailable: boolean, price: number, description: string }> = {}
        const { name, isAvailable, price, description } = req.body as menuItemDto;
        if (name) update.name = name;
        if (typeof isAvailable !== 'undefined') update.isAvailable = isAvailable;
        if (price) update.price = price;
        if (description) update.description = description;
        const updatedMenu = await menuServices.updateMenuItem(RestaurantId, menuId, name, isAvailable, price, description)
        return successResponse(res, "Menu item updated successfully", updatedMenu, 200)

    } catch (error) {
        next(error)
    }
}

export const deleteMenuItem: Controller = async (req, res, next) => {
    try {
        const RestaurantId = req.params.resId;
        if (!isValidObjectId(RestaurantId)) throw new ApiError(422, "Invalid Object id");
        validEntity(RestaurantId, "Resturant id ");

        const MenuId = req.params.menuId;
        if (!isValidObjectId(MenuId)) throw new ApiError(422, "Invalid Object id");
        validEntity(MenuId, "Menu id ");

        const deletedMenu = await menuServices.deleteMenuItem(RestaurantId, MenuId);
        return successResponse(res, "Menu item deleted successfully", deletedMenu, 200)

    } catch (error) {
        next(error)
    }
}