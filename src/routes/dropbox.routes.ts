// dropbox.routes.ts

import { Router } from 'express';
import DropboxService from '../services/dropbox/dropbox.service';
import DropboxController from '../controllers/DropBoxControllers/dropBox.contollees';
import { configDotenv } from 'dotenv';

// coloca todas essas varaveis em env//

const router = Router();
const clientId = 'w0um6maunawdgio';
const clientSecret = 'sd2xpbjyvme35ur';
const redirectUri = 'http://localhost:3000/auth/dropbox/callback';

const dropboxService = new DropboxService(clientId, clientSecret, redirectUri);
const dropboxController = new DropboxController(dropboxService);

router.get('/auth/dropbox', dropboxController.authRedirect.bind(dropboxController));
router.get('/auth/dropbox/callback', dropboxController.authCallback.bind(dropboxController));

router.get('/test-token', dropboxController.testToken.bind(dropboxController));


export default router;
