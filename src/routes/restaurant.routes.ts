import express from "express";
import { createRestaurant, getAllRestaurant, getResturantById, updateResturantById } from "../controllers/restaurant.controller";

const restaurantRoute = express.Router();

restaurantRoute.post("/api/restaurant", createRestaurant);
restaurantRoute.get("/api/getAllRestaurant", getAllRestaurant)
restaurantRoute.get("/api/restaurants/:id", getResturantById)
restaurantRoute.patch("/api/restaurants/:id", updateResturantById)


export default restaurantRoute;
