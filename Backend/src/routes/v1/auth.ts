import { loginUser } from "@/controllers/v1/auth/login";
import { logoutUser } from "@/controllers/v1/auth/logout";
import { refreshToken } from "@/controllers/v1/auth/refreshToken";
import { registerUser } from "@/controllers/v1/auth/register";
import { authenticate } from "@/middleware/authenticate";

import { validationError } from "@/middleware/validatorError";
import { User } from "@/models/user";
import { Router } from "express";
import { body, cookie } from "express-validator"

const router = Router();

router.post("/register",
  body('email').
    trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (value) => {
      const userExist = await User.exists({ email: value });
      if (userExist) {
        throw new Error("User email or password is invalid")
      }
    }),
  body("password").notEmpty().withMessage("password is required"),
  body("role").optional().isString().withMessage("Role must be a String").isIn
    (['admin', 'user']).withMessage("Role must be either admin or user"), validationError, registerUser)

router.post('/login', body('email').
  trim()
  .notEmpty()
  .withMessage('Email is required')
  .isEmail()
  .withMessage("Invalid email address"
  ),
  body("password").notEmpty().withMessage("password is required"), validationError, loginUser)


router.post('/refresh-token',  refreshToken)

router.post('/logout',authenticate, logoutUser)

export default router;