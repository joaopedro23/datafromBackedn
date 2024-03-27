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
Object.defineProperty(exports, "__esModule", { value: true });
const email_strategy_1 = require("../design_patterns/behavioral/strategy/strategies/email/email.strategy");
class AuthController {
    constructor(validarEmail) {
        this.emailAuthenticationStrategy = new email_strategy_1.EmailAuthenticationStrategy(validarEmail);
        this.tokenVerificationStrategy = new email_strategy_1.TokenVerificationStrategy();
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.emailAuthenticationStrategy.authenticate(req, res);
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
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.tokenVerificationStrategy.authenticate(req, res, next);
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
