import { Router } from "express";
const router = Router();
import { login, register } from "../controllers/authController.js";

// Public routes
router.post("/login", login); // User login
router.post("/signup", register); // User registration

export default router;
