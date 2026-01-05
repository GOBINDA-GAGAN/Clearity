import { Request, Response } from "express";

import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { Blog, IBlog } from "@/models/blog";
import { log } from "console";
import config from "@/config/config";
import { User } from "@/models/user";
type blogData = Pick<IBlog, 'title' | 'content' | 'banner' | 'status'>



const window = new JSDOM('').window
const purify = DOMPurify(window);


interface Querytype {
    status?: 'draft' | 'published'
}
export const getAllBlog = async (req: Request, res: Response): Promise<void> => {


    try {
        const userId = req.userId;
        const limit = parseInt(req.query.limit as string) ?? config.defaultResLimit
        const offset = parseInt(req.query.offset as string) ?? config.defaultResOffset;
        const user = await User.findById(userId).select('role').lean().exec();
        const query: Querytype = {}
        if (user?.role === 'user') {
            query.status = 'published'
        }
        const total = await Blog.countDocuments(query);

        const allBlogs = await Blog.find(query)
            .select("-banner.publicId -__v")
            .populate('author', '-createdAt -updatedAt -__v -firstName -lastName -socialLinks').limit(limit)
            .skip(offset).sort({ createdAt: -1 }).lean().exec()

        // if (allBlogs.length === 0) {
        //     res.status(404).json({
        //         code: "not found",
        //         message: " No blog found"
        //     })
        // }
        res.status(201).json({
            success: true,
            limit,
            total,
            offset,
            data: allBlogs
        });
        return;

    } catch (error) {
        console.error("❌ Error in createBlog:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


