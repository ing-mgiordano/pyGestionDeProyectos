import express  from "express";
import { registrar, autenticar, confirmar } from "../controllers/usuarioController.js";

const router = express.Router()

//Autenticacion, registro y confirmacion usuarios
router.post('/', registrar) //crea un nvo usuario
router.post('/login', autenticar)
router.get('/confirmar/:token', confirmar) //con los : generamos routing dinamico ya que token va a tomar diferentes valores

export default router