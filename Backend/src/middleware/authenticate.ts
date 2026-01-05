import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { verifyAccessToken } from "@/lib/jwt"
import type { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;


  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      code: "AuthenticationError",
      message: "Access denied, no token provided",
    });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const jwtPayload = verifyAccessToken(token) as { userId: Types.ObjectId };

    req.userId = jwtPayload.userId;
    next();
  } catch (error) {
    res.status(401).json({
      code: "AuthenticationError",
      message: "Invalid or expired token",
    });
  }
};