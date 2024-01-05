
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import authconfig from '../config/auth.config'; // Certifique-se de importar seu arquivo de configuração de autenticação
import { ValidarEmail } from '../database/LoginDb/Db.login';


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
    
            const emailExists = await validarEmail.verificarExistenciaEmail(email, password);
    
            if (emailExists) {
                const isAdmin: boolean = email === 'admin@gmail.com' && password === '010203';
    
                const tokenData = {
                    id: 101,
                    isAdmin: isAdmin
                };
    
                const expiresIn = isAdmin ? '1h' : '24h';
    
                const generatedToken = jwt.sign(tokenData, authconfig.JWT_KEY, { expiresIn });
    
                res.json({
                    success: true,
                    token: generatedToken,
                    redirectTo: isAdmin ? '/admin' : '/client',
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