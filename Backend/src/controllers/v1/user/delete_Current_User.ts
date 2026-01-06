import { Request, Response } from "express";
import { User } from "@/models/user"
import { v2 as cloudinary } from "cloudinary"
import { Blog } from "@/models/blog";



export const deleteCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const blogs = await Blog.find({ author: userId }).select('banner.publicId').lean().exec();

    const publicIds = blogs.map(({ banner }) => banner.publicId);
    await cloudinary.api.delete_resources(publicIds);
    await Blog.deleteMany({ author: userId });

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

