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