import { Dropbox } from 'dropbox';

// Configure o token de acesso à API do Dropbox e coloca em arquivo env
const dbx = new Dropbox({ accessToken: 'sl.BwVHax452_rMDCMezc_7qXWJcFzVby5RFC3KrSXJHcGB9uCyNgNtdfE4mjoR_4REdW6fgZMPpTJiD7nCZCFWS8jmrfQFm6z7zdn5tlivNM_PQtaRo0_5KK5BpWUhL4QoYrookbDMonjy' });

// Interface para representar os metadados de um arquivo ou pasta
interface DropboxEntry {
    nome: string;
    tipo: string; // 'file' para arquivo, 'folder' para pasta
    caminho: string;
}

// Função para obter os dados do Dropbox
export async function obterDadosDoDropbox(): Promise<DropboxEntry[]> {
    try {
        // Lista
        const response = await dbx.filesListFolder({ path: '/Pf' });

        // Mapea os metadados dos arquivos para um objeto
        const dados: DropboxEntry[] = response.result.entries.map((entry: any) => {
            return {
                nome: entry.name,
                tipo: entry['.tag'], // 'file' para arquivo, 'folder' para pasta
                caminho: entry.path_lower
            };
        });

        return dados;
    } catch (error) {
        console.error('Erro ao obter dados do Dropbox:', error);
        throw error;
    }
}


// pega token do dropbox.service.ts e usar aqui e deixa automatizado//