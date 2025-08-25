import Restaurant from "../models/restaurant.models"

export const createRestaurant = async (name: string, address: string, cuisine: string, rating?: number) => {
    const restaurant = await Restaurant.create({ name, address, cuisine, rating: rating ?? 0 })
    return restaurant;
}