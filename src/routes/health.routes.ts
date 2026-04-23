import { Router } from 'express';
import { getHealth } from "../controllers/health.controller";
import { asyncHandler } from '../utils/asyncHandler';
import { validateHealthQuery } from '../middlewares/validate.middleware';
import { healthQuerySchema } from '../schemas/health.schema';
import { validate } from "../middlewares/zodValidate.middleware" 
const router = Router();

router.get("/", validate(healthQuerySchema),asyncHandler(getHealth));
 
export default router;