import { sql } from '../db';


export class ValidarEmail {
    async verificarExistenciaEmail(email: string, password: string): Promise<boolean> {
        try {
            const result = await sql`SELECT COUNT(*) AS count FROM registros WHERE email = ${email} AND password = ${password}`;
            
            if (result && result[0] && result[0].count !== undefined) {
                const rowCount: number = result[0].count;
                return rowCount > 0;
            } else {
                
                return false; 
            }
        } catch (error) {
            console.error('Erro ao verificar email banco de dados:', error instanceof Error ? error.message : error);
            throw error;
        }
    }
}
