import config from "@/config/config";
import { Blog } from "@/models/blog";
import { User } from "@/models/user";
import { Request, Response } from "express";


export const getBlogBySlug = async (req: Request, res: Response): Promise<void> => {
    try {

        const slug = req.params.slug;
        console.log(slug);
        
        if (!slug) {
            res.status(404).json({
                code: "slug is missing",
                message: "Slug must be required"
            })
            return;
        }
        const userId = req.userId;
        const user = await User.findById(userId).select('role').lean().exec();

        const blogs = await Blog.findOne({ slug })
            .select("-banner.publicId -__v")
            .populate('author', '-createdAt -updatedAt -__v -firstName -lastName -socialLinks')
            .sort({ createdAt: -1 }).lean().exec()

        if (!blogs) {
            res.status(404).json({
                code: "not found",
                message: " No blog found"
            })
            return;
        }

        if (user?.role === "user" && blogs?.status === "draft") {
            res.status(403).json({
                code: "AuthorizationError",
                message: " Access "
            })
        }
        res.status(201).json({
            success: true,
            data: blogs
        });
        return;

    } catch (error) {
        console.error("❌ Error in get blog by slug:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


