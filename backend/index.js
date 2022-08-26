import express  from 'express'  // esta notacion la podemos usar si dentro del package.json agregamos "type": "module"
import dotenv from 'dotenv'
import conectarDB from './config/db.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'

const app = express()
app.use(express.json())

dotenv.config()

conectarDB()

//Rounting

app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})
