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
exports.downloadArquivoController = void 0;
const dowloadDrop_service_1 = require("../../../services/DowloadDropBox/dowloadDrop.service");
const downloadArquivoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nomeArquivo = req.params.nomeArquivo; // Supondo que você passe o nome do arquivo como um parâmetro na URL
    try {
        const arquivoBuffer = yield (0, dowloadDrop_service_1.downloadArquivoDoDropbox)(nomeArquivo);
        if (arquivoBuffer !== null) {
            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader('Content-Disposition', `attachment; filename=${nomeArquivo}`);
            res.send(arquivoBuffer);
        }
        else {
            res.status(404).send('Arquivo não encontrado');
        }
    }
    catch (error) {
        console.error('Erro ao baixar arquivo:', error);
        res.status(500).send('Erro ao baixar arquivo');
    }
});
exports.downloadArquivoController = downloadArquivoController;
