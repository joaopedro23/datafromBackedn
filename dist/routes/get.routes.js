"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_autentica__o_1 = require("../app/auth/auth.autentica\u00E7\u00E3o");
const get = (0, express_1.Router)();
const verificarTokenMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }
    const decodedToken = auth_autentica__o_1.Autenticacao.verificarToken(token);
    if (!decodedToken) {
        return res.status(401).json({ message: 'Token inválido' });
    }
    req.decodedToken = decodedToken;
    next();
};
get.get('/user', verificarTokenMiddleware, (req, res) => {
    res.json({ message: 'Rota protegida', user: req.decodedToken });
});
exports.default = get;
