import axios from 'axios';
import puppeteer from 'puppeteer';
import querystring from 'querystring';

class DropboxService {
    private clientId: string;
    private clientSecret: string;
    private redirectUri: string;
    private accessToken: string | null;

    constructor(clientId: string, clientSecret: string, redirectUri: string) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.accessToken = null;
    }

    async getAuthorizationUrl(): Promise<string> {
        return `https://www.dropbox.com/oauth2/authorize?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirectUri}`;
    }

    async getAccessToken(code: string): Promise<any> {
        const data = querystring.stringify({
            code,
            grant_type: 'authorization_code',
            client_id: this.clientId,
            client_secret: this.clientSecret,
            redirect_uri: this.redirectUri
        });

        const response = await axios.post('https://api.dropbox.com/oauth2/token', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (response.data && response.data.access_token) {
            this.accessToken = response.data.access_token;
        } else {
            throw new Error('Não foi possível obter o token de acesso do Dropbox');
        }

        return this.accessToken;
    }
    
    AccessToken(): string | null {
        return this.accessToken;
    }
    
    async authorizeAutomatically(): Promise<void> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const urlgot = 'https://www.dropbox.com/oauth2/authorize?response_type=code&client_id=$w0um6maunawdgio&redirect_uri=$http://localhost:3000/auth/dropbox/callback';
    
        try {
            // Abre a página de autorização do Dropbox
            await page.goto(urlgot);
            // Espera até que o elemento "Continuar" esteja disponível e, em seguida, clica nele
            await Promise.all([
                page.waitForSelector('//button[contains(text(), "Continuar")]') // Botão "Continuar"
            ]).then(async () => {
                await Promise.all([
                    page.click('//button[contains(text(), "Continuar")]'), // Clica no botão "Continuar"
                    page.waitForNavigation() // Espera a navegação após clicar em "Continuar"
                ]);
            });
    
            console.log('Autorização automatizada concluída com sucesso.');
        } catch (error) {
            console.error('Erro durante a autorização automatizada:', error);
        } finally {
            await browser.close(); // Fecha o navegador após a conclusão, mesmo em caso de erro
        }
    }
    
}

export default DropboxService;
