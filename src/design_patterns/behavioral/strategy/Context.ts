import { Request, Response, NextFunction } from "express";
import { AuthStrategy } from "./strategies/email/email.interface";
import { EmailAuthenticationStrategy, TokenVerificationStrategy } from "../strategy/index";

export class Context {
    private authenticationStrategy: AuthStrategy;

    constructor(strategy: AuthStrategy) {
        this.authenticationStrategy = strategy;
    }

    public async executeAuthentication(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.authenticationStrategy.authenticate(req, res, next);
        } catch (error) {
            console.error("Error during authentication:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
}
export class AuthContext {
    private emailAuthenticationStrategy: EmailAuthenticationStrategy;
    private tokenVerificationStrategy: TokenVerificationStrategy;

    constructor(emailAuthenticationStrategy: EmailAuthenticationStrategy, tokenVerificationStrategy: TokenVerificationStrategy) {
        this.emailAuthenticationStrategy = emailAuthenticationStrategy;
        this.tokenVerificationStrategy = tokenVerificationStrategy;
    }

    // Método para autenticar por email
    public async authenticateByEmail(req: any, res: Response): Promise<void> {
        await this.emailAuthenticationStrategy.authenticate(req, res);
    }

    // Método para verificar o token
    public async verifyToken(req: any, res: Response, next: NextFunction): Promise<void> {
        await this.tokenVerificationStrategy.authenticate(req, res, next);
    }
}