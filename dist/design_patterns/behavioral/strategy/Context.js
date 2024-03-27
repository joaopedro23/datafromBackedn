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
exports.AuthContext = exports.Context = void 0;
class Context {
    constructor(strategy) {
        this.authenticationStrategy = strategy;
    }
    executeAuthentication(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.authenticationStrategy.authenticate(req, res, next);
            }
            catch (error) {
                console.error("Error during authentication:", error);
                res.status(500).json({ success: false, message: "Internal server error" });
            }
        });
    }
}
exports.Context = Context;
class AuthContext {
    constructor(emailAuthenticationStrategy, tokenVerificationStrategy) {
        this.emailAuthenticationStrategy = emailAuthenticationStrategy;
        this.tokenVerificationStrategy = tokenVerificationStrategy;
    }
    // Método para autenticar por email
    authenticateByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.emailAuthenticationStrategy.authenticate(req, res);
        });
    }
    // Método para verificar o token
    verifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tokenVerificationStrategy.authenticate(req, res, next);
        });
    }
}
exports.AuthContext = AuthContext;
