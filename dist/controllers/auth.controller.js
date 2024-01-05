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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = __importDefault(require("../config/auth.config")); // Certifique-se de importar seu arquivo de configuração de autenticação
const Db_login_1 = require("../database/LoginDb/Db.login");
class AuthController {
    constructor() {
        try {
            this.validarEmail = new Db_login_1.ValidarEmail();
        }
        catch (error) {
            throw error;
        }
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body.userData;
                const validarEmail = new Db_login_1.ValidarEmail();
                const emailExists = yield validarEmail.verificarExistenciaEmail(email, password);
                if (emailExists) {
                    const isAdmin = email === 'admin@gmail.com' && password === '010203';
                    const tokenData = {
                        id: 101,
                        isAdmin: isAdmin
                    };
                    const expiresIn = isAdmin ? '1h' : '24h';
                    const generatedToken = jsonwebtoken_1.default.sign(tokenData, auth_config_1.default.JWT_KEY, { expiresIn });
                    res.json({
                        success: true,
                        token: generatedToken,
                        redirectTo: isAdmin ? '/admin' : '/client',
                        message: "Login successful"
                    });
                }
                else {
                    res.status(401).json({
                        success: false,
                        code: "dd101_API_ERRO",
                        message: 'Invalid credentials'
                    });
                }
            }
            catch (error) {
                console.error('Erro ao verificar email controller:', error instanceof Error ? error.message : error);
                res.status(500).json({
                    success: false,
                    code: "dd101_API_ERRO",
                    message: 'Internal server error'
                });
            }
        });
    }
}
exports.default = AuthController;
