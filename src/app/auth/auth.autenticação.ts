import jwt from 'jsonwebtoken';
import authconfig from '../../config/auth.config';


export class Autenticacao {

  private static segredo = authconfig.JWT_KEY

  // Método para verificar token JWT
  public static verificarToken(token: string): { id: number; nome: string; email: string } | null {
    try {
      // Verifica se o token é válido
      const decoded = jwt.verify(token, Autenticacao.segredo);
      return decoded as { id: number; nome: string; email: string };
    } catch (error) {
      return null;
    }
  }
}

