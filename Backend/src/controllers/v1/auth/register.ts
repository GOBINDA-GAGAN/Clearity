import { Request, Response } from "express";
import { User } from "@/models/user"
import { Token } from "@/models/token";
import { genCoolUserNameWithEmoji } from "@/Utils";
import config from "@/config/config"


import type { IUser } from "@/models/user";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { hashPassword } from "@/lib/hashPassword";

type userData = Pick<IUser, 'email' | 'password' | 'role'>



export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password, role } = req.body as userData;
    const username = genCoolUserNameWithEmoji();

    if (role === "admin" && config.ADMIN_EMAIL.includes(email)) {


      console.log(`this ${email} is not  for user this  is not in whitelist`);

      return res.status(403).json({
        code: "Authorization Error",
        message: "you cant register as an admin"
      })

    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role
    });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await Token.create({ token: refreshToken, userId: user._id });


    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "strict"
    });

    return res.status(200).json({
      message: "User register successfully",
      user: {
        username: user.username,
        role: user.role,
        email: user.email
      },
      accessToken
    });

  } catch (error) {
    console.error("❌ Error in registerUser Controller:", error);

    return res.status(500).json({
      success: false,
      controller: "registerUser",
      message: "Internal Server Error",
    });
  }
};

