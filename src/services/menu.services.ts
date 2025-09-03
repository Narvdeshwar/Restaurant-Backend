import Menu from "../models/menu.models";
import { ApiError } from "../utils/ApiError";

interface ItemsProps {
    name: String,
    price: Number,
    description?: String,
    isAvailable?: Boolean
}[]
export const createMenu = async (title: string, items: ItemsProps[], RestaurantId: string) => {
    const menu = await Menu.findOneAndUpdate({ RestaurantId, title },
        {
            $setOnInsert: { title, RestaurantId },
            $addToSet: { items: { $each: items } }
        },
        {
            new: true,
            upsert: true
        }
    );
    if (!menu) throw new ApiError(500, "Unable to add/update the menu");
    return menu;
}

export const getAllMenuById = async (RestaurantId: string) => {
    const menu = await Menu.find({ RestaurantId });
    if (!menu) throw new ApiError(404, "No restaurant found");
    // `console.log("menu", menu)
    return menu
}