import { loginDTO, signupDTO } from "@/dto/auth.dto";
import User from "@/models/user.models";
import { ApiError } from "@/utils/ApiError";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { validEntity } from "@/utils/validEntity";
import { otpGenerator, storeOTP, verifyOTP } from "./otpServices";

export const createUser = async ({ name, email, password, role }: signupDTO) => {


    const isEmailRegistered = await User.findOne({ email });
    if (isEmailRegistered) throw new ApiError(409, "Email is already registered!");


    const user = await User.create({ email, password, name, role });

    const { hashedOTP, otp } = await otpGenerator();
    console.log("Current OTP:", otp);

    const isOtpStored = await storeOTP(hashedOTP, user._id.toString());


    if (!isOtpStored) throw new ApiError(404, "Unable to store the otp");

    return user;
};


export const VerifyUserOtp = async (userId: string, otp: string) => {
    await verifyOTP(userId, otp)
    const user = await User.findByIdAndUpdate({ _id: userId }, {
        $set: {
            isOtpVerified: true
        }
    }, { new: true })
    if (!user) throw new ApiError(404, "User not found!")
    return user

}

export const login = async ({ email, password }: loginDTO) => {
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new ApiError(404, "user doesn't exits")

    const isMatch = await bcrypt.compareSync(password, user.password)
    if (!isMatch) throw new ApiError(404, "You have entered the wrong password!")

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET || "havethiswillbeword")

    const userObj = user.toObject() as any;
    delete userObj.password;
    return userObj
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

export const deleteUser = async (id: string) => {
    const user = await User.deleteOne({ _id: id });
    if (user.deletedCount === 0) throw new ApiError(404, "User doesn't exits with associated Id");
    return true;
}