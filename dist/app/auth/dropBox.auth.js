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
class DropboxAuthentication {
    constructor(clientId, clientSecret, redirectUri) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
    }
    authenticate(code) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post('https://api.dropbox.com/oauth2/token', {
                    code,
                    grant_type: 'authorization_code',
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                    redirect_uri: this.redirectUri
                });
                return response.data;
            }
            catch (error) {
                const axiosError = error;
                throw new Error(((_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.data.error_description) || 'Failed to authenticate');
            }
        });
    }
    renewAccessToken(refreshToken) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post('https://api.dropbox.com/oauth2/token', {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken,
                    client_id: this.clientId,
                    client_secret: this.clientSecret
                });
                return response.data;
            }
            catch (error) {
                const axiosError = error;
                throw new Error(((_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.data.error_description) || 'Failed to renew access token');
            }
        });
    }
}
// Uso da classe de autenticação
const dropboxAuth = new DropboxAuthentication('SEU_CLIENT_ID', 'SEU_CLIENT_SECRET', 'https://seu-site.com/retorno-dropbox');
// Exemplo de autenticação usando o código de autorização
dropboxAuth.authenticate('SEU_CODIGO_DE_AUTORIZACAO')
    .then(response => {
    console.log('Token de acesso:', response.access_token);
    console.log('Token de atualização:', response.refresh_token);
})
    .catch(error => {
    console.error('Erro ao autenticar:', error.message);
});
// Exemplo de renovação de token de acesso usando o token de atualização
dropboxAuth.renewAccessToken('SEU_REFRESH_TOKEN')
    .then(response => {
    console.log('Novo token de acesso:', response.access_token);
})
    .catch(error => {
    console.error('Erro ao renovar token de acesso:', error.message);
});
