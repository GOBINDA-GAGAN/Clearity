import { Request, Response } from "express";
import { Like } from "@/models/likes";
import { Blog } from "@/models/blog";



export const likeBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { blogId } = req.params
    console.log(blogId);

    const userId = req.userId;
    const blog = await Blog.findById(blogId).select('likesCount').exec();

    if (!blog) {
      res.status(404).json({
        code: "NotFound",
        message: "Blog Not Found"
      })
      return;
    }

    const existingLike = await Like.findOne({ blogId, userId }).lean().exec();
    if (existingLike) {
      res.status(400).json({
        code: "Bade Request",
        message: "You alredy like the blog"
      })
      return;
    }

    await Like.create({ blogId, userId });
    blog.likesCount++;
    await blog.save()

    res.status(200).json({
      code: 'success',
      message: "Like successfully",
      likesCount:blog.likesCount

    })
    return;

  } catch (error) {
    console.error("❌ Error in  like blog Controller:", error);

    res.status(500).json({
      success: false,
      controller: "like blog",
      message: "Internal Server Error",
    });
    return;
  }
};




