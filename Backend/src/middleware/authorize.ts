import { User } from "@/models/user";


import { NextFunction, Request, Response } from "express";

export type AuthRole = 'admin' | 'user';
export const authorize = (roles: AuthRole[]) => {

  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    try {
      const user = await User.findById(userId).select('role').exec();
      if (!user) {
        res.status(404).json({
          code: "Not found",
          Message: "User Not found"
        })
        return;
      }

      if (!roles.includes(user.role)) {
        res.status(403).json({
          code: "AuthorizationError",
          Message: "Access denied,"
        })
        return;
      }
      return next();
    } catch (error) {
      res.status(500).json({
        code: 'serverError',
        message: "Internal sever error",
        error: error,
      })
    }
  }
}
