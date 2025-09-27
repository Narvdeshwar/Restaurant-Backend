import { Controller } from "@/types/expressRouteHandlerTypes";
import * as restaurantServices from "@/services/restaurant.services"
import { validEntity } from "@/utils/validEntity";
import { successResponse } from "@/utils/response";
import { isValidObjectId } from "mongoose";
import { ApiError } from "@/utils/ApiError";

export const createRestaurant: Controller = async (req, res, next) => {
    try {
        const { name, address, cuisine, rating } = req.body;
        validEntity(name, "Name");
        validEntity(address, "Address")
        validEntity(cuisine, "Cuisine")
        const restaurant = await restaurantServices.createRestaurant(name, address, cuisine, rating);
        return successResponse(res, "Restaurant added successfully", restaurant, 201);
    } catch (error) {
        return next(error)
    }
}

export const getAllRestaurant: Controller = async (req, res, next) => {
    try {
        const restaurant = await restaurantServices.getAllRestaurant();
        return successResponse(res, "Restuarant fetched Successfully", restaurant, 200)

    } catch (error) {
        return next(error)
    }
}

export const getResturantById: Controller = async (req, res, next) => {
    try {
        const restaurantId = req.params.id;
        if (!isValidObjectId(restaurantId)) throw new ApiError(422, "Invalid Restaurant id")
        const restaurant = await restaurantServices.getResturantById(restaurantId)
        return successResponse(res, "Restaurant fetched successfully", restaurant, 200)
    } catch (error) {
        next(error)
    }
}

export const updateResturantById: Controller = async (req, res, next) => {
    try {
        const restaurantId = req.params.id;
        if (!isValidObjectId(restaurantId)) throw new ApiError(400, "Invalid Object id!");
        if (!restaurantId) throw new ApiError(404, "Object id is required");
        const updates: Partial<{ name: String, address: String }> = {}
        const { name, address } = req.body;
        // this is basically checking that whether my key coming from the front-end user is defined or not
        if (name !== undefined) { // this condition is check the my key is defined now if it is defined whether it is empty or not
            validEntity(name, "Name")
            updates.name = name;
        }
        if (address !== undefined) {
            validEntity(address, "Address")
            updates.address = address;
        }
        const updatedData = await restaurantServices.updateResturantById(name, address, restaurantId);
        return successResponse(res, "Data updated successfully", updatedData, 200)
    } catch (error) {
        next(error)
    }
}

export const delteRestaurantById: Controller = async (req, res, next) => {
    try {
        const RestaurantId = req.params.id;
        if (!isValidObjectId(RestaurantId)) throw new ApiError(422, "Invalid object Id");
        if (!isValidObjectId) throw new ApiError(422, "Object id is required");
        const data = await restaurantServices.delteRestaurantById(RestaurantId)
        return successResponse(res, "Restaurant deleted successfully", data, 200)
    } catch (error) {
        next(error)
    }
}