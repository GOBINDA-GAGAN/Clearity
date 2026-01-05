
import { Schema, model, Document } from "mongoose";

// 1️⃣ Interface for User
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  firstName?: string;
  lastName?: string;
  socialLinks?: {
    website?: string;
    facebook?: string;
    x?: string;
    youtube?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

// 2️⃣ User Schema
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: [true, "Username must be unique"],
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [20, "Username cannot exceed 20 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select:false,
      minlength: [6, "Password must be at least 6 characters"],
    },

    role: {
      type: String,
      required:[true, "Role is required"],
      enum: {
        values: ["user", "admin"],
        message: "Role must be either 'user' or 'admin'",
      },
      default: "user",
    },

    firstName: {
      type: String,
      trim: true,
      default: "",
    },

    lastName: {
      type: String,
      trim: true,
      default: "",
    },

    socialLinks: {
      website: { type: String, default: "" },
      facebook: { type: String, default: "" },
      x: { type: String, default: "" },
      youtube: { type: String, default: "" },
    },
  },
  { timestamps: true }
);



// 3️⃣ Export model
export const User = model<IUser>("User", userSchema);



