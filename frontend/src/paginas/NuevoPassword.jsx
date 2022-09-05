import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {

  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})
  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams()
  /* console.log(params) */
  const {token} = params

  useEffect(() => {
    const comprobarToken = async () =>{
      
      try {
        const url = `/usuarios/olvide-password/${token}`
        await clienteAxios(url)

        setTokenValido(true)

      } catch (error) {
        /* console.log(error.response) */
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    comprobarToken()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    if([password, repetirPassword].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if(password !== repetirPassword) {
      setAlerta({
        msg: 'Los Passwords no son iguales',
        error: true
      })
      return
    }

    if(password.length < 6) {
      setAlerta({
        msg: 'El Password es muy corto. Minimo 6 caracteres',
        error: true
      })
      return
    }

    setAlerta({})

    try {
      const url = `/usuarios/olvide-password/${token}`
      const { data } = await clienteAxios.post(url, 
      {password})
      /* console.log(data) */

      setAlerta({
        msg: data.msg,
        error: false
      })

      setPasswordModificado(true)

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Restablece tu
        <span className="text-slate-700"> password</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      {tokenValido && (
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold cursor-pointer"
            >
              Nuevo Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange = {e => setPassword(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              htmlFor="password2"
              className="uppercase text-gray-600 block text-xl font-bold cursor-pointer"
            >
              Repetir Password
            </label>
            <input
              type="password"
              id="password2"
              placeholder="Repetir tu Password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={repetirPassword}
              onChange = {e => setRepetirPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Guardar Nuevo Password"
            className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}

      {passwordModificado && (
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Inicia Sesión
        </Link>
      )}
    </>
  );
};

export default NuevoPassword;
