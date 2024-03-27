import { ValidarEmail } from "../database/LoginDb/Db.login";
import { EmailAuthenticationStrategy, TokenVerificationStrategy } from "../design_patterns/behavioral/strategy/strategies/email/email.strategy";
import { NextFunction, Response } from "express";

export default class AuthController {
    private emailAuthenticationStrategy: EmailAuthenticationStrategy;
    private tokenVerificationStrategy: TokenVerificationStrategy;

    constructor(validarEmail: ValidarEmail) {
        this.emailAuthenticationStrategy = new EmailAuthenticationStrategy(validarEmail);
        this.tokenVerificationStrategy = new TokenVerificationStrategy();
    }

    public async post(req: any, res: Response): Promise<void> {
        try {
            await this.emailAuthenticationStrategy.authenticate(req, res);
        } catch (error) {
            console.error(
                "Erro ao verificar email controller:",
                error instanceof Error ? error.message : error
            );
            res.status(500).json({
                success: false,
                code: "dd101_API_ERRO",
                message: "Internal server error",
            });
        }
    }

    public async verifyToken(req: any, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.tokenVerificationStrategy.authenticate(req, res, next);
        } catch (error) {
            console.error(
                "Erro ao verificar token:",
                error instanceof Error ? error.message : error
            );
            res.status(500).json({
                success: false,
                code: "dd101_API_ERRO",
                message: "Internal server error",
            });
        }
    }
}