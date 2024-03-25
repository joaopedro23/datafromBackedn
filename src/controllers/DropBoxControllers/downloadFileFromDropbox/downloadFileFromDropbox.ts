
import { Request, Response } from 'express';
import { downloadArquivoDoDropbox } from '../../../services/DowloadDropBox/dowloadDrop.service';


export const downloadArquivoController = async (req: Request, res: Response) => {
  const nomeArquivo = req.params.nomeArquivo; // Supondo que você passe o nome do arquivo como um parâmetro na URL
  try {
    const arquivoBuffer = await downloadArquivoDoDropbox(nomeArquivo);
    if (arquivoBuffer !== null) {
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename=${nomeArquivo}`);
      res.send(arquivoBuffer);
    } else {
      res.status(404).send('Arquivo não encontrado');
    }
  } catch (error) {
    console.error('Erro ao baixar arquivo:', error);
    res.status(500).send('Erro ao baixar arquivo');
  }
};
