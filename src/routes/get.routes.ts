import { Router } from "express";
import Usercontroller from "../controllers/users.controller";

const get = Router();
const usercontroller = new Usercontroller()

get.get('/user', usercontroller.get)

export default get