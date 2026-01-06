import { uploadTocloudnary } from "@/lib/uploadToCloudnary";
import { Blog } from "@/models/blog";
import type { Request, Response, NextFunction } from "express";



const Max_File_Size = 2 * 1024 * 1024  //2Mb

const uploadBlogBanner = (method: 'post' | 'put') => {
     
    return async (req: Request, res: Response, next: NextFunction) => {
       
        if (method === 'put' && !req.file) {
            next();
            return;
        }

        if (!req.file) {
            res.status(400).json({
                message: "Blog banner is required"
            });
            return;
        }
        

        if (req.file.size > Max_File_Size) {
            res.status(413).json({
                message: "File size must be less than 2MB"
            });
            return;
        }

        try {
            let oldPublicId = "";
            if (method === "put") {
                const blog = await Blog.findById(req.params.blogId)
                    .select("banner.publicId")
                    .exec();

                if (!blog) {
                    res.status(404).json({ message: "Blog not found" });
                    return;
                }

                oldPublicId = blog.banner?.publicId?.replace("blog-api/", "") ?? "";
            }
            const data = await uploadTocloudnary(req.file.buffer, oldPublicId);
            if (!data) {
                res.status(500).json({
                    message: "Cloudinary upload failed"
                });
                return;
            }

            req.body.banner = {
                publicId: data.public_id,
                url: data.secure_url,
                width: data.width,
                height: data.height
            };
            next();

        } catch (err) {
            res.status(500).json({ message: "Banner upload failed" });
        }
    };
};


export default uploadBlogBanner;