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
const Context_1 = require("../design_patterns/behavioral/strategy/Context");
class AuthControllerTeste {
    constructor(emailAuthenticationStrategy, tokenVerificationStrategy) {
        this.authContext = new Context_1.AuthContext(emailAuthenticationStrategy, tokenVerificationStrategy);
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.authContext.authenticateByEmail(req, res);
        });
    }
    verifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.authContext.verifyToken(req, res, next);
        });
    }
}
exports.default = AuthControllerTeste;
