import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { timeStamp } from "node:console";

export const requestLogger = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const start = Date.now();

    res.on("finish", ()=> {
        const duration = Date.now() - start;
        let level = "info";
        if (res.statusCode >= 500) {
            level = "error";
        } else if (res.statusCode >= 400){
            level = "warn";
        }
        req.logger.log(level, {
            message: "HTTP Request",
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration,
        })
    });

    next();
}

