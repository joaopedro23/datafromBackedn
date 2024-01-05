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
exports.getPostgresVersionMid = void 0;
const postgres_1 = __importDefault(require("postgres"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Função para buscar a versão do PostgreSQL
function getPostgresVersionMid(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const databaseUrl = process.env.DATABASE_URL;
            if (!databaseUrl) {
                throw new Error('DATABASE_URL não está definida');
            }
            const sql = (0, postgres_1.default)(databaseUrl, { ssl: 'require' });
            const version = yield sql `select version()`;
            console.log('Versão do PostgreSQL:', version);
            res.json({ version }); // Retorna a versão do PostgreSQL como resposta 
        }
        catch (error) {
            console.error('Erro ao buscar a versão do PostgreSQL:', error);
            res.status(500).json({ error: 'Erro ao buscar a versão do PostgreSQL' });
        }
    });
}
exports.getPostgresVersionMid = getPostgresVersionMid;
