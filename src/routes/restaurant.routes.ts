import express from "express";
import { createRestaurant } from "../controllers/restaurant.controller";

const restaurantRoute = express.Router();

restaurantRoute.post("/api/restaurant", createRestaurant);


export default restaurantRoute;
