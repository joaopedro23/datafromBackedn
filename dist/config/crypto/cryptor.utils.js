"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptUserId = exports.encryptUserId = void 0;
const crypto_1 = require("crypto");
const secretKey = 'jdt.123@123.jdt';
function encryptUserId(userId) {
    const iv = (0, crypto_1.randomBytes)(16); // Vetor de inicialização aleatório
    const cipher = (0, crypto_1.createCipheriv)('aes-256-cbc', Buffer.from(secretKey), iv);
    let encrypted = cipher.update(userId, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + encrypted;
}
exports.encryptUserId = encryptUserId;
// Função para descriptografar o userId
function decryptUserId(encryptedUserId) {
    const iv = Buffer.from(encryptedUserId.slice(0, 32), 'hex'); // Extrai o IV
    const encryptedText = encryptedUserId.slice(32); // Extrai o texto criptografado
    const decipher = (0, crypto_1.createDecipheriv)('aes-256-cbc', Buffer.from(secretKey), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
exports.decryptUserId = decryptUserId;
