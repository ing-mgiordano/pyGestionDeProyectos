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
        return res.status(403).json({ msg: error.message })
    }

    try {
        const tareaAlmacenada = await Tarea.create(req.body)
        //Almacenamos ID en el py
        existeProyecto.tareas.push(tareaAlmacenada._id)
        await existeProyecto.save()
        res.json(tareaAlmacenada)
    } catch (error) {
        console.log(error)
    }
}

const obtenerTarea = async (req, res) => {
    const {id} = req.params
    const tarea = await Tarea.findById(id).populate("proyecto")
    /* console.log(tarea) */

    if (!tarea) {
        const error = new Error("La Tarea no existe")
        return res.status(404).json({ msg: error.message })
    }
    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("No Tienes Permisos")
        return res.status(403).json({ msg: error.message })
    }
    res.json(tarea)
}

const actualizarTarea = async (req, res) => {
    const {id} = req.params
    const tarea = await Tarea.findById(id).populate("proyecto")
    /* console.log(tarea) */

    if (!tarea) {
        const error = new Error("La Tarea no existe")
        return res.status(404).json({ msg: error.message })
    }
    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("No Tienes Permisos")
        return res.status(403).json({ msg: error.message })
    }

    tarea.nombre = req.body.nombre || tarea.nombre
    tarea.descripcion = req.body.descripcion || tarea.descripcion
    tarea.prioridad = req.body.prioridad || tarea.prioridad
    tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega

    try {
        const tareaAlmacenada = await tarea.save()
        res.json(tareaAlmacenada)
    } catch (error) {
        console.log(error)
    }
}

const eliminarTarea = async (req, res) => {
    const {id} = req.params
    const tarea = await Tarea.findById(id).populate("proyecto")
    /* console.log(tarea) */

    if (!tarea) {
        const error = new Error("La Tarea no existe")
        return res.status(404).json({ msg: error.message })
    }
    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("No Tienes Permisos")
        return res.status(403).json({ msg: error.message })
    }

    try {
        const proyecto = await Proyecto.findById(tarea.proyecto)
        proyecto.tareas.pull(tarea._id)
        // si tengo muchos await puedo usar await Promise para no bloquear las lineas de abajo
        // se inician al mismo tiempo.. no se bloquean uno al otro
        await Promise.allSettled([await proyecto.save(), await tarea.deleteOne()])
        
        res.json({ msg: "Tarea Eliminada Correctamente"})
    } catch (error) {
        console.log(error)
    }
}

const cambiarEstado = async (req, res) => {
    const {id} = req.params
    const tarea = await Tarea.findById(id).populate("proyecto")
    
    if (!tarea) {
        const error = new Error("La Tarea no existe")
        return res.status(404).json({ msg: error.message })
    }
    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString() && 
        !tarea.proyecto.colaboradores.some(
        (colaborador) => colaborador._id.toString() === req.usuario._id.toString()
        )
    ) {
        const error = new Error("No Tienes Permisos")
        return res.status(403).json({ msg: error.message })
    }
    tarea.estado = !tarea.estado
    tarea.completado = req.usuario._id
    await tarea.save()

    const tareaAlmacenada = await Tarea.findById(id).populate("proyecto").populate("completado")

    res.json(tareaAlmacenada)
    /* console.log(tarea) */
        
}

export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
}