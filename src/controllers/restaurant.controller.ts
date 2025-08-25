import { Controller } from "../types/expressRouteHandlerTypes";
import * as restaurantServices from "../services/restaurant.services"
import { validEntity } from "../utils/validEntity";
import { successResponse } from "../utils/response";
import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError";

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
        console.log("Api called");

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