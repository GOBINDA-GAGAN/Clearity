import { Request, Response } from "express";

import { Blog } from "@/models/blog";

import { Comment } from "@/models/comment";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

import type { IComment } from "@/models/comment";

type commentData = Pick<IComment, 'content'>


const window = new JSDOM('').window
const purify = DOMPurify(window);

export const createComment = async (req: Request, res: Response): Promise<void> => {
  try {


    const { content } = req.body as commentData
    const { blogId } = req.params
    const userId = req.userId;


    const blog = await Blog.findById(blogId).select('_id commentsCount').exec();
    if (!blog) {
      res.status(404).json({
        code: "NotFound",
        message: "Blog Not Found"
      })
      return;
    }

    const clearContent = purify.sanitize(content);

    const newComment = await Comment.create({
      blogId, content: clearContent, userId
    })

    blog.commentsCount++
    await blog.save();

    res.status(200).json({
      code: 'success',
      message: "create commment successfully",
      comment: newComment,
      commentCount: blog.commentsCount
    })
    return;

  } catch (error) {
    console.error("❌ Error in  createComment Controller:", error);

    res.status(500).json({
      success: false,
      controller: "create Comment",
      message: "Internal Server Error",
    });
    return;
  }
};
