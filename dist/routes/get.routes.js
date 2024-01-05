"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const get = (0, express_1.Router)();
const usercontroller = new users_controller_1.default();
get.get('/user', usercontroller.get);
exports.default = get;
