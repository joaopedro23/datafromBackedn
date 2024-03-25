declare namespace Express {
    export interface Request {
        decodedToken?: any; // Adiciona a propriedade decodedToken ao objeto de solicitação
        userId?: string; // Adiciona a propriedade userId ao objeto de solicitação, se necessário
    }
}