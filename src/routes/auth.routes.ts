import express from "express";
import { login, signup } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/api/users/signup", signup);
authRouter.post("/api/users/login", login)

export default authRouter;
