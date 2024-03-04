import { Router, Response, NextFunction, Request } from 'express';
import { Autenticacao } from '../app/auth/auth.autenticação';


export interface AuthenticatedRequest extends Request {
  decodedToken?: { id: number; nome: string; email: string } | null;
}

const verificaRoutes = Router();

// separa mantendo boas praticas e refatora tudo//

export const verificarTokenMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Token recebido:', token);

  if (!token) {
    console.log('Token não fornecido');
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const decodedToken = Autenticacao.verificarToken(token);
  console.log('Token decodificado:', decodedToken);

  if (!decodedToken) {
    console.log('Token inválido');
    return res.status(401).json({ message: 'Token inválido' });
  }
  
  req.decodedToken = decodedToken;
  next();
};

verificaRoutes.get('/rota-protegida', verificarTokenMiddleware, (req: AuthenticatedRequest, res: Response) => {

  res.json({ message: 'Rota protegida', user: req.decodedToken });
});

export default verificaRoutes;
