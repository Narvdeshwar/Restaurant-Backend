import mongoose, { Document, Schema, Model } from "mongoose"

export interface IMenuSchema extends Document {
    RestaurantId: mongoose.Types.ObjectId;
    title: string;
    items: {
        name: string;
        price: number;
        description?: string;
        isAvailable: boolean
    }[],
    createdAt: Date;
    updatedAt: Date;
}

const menuSchema: Schema<IMenuSchema> = new mongoose.Schema({
    RestaurantId: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    items: [
        {
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true,
            },
            description: {
                type: String,

            },
            isAvailable: {
                type: Boolean,
                default: true
            }
        }
    ]
})

const Menu: Model<IMenuSchema> = mongoose.model<IMenuSchema>("Menu", menuSchema)
export default Menu;