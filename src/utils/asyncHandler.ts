import { Request, Response, NextFunction} from "express";
import { logger } from "./logger";

export const asyncHandler = (
    fn: (req: Request, res:Response, next: NextFunction) => Promise<void>
) => {
    return(req: Request, res:Response, next:NextFunction) =>{
        Promise.resolve(fn(req,res,next)).catch(next);
    } ;
};