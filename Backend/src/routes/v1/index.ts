import { Request, Response, Router } from "express";

import authRoute from "@/routes/v1/auth"
import userRoute from "@/routes/v1/user"
import blogRoute from '@/routes/v1/blog'
import likeRoutes from "@/routes/v1/like"

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const now = new Date();

  res.status(200).json({
    success: true,
    
    version: "1.0.0",
    message: "✨ Server is up and running! ✨",
    environment: process.env.NODE_ENV || "development",
    
    timestamp: now.toISOString(),
    localTime: now.toLocaleString(),
  });
});

router.use("/auth", authRoute)
router.use("/users", userRoute)
router.use("/blogs", blogRoute)
router.use('/likes',likeRoutes)


export default router;