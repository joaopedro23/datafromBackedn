import { Request, Response } from 'express';
import { generateUUID } from '../core/uuid4/generateUuis4.core'; // Verifique o caminho correto do seu arquivo
import jwt from 'jsonwebtoken';
import authconfig from '../config/auth.config';
import { inserirRegistro } from '../database/registreDb/Db.registre';


interface UserData {
  username: string;
  email: string;
  password: string;
}

interface Registro {
  id: string;
  username: string;
  email: string;
  password: string;
}



export default class RegistroController {
public async post(req: Request, res: Response): Promise <void> {
  try {
    const { userData }: { userData: UserData } = req.body;

    if (!userData || !userData.username || !userData.email || !userData.password) {
    res.status(400).json({ error: 'Por favor, forneça username, email e password.' });
    return;
    }

    const { username, email, password } = userData;
    // verifca usuario existente

// verifca usuario existente
    const id: string = generateUUID(); 

    const novoRegistro: Registro = {
        id,
        username,
        email,
        password 
    }
    // Adiciona o novo usuário na lista de usuários
    const registroInserido = new inserirRegistro();

    await registroInserido.creatRegistre(novoRegistro);

    const tokenRegistro = jwt.sign(
      { id, username, email, password },
      authconfig.JWT_KEY,
      { expiresIn: '1m' }
    );
      
      res.status(201).json({token: tokenRegistro, novoRegistro, redirectTo:'/client'});
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao inserir registro' });
      }
} 
 // Adiciona o novo usuário na lista de usuários
}
