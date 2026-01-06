import { Request, Response, Router } from "express";
import { param, body, query } from "express-validator";


import { authenticate } from "@/middleware/authenticate";
// import { ValidationError } from "@/Middleware/validatorError";

import { authorize } from "@/middleware/authorize";
import { createBlog } from "@/controllers/v1/blog/createBlog";
import uploadBlogBanner from "@/middleware/uploadBlogBanner";
import multer from "multer";
import { getAllBlog } from "@/controllers/v1/blog/getAllBlog";
import { getBlogByUser } from "@/controllers/v1/blog/getBlogByUser";
import { getBlogBySlug } from "@/controllers/v1/blog/getBlogBySlug";
import { updateBlog } from "@/controllers/v1/blog/updateBlog";
import { deleteBlog } from "@/controllers/v1/blog/deleteBlog";

const upload = multer();

const router = Router();
router.post("/", authenticate, authorize(["admin", "user"]), upload.single("banner_image"), uploadBlogBanner("post"), createBlog)
router.get('/', authenticate, authorize(['admin', 'user']), getAllBlog)
router.get('/user/:userId', authenticate, authorize(['admin', 'user']), getBlogByUser)
router.get('/:slug', authenticate, authorize(['admin', 'user']), getBlogBySlug)
router.put('/:blogId', authenticate, authorize(['admin', 'user']), upload.single("banner_image"), uploadBlogBanner("put"), updateBlog)
router.delete('/:blogId', authenticate, authorize(['admin', 'user']), deleteBlog)


export default router;