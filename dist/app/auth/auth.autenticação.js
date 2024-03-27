"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autenticacao = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = __importDefault(require("../../config/auth.config"));
class Autenticacao {
    // Método para verificar token JWT
    static verificarToken(token) {
        try {
            // Verifica se o token é válido
            const decoded = jsonwebtoken_1.default.verify(token, Autenticacao.segredo);
            return decoded;
        }
        catch (error) {
            return null;
        }
    }
}
exports.Autenticacao = Autenticacao;
Autenticacao.segredo = auth_config_1.default.JWT_KEY;
