"use strict";
// dropbox.routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dropbox_service_1 = __importDefault(require("../services/dropbox/dropbox.service"));
const dropBox_contollees_1 = __importDefault(require("../controllers/DropBoxControllers/dropBox.contollees"));
const dotenv_1 = __importDefault(require("dotenv"));
// coloca todas essas varaveis em env//
dotenv_1.default.config();
const router = (0, express_1.Router)();
const clientId = process.env.CLIENT_ID !== undefined ? process.env.CLIENT_ID : '';
const clientSecret = process.env.CLIENT_SECRET !== undefined ? process.env.CLIENT_SECRET : '';
const redirectUri = 'http://localhost:3000/auth/dropbox/callback';
const dropboxService = new dropbox_service_1.default(clientId, clientSecret, redirectUri);
const dropboxController = new dropBox_contollees_1.default(dropboxService);
router.get('/auth/dropbox', dropboxController.authRedirect.bind(dropboxController));
router.get('/auth/dropbox/callback', dropboxController.authCallback.bind(dropboxController));
router.get('/test-token', dropboxController.testToken.bind(dropboxController));
exports.default = router;
