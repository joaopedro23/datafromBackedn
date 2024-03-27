import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { ValidarEmail } from "../../../../../database/LoginDb/Db.login";
import { Autenticacao } from "../../../../../app/auth/auth.autenticação";
import { AuthStrategy } from "./email.interface";
import authconfig from "../../../../../config/auth.config";

const JWT_KEY = authconfig.JWT_KEY;

export class EmailAuthenticationStrategy implements AuthStrategy {
    private validarEmail: ValidarEmail;

    constructor(validarEmail: ValidarEmail) {
        this.validarEmail = validarEmail;
    }

    public async authenticate(req: any, res: Response): Promise<void> {
        const { email, password } = req.body.userData;
    
        // Verificar se o email existe no banco de dados
        const emailExists = await this.validarEmail.verificarExistenciaEmail(email, password);
    
        if (emailExists.success) {
            // Verificar se é um administrador
            if (email === "admin@gmail.com" && password === "010203") {
                const isAdmin: boolean = email === "admin@gmail.com" && password === "010203";
    
                // Se for administrador, gerar token JWT com marca de administrador
                const tokenData = {
                    id: emailExists.user.id,
                    
                    nome: emailExists.user.nome, // Substitua "nome" pelo nome real do campo no seu objeto de usuário
                    email: emailExists.user.email 
                };
                const token = jwt.sign(tokenData, JWT_KEY, { expiresIn: '1h' });
                                res.setHeader('Authorization', `Bearer ${token}`);  
                // Retornar sucesso com token gerado
                res.status(200).json({ success: true, message: 'Usuário logado com sucesso!', token });
            } else {
                // Se não for administrador, marcar como cliente
                const tokenData = {
                    id: emailExists.user.id,
                    
                    nome: emailExists.user.nome, // Substitua "nome" pelo nome real do campo no seu objeto de usuário
                    email: emailExists.user.email 
                };
                const token = jwt.sign(tokenData, JWT_KEY, { expiresIn: '1h' });
                res.setHeader('Authorization', `Bearer ${token}`);
                // Retornar sucesso com token gerado
                res.status(200).json({ success: true, message: 'Usuário logado como cliente!', token });
            }
        } else {
            // Se email não existir, retornar erro
            res.status(401).json({ success: false, message: 'E-mail ou senha inválidos!' });
        }
    }
}    

export class TokenVerificationStrategy implements AuthStrategy {
    public async authenticate(req: any, res: Response, next: NextFunction): Promise<void> {
        const token = req.headers.authorization?.split(" ")[1];

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
        }
    }
}
