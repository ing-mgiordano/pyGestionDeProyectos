import express  from 'express'  // esta notacion la podemos usar si dentro del package.json agregamos "type": "module"
import dotenv from 'dotenv'
import cors from 'cors'
import conectarDB from './config/db.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'

const app = express()
app.use(express.json())

dotenv.config()

conectarDB()

//Config CORS
const whitelist = ['http://127.0.0.1:5173']

const corsOptions = {
    origin: function(origin, callback) {
        if(whitelist.includes(origin)) {
            //puede consultar la API
            callback(null, true)
        } else {
            //no esta permitido
            callback(new Error('Error de CORS'))
        }
    }
}
app.use(cors(corsOptions))

//Rounting
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)
app.use('/api/tareas', tareaRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})
