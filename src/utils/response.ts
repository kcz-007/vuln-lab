import { Response } from "express";

export const sendSuccess = (
    res: Response,
    data: unknown,
    message= "ok"
) => {
    return res.status(200).json({
        success: true,
        message,
        data,
    });
};

export const sendError = (
    res: Response,
    statusCode: number,
    error: String
) =>{
    return res.status(statusCode).json({
        success: false,
        error: error
    });
}