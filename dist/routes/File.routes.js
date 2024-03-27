"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FileControler_1 = __importDefault(require("../controllers/Idcontroller/FileControler"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const filerouter = express_1.default.Router();
const authController = new auth_controller_1.default();
const fileController = new FileControler_1.default();
// Rota de autenticação
// Rota para acessar os arquivos (exemplo)
filerouter.get('/files/:userId', authController.verifyToken.bind(authController), fileController.getFiles.bind(fileController));
exports.default = filerouter;
