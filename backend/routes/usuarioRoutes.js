import express  from "express";
import { registrar, autenticar } from "../controllers/usuarioController.js";

const router = express.Router()

//Autenticacion, registro y confirmacion usuarios
router.post('/', registrar) //crea un nvo usuario
router.post('/login', autenticar)

export default router