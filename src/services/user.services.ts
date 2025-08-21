import { signupDTO } from "../dto/auth.dto";
import User from "../models/user.models";
import { ApiError } from "../utils/ApiError";

export const createUser = async ({ name, email, password, role }: signupDTO) => {
    // first check where the current email is already used ?
    const isEmailRegistered = await User.findOne({ email });
    if (isEmailRegistered) throw new ApiError(409, "Email is already registered!");
    const user = await User.create({ email, password, name, role })
    return user;
}