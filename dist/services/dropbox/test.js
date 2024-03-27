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
exports.AutorizadorAutomatico = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
class AutorizadorAutomatico {
    authorizeAutomatically() {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.launch();
            const page = yield browser.newPage();
            try {
                // Espera até que o elemento "Continuar" esteja disponível e, em seguida, clica nele
                yield Promise.all([
                    page.waitForSelector('//button[contains(text(), "Continuar")]') // Botão "Continuar"
                ]).then(() => __awaiter(this, void 0, void 0, function* () {
                    yield Promise.all([
                        page.click('//button[contains(text(), "Continuar")]'), // Clica no botão "Continuar"
                        page.waitForNavigation() // Espera a navegação após clicar em "Continuar"
                    ]);
                }));
                console.log('Autorização automatizada concluída com sucesso.');
            }
            catch (error) {
                console.error('Erro durante a autorização automatizada:', error);
            }
            finally {
                yield browser.close(); // Fecha o navegador após a conclusão, mesmo em caso de erro
            }
        });
    }
}
exports.AutorizadorAutomatico = AutorizadorAutomatico;
