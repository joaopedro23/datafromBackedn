import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import authconfig from "../config/auth.config";
import { ValidarEmail } from "../database/LoginDb/Db.login";
import { Autenticacao } from "../app/auth/auth.autenticação";


    export default class AuthController {
    private validarEmail: ValidarEmail;

    constructor() {
        try {
        this.validarEmail = new ValidarEmail();
        } catch (error) {
        throw error;
        }
    }

    public async post(req: any, res: Response): Promise<void> {
        try {
        const { email, password } = req.body.userData;

        const validarEmail = new ValidarEmail();

        const emailExists = await validarEmail.verificarExistenciaEmail(
            email,
            password
        );

        if (emailExists.success) {
            const isAdmin: boolean =
            email === "admin@gmail.com" && password === "010203";
            const tokenData = {
            id: emailExists.user.id,
            isAdmin: isAdmin,
            username: emailExists.user.username,
            };
            const expiresIn = isAdmin ? "1h" : "24h";
            const generatedToken = jwt.sign(tokenData, authconfig.JWT_KEY, {
            expiresIn,
            });
            const userId = emailExists.user.id;

            const decodedToken = Autenticacao.verificarToken(generatedToken);

            if (!decodedToken || decodedToken.id !== userId) {
            res.status(401).json({
                success: false,
                code: "dd101_API_ERRO",
                message: "Token verification failed",
            });
            return;
            }
            req.decodedToken = decodedToken;
            req.userId = userId;
            res.header("Authorization", `Bearer ${generatedToken}`);
            res.setHeader("Access-Control-Expose-Headers", "Authorization");

            res.status(200).json({
            success: true,
            redirectTo: isAdmin ? "/admin" : `/client`,
            username: tokenData.username,
            message: "Login successful",
            });
        } else {
            res.status(401).json({
            success: false,
            code: "dd101_API_ERRO",
            message: "Invalid credentials",
            });
        }
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

    public async verifyToken(
        req: any,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const token = req.headers.authorization?.split(" ")[1];

        console.log("Cabeçalho de Autorização:", req.headers.authorization);

        if (!token) {
        res.status(401).json({
            success: false,
            code: "dd101_API_ERRO",
            message: "Token not provided",
        });
        return;
        }

        try {
        const decodedToken = Autenticacao.verificarToken(token);

        if (!decodedToken) {
            console.log("Token inválido.");
            res.status(401).json({
            success: false,
            code: "dd101_API_ERRO",
            message: "Invalid token",
            });
            return;
        }
        
        const userId = decodedToken.id;

        if (req.params.userId && req.params.userId !== userId) {
            res.status(403).json({
            success: false,
            code: "dd101_API_ERRO",
            message: "Você não tem permissão para acessar estas informações",
            });
            return;
        }

        req.decodedToken = decodedToken;
        req.userId = userId;

        res.locals.userId = userId;

        next();
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
