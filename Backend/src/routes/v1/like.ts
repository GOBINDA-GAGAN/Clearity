import {  Router } from "express";
import { authenticate } from "@/middleware/authenticate"
import { authorize } from "@/middleware/authorize"
import { likeBlog } from "@/controllers/v1/like/like_blog";
import { unlikeBlog } from "@/controllers/v1/like/unlike_Blog";


const router = Router();

router.post('/blog/:blogId', authenticate, authorize(['admin', 'user']),  likeBlog)
router.delete('/blog/:blogId', authenticate, authorize(['admin', 'user']), unlikeBlog)

export default router;