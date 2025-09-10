import { ApiError } from "@/utils/ApiError";
import bcrypt from "bcryptjs"
import redis from "@/config/redisConfig"

export const otpGenerator = async () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("OTP generated", otp);
    const hashedOTP = await bcrypt.hash(otp, 10);
    return hashedOTP;
}

export const storeOTP = () => {

}

export const verifyOTP = async (otp: string, userId: string) => {
    const key = `otp:${userId}`
    if (!userId) throw new ApiError(400, "User id is required.")
    if (!otp) throw new ApiError(400, "OTP required for email verification")
    const hashedOTP = await redis.get(key)
    if (!hashedOTP) throw new ApiError(404, "Either OTP is expired or time exceed")
    const isOtpMatched = await bcrypt.compare(otp, hashedOTP)
    if (!isOtpMatched) throw new ApiError(422, "OTP is invalid")
    return true;
}