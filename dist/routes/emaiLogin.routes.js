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
const express_1 = __importDefault(require("express"));
const index_1 = require("../design_patterns/behavioral/strategy/index");
const email_teste_controller_1 = __importDefault(require("../controllers/email.teste.controller"));
const Db_login_1 = require("../database/LoginDb/Db.login");
const strategy = express_1.default.Router();
const validarEmail = new Db_login_1.ValidarEmail();
const emailAuthenticationStrategy = new index_1.EmailAuthenticationStrategy(validarEmail);
const tokenVerificationStrategy = new index_1.TokenVerificationStrategy();
const authController = new email_teste_controller_1.default(emailAuthenticationStrategy, tokenVerificationStrategy);
// Rota para o login
strategy.post("/login-strategy", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield authController.login(req, res);
}));
// Rota para verificar o token
strategy.get("/verify-token-strategy", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield authController.verifyToken(req, res, next);
    res.json({ message: 'Rota protegida', user: req.decodedToken });
}));
exports.default = strategy;
