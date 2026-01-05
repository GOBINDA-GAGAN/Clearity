import { Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { Token } from "@/models/token";

import { verifyRefreshToken, generateAccessToken } from "@/lib/jwt"
import { Types } from "mongoose";


export const refreshToken = async (req: Request, res: Response): Promise<Response> => {
  try {

    const refreshToken = req.cookies.refreshToken as string;

    const tokenExist = Token.exists({ token: refreshToken });
    if (!tokenExist) {
      return res.status(401).json({
        code: 'AuthenticationError',
        message: 'Invalid refreshToken'
      })
    }
    // const jwtPayload = verifyRefreshToken(refreshToken) as { userId: Types.ObjectId };
    const { valid, decoded, message } = verifyRefreshToken(refreshToken);
    if (!valid) {
      return res.status(401).json({
        message: "Invalid or expired refresh token",
        error: message
      });
    }
    const accessToken = generateAccessToken(decoded.userId);



    return res.status(200).json({ accessToken });
  } catch (error) {

    if (error instanceof TokenExpiredError) {
      return res.status(401).json({
        code: "AuthenticationError",
        message: "Refresh token TokenExpiredError,Please login again"
      })
    }

    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({
        code: "AuthenticationError",
        message: "Invalid Refresh Token"
      })
    }
    console.error("❌ Error in refreshToken Controller:", error);
    return res.status(500).json({
      success: false,
      controller: "refreshToken",
      message: "Internal Server Error",
    });
  }
};