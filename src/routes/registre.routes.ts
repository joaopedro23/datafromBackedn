import { Router } from 'express';
import RegistroController from '../controllers/registre.controller';

const authRegistre = Router();



const registreController = new RegistroController();

authRegistre.post('/registre', registreController.post);



export default authRegistre;
