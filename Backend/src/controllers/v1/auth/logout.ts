import { Request, Response } from "express";
import config from "@/config/config";
import { Token } from "@/models/token";


export const logoutUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const refreshToken = req.cookies.refreshToken as string;

    if (refreshToken) {
      await Token.deleteOne({ token: refreshToken });
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "strict"
    });

    return res.status(200).json({
      success: true,
      message: "User logout successfully"
    });

  } catch (error) {
    console.error("❌ Error in logoutUser Controller:", error);

    return res.status(500).json({
      success: false,
      controller: "logoutUser",
      message: "Internal Server Error"
    });
  }
};
