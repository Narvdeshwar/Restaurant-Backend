import express from "express";
import { getAllUser, login, signup } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/api/users/signup", signup);
authRouter.post("/api/users/login", login)
authRouter.get("/api/users", getAllUser)

export default authRouter;
