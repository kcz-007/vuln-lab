import {Request, Response, NextFunction} from "express";
import { sendError } from "../utils/response";
import { logger } from "../utils/logger";
export const validateHealthQuery = (
    req: Request, 
    res: Response, 
    next: NextFunction) => {
    const {name} = req.query;
    if (name && typeof name !== "string"){
        return sendError(res, 400, "Invalid query parameters: name must be string");
    }
    next();
}