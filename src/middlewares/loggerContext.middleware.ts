import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const logContext = (req: Request, res: Response, next: NextFunction) => {
    req.logger = logger.child({requestId: req.requestId});

    next();
}
