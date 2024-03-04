// routes.ts
import { Request, Response, Router } from 'express';
import { obterDadosDoDropbox } from '../services/dropbox/dropTest';



const dropBoxRouter = Router();

dropBoxRouter.get('/fetch-dropbox-files', async (req: Request, res: Response) => {
    try {
        // Chama a função para obter os dados do Dropbox
        const dados = await obterDadosDoDropbox();
        
        // Retorna os dados como resposta
        res.json(dados);
    } catch (error) {
        // Se houver algum erro, retorna um status 500 e a mensagem de erro
        res.status(500).json({ error: 'Erro ao buscar arquivos do Dropbox' });
    }
});

export default dropBoxRouter;
