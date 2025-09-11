import { ApiError } from "@/utils/ApiError";
import bcrypt from "bcryptjs"
import redis from "@/config/redisConfig"

export const otpGenerator = async () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("OTP generated", otp);
    const hashedOTP = await bcrypt.hash(otp, 10);
    return { hashedOTP, otp };
}

export const storeOTP = async (hashedOTP: string, userId: string) => {
    if (!hashedOTP) throw new ApiError(404, "Otp is not available to store")
    if (!userId) throw new ApiError(404, "User id does not exits")
    const key = `otp:${userId}`
    await redis.set(key, hashedOTP, { EX: 240 });
    return true;
}

export const verifyOTP = async (otp: string, userId: string) => {
    if (!userId) throw new ApiError(400, "User id is required.")
    if (!otp) throw new ApiError(400, "OTP required for email verification")

    const key = `otp:${userId}`
    const hashedOTP = await redis.get(key)
    if (!hashedOTP) throw new ApiError(404, "Either OTP is expired or time exceed")

    const isOtpMatched = await bcrypt.compare(otp, hashedOTP)
    if (!isOtpMatched) throw new ApiError(422, "OTP is invalid")

    await redis.del(key)
    return true;
}