
import { Router, Response, NextFunction, Request } from 'express';

import { Autenticacao } from '../app/auth/auth.autenticação';

const get = Router();


interface AuthenticatedRequest extends Request {
    decodedToken?: { id: number; nome: string; email: string } | null;
  }

  const verificarTokenMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
      }
    
      const decodedToken = Autenticacao.verificarToken(token);
    
      if (!decodedToken) {
        return res.status(401).json({ message: 'Token inválido' });
      }
    
      req.decodedToken = decodedToken;
      next();
    };
    get.get('/user', verificarTokenMiddleware, (req: AuthenticatedRequest, res: Response) => {
  
        res.json({ message: 'Rota protegida', user: req.decodedToken });
      });


export default get