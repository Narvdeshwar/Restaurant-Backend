import { itemsDTO } from "@/dto/items.dto";
import Restaurant from "@/models/restaurant.models";
import User from "@/models/user.models";
import { ApiError } from "@/utils/ApiError";

export const order = async (userId: string, restaurantId: string, items: itemsDTO) => {
    const user = await User.findById(userId)
    if (!user) throw new ApiError(404, "User doesn't exits")
    const restaurant = await Restaurant.findById(restaurantId)
    if (!restaurant) throw new ApiError(404, "Restaurant doesn't exits")
}