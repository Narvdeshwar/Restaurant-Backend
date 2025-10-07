import { createOrder } from "@/controllers/order.controller";
import express from "express"

const orderRoute = express.Router()

const API = process.env.API_VERSION;

orderRoute.post(`${API}/order/create-order`, createOrder);

export default orderRoute