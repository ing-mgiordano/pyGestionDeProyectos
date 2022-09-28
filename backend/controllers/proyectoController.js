import Proyecto from "../models/Proyecto.js"
import Usuario from "../models/Usuario.js"

//Lista de py del usuario autenticado
const obtenerProyectos = async (req, res) => {
    const proyectos = await Proyecto.find({  //por default es '$and'
     $or : [
          {colaboradores: { $in: req.usuario}},
          {creador: { $in: req.usuario}}
     ]
    })
    .select("-tareas")

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
          .populate({path: "tareas", populate: {path: "completado", select: "nombre" }})
          .populate("colaboradores", "nombre email")
     /* console.log(proyecto) */
     if (!proyecto) {
        const error = new Error("No Encontrado")
        return res.status(404).json({ msg: error.message })
     }

     /* console.log(proyecto.creador.toString() === req.usuario._id.toString()) */ // compruevo que es el usuario el creador del proyecto
     if (proyecto.creador.toString() !== req.usuario._id.toString() && 
          !proyecto.colaboradores.some(
          (colaborador) => colaborador._id.toString() === req.usuario._id.toString()
          )
     ) {
        const error = new Error("No Tienes Permisos")
        return res.status(401).json({ msg: error.message })
     }

     res.json(proyecto)
}

//Editar py
const editarProyecto = async (req, res) => {
    const {id} = req.params

    const proyecto = await Proyecto.findById(id)

   if (!proyecto) {
        const error = new Error("No Encontrado")
        return res.status(404).json({ msg: error.message })
   }

   if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("No Tienes Permisos")
        return res.status(401).json({ msg: error.message })
   }

   proyecto.nombre = req.body.nombre || proyecto.nombre
   proyecto.descripcion = req.body.descripcion || proyecto.descripcion
   proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega
   proyecto.cliente = req.body.cliente || proyecto.cliente

   try {
        const proyectoEditado = await proyecto.save()
        res.json(proyectoEditado)
   } catch (error) {
        console.log(error)
   }
}

//Elimiar py
const eliminarProyecto = async (req, res) => {
    const {id} = req.params

    const proyecto = await Proyecto.findById(id)

   if (!proyecto) {
        const error = new Error("No Encontrado")
        return res.status(404).json({ msg: error.message })
   }

   if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("No Tienes Permisos")
        return res.status(401).json({ msg: error.message })
   }

   try {
        await proyecto.deleteOne()
        res.json({msg: "Proyecto Eliminado Correctamente"})
   } catch (error) {
        console.log(error)
   }
}

//Buscar colaborador
const buscarColaborador = async (req, res) => {
     const {email} = req.body

     const usuario = await Usuario.findOne({email}).select('-confirmado -createdAt -password -token -updatedAt -__v')

     if(!usuario) {
          const error = new Error('Usuario no encontrado')
          return res.status(404).json({ msg: error.message })
     }

     res.json(usuario)
}

//Agregar colaborador
const agregarColaborador = async (req, res) => {
     const proyecto = await Proyecto.findById(req.params.id)

     if(!proyecto) {
          const error = new Error('Proyecto no encontrado')
          return res.status(404).json({ msg: error.message })
     }

     if(proyecto.creador.toString() !== req.usuario._id.toString()) {
          const error = new Error('Accion no Válida')
          return res.status(404).json({ msg: error.message })
     }

     const {email} = req.body

     const usuario = await Usuario.findOne({email}).select('-confirmado -createdAt -password -token -updatedAt -__v')

     if(!usuario) {
          const error = new Error('Usuario no encontrado')
          return res.status(404).json({ msg: error.message })
     }
     //El creador del py no puede ser colaborador
     if(proyecto.creador.toString() === usuario._id.toString()) {
          const error = new Error('El Administrador no puede agregarse como Colaborador')
          return res.status(404).json({ msg: error.message })
     }
     //Revisar si el colaborador esta o no ya agregado
     /* console.log('Identidad usuario', usuario._id) */

     if(proyecto.colaboradores.includes(usuario._id)) {
          const error = new Error('El usuario ya pertenece al Proyecto')
          return res.status(404).json({ msg: error.message })
     }

     //si todo esta ok
     proyecto.colaboradores.push(usuario._id)
     await proyecto.save()
     res.json({msg: "Colaborador agregado Correctamente"})
}

//Elimiar colaborador
const eliminarColaborador = async (req, res) => {
     const proyecto = await Proyecto.findById(req.params.id)

     if(!proyecto) {
          const error = new Error('Proyecto no encontrado')
          return res.status(404).json({ msg: error.message })
     }

     if(proyecto.creador.toString() !== req.usuario._id.toString()) {
          const error = new Error('Accion no Válida')
          return res.status(404).json({ msg: error.message })
     }

     //si todo esta ok
     proyecto.colaboradores.pull(req.body.id)
    
     await proyecto.save()
     res.json({msg: "Colaborador Eliminado Correctamente"})
}

export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    buscarColaborador,
    agregarColaborador,
    eliminarColaborador
}