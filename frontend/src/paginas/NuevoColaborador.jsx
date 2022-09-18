import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import FormularioColaborador from "../components/FormularioColaborador"
import Alerta from "../components/Alerta"

const NuevoColaborador = () => {

    const { obtenerProyecto, proyecto, cargando, colaborador, agregarColaborador, alerta } = useProyectos()
    const params = useParams()

    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])

   /*  console.log(colaborador) */

    if(!proyecto?._id) return <Alerta alerta={alerta} />
  return (
    <>
        <h1 className="font-black text-4xl">
            Añadir Colaborador(a) al Proyecto: {proyecto.nombre}
        </h1>

        <div className="mt-10 flex justify-center">
            <FormularioColaborador />
        </div>

        {cargando ? <p className="text-center">Cargando...</p> : colaborador?._id && (
           <div className="flex justify-center mt-10">
                <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
                    <h2 className="text-center mb-10 text-2xl font-bold">
                        Resultado:
                    </h2>
                    <div className="flex justify-between items-center">
                        <p>{colaborador.nombre}</p>
                        <button
                            onClick={() => agregarColaborador({
                                email: colaborador.email
                            })}
                            type="button"
                            className="bg-slate-500 ml-2 px-5 py-2 rounded-lg uppercase text-white"
                        >Agregar al Proyecto</button>
                    </div>
                </div>
           </div> 
        )}
    </>
  )
}

export default NuevoColaborador
