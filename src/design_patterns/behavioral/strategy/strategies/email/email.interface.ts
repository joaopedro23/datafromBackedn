// AuthStrategy.ts
import { NextFunction, Response } from "express";
export interface AuthStrategy {
    authenticate(req: any, res: Response, next: NextFunction): Promise<void>;
}

interface EmailVerificationStrategy {
    verificarExistenciaEmail(email: string, password: string): Promise<{ success: boolean, user?: any }>;
}


