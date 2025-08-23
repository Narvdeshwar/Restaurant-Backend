import express from "express";
import { deleteUser, getAllUser, getUserById, login, signup, updateUserDetails } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/api/users/signup", signup);
authRouter.post("/api/users/login", login)
authRouter.get("/api/users", getAllUser)
authRouter.get("/api/user/:id", getUserById)
authRouter.put("/api/user/:id", updateUserDetails);
authRouter.delete("/api/user/:id", deleteUser);

export default authRouter;
