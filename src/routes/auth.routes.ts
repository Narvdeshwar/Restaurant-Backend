import express from "express";
import { deleteUser, getAllUser, getUserById, login, signup, updateUserDetails, verifyOtp } from "@/controllers/auth.controller";
import userAuth from "@/middlewares/userAuth";
import { authorizeRole } from "@/middlewares/authorizeRoles";

const API=process.env.API_VERSION;

const authRouter = express.Router();

authRouter.post(`${API}/users/signup`, signup);
authRouter.post(`${API}/users/verify-otp`, verifyOtp)
authRouter.post(`${API}/users/login`, login)
authRouter.get(`${API}/users`, userAuth, authorizeRole("admin"), getAllUser)
authRouter.get(`${API}/user/:id`, getUserById)
authRouter.put(`${API}/user/:id`, updateUserDetails);
authRouter.delete(`${API}/user/:id`, deleteUser);

export default authRouter;
