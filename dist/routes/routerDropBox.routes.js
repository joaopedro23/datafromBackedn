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
// routes.ts
const express_1 = require("express");
const dropbox_service_1 = __importDefault(require("../services/dropbox/dropbox.service"));
const dropTest_1 = require("../services/dropbox/dropTest");
const downloadFileFromDropbox_1 = require("../controllers/DropBoxControllers/downloadFileFromDropbox/downloadFileFromDropbox");
const clientId = 'w0um6maunawdgio';
const clientSecret = 'sd2xpbjyvme35ur';
const redirectUri = 'http://localhost:3000/auth/dropbox/callback';
const dropboxService = new dropbox_service_1.default(clientId, clientSecret, redirectUri); //instância do serviço DropboxService
const dropBoxRouter = (0, express_1.Router)();
dropBoxRouter.get('/dados-dropbox', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dados = yield (0, dropTest_1.obterDadosDoDropbox)();
        if (dados !== undefined) {
            res.json(dados);
        }
        else {
            res.status(500).json({ error: 'Erro ao obter dados do Dropbox' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}));
dropBoxRouter.get('/token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtenha o token de acesso do banco de dados
        const accessToken = yield (0, dropTest_1.getTokenFromDatabase)();
        if (accessToken !== null) {
            // Se um token de acesso foi encontrado, envie-o como resposta
            res.json({ accessToken });
        }
        else {
            // Se nenhum token de acesso foi encontrado, envie uma resposta indicando isso
            res.status(404).json({ error: 'Nenhum token de acesso encontrado' });
        }
    }
    catch (error) {
        // Se ocorrer um erro ao buscar o token do banco de dados, envie uma resposta de erro
        console.error('Erro ao buscar token do banco de dados:', error);
        res.status(500).json({ error: 'Erro ao buscar token do banco de dados' });
    }
}));
dropBoxRouter.get('/baixar-arquivo/pf/:nomeArquivo', downloadFileFromDropbox_1.downloadArquivoController);
exports.default = dropBoxRouter;
