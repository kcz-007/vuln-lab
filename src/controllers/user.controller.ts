import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { sendSuccess } from "../utils/response";
import { userRepository } from "../repositories/user.repository";
import jwt from "jsonwebtoken";
import { z } from "zod";

export const register = async(req: Request, res: Response) => {
    const {email, password} = req.body;
    const user = await userService.register(email, password);

    sendSuccess(res, user, "User Created");
}

export const login = async(req: Request, res: Response) => {
    const{ email, password } = req.body;
    const user = await userService.login(email, password);

    const token = jwt.sign(
        {userId: user.id},
        process.env.JWT_SECRET as string,
        {expiresIn: "1d"},
    )
    sendSuccess(res, {user,token}, "login success");
}

export const getUserById = async(req: Request, res: Response) => {
    const paramSchema = z.object({
        id: z.coerce.number().int().positive(),
    });
    const { id } = paramSchema.parse(req.params);
    const user = await userService.findUserById(id)

    sendSuccess(res, user, "query success!");
}