import { Request, Response } from "express";
import { User } from "@/models/user"
import config from "@/config/config";
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

