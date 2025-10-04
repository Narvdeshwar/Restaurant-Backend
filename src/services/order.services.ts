import { itemDTO, itemsDTO } from "@/dto/items.dto";
import Order from "@/models/order.models";
import Restaurant from "@/models/restaurant.models";
import User from "@/models/user.models";
import { ApiError } from "@/utils/ApiError";

export const order = async (userId: string, restaurantId: string, items: itemsDTO) => {
    const user = await User.findById(userId)
    if (!user) throw new ApiError(404, "User doesn't exits")
    const restaurant = await Restaurant.findById(restaurantId)
    if (!restaurant) throw new ApiError(404, "Restaurant doesn't exits")
    if (items.length == 0) throw new ApiError(404, "No item in cart to make a an order");
    const totalPrice = items.reduce((total: number, item: itemDTO) => total + item.price * item.quantity, 0)
    const orderData = { userId, restaurantId, items, totalPrice }
    const item = await Order.create({ orderData });
    return items;
}