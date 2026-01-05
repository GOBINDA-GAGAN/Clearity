import { Request, Response } from "express";
import { User } from "@/models/user"

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    console.log(userId);
    
    const user = await User.findById(userId).select('-__V').lean().exec();
    if (!user) {
      res.status(404).json({
        code: "Not found",
        Message: "User Not found"
      })
      return;
    }
    res.status(200).json({
      user
    })

  } catch (error) {
    console.error("❌ Error in getCurrentUser Controller:", error);

    res.status(500).json({
      success: false,
      controller: "registerUser",
      message: "Internal Server Error",
    });
    return;
  }
};

