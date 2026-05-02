import { Router } from "express";
import { register,login, getUserById } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, (req, res) => {
    res.json({
        message: "Protected data",
        user: (req as any).user
    });
});

router.get("/:id", authMiddleware, getUserById);
export default router;