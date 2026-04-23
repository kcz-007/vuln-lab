import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/response";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(err);
    return sendError(res, 500, err.message || "Internal Server Error");
}