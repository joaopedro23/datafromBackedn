import express, { Request, Response } from "express";
import { EmailAuthenticationStrategy, TokenVerificationStrategy } from "../design_patterns/behavioral/strategy/index";
import AuthControllerTeste from "../controllers/email.teste.controller";
import { ValidarEmail } from "../database/LoginDb/Db.login";

const strategy = express.Router();
const validarEmail = new ValidarEmail();
const emailAuthenticationStrategy = new EmailAuthenticationStrategy(validarEmail);
const tokenVerificationStrategy = new TokenVerificationStrategy();
const authController = new AuthControllerTeste(emailAuthenticationStrategy, tokenVerificationStrategy);

// Rota para o login
strategy.post("/login-strategy", async (req: Request, res: Response) => {
    await authController.login(req, res);
});

// Rota para verificar o token
strategy.get("/verify-token-strategy", async (req: Request, res: Response, next) => {

    await authController.verifyToken(req, res, next);
    res.json({ message: 'Rota protegida', user: req.decodedToken });
});




export default strategy;
