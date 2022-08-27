import Tarea from "../models/Tarea.js";
import Proyecto from "../models/Proyecto.js";

const agregarTarea = async (req, res) => {
    /* console.log(req.body) */
    const {proyecto} = req.body
    const existeProyecto = await Proyecto.findById(proyecto)
    /* console.log(existeProyecto) */
    if (!existeProyecto) {
        const error = new Error("El Proyecto no existe")
        return res.status(404).json({ msg: error.message })
    }
   if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("No Tienes Permisos")
        return res.status(401).json({ msg: error.message })
    }

    try {
        const tareaAlmacenada = await Tarea.create(req.body)
        res.json(tareaAlmacenada)
    } catch (error) {
        console.log(error)
    }
}

const obtenerTarea = async (req, res) => {
    
}

const actualizarTarea = async (req, res) => {
    
}

const eliminarTarea = async (req, res) => {
    
}

const cambiarEstado = async (req, res) => {
    
}

export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
}