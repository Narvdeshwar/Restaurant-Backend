import Menu from "../models/menu.models";
import { ApiError } from "../utils/ApiError";

interface itemsProps {
    name: String,
    price: Number,
    description?: String,
    isAvailable?: Boolean
}[]
export const createMenu = async (title: string, items: itemsProps[], RestaurantId: string) => {
    const menu = await Menu.findOneAndUpdate({ _id: RestaurantId, title },
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