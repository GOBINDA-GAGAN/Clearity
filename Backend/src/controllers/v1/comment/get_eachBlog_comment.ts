import { Request, Response } from "express";
import { Blog } from "@/models/blog";
import { Comment } from "@/models/comment";



export const getCommentByBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { blogId } = req.params
    const blog = await Blog.findById(blogId).select('commentsCount').exec();
    if (!blog) {
      res.status(404).json({
        code: "NotFound",
        message: "Blog Not Found"
      })
      return;
    }

    const allComments = await Comment.find({ blogId })
      .sort({ createdAt: -1 })
      .select('-createdAt -updatedAt -__v')
      .lean();

    res.status(200).json({
      code: "success",
      message: "fetch comment by blog successfully",
      allComments: allComments   // MUST be array
    });

    return;

  } catch (error) {
    console.error("❌ Error in  getCommentByBlog Controller:", error);

    res.status(500).json({
      success: false,
      controller: "get comment by blog  Comment",
      message: "Internal Server Error",
    });
    return;
  }
};
