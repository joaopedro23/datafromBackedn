import { Request, Response, NextFunction } from "express";
import { AuthContext } from "../design_patterns/behavioral/strategy/Context";


class AuthControllerTeste {

    private authContext: AuthContext;

    constructor(emailAuthenticationStrategy: any, tokenVerificationStrategy: any) {
        this.authContext = new AuthContext(emailAuthenticationStrategy, tokenVerificationStrategy);
    }

    async login(req: Request, res: Response): Promise<void> {
        await this.authContext.authenticateByEmail(req, res);
    }

    async verifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        await this.authContext.verifyToken(req, res, next);
    }
}

export default AuthControllerTeste;
