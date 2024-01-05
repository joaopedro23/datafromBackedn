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
exports.ValidarEmail = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("../db");
dotenv_1.default.config();
class ValidarEmail {
    verificarExistenciaEmail(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, db_1.sql) `SELECT COUNT(*) AS count FROM registros WHERE email = ${email} AND password = ${password}`;
                if (result && result[0] && result[0].count !== undefined) {
                    const rowCount = result[0].count;
                    return rowCount > 0;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                console.error('Erro ao verificar email banco de dados:', error instanceof Error ? error.message : error);
                throw error;
            }
        });
    }
}
exports.ValidarEmail = ValidarEmail;
