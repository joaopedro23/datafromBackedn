import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ValidarEmail } from '../../database/LoginDb/Db.login';
import authconfig from '../../config/auth.config';
import { Autenticacao } from '../../app/auth/auth.autenticação';



export default class AuthControllerFile {
    private validarEmail: ValidarEmail;

    constructor() {
        try {
            this.validarEmail = new ValidarEmail();
        } catch (error) {
            throw error;
        }
    }

    public async post(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body.userData;

            const emailExists = await this.validarEmail.verificarExistenciaEmail(email, password);

            if (emailExists.success) {
                const isAdmin: boolean = email === 'admin@gmail.com' && password === '010203';
                const tokenData = {
                    id: emailExists.user.id,
                    isAdmin: isAdmin,
                    username: emailExists.user.username
                };
                const expiresIn = isAdmin ? '1h' : '24h';
                const generatedToken = jwt.sign(tokenData, authconfig.JWT_KEY, { expiresIn });
                const userId = emailExists.user.id;

                const decodedToken = Autenticacao.verificarToken(generatedToken);

                if (!decodedToken || decodedToken.id !== userId) {
                    res.status(401).json({
                        success: false,
                        code: 'dd101_API_ERRO',
                        message: 'Token verification failed'
                    });
                    return;
                }

                req.decodedToken = decodedToken;
                req.userId = userId;

                res.header('Authorization', `Bearer ${generatedToken}`);
                res.header('User-Id', userId);

                res.json({
                    success: true,
                    token: generatedToken,
                    redirectTo: isAdmin ? '/admin' : '/client',
                    username: tokenData.username,
                    message: "Login successful"
                });
            } else {
                res.status(401).json({
                    success: false,
                    code: "dd101_API_ERRO",
                    message: 'Invalid credentials'
                });
            }
        } catch (error) {
            console.error('Erro ao verificar email controller:', error instanceof Error ? error.message : error);
            res.status(500).json({
                success: false,
                code: "dd101_API_ERRO",
                message: 'Internal server error'
            });
        }
    }
}
