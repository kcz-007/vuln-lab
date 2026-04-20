import {Request, Response, NextFunction} from 'express';
import { getHealthStatus } from '../services/health.server';
import { sendSuccess } from '../utils/response';

export const getHealth = async(req: Request, res: Response, next: NextFunction) : Promise<void> => {
    const data = getHealthStatus();
    sendSuccess(res, data);
};