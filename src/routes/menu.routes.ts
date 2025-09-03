import express from "express"
import { createMenu, getAllMenuById } from "../controllers/menu.controller";

const menuRoutes = express.Router();

menuRoutes.post("/api/restaurant/:id/createMenu", createMenu)
menuRoutes.get("/api/restaurant/getAllMenuById/:id",getAllMenuById);
export default menuRoutes;