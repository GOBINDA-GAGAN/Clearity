import { Request, Response } from "express";

import { v2 as cloudinary } from "cloudinary"
import { User } from "@/models/user";
import { Blog } from "@/models/blog";
 


export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
    try {

        const userId = req.userId;
        const blogId = req.params.blogId;
        const user = await User.findById(userId).select('role').lean().exec();
        const blog = await Blog.findById(blogId).select('author banner.publicId').lean().exec();

        if (!blog) {
            res.status(404).json({
                code: "NotFound",
                message: "Blog Not Found"
            })
            return;
        }
        if (blog.author !== userId && user?.role !== 'user') {
            res.status(403).json({
                code: "AuthorizationError",
                message: 'Access denied'
            })
            return;
        }

        await cloudinary.uploader.destroy(blog.banner.publicId)

        await Blog.deleteOne({ _id: blogId })

        res.status(204).json({
            success: true,
            message: "Blog deleteed successfully"
        });
        return

    } catch (error) {
        console.error("❌ Error in delete Blog:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


