import Restaurant from "@/models/restaurant.models"
import { ApiError } from "@/utils/ApiError";

export const createRestaurant = async (name: string, address: string, cuisine: string, rating?: number) => {
    const restaurant = await Restaurant.create({ name, address, cuisine, rating: rating ?? 0 })
    return restaurant;
}

export const getAllRestaurant = async () => {
    const restaurant = await Restaurant.find();
    if (!restaurant) throw new ApiError(404, "No restaurant found");
    return restaurant
}

export const getResturantById = async (restaurantId: string) => {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) throw new ApiError(404, "No Restaurant account is assciated with this Id");
    return restaurant;
}

export const updateResturantById = async (name: string, address: string, RestaurantId: string) => {
    const data = await Restaurant.findByIdAndUpdate({ _id: RestaurantId }, { name, address }, { new: true })
    if (!data) throw new ApiError(500, "unable to update the Data")
    return data;
}

export const delteRestaurantById = async (RestaurantId: string) => {
    const data = await Restaurant.findByIdAndDelete({ _id: RestaurantId })
    if (!data) throw new ApiError(500, "Id doesn't exits")
    return data;
}