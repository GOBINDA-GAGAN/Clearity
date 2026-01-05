import { Request, Response } from "express";

import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { Blog, IBlog } from "@/models/blog";
import { log } from "console";
type blogData = Pick<IBlog, 'title' | 'content' | 'banner' | 'status'>



const window = new JSDOM('').window
const purify = DOMPurify(window);


export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {


    const { title, content, banner, status } = req.body as blogData;

    if (!title || !content || !banner) {
      res.status(400).json({
        message: "Title, content and banner are required"
      });
      return;
    }

    const userId = req.userId;

    const clearContent = purify.sanitize(content);

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const blog = await Blog.create({
      title,
      slug,
      content: clearContent,
      banner,
      status,
      author: userId
    });

    // ✅ return full saved document
    res.status(201).json({
      success: true,
      data: blog
    });

  } catch (error) {
    console.error("❌ Error in createBlog:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};


