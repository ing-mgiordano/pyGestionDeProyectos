import Proyecto from "../models/Proyecto.js"

//Lista de py del usuario autenticado
const obtenerProyectos = async (req, res) => {
    const proyectos = await Proyecto.find().where("creador").equals(req.usuario)

    res.json(proyectos)
}

//Crea nuevo py
const nuevoProyecto = async (req, res) => {
    /* console.log(req.body)
    console.log(req.usuario) */

    const proyecto = new Proyecto(req.body)
    proyecto.creador = req.usuario._id

    try {
        const proyectoAlmacenado = await proyecto.save()
        res.json(proyectoAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

//Lista un py y tareas asociadas a el
const obtenerProyecto = async (req, res) => {
    const {id} = req.params
    /* console.log(id) */
    const proyecto = await Proyecto.findById(id)
    /* console.log(proyecto) */
   if (!proyecto) {
        const error = new Error("No Encontrado")
        return res.status(404).json({ msg: error.message })
   }

   console.log(proyecto.creador.toString() === req.usuario._id.toString()) // compruevo que es el usuario el creador del proyecto
   if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("No Tienes Permisos")
        return res.status(401).json({ msg: error.message })
   }

   res.json(proyecto)
}

//Editar py
const editarProyecto = async (req, res) => {

}

//Elimiar py
const eliminarProyecto = async (req, res) => {

}

//Agregar colaborador
const agregarColaborador = async (req, res) => {

}

//Elimiar colaborador
const eliminarColaborador = async (req, res) => {

}

//Obtener tareas
const obtenerTareas = async (req, res) => {

}

export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    obtenerTareas
}