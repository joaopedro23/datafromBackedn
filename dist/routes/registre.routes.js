"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registre_controller_1 = __importDefault(require("../controllers/registre.controller"));
const authRegistre = (0, express_1.Router)();
const registreController = new registre_controller_1.default();
authRegistre.post('/registre', registreController.post);
exports.default = authRegistre;
