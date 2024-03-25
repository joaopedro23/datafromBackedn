import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

const secretKey = 'jdt.123@123.jdt';

export function encryptUserId(userId: string): string {
    const iv = randomBytes(16); // Vetor de inicialização aleatório
    const cipher = createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    let encrypted = cipher.update(userId, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + encrypted;
  }
  
  // Função para descriptografar o userId
  export function decryptUserId(encryptedUserId: string): string {
    const iv = Buffer.from(encryptedUserId.slice(0, 32), 'hex'); // Extrai o IV
    const encryptedText = encryptedUserId.slice(32); // Extrai o texto criptografado
    const decipher = createDecipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }