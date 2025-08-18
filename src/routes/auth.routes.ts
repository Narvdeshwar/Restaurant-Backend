import express from "express";
import { signup } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/api/users/signup", signup);

export default authRouter;
