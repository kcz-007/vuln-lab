import bcrypt from "bcrypt";
import { userRepository } from "../repositories/user.repository";
import jwt from "jsonwebtoken";
import { z } from "zod";

const SALT_ROUNDS: number = 10;

export const userService = {
    async register(email: string, password: string){
        const existing = await userRepository.findByEmail(email);

        if (existing != null) {
            throw new Error("User already existed");
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await userRepository.createUser(email, hashedPassword);

        return user;
    },

    async login(email: string, password: string){
        const user = await userRepository.findByEmail(email);

        if (!user){
            throw new Error("User not found");
        }    
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            throw new Error("Invalid credentials");
        }
        return user;
    },

    async findUserById( id: number){
        const user = await userRepository.findById(id);

        if (!user){
            throw new Error("User not exist!");
        }

        return user;
    }
};