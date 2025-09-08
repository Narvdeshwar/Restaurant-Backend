import mongoose, { Document, Model, Schema } from "mongoose";

// Step 1: Defining interface for the document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role?: string;
  isOtpVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Step 2: Define Schema with type
const userSchema: Schema<IUser> = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      select: false,
      required: true
    },
    role: {
      type: String,
      default: "user",
    },
    isOtpVerified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Step 3: create model with type
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
