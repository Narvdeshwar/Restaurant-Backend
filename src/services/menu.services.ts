import { menuItemDto } from "@/dto/menuitem.dto";
import Menu from "@/models/menu.models";
import { ApiError } from "@/utils/ApiError";


export const createMenu = async (title: string, items: menuItemDto[], RestaurantId: string) => {
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
    if (!menu || menu.length === 0) throw new ApiError(404, "No restaurant menu found");
    // `console.log("menu", menu)
    return menu
}

export const getMenuById = async (MenuId: string) => {
    const menuList = await Menu.findById(MenuId)
    if (!menuList) throw new ApiError(404, "No menu list found")
    return menuList
}

export const updateMenuItem = async (RestaurantId: string, MenuId: string, name?: string, isAvailable?: boolean, price?: number, description?: string,) => {
    // important here to target the menu items which is inside the mongodb object which is in nested form
    const update: any = {}
    if (name) update["items.$.name"] = name;
    if (typeof isAvailable !== 'undefined') update["items.$.isAvailable"] = isAvailable;
    if (price) update["items.$.price"] = price;
    if (description) update["items.$.description"] = description;
    const updatedMenuItem = await Menu.findOneAndUpdate(
        {
            RestaurantId, "items._id": MenuId
        },
        { $set: update },
        { new: true }
    )
    if (!updatedMenuItem) throw new ApiError(404, "Menu items doesn't exits");
    return updatedMenuItem
}

export const deleteMenuItem = async () => {

}