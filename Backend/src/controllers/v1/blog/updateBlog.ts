import { Request, Response } from "express";

import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { Blog, IBlog } from "@/models/blog";
import { User } from "@/models/user";
type blogData = Partial<Pick<IBlog, 'title' | 'content' | 'banner' | 'status'>>



const window = new JSDOM('').window
const purify = DOMPurify(window);


export const updateBlog = async (req: Request, res: Response): Promise<void> => {
    try {


        const { title, content, banner, status } = req.body as blogData;

        if (!title || !content || !banner) {
            res.status(400).json({
                message: "Title, content and banner are required"
            });
            return;
        }

        const userId = req.userId;
        const blogId = req.params.blogId;
        const user = await User.findById(userId).select('role').lean().exec();
        const blog = await Blog.findById(blogId).select('-__v').exec();

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
                message: 'Access denied gggg'
            })
            return;
        }

        if(title) blog.title=title;
        if(content){
            const clearContent = purify.sanitize(content);
            blog.content=clearContent;

        }
        if(banner) blog.banner=banner;
        if(status) blog.status=status;

   

        const updateBlog = await blog.save();

    
        res.status(200).json({
            success: true,
            data: updateBlog
        });
        return

    } catch (error) {
        console.error("❌ Error in update Blog:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


