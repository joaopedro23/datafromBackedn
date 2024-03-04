import { Pool, QueryResult } from 'pg';
import dotenv from 'dotenv';
import { sql } from '../db';
import { generateUUID } from '../../core/uuid4/generateUuis4.core';


dotenv.config();

interface Registro {
    id: string;
    username: string;
    email: string;
    password: string;
}

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
PGDATABASE = decodeURIComponent(PGDATABASE || '');

const pool = new Pool({
    user: PGUSER || '',
    host: PGHOST || '',
    database: PGDATABASE || '',
    password: PGPASSWORD || '',
    port: 5432, 
    options: `project=${ENDPOINT_ID || ''}`,
})


export class inserirRegistro {
async creatRegistre(registre:Registro) {
    const registreId = generateUUID();
    const {username, email, password} = registre
    await sql`
    insert into registros (id, username, email, password)
    VALUES (${registreId}, ${username}, ${email}, ${password})`
}
}

export const obterRegistros = (): Promise<Registro[]> => {
  const sql = 'SELECT * FROM registros ';
    return pool.query(sql)
    .then((res: QueryResult) => res.rows)
    .catch((err: Error) => {
        throw err;
    })
}

// verifica o sslmode=require e adiciona ssl//
export class VerificarRegistroExistente {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async verificarRegistro(email: string): Promise<boolean> {
        const sql = 'SELECT COUNT(*) AS count FROM registros WHERE email = $1';
        try {
            const res = await this.pool.query(sql, [email]);
            const rowCount = parseInt(res.rows[0].count);
            return rowCount > 0;
        } catch (err) {
            throw err;
        }
    }
}
// verifica o sslmode=require e adiciona ssl//