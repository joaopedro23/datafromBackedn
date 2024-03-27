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
exports.TokenVerificationStrategy = exports.EmailAuthenticationStrategy = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_autentica__o_1 = require("../../../../../app/auth/auth.autentica\u00E7\u00E3o");
const auth_config_1 = __importDefault(require("../../../../../config/auth.config"));
const JWT_KEY = auth_config_1.default.JWT_KEY;
class EmailAuthenticationStrategy {
    constructor(validarEmail) {
        this.validarEmail = validarEmail;
    }
    authenticate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body.userData;
            // Verificar se o email existe no banco de dados
            const emailExists = yield this.validarEmail.verificarExistenciaEmail(email, password);
            if (emailExists.success) {
                // Verificar se é um administrador
                if (email === "admin@gmail.com" && password === "010203") {
                    const isAdmin = email === "admin@gmail.com" && password === "010203";
                    // Se for administrador, gerar token JWT com marca de administrador
                    const tokenData = {
                        id: emailExists.user.id,
                        nome: emailExists.user.nome, // Substitua "nome" pelo nome real do campo no seu objeto de usuário
                        email: emailExists.user.email
                    };
                    const token = jsonwebtoken_1.default.sign(tokenData, JWT_KEY, { expiresIn: '1h' });
                    res.setHeader('Authorization', `Bearer ${token}`);
                    // Retornar sucesso com token gerado
                    res.status(200).json({ success: true, message: 'Usuário logado com sucesso!', token });
                }
                else {
                    // Se não for administrador, marcar como cliente
                    const tokenData = {
                        id: emailExists.user.id,
                        nome: emailExists.user.nome, // Substitua "nome" pelo nome real do campo no seu objeto de usuário
                        email: emailExists.user.email
                    };
                    const token = jsonwebtoken_1.default.sign(tokenData, JWT_KEY, { expiresIn: '1h' });
                    res.setHeader('Authorization', `Bearer ${token}`);
                    // Retornar sucesso com token gerado
                    res.status(200).json({ success: true, message: 'Usuário logado como cliente!', token });
                }
            }
            else {
                // Se email não existir, retornar erro
                res.status(401).json({ success: false, message: 'E-mail ou senha inválidos!' });
            }
        });
    }
}
exports.EmailAuthenticationStrategy = EmailAuthenticationStrategy;
class TokenVerificationStrategy {
    authenticate(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (!token) {
                res.status(401).json({
                    success: false,
                    code: "dd101_API_ERRO",
                    message: "Token not provided",
                });
                return;
            }
            try {
                const decodedToken = auth_autentica__o_1.Autenticacao.verificarToken(token);
                if (!decodedToken) {
                    res.status(401).json({
                        success: false,
                        code: "dd101_API_ERRO",
                        message: "Invalid token",
                    });
                    return;
                }
                const userId = decodedToken.id;
                if (req.params.userId && req.params.userId !== userId) {
                    res.status(403).json({
                        success: false,
                        code: "dd101_API_ERRO",
                        message: "Você não tem permissão para acessar estas informações",
                    });
                    return;
                }
                req.decodedToken = decodedToken;
                req.userId = userId;
                res.locals.userId = userId;
                next();
            }
            catch (error) {
                console.error("Erro ao verificar token:", error instanceof Error ? error.message : error);
            }
        });
    }
}
exports.TokenVerificationStrategy = TokenVerificationStrategy;
