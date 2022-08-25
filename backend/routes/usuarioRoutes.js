import express  from "express";
import { 
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil
} from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router()

//Autenticacion, registro y confirmacion usuarios
router.post('/', registrar) //crea un nvo usuario
router.post('/login', autenticar)
router.get('/confirmar/:token', confirmar) //con los : generamos routing dinamico ya que token va a tomar diferentes valores
router.post('/olvide-password', olvidePassword)
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword) // si tenemos dos rutas iguales pero con diferente HTTP podemos unificarlas con express

router.get('/perfil', checkAuth, perfil)

export default router