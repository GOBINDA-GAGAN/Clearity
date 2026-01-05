import config from "@/config/config";
import { Blog } from "@/models/blog";
import { User } from "@/models/user";
import { Request, Response } from "express";

interface Querytype {
    status?: 'draft' | 'published'
}
export const getBlogByUser = async (req: Request, res: Response): Promise<void> => {
        try {

            const userId=req.params.userId;
            const currentUserId = req.userId;
            const limit = parseInt(req.query.limit as string) ?? config.defaultResLimit
            const offset = parseInt(req.query.offset as string) ?? config.defaultResOffset;
            const currentUser = await User.findById(currentUserId).select('role').lean().exec();
            const query: Querytype = {}
            if (currentUser?.role === 'user') {
                query.status = 'published'
            }
            const total = await Blog.countDocuments({author:userId,...query});
    
            const allBlogs = await Blog.find({author:userId,...query})
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
            console.error("❌ Error in getblogbyuser:", error);
    
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
};


