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
exports.downloadArquivoDoDropbox = void 0;
const dropbox_1 = require("dropbox");
const dropTest_1 = require("../dropbox/dropTest");
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
// Função para obter o token de acesso do Dropbox do banco de dados
const prisma = new client_1.PrismaClient();
let dbx = new dropbox_1.Dropbox({ accessToken: "" });
function downloadArquivoDoDropbox(nomeArquivo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Obtém o token do banco de dados
            const token = yield (0, dropTest_1.getTokenFromDatabase)();
            if (token !== undefined) {
                // Reinicializa o cliente do Dropbox com o token obtido
                dbx = new dropbox_1.Dropbox({ accessToken: token });
                // Lista os arquivos no diretório '/Pf' do Dropbox
                const response = yield dbx.filesListFolder({ path: "/Pf" });
                const entries = response.result.entries.map((entry) => {
                    return {
                        id: entry.id,
                        nome: entry.name,
                        tipo: entry[".tag"],
                        caminho: entry.path_lower,
                    };
                });
                // Encontra o arquivo com o nome especificado
                const arquivo = entries.find((entry) => entry.nome === nomeArquivo);
                if (arquivo) {
                    const url = yield dbx.filesGetTemporaryLink({ path: arquivo.caminho });
                    const fileBuffer = yield axios_1.default.get(url.result.link, {
                        responseType: "arraybuffer",
                    });
                    return Buffer.from(fileBuffer.data, "binary");
                }
                else {
                    console.error(`Arquivo ${nomeArquivo} não encontrado no Dropbox.`);
                    return null;
                }
            }
            else {
                console.error("Token de acesso do Dropbox não encontrado.");
                return null;
            }
        }
        catch (error) {
            console.error("Erro ao baixar arquivo do Dropbox:", error);
            throw error;
        }
    });
}
exports.downloadArquivoDoDropbox = downloadArquivoDoDropbox;
