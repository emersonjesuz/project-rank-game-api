import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/apiErros";

export const errorMiddleware = async (
  err: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode ?? 500;

  if (
    statusCode === 401 ||
    err.message === "invalid token" ||
    err.message === "invalid signature"
  ) {
    return res.status(401).json({ message: "Não altorizado!" });
  }

  if (statusCode === 500) {
    return res.status(500).json({ message: "Erro interno do servidor!" });
  }

  if (statusCode === 5000) {
    return res.status(500).json({ message: err.message });
  }

  return res.status(statusCode).json({ message: err.message });
};
