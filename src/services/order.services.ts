import { itemsDTO } from "@/dto/items.dto";
import Menu from "@/models/menu.models";
import Order from "@/models/order.models";
import Restaurant from "@/models/restaurant.models";
import User from "@/models/user.models";
import { ApiError } from "@/utils/ApiError";

export const order = async (userId: string, restaurantId: string, items: itemsDTO) => {
    // ||IMPORTANT|| Handling the db call in parallel show that it reduce the db call time
    const [user, restaurant, menu] = await Promise.all([User.findById(userId), Restaurant.findById(restaurantId), Menu.findOne({ restaurantId })])

    if (!user) throw new ApiError(404, "User doesn't exits")
    if (!restaurant) throw new ApiError(404, "Restaurant doesn't exits")
    if (!menu) throw new ApiError(404, "Requested Menu doesn't exits for give restaurant")

    // creating the menu lookup using the name so the TC will O(1)
    const menuMap = new Map(menu.items.map((item) => [item.name, { price: item.price, isAvailable: item.isAvailable }]))

    for (const item of items) {
        const menuMapItem = menuMap.get(item.name)
        if (!menuMapItem || !menuMapItem.isAvailable || menuMapItem.price !== item.price)
            throw new ApiError(404, `${item.name} doesn't exits in our restuarant`)
    }

    const totalPrice = items.reduce((acc, item) => {
        const m = menuMap.get(item.name)
        return acc + (m?.price || 0) * (item.quantity || 1)
    }, 0)

    const orderCreated = await Order.create({ userId, restaurantId, items, totalPrice })
    return orderCreated;
}