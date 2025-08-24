import mongoose, { Document, Model, Schema } from "mongoose"

export interface IRestaurant extends Document {
    name: String,
    address: String,
    cuisine: String,
    rating?: Number,
    createdAt: Date,
    updatedAt: Date
}

export const restaurantSchema: Schema<IRestaurant> = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    }
})

const Restaurant: Model<IRestaurant> = mongoose.model<IRestaurant>("Restaurant", restaurantSchema)

export default Restaurant;