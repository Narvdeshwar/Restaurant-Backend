import { Controller } from "../types/expressRouteHandlerTypes";
import * as restaurantServices from "../services/restaurant.services"
import { validEntity } from "../utils/validEntity";
import { successResponse } from "../utils/response";

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