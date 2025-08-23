import { ApiError } from "./ApiError"

export const validEntity = (name: string, label: string) => {
    if (!name || !name.trim()) {
        throw new ApiError(422, `${label} can't be empty`)
    }
}