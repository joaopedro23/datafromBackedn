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

interface Video {
    title: string;
    description: string;
    duration: number;
    
}

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
PGDATABASE = decodeURIComponent(PGDATABASE || '');

const pool = new Pool({
    user: PGUSER || '',
    host: PGHOST || '',
    database: PGDATABASE || '',
    password: PGPASSWORD || '',
    port: 5432, 
})

// teste inserir dados //

export class TesteClass {
    async create(video:Video) {
        const videoId = generateUUID();
        const {title, description, duration} = video
        await sql`insert into videos (id, title, description, duration) 
        VALUES (${videoId}, ${title}, ${description}, ${duration})`
    }
}
// teste inserir dados//

export class inserirRegistro {
async creatRegistre(registre:Registro) {
    const registreId = generateUUID();
    const {username, email, password} = registre
    await sql`
    insert into registros (id, username, email, password)
    VALUES (${registreId}, ${username}, ${email}, ${password})`
}
}

export const  obterRegistros = (): Promise<Registro[]> => {
  const sql = 'SELECT * FROM sua_tabela';
    return pool.query(sql)
    .then((res: QueryResult) => res.rows)
    .catch((err: Error) => {
        throw err;
    })
}

