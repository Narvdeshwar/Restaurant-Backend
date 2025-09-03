import express from "express"
import { createMenu, deleteMenuItem, getAllMenuById, getMenuById, updateMenuItem } from "@/controllers/menu.controller";

const menuRoutes = express.Router();

menuRoutes.post("/api/restaurant/:id/menus", createMenu);
menuRoutes.get("/api/restaurant/:id/menus", getAllMenuById);
menuRoutes.get("/api/menu/:id", getMenuById);
menuRoutes.patch("/api/restaurant/:resId/menu/:menuId/item", updateMenuItem);
menuRoutes.delete("/api/restaurant/:resId/menu/:menuId/item", deleteMenuItem);

export default menuRoutes;