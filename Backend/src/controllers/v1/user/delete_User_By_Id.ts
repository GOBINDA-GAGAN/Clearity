import { Request, Response } from "express";
import { User } from "@/models/user"
import { Blog } from "@/models/blog";
import { v2 as cloudinary } from "cloudinary"

export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId).select('-__V').lean().exec();


    const blogs = await Blog.find({ author: userId }).select('banner.publicId').lean().exec();

    const publicIds = blogs.map(({ banner }) => banner.publicId);
    await cloudinary.api.delete_resources(publicIds);
    await Blog.deleteMany({ author: userId });
    
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
    console.error("❌ Error in deleteUser_by_id Controller:", error);

    res.status(500).json({
      success: false,
      controller: "registerUser",
      message: "Internal Server Error",
    });
    return;
  }
};

