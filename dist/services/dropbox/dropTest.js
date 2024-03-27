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
exports.getTokenFromDatabase = exports.obterDadosDoDropbox = void 0;
const dropbox_1 = require("dropbox");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let dbx = new dropbox_1.Dropbox({ accessToken: '' });
function obterDadosDoDropbox() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Obtém o token do banco de dados
            const token = yield getTokenFromDatabase();
            if (token !== undefined) {
                // Reinicializa o cliente do Dropbox com o token obtido
                dbx = new dropbox_1.Dropbox({ accessToken: token });
                // Agora você pode usar o cliente do Dropbox (dbx) para fazer chamadas à API do Dropbox com o token atualizado
                // Por exemplo:
                const response = yield dbx.filesListFolder({ path: '/Pf' });
                console.log(response.result.entries);
                const dados = response.result.entries.map((entry) => {
                    return {
                        id: entry.id,
                        nome: entry.name,
                        tipo: entry['.tag'],
                        caminho: entry.path_lower
                    };
                });
                return dados;
            }
            else {
                console.error('Token de acesso do Dropbox não encontrado.');
            }
        }
        catch (error) {
            console.error('Erro ao obter dados do Dropbox:', error);
            throw error;
        }
    });
}
exports.obterDadosDoDropbox = obterDadosDoDropbox;
function getTokenFromDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = yield prisma.token.findUnique({
                where: {
                    id: 1
                }
            });
            return token === null || token === void 0 ? void 0 : token.accessToken;
        }
        catch (error) {
            console.error('Erro ao buscar token do banco de dados:', error);
            throw error;
        }
    });
}
exports.getTokenFromDatabase = getTokenFromDatabase;
