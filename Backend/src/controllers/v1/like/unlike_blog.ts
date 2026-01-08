import { Request, Response } from "express";
import { Like } from "@/models/likes";
import { Blog } from "@/models/blog";
import { log } from "console";



export const unlikeBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { blogId } = req.params;
  
    
    const userId  = req.userId;

    const existingLike = await Like.findOne({ blogId, userId }).lean().exec();

    if (!existingLike) {
      res.status(404).json({
        code: "Not found",
        message: "Like Not found"
      })
      return;
    }
    await Like.deleteOne({ _id: existingLike._id });
    const blog = await Blog.findById(blogId).select('likesCount').exec();

    if (!blog) {
      res.status(404).json({
        code: "NotFound",
        message: "Blog Not Found"
      })
      return;
    }
    blog.likesCount--;
    await blog.save()

    res.status(204).json({
      code: 'success',
      message: "unlike successfully",
      likesCount: blog.likesCount
    })
    return;

  } catch (error) {
    console.error("❌ Error in  unlike blog Controller:", error);

    res.status(500).json({
      success: false,
      controller: "unlike blog",
      message: "Internal Server Error",
    });
    return;
  }
};




