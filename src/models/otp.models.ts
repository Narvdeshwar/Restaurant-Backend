import mongoose, { Model, Schema } from "mongoose";

export interface IOtp extends Document {
    userId: mongoose.Types.ObjectId;
    otpHash: string,
    expiresAt: Date
}

const otpSchema: Schema<IOtp> = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    otpHash: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
}, { timestamps: true })

// Auto delete expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const OTP: Model<IOtp> = mongoose.model<IOtp>("OTP", otpSchema)

export default OTP;