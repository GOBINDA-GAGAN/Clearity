import { Request, Response } from "express";
import { User } from "@/models/user"
import config from "@/config/config";



export const likeBlog = async (req: Request, res: Response): Promise<void> => {
  try {

    const limit = parseInt(req.query.limit as string) ?? config.defaultResLimit
    const offset = parseInt(req.query.offset as string) ?? config.defaultResOffset;
    const users = await User.find().select("-password -__v ").limit(limit).skip(offset).lean().exec();
    const total = await User.countDocuments();


    if (users.length === 0) {
      res.status(404).json({
        code: "not found",
        message: " No User ddd found"
      })
      return;
    }

    res.status(202).json({
      total,
      offset, limit, users
    })

  } catch (error) {
    console.error("❌ Error in  like blog Controller:", error);

    res.status(500).json({
      success: false,
      controller: "registerUser",
      message: "Internal Server Error",
    });
    return;
  }
};
export const unlikeBlog = async (req: Request, res: Response): Promise<void> => {
  try {

    const limit = parseInt(req.query.limit as string) ?? config.defaultResLimit
    const offset = parseInt(req.query.offset as string) ?? config.defaultResOffset;
    const users = await User.find().select("-password -__v ").limit(limit).skip(offset).lean().exec();
    const total = await User.countDocuments();


    if (users.length === 0) {
      res.status(404).json({
        code: "not found",
        message: " No User ddd found"
      })
      return;
    }

    res.status(202).json({
      total,
      offset, limit, users
    })

  } catch (error) {
    console.error("❌ Error in  like blog Controller:", error);

    res.status(500).json({
      success: false,
      controller: "registerUser",
      message: "Internal Server Error",
    });
    return;
  }
};

