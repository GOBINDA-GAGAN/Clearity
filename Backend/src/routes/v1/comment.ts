
import {  Router } from "express";
import { authenticate } from "@/middleware/authenticate"
import { authorize } from "@/middleware/authorize"
import { createComment } from "@/controllers/v1/comment/create_comment";
import { deleteComment } from "@/controllers/v1/comment/delete_comment";
import { getCommentByBlog } from "@/controllers/v1/comment/get_eachBlog_comment";




const router = Router();

router.post('/blog/:blogId', authenticate, authorize(['admin', 'user']),  createComment)
router.delete('/:commentId', authenticate, authorize(['admin', 'user']), deleteComment)
router.get('/blog/:blogId', authenticate, authorize(['admin', 'user']), getCommentByBlog)

export default router;