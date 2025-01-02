import { Router } from "express";
const router = Router();
import { getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

// Protected routes
router.get("/profile", requireAuth, getUserProfile); // Get logged-in user's profile
router.put("/profile", requireAuth, updateUserProfile); // Update logged-in user's profile

export default router;
