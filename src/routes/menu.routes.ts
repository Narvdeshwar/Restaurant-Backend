import express from "express"
import { createMenu } from "../controllers/menu.controller";

const menuRoutes = express.Router();

menuRoutes.post("/api/restaurant/:id/createMenu", createMenu)
export default menuRoutes;