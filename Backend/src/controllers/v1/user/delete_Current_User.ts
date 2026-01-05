import { Request, Response } from "express";
import { User } from "@/models/user"



export const deleteCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(404).json({
        code: "Not found",
        message: "User not found"
      })
    }
    await User.deleteOne({ _id: userId });

    res.status(202).json({
      user: " Current user delete successfully",
    })

  } catch (error) {
    console.error("❌ Error in deleteCurrentUser Controller:", error);

    res.status(500).json({
      success: false,
      controller: "registerUser",
      message: "Internal Server Error",
    });
    return;
  }
};

