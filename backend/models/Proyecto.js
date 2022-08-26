import mongoose from "mongoose";

const proyectoSchema = mongoose.Schema({
   nombre: {
    type: String,
    trim: true,
    require: true,
   },
   descripcion: {
    type: String,
    trim: true,
    require: true,
   },
   fechaEntrega: {
    type: Date,
    default: Date.now()
   },
   cliente: {
    type: String,
    trim: true,
    require: true,
   },
   creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
   },
   colaboradores: [  //colaboradores es un array de objetos porque puede haber mas de uno
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
        },
   ],
},
    {
        timestamps: true,
    }
)

const Proyecto = mongoose.Schema('Proyecto', proyectoSchema)

export default Proyecto