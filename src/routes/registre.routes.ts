import { Router } from 'express';
import { getPostgresVersionMid } from '../middleware/midDb/postgresMiddleware';
import RegistroController from '../controllers/registre.controller';

const authRegistre = Router();



const registreController = new RegistroController();

authRegistre.post('/registre', registreController.post);



export default authRegistre;
