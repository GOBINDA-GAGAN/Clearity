import { Request, Response } from "express";
import { User } from "@/models/user"
import { hashPassword } from "@/lib/hashPassword";


export const updateCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const {
      userName,
      email,
      password,
      firstName,
      lastName,
      website,
      facebook,
      x,
      youtube
    } = req.body;


    const user = await User.findById(userId).select('-__V +password').exec();
    if (!user) {
      res.status(404).json({
        code: "Not found",
        Message: "User Not found"
      })
      return;
    }
    const newHashPassword: string = await hashPassword(password);
    if (userName) user.username = userName;
    if (email) user.email = email;
    if (password) user.password = newHashPassword;
    if (firstName) user.firstName = firstName
    if (lastName) user.lastName = lastName;
    if (!user.socialLinks) {
      user.socialLinks = {}
    }
    if (website) user.socialLinks.website = website;
    if (x) user.socialLinks.x = x;
    if (youtube) user.socialLinks.youtube = youtube;
    if (facebook) user.socialLinks.facebook = facebook;

    const updatedUser = await user.save();
    res.status(200).json({
      user: updatedUser
    })

  } catch (error) {
    console.error("❌ Error in updateCurrentUser Controller:", error);

    res.status(500).json({
      success: false,
      controller: "registerUser",
      message: "Internal Server Error",
    });
    return;
  }
};

