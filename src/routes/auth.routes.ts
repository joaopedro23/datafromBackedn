import { Router, Response } from "express";
import AuthController from "../controllers/auth.controller";

const authRoutes = Router();
const authController = new AuthController()

authRoutes.post('/login', authController.post)

export default authRoutes