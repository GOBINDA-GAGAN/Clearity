import { Request, Response, Router } from "express";
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



export default router;