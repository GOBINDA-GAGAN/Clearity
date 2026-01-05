import { IUser } from "@/models/user";
import bcrypt from "bcryptjs"
import { Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { User } from "@/models/user"
import config from "@/config/config"
import { Token } from "@/models/token";


type userData = Pick<IUser, 'email' | 'password'>


export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body as userData;
    const user = await User.findOne({ email }).select('username email password role').lean().exec();
    if (!user) {
      return res.status(404).json({
        code: "NotFound",
        message: "User is not found"
      })
    }


   
    
    const comparePassword = await bcrypt.compare(password,user.password);

    if (!comparePassword) {
      return res.status(404).json({
        code: "NotFound",
        message: "Invalid credentials"
      })
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await Token.create({ token: refreshToken, userId: user._id });


    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "strict"
    });

    return res.status(200).json({
      message: "User login successfully",
      user: {
        username: user.username,
        role: user.role,
        email: user.email
      },
      accessToken
    });


  } catch (error) {
    console.error("❌ Error in loginUser Controller:", error);
    return res.status(500).json({
      success: false,
      controller: "loginUser",
      message: "Internal Server Error",
    });
  }
};