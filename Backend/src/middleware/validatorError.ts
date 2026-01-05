import { validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

export const validationError = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      code: "validationError",
      errors: errors.mapped()
    });
    return; 
  }

  next();
};
