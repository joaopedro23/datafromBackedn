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
const axios_1 = __importDefault(require("axios"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const querystring_1 = __importDefault(require("querystring"));
class DropboxService {
    constructor(clientId, clientSecret, redirectUri) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.accessToken = null;
    }
    getAuthorizationUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            return `https://www.dropbox.com/oauth2/authorize?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirectUri}`;
        });
    }
    getAccessToken(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = querystring_1.default.stringify({
                code,
                grant_type: 'authorization_code',
                client_id: this.clientId,
                client_secret: this.clientSecret,
                redirect_uri: this.redirectUri
            });
            const response = yield axios_1.default.post('https://api.dropbox.com/oauth2/token', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            if (response.data && response.data.access_token) {
                this.accessToken = response.data.access_token;
            }
            else {
                throw new Error('Não foi possível obter o token de acesso do Dropbox');
            }
            return this.accessToken;
        });
    }
    AccessToken() {
        return this.accessToken;
    }
    authorizeAutomatically() {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.launch();
            const page = yield browser.newPage();
            const urlgot = 'https://www.dropbox.com/oauth2/authorize?response_type=code&client_id=$w0um6maunawdgio&redirect_uri=$http://localhost:3000/auth/dropbox/callback';
            try {
                // Abre a página de autorização do Dropbox
                yield page.goto(urlgot);
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
exports.default = DropboxService;
