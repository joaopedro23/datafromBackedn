// routes.ts
import { Request, Response, Router } from 'express';
import DropboxService from '../services/dropbox/dropbox.service';
import cookieParser from 'cookie-parser';
import { DropboxEntry, getTokenFromDatabase, obterDadosDoDropbox } from '../services/dropbox/dropTest';
import { downloadArquivoController } from '../controllers/DropBoxControllers/downloadFileFromDropbox/downloadFileFromDropbox';

const clientId = 'w0um6maunawdgio';
const clientSecret = 'sd2xpbjyvme35ur';
const redirectUri = 'http://localhost:3000/auth/dropbox/callback';

const dropboxService = new DropboxService(clientId, clientSecret, redirectUri); //instância do serviço DropboxService


const dropBoxRouter = Router();



dropBoxRouter.get('/dados-dropbox', async (req: Request, res: Response) => {
    try {      
        const dados: DropboxEntry[] | undefined = await obterDadosDoDropbox();
        if (dados !== undefined) {       
            res.json(dados);
        } else {           
            res.status(500).json({ error: 'Erro ao obter dados do Dropbox' });
        }
    } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


dropBoxRouter.get('/token', async (req: Request, res: Response) => {
    try {
        // Obtenha o token de acesso do banco de dados
        const accessToken = await getTokenFromDatabase();

        if (accessToken!== null) {
            // Se um token de acesso foi encontrado, envie-o como resposta
            res.json({ accessToken });
        } else {
            // Se nenhum token de acesso foi encontrado, envie uma resposta indicando isso
            res.status(404).json({ error: 'Nenhum token de acesso encontrado' });
        }
    } catch (error) {
        // Se ocorrer um erro ao buscar o token do banco de dados, envie uma resposta de erro
        console.error('Erro ao buscar token do banco de dados:', error);
        res.status(500).json({ error: 'Erro ao buscar token do banco de dados' });
    }
});

dropBoxRouter.get('/baixar-arquivo/pf/:nomeArquivo', downloadArquivoController);



export default dropBoxRouter;


