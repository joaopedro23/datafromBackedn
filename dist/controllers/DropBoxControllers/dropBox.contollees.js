"use strict";
// dropbox.controller.ts
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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class DropboxController {
    constructor(dropboxService) {
        this.dropboxService = dropboxService;
        this.accessToken = null;
    }
    authRedirect(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authorizationUrl = yield this.dropboxService.getAuthorizationUrl();
                res.redirect(authorizationUrl);
                console.log('Página de autorização do Dropbox carregada.');
            }
            catch (error) {
                console.error('Erro ao redirecionar para a autenticação do Dropbox:', error.message);
                res.status(500).json({ error: 'Erro ao redirecionar para a autenticação do Dropbox' });
            }
        });
    }
    authCallback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const code = req.query.code;
                if (!code) {
                    throw new Error('Código de autorização ausente na solicitação.');
                }
                const accessToken = yield this.dropboxService.getAccessToken(code);
                const expiresInMs = parseInt(req.query.expires_in) * 1000; // Converte o tempo de expiração de segundos para milissegundos
                // Determine se o token é de curta ou longa duração com base na data de expiração
                const duracaoToken = expiresInMs < 24 * 60 * 60 * 1000 ? 'curto' : 'longo';
                let savedToken = yield prisma.token.findUnique({
                    where: {
                        id: 1 // Supondo que o token único está armazenado no banco de dados com id 1
                    }
                });
                if (savedToken) {
                    // Se um token já existe, atualize-o com o novo accessToken
                    savedToken = yield prisma.token.update({
                        where: {
                            id: 1
                        },
                        data: {
                            accessToken: accessToken
                        }
                    });
                }
                else {
                    // Se não existe, crie um novo registro no banco de dados
                    savedToken = yield prisma.token.create({
                        data: {
                            accessToken: accessToken
                        }
                    });
                }
                res.json({
                    accessToken: savedToken.accessToken,
                    duracaoToken: duracaoToken
                });
            }
            catch (error) {
                console.error('Erro ao autenticar com o Dropbox:', error.message);
                res.status(500).json({ error: 'Erro ao autenticar com o Dropbox' });
            }
        });
    }
    AccessToken() {
        return this.accessToken;
    }
    testToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Obtém o token armazenado
                const accessToken = this.dropboxService.AccessToken();
                if (accessToken) {
                    // Token de acesso armazenado. Retorne o token para o cliente
                    res.status(200).json({ accessToken });
                }
                else {
                    // Token de acesso não encontrado
                    res.status(404).json({ error: 'Token de acesso não encontrado' });
                }
            }
            catch (error) {
                console.error('Erro ao testar o token de acesso:', error);
                res.status(500).json({ error: 'Erro ao testar o token de acesso' });
            }
        });
    }
}
exports.default = DropboxController;
