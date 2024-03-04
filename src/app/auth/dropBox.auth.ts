import axios, { AxiosError } from 'axios';

interface OAuthResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
}

interface ErrorResponse {
    error: string;
    error_description: string;
}

class DropboxAuthentication {
    private clientId: string;
    private clientSecret: string;
    private redirectUri: string;

    constructor(clientId: string, clientSecret: string, redirectUri: string) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
    }

    async authenticate(code: string): Promise<OAuthResponse> {
        try {
            const response = await axios.post<OAuthResponse>('https://api.dropbox.com/oauth2/token', {
                code,
                grant_type: 'authorization_code',
                client_id: this.clientId,
                client_secret: this.clientSecret,
                redirect_uri: this.redirectUri
            });

            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            throw new Error(axiosError.response?.data.error_description || 'Failed to authenticate');
        }
    }

    async renewAccessToken(refreshToken: string): Promise<OAuthResponse> {
        try {
            const response = await axios.post<OAuthResponse>('https://api.dropbox.com/oauth2/token', {
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: this.clientId,
                client_secret: this.clientSecret
            });

            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            throw new Error(axiosError.response?.data.error_description || 'Failed to renew access token');
        }
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
