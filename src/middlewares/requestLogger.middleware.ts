import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const requestLogger = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const start = Date.now();

    res.on("finish", ()=> {
        const duration = Date.now() - start;
        if(res.statusCode >= 500){
             logger.error(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
        } else if (res.statusCode >= 400){
             logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
        } else{
            logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
        }
    });
    next();
}