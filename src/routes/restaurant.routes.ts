import express from "express";
import { createRestaurant, delteRestaurantById, getAllRestaurant, getResturantById, updateResturantById } from "@/controllers/restaurant.controller";

const restaurantRoute = express.Router();

restaurantRoute.post("/api/restaurant", createRestaurant);
restaurantRoute.get("/api/getAllRestaurant", getAllRestaurant)
restaurantRoute.get("/api/restaurants/:id", getResturantById)
restaurantRoute.patch("/api/restaurants/:id", updateResturantById)
restaurantRoute.delete("/api/restaurants/:id", delteRestaurantById)


export default restaurantRoute;
