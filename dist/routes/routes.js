"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = __importDefault(require("../config/auth.config"));
const routes = (0, express_1.Router)();
const verificarAutenticacao = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ erro: 'Token de autenticação ausente' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, auth_config_1.default.JWT_KEY);
        req.usuario = { id: decoded.id };
        next();
    }
    catch (error) {
        return res.status(401).json({ erro: 'Token inválido' });
    }
};
routes.get('/rotaProtegida', verificarAutenticacao, (req, res) => {
    res.json({ message: 'Acesso permitido à rota protegida!', usuario: req.usuario });
});
exports.default = routes;
