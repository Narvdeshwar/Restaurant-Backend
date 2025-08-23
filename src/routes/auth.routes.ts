import express from "express";
import { getAllUser, getUserById, login, signup, updateUserDetail } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/api/users/signup", signup);
authRouter.post("/api/users/login", login)
authRouter.get("/api/users", getAllUser)
authRouter.get("/api/user/:id",getUserById)
authRouter.patch("/api/user/:id",updateUserDetail);

export default authRouter;
