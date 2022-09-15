import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import FormularioColaborador from "../components/FormularioColaborador"

const NuevoColaborador = () => {

    const { obtenerProyecto, proyecto, cargando } = useProyectos()
    const params = useParams()

    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])

    if(cargando) return 'Cargando...'

  return (
    <>
        <h1 className="font-black text-4xl">
            Añadir Colaborador(a) al Proyecto: {proyecto.nombre}
        </h1>

        <div className="mt-10 flex justify-center">
            <FormularioColaborador />
        </div>
    </>
  )
}

export default NuevoColaborador
