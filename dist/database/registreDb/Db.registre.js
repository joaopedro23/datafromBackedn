"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificarRegistroExistente = exports.obterRegistros = exports.inserirRegistro = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("../db");
const generateUuis4_core_1 = require("../../core/uuid4/generateUuis4.core");
dotenv_1.default.config();
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
PGDATABASE = decodeURIComponent(PGDATABASE || '');
const pool = new pg_1.Pool({
    user: PGUSER || '',
    host: PGHOST || '',
    database: PGDATABASE || '',
    password: PGPASSWORD || '',
    port: 5432,
    options: `project=${ENDPOINT_ID || ''}`,
});
class inserirRegistro {
    creatRegistre(registre) {
        return __awaiter(this, void 0, void 0, function* () {
            const registreId = (0, generateUuis4_core_1.generateUUID)();
            const { username, email, password } = registre;
            yield (0, db_1.sql) `
    insert into registros (id, username, email, password)
    VALUES (${registreId}, ${username}, ${email}, ${password})`;
        });
    }
}
exports.inserirRegistro = inserirRegistro;
const obterRegistros = () => {
    const sql = 'SELECT * FROM registros ';
    return pool.query(sql)
        .then((res) => res.rows)
        .catch((err) => {
        throw err;
    });
};
exports.obterRegistros = obterRegistros;
// verifica o sslmode=require e adiciona ssl//
class VerificarRegistroExistente {
    constructor(pool) {
        this.pool = pool;
    }
    verificarRegistro(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT COUNT(*) AS count FROM registros WHERE email = $1';
            try {
                const res = yield this.pool.query(sql, [email]);
                const rowCount = parseInt(res.rows[0].count);
                return rowCount > 0;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.VerificarRegistroExistente = VerificarRegistroExistente;
// verifica o sslmode=require e adiciona ssl//
