// dropbox.controller.ts

import { Request, Response } from 'express';
import DropboxService from '../../services/dropbox/dropbox.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


class DropboxController {
    private dropboxService: DropboxService;
    public accessToken: string | null;

    
    constructor(dropboxService: DropboxService) {
        this.dropboxService = dropboxService;
        this.accessToken = null;
    }

    async authRedirect(req: Request, res: Response): Promise<void> {
        
        try {
            const authorizationUrl = await this.dropboxService.getAuthorizationUrl();
            res.redirect(authorizationUrl)
            
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
            const accessToken = await this.dropboxService.getAccessToken(code);

            const expiresInMs = parseInt(req.query.expires_in as string) * 1000; // Converte o tempo de expiração de segundos para milissegundos

            // Determine se o token é de curta ou longa duração com base na data de expiração
            const duracaoToken = expiresInMs < 24 * 60 * 60 * 1000 ? 'curto' : 'longo';

            let savedToken = await prisma.token.findUnique({
                where: {
                    id: 1 // Supondo que o token único está armazenado no banco de dados com id 1
                }
            });
            if (savedToken) {
                // Se um token já existe, atualize-o com o novo accessToken
                savedToken = await prisma.token.update({
                    where: {
                        id: 1
                    },
                    data: {
                        accessToken: accessToken
                    }
                });
            } else {
                // Se não existe, crie um novo registro no banco de dados
                savedToken = await prisma.token.create({
                    data: {
                        accessToken: accessToken
                    }
                });
            }

            res.json({
                accessToken: savedToken.accessToken,
                duracaoToken: duracaoToken 
        });
        } catch (error:any) {
            console.error('Erro ao autenticar com o Dropbox:', error.message);
            res.status(500).json({ error: 'Erro ao autenticar com o Dropbox' });
        }
        
    }
    AccessToken(): string | null {
        return this.accessToken;
    }

public async testToken(req: Request, res: Response): Promise<void> {
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



