import { Request, Response, NextFunction } from 'express';
import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

// Função para buscar a versão do PostgreSQL
export async function getPostgresVersionMid(req: Request, res: Response, next: NextFunction) {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL não está definida');
    }

    const sql = postgres(databaseUrl, { ssl: 'require' });
    const version = await sql`select version()`;
    console.log('Versão do PostgreSQL:', version);
    res.json({ version }); // Retorna a versão do PostgreSQL como resposta 
  } catch (error) {
    console.error('Erro ao buscar a versão do PostgreSQL:', error);
    res.status(500).json({ error: 'Erro ao buscar a versão do PostgreSQL' });
  }
}
