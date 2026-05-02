import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/response";
import { logger } from "../utils/logger"

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.error({
        message: err.message,
        requestId: req.requestId,
        stack: err.stack,
    })
    return sendError(res, 500, err.message || "Internal Server Error");
}