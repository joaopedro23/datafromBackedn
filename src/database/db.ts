import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
PGDATABASE = decodeURIComponent(PGDATABASE || '');

const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?option=project=${ENDPOINT_ID}`;

export const sql = postgres(URL, {ssl:true} );

const DbData = postgres({
    host: PGHOST || '',
    database: PGDATABASE || '',
    username: PGUSER || '',
    password: PGPASSWORD || '',
    port: 5432,
    ssl: 'require',
    connection: {
    options: `project=${ENDPOINT_ID || ''}`,
},
});


export { DbData }


