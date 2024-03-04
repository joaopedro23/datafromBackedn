// dropbox.controller.ts

import { NextFunction, Request, Response } from 'express';
import DropboxService from '../../services/dropbox/dropbox.service';
import puppeteer from 'puppeteer';



class DropboxController {
    private dropboxService: DropboxService;

    constructor(dropboxService: DropboxService) {
        this.dropboxService = dropboxService;
    }

    async authRedirect(req: Request, res: Response): Promise<void> {
        
        try {
            const authorizationUrl = await this.dropboxService.getAuthorizationUrl();

            const browser = await puppeteer.launch({ headless: false});
            const page = await browser.newPage();

            await page.goto(authorizationUrl);

            await page.waitForSelector('.nsm7Bb-HzV7m-LgbsSe-BPrWId');
            

            // Clica no botão usando a classe específica
            await page.click('.nsm7Bb-HzV7m-LgbsSe-BPrWId');
            console.log('botao clicado');

            await page.waitForSelector('input[type="email"]',  { timeout: 5000, visible:true, }).catch(err => {
                console.error('Erro ao localizar o campo de entrada de email:', err);
            })
            console.log('campo email achado'); 
            

            // Digita seu email no campo de entrada
            const email:string = 'joaopedro105manairapb@gmail.com'; // Substitua pelo seu email
            console.log(`Digitando o email: ${email}`);

            await page.type('input[type="email"]', email, { delay: 100 });

            

            await Promise.all([
                page.waitForSelector('.VfPpkd-vQzf8d'),
                page.waitForSelector('button[name="allow"]')
            ]);
                // Clica no botão "Continuar"
            await page.click('.VfPpkd-vQzf8d');

            // Espera até que o seletor do botão "Permitir" esteja disponível
            await page.waitForSelector('button[name="allow"]');

            // Clica no botão "Permitir"
            await page.click('button[name="allow"]');

            // Fecha o navegador Puppeteer
            await browser.close();

            
            console.log('Página de autorização do Dropbox carregada.');
        } catch (error:any) {
            console.error('Erro ao redirecionar para a autenticação do Dropbox:', error.message);
            res.status(500).json({ error: 'Erro ao redirecionar para a autenticação do Dropbox' });
        }
    }

    async authCallback(req: Request, res: Response): Promise<void> {
        try {
            const code = req.query.code as string;
            if (!code) {
                throw new Error('Código de autorização ausente na solicitação.');
            }
            await this.dropboxService.authorizeAutomatically();// mecher aqui

            const accessToken = await this.dropboxService.getAccessToken(code);
            console.log('Resposta do Dropbox:', accessToken);
            res.json(accessToken);
        } catch (error:any) {
            console.error('Erro ao autenticar com o Dropbox:', error.message);
            res.status(500).json({ error: 'Erro ao autenticar com o Dropbox' });
        }
    }

    async testToken(req: Request, res: Response): Promise<void> {
        try {
            // Obtém o token armazenado
            const accessToken = this.dropboxService.AccessToken();
            if (accessToken) {
                // Token de acesso armazenado. Retorne o token para o cliente
                res.status(200).json({ accessToken });
            } else {
                // Token de acesso não encontrado
                res.status(404).json({ error: 'Token de acesso não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao testar o token de acesso:', error);
            res.status(500).json({ error: 'Erro ao testar o token de acesso' });
        }
    }
    
    

}

export default DropboxController;



