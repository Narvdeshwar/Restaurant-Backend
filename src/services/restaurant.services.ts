import Restaurant from "../models/restaurant.models"
import { ApiError } from "../utils/ApiError";

export const createRestaurant = async (name: string, address: string, cuisine: string, rating?: number) => {
    const restaurant = await Restaurant.create({ name, address, cuisine, rating: rating ?? 0 })
    return restaurant;
}

export const getAllRestaurant = async () => {
    const restaurant = await Restaurant.find();
    if (!restaurant) throw new ApiError(404, "No restaurant found");
    return restaurant
}