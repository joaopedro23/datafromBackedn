import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import authconfig from '../config/auth.config';

interface AuthRequest extends Request {
    usuario?: any;
  }

const routes = Router();


const verificarAutenticacao = (req: AuthRequest, res: Response, next: Function) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ erro: 'Token de autenticação ausente' });
  }

  try {
    
    const decoded: any = jwt.verify(token as string,  authconfig.JWT_KEY);
    req.usuario = { id: decoded.id }; 
    next();
  } catch (error) {
    return res.status(401).json({ erro: 'Token inválido' });
  }
};


routes.get('/rotaProtegida', verificarAutenticacao, (req: AuthRequest, res: Response) => {
  
  res.json({ message: 'Acesso permitido à rota protegida!', usuario: req.usuario });
});

export default routes;
