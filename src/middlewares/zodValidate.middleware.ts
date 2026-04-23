import {Request, Response, NextFunction} from "express";
import {ZodTypeAny} from "zod";
import { sendError } from "../utils/response";

export const validate = (schema: ZodTypeAny) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.query);

        if(!result.success) {
            return sendError(res, 400, result.error.message);
        }
        
        next();
    }
}