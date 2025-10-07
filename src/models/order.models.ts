import mongoose, { Document, Schema, Model } from "mongoose";

interface Iorder extends Document {
    userId: mongoose.Types.ObjectId,
    restaurantId: mongoose.Types.ObjectId,
    items: {
        name: string,
        price: number,
        quantity: number
    }[],
    totalPrice: number,
    status?: "pending" | "confirmed" | "preparing" | "delivered" | "cancelled",
    createdAt: Date,
    deletedAt: Date
}

const OrderSchema: Schema<Iorder> = new mongoose.Schema({
    userId: { type: Schema.ObjectId, ref: "User", required: true },
    restaurantId: { type: Schema.ObjectId, ref: "Restaurant", required: true },
    items: [{
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "confired", "preparing", "delivered", "cancelled"],
        default: "pending"
    }
}, { timestamps: true })

const Order: Model<Iorder> = mongoose.model<Iorder>("Order", OrderSchema)

export default Order;