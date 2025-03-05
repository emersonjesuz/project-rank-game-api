import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomErrors";

export const errorMiddleware = async (
  err: Error & Partial<CustomError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode ?? 500;

  return res.status(statusCode).json({
    message: err.message,
    timestamp: err.timestamp,
    statusCode: err.statusCode,
  });
};
