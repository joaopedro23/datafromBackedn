import express from 'express';
import FileController from '../controllers/Idcontroller/FileControler';
import AuthController from '../controllers/auth.controller';


const filerouter = express.Router();
const authController = new AuthController();
const fileController = new FileController();

// Rota de autenticação


// Rota para acessar os arquivos (exemplo)
filerouter.get('/files/:userId', authController.verifyToken.bind(authController), fileController.getFiles.bind(fileController));

export default filerouter;