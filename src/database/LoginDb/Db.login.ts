import { sql } from '../db';

export class ValidarEmail {
    async verificarExistenciaEmail(email: string, password: string): Promise<any | null> {
        try {
            const result = await sql`SELECT id, username FROM registros WHERE email = ${email} AND password = ${password}`;
            
            if (result && result.length > 0) {
                // Retorna o primeiro registro encontrado (pode haver mais de um, mas considerando apenas o primeiro aqui)
                const user = result[0];
                return {
                    success: true,
                    user: {
                        id: user.id,
                        username: user.username,
                        // Adicione outros campos desejados aqui
                    }
                };
            } else {
                return {
                    success: false,
                    message: 'Invalid credentials',
                };
            }
        } catch (error) {
            console.error('Erro ao verificar email banco de dados:', error instanceof Error ? error.message : error);
            throw error;
        }
    }
}