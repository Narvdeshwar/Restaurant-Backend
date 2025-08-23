import { loginDTO, signupDTO } from "../dto/auth.dto";
import User from "../models/user.models";
import { ApiError } from "../utils/ApiError";
import { validEntity } from "../utils/validEntity";

export const createUser = async ({ name, email, password, role }: signupDTO) => {
    // first check where the current email is already used ?
    const isEmailRegistered = await User.findOne({ email });
    if (isEmailRegistered) throw new ApiError(409, "Email is already registered!");
    const user = await User.create({ email, password, name, role })
    return user;
}

export const login = async ({ email, password }: loginDTO) => {
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(404, "user doesn't exits")
    if (user.password != password) throw new ApiError(404, "You have entered the wrong password!")
    return user;
}

export const getAllUser = async () => {
    const user = await User.find().select("-password");
    if (user.length === 0) throw new ApiError(404, "No user found");
    return user;
}

export const getUserById = async (id: string) => {
    const user = await User.findById(id).select("-password")
    if (!user) throw new ApiError(404, "User doesn't found associated with this ID");
    return user;
}

export const updateUserDetails = async (name: string, password: string, userId: string) => {
    validEntity(name, "Name");
    validEntity(password, "Password");
    const user = await User.findByIdAndUpdate({ _id: userId }, { name, password }, { new: true });
    return user;
}