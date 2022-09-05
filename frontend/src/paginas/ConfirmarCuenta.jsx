import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom" //useParams para tener acceso a la info de las URLS
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"

const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  const params = useParams()
  /* console.log(params) */
  const {id} = params

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`  // url creada en Postman para confirmar cuenta
        const {data} = await clienteAxios(url) //get por default
        console.log(data)

        setAlerta({
          msg: data.msg,
          error: false
        })
        setCuentaConfirmada(true)

      } catch (error) {
        /* console.log(error) */
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    return () => {confirmarCuenta()} // con este return resuelvo el problema de que no me muestre le mensaje de usuario confirmado
  }, [])

  const {msg} = alerta


  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirma tu
        <span className="text-slate-700"> cuenta</span>
      </h1>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-gray-100 ">
        {msg && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
        >
          Inicia Sesión
        </Link>
        )}
      </div>
    </>
  )
}

export default ConfirmarCuenta
