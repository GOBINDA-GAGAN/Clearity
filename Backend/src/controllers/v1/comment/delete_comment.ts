import { Request, Response } from "express";
import { Blog } from "@/models/blog";

import { User } from "@/models/user";
import { Comment } from "@/models/comment";


export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { commentId } = req.params
    const currentUserId = req.userId;
    const comment = await Comment.findById(commentId).select('userId blogId').exec();
    const user = await User.findById(currentUserId).select('role').lean().exec()
    if (!comment) {
      res.status(404).json({
        code: "NotFound",
        message: "comment not found"
      })
      return;
    }

    // some code here for auth i can do latter



    const blog = await Blog.findById(comment.blogId).select('commentsCount').exec()
    if (!blog) {
      res.status(404).json({
        code: "NotFound",
        message: "Blog Not Found"
      })
      return;
    }
    await comment.deleteOne();

    if (blog) {
      blog.commentsCount--;
      await blog.save();
    }

    res.status(200).json({
      code: 'success',
      message: "delete comment successfully",

    })
    return;

  } catch (error) {
    console.error("❌ Error in  deleteComment Controller:", error);

    res.status(500).json({
      success: false,
      controller: "create Comment",
      message: "Internal Server Error",
    });
    return;
  }
};
