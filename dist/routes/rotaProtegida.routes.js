"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarTokenMiddleware = void 0;
const express_1 = require("express");
const auth_autentica__o_1 = require("../app/auth/auth.autentica\u00E7\u00E3o");
const verificaRoutes = (0, express_1.Router)();
// separa mantendo boas praticas e refatora tudo//
const verificarTokenMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    console.log('Token recebido:', token);
    if (!token) {
        console.log('Token não fornecido');
        return res.status(401).json({ message: 'Token não fornecido' });
    }
    const decodedToken = auth_autentica__o_1.Autenticacao.verificarToken(token);
    console.log('Token decodificado:', decodedToken);
    if (!decodedToken) {
        console.log('Token inválido');
        return res.status(401).json({ message: 'Token inválido' });
    }
    req.decodedToken = decodedToken;
    next();
};
exports.verificarTokenMiddleware = verificarTokenMiddleware;
verificaRoutes.get('/rota-protegida', exports.verificarTokenMiddleware, (req, res) => {
    res.json({ message: 'Rota protegida', user: req.decodedToken });
});
exports.default = verificaRoutes;
