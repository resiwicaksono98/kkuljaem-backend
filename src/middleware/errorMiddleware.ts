import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/responseError";

export const errorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ResponseError) {
    res.status(error.status).json({
      message: error.message
    });
  } else {
    res.status(500).json({
      message: error.message
    });
  }
};
