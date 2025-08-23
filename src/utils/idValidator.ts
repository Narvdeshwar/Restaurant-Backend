import mongoose from "mongoose"
import { ApiError } from "./ApiError"

export const idValidator = (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(422, "Invalid user Id");
}