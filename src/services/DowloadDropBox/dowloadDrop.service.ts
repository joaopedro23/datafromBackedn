import { Dropbox } from "dropbox";
import { getTokenFromDatabase } from "../dropbox/dropTest";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
// Função para obter o token de acesso do Dropbox do banco de dados
const prisma = new PrismaClient();
export interface DropboxEntry {
  id: string;
  nome: string;
  tipo: string; // 'file' para arquivo, 'folder' para pasta
  caminho: string;
}
let dbx = new Dropbox({ accessToken: "" });

export async function downloadArquivoDoDropbox(
  nomeArquivo: string
): Promise<Buffer | null> {
  try {
    // Obtém o token do banco de dados
    const token = await getTokenFromDatabase();

    if (token !== undefined) {
      // Reinicializa o cliente do Dropbox com o token obtido
      dbx = new Dropbox({ accessToken: token });

      // Lista os arquivos no diretório '/Pf' do Dropbox
      const response = await dbx.filesListFolder({ path: "/Pf" });

      const entries: DropboxEntry[] = response.result.entries.map(
        (entry: any) => {
          return {
            id: entry.id,
            nome: entry.name,
            tipo: entry[".tag"],
            caminho: entry.path_lower,
          };
        }
      );
      // Encontra o arquivo com o nome especificado
      const arquivo = entries.find(
        (entry: DropboxEntry) => entry.nome === nomeArquivo
      );
      if (arquivo) {
        const url = await dbx.filesGetTemporaryLink({ path: arquivo.caminho });
        const fileBuffer = await axios.get(url.result.link, {
          responseType: "arraybuffer",
        });

        return Buffer.from(fileBuffer.data, "binary");
      } else {
        console.error(`Arquivo ${nomeArquivo} não encontrado no Dropbox.`);
        return null;
      }
    } else {
      console.error("Token de acesso do Dropbox não encontrado.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao baixar arquivo do Dropbox:", error);
    throw error;
  }
}
