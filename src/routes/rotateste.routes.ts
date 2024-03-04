import { Router, Response } from "express";
import { AuthenticatedRequest, verificarTokenMiddleware } from "./rotaProtegida.routes";


const rotateste = Router()

rotateste.get('/rota-teste', verificarTokenMiddleware, async (req: AuthenticatedRequest, res: Response) => {

      res.status(500).json({ message: 'Erro ao processar a requisição' });
    
  });

export  default rotateste;