import { Request, Response } from "express";
import { Like } from "@/models/likes";
import { Blog } from "@/models/blog";



export const unlikeBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { blogId } = req.params
    console.log(blogId);

    
    res.status(200).json({
      code: 'success',
      message: "unLike successfully",
     

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




