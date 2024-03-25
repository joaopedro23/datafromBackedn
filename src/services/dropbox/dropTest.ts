import { Dropbox } from 'dropbox';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface DropboxEntry {
    nome: string;
    tipo: string; // 'file' para arquivo, 'folder' para pasta
    caminho: string;
}
let dbx = new Dropbox({ accessToken: '' });

export async function obterDadosDoDropbox(): Promise<DropboxEntry[] | undefined> {
    try {
        // Obtém o token do banco de dados
        const token = await getTokenFromDatabase();

        if (token !== undefined) {
            // Reinicializa o cliente do Dropbox com o token obtido
            dbx = new Dropbox({ accessToken: token });

            // Agora você pode usar o cliente do Dropbox (dbx) para fazer chamadas à API do Dropbox com o token atualizado
            // Por exemplo:
            const response = await dbx.filesListFolder({ path: '/Pf' });
            console.log(response.result.entries);
            const dados: DropboxEntry[] = response.result.entries.map((entry: any) => {
                return {
                    id: entry.id,
                    nome: entry.name,
                    tipo: entry['.tag'], 
                    caminho: entry.path_lower
                };
            });
            return dados;
        } else {
            console.error('Token de acesso do Dropbox não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao obter dados do Dropbox:', error);
        throw error;
    }
}

export async function getTokenFromDatabase(): Promise<string | undefined> {
    try {
        const token = await prisma.token.findUnique({
            where: {
                id: 1 
            }
        });

        return token?.accessToken; 
    } catch (error) {
        console.error('Erro ao buscar token do banco de dados:', error);
        throw error;
    }
}