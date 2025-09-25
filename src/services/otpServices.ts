import { ApiError } from "@/utils/ApiError";
import bcrypt from "bcryptjs"
import { getRedisClient } from "@/config/redisConfig"

export const otpGenerator = async () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOTP = await bcrypt.hash(otp, 10);
    return { hashedOTP, otp };
}

export const storeOTP = async (hashedOTP: string, userId: string) => {
    const client = await getRedisClient();
    if (!hashedOTP) throw new ApiError(404, "Otp is not available to store")
    if (!userId) throw new ApiError(404, "User id does not exits")
    const key = `otp:${userId}`
    await client.set(key, hashedOTP, { EX: 180 });
    console.log("set hashed otp", await client.get(key))
    return true;
}

export const verifyOTP = async (userId: string, otp: string) => {
    const client = await getRedisClient();
    if (!userId) throw new ApiError(400, "User id is required.")
    if (!otp) throw new ApiError(400, "OTP required for email verification")
    const key = `otp:${userId}`
    console.log("key", key)
    const hashedOTP = await client.get(key)
    console.log("hashed", hashedOTP)
    if (!hashedOTP) throw new ApiError(404, "OTP expired or not found")

    const isOtpMatched = await bcrypt.compare(otp, hashedOTP)
    if (!isOtpMatched) throw new ApiError(422, "OTP is invalid")
    await client.del(key)
    return true;
}