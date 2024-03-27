"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generateUuis4_core_1 = require("../core/uuid4/generateUuis4.core"); // Verifique o caminho correto do seu arquivo
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = __importDefault(require("../config/auth.config"));
const Db_registre_1 = require("../database/registreDb/Db.registre");
class RegistroController {
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userData } = req.body;
                if (!userData || !userData.username || !userData.email || !userData.password) {
                    res.status(400).json({ error: 'Por favor, forneça username, email e password.' });
                    return;
                }
                const { username, email, password } = userData;
                // verifca usuario existente
                // verifca usuario existente
                const id = (0, generateUuis4_core_1.generateUUID)();
                const novoRegistro = {
                    id,
                    username,
                    email,
                    password
                };
                // Adiciona o novo usuário na lista de usuários
                const registroInserido = new Db_registre_1.inserirRegistro();
                yield registroInserido.creatRegistre(novoRegistro);
                const tokenRegistro = jsonwebtoken_1.default.sign({ id, username, email, password }, auth_config_1.default.JWT_KEY, { expiresIn: '1m' });
                res.status(201).json({ token: tokenRegistro, novoRegistro, redirectTo: '/client' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Erro ao inserir registro' });
            }
        });
    }
}
exports.default = RegistroController;
