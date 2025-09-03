import express from "express"
import { createMenu, getAllMenuById, getMenuById } from "../controllers/menu.controller";

const menuRoutes = express.Router();

menuRoutes.post("/api/restaurant/:id/createMenu", createMenu)
menuRoutes.get("/api/restaurant/getAllMenuById/:id", getAllMenuById);
menuRoutes.get("/api/restaurant/menuById/:id", getMenuById);
export default menuRoutes;