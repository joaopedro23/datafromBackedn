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
const auth_config_1 = __importDefault(require("../config/auth.config"));
const Db_login_1 = require("../database/LoginDb/Db.login");
const auth_autentica__o_1 = require("../app/auth/auth.autentica\u00E7\u00E3o");
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
                if (emailExists.success) {
                    const isAdmin = email === "admin@gmail.com" && password === "010203";
                    const tokenData = {
                        id: emailExists.user.id,
                        isAdmin: isAdmin,
                        username: emailExists.user.username,
                    };
                    const expiresIn = isAdmin ? "1h" : "24h";
                    const generatedToken = jsonwebtoken_1.default.sign(tokenData, auth_config_1.default.JWT_KEY, {
                        expiresIn,
                    });
                    const userId = emailExists.user.id;
                    const decodedToken = auth_autentica__o_1.Autenticacao.verificarToken(generatedToken);
                    if (!decodedToken || decodedToken.id !== userId) {
                        res.status(401).json({
                            success: false,
                            code: "dd101_API_ERRO",
                            message: "Token verification failed",
                        });
                        return;
                    }
                    req.decodedToken = decodedToken;
                    req.userId = userId;
                    res.header("Authorization", `Bearer ${generatedToken}`);
                    res.setHeader("Access-Control-Expose-Headers", "Authorization");
                    res.status(200).json({
                        success: true,
                        redirectTo: isAdmin ? "/admin" : `/client`,
                        username: tokenData.username,
                        message: "Login successful",
                    });
                }
                else {
                    res.status(401).json({
                        success: false,
                        code: "dd101_API_ERRO",
                        message: "Invalid credentials",
                    });
                }
            }
            catch (error) {
                console.error("Erro ao verificar email controller:", error instanceof Error ? error.message : error);
                res.status(500).json({
                    success: false,
                    code: "dd101_API_ERRO",
                    message: "Internal server error",
                });
            }
        });
    }
    verifyToken(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            console.log("Cabeçalho de Autorização:", req.headers.authorization);
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
                    console.log("Token inválido.");
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
                res.status(500).json({
                    success: false,
                    code: "dd101_API_ERRO",
                    message: "Internal server error",
                });
            }
        });
    }
}
exports.default = AuthController;
