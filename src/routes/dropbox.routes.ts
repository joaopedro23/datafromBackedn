// dropbox.routes.ts

import { Router } from 'express';
import DropboxService from '../services/dropbox/dropbox.service';
import DropboxController from '../controllers/DropBoxControllers/dropBox.contollees';
import dotenv from 'dotenv';

// coloca todas essas varaveis em env//
dotenv.config();

const router = Router();

const clientId = process.env.CLIENT_ID !== undefined ? process.env.CLIENT_ID : '';
const clientSecret = process.env.CLIENT_SECRET !== undefined ? process.env.CLIENT_SECRET : '';

const redirectUri = 'http://localhost:3000/auth/dropbox/callback';

const dropboxService = new DropboxService(clientId, clientSecret, redirectUri);
const dropboxController = new DropboxController(dropboxService);

router.get('/auth/dropbox', dropboxController.authRedirect.bind(dropboxController));
router.get('/auth/dropbox/callback', dropboxController.authCallback.bind(dropboxController));

router.get('/test-token', dropboxController.testToken.bind(dropboxController));


export default router;
