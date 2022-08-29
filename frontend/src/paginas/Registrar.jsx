import { Link } from "react-router-dom"

const Registrar = () => {
  return (
    <>
        <h1 className="text-sky-600 font-black text-6xl capitalize">
            Crea tu 
            <span className="text-slate-700"> cuenta</span>
        </h1>

        <form action="" className="my-10 bg-white shadow rounded-lg p-10">
            <div className="my-5">
                <label 
                    htmlFor="nombre" 
                    className="uppercase text-gray-600 block text-xl font-bold cursor-pointer"
                >Nombre
                </label>
                <input 
                    type="nombre"
                    id="nombre"
                    placeholder="Nombre"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                />
            </div>
            
            <div className="my-5">
                <label 
                    htmlFor="email" 
                    className="uppercase text-gray-600 block text-xl font-bold cursor-pointer"
                >Email
                </label>
                <input 
                    type="email"
                    id="email"
                    placeholder="Email de Registro"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                />
            </div>

            <div className="my-5">
                <label
                    htmlFor="password" 
                    className="uppercase text-gray-600 block text-xl font-bold cursor-pointer"
                >Password
                </label>
                <input 
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                />
            </div>

            <div className="my-5">
                <label
                    htmlFor="password2" 
                    className="uppercase text-gray-600 block text-xl font-bold cursor-pointer"
                >Repetir Password
                </label>
                <input 
                    type="password"
                    id="password2"
                    placeholder="Repetir tu Password"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                />
            </div>

            <input 
                type="submit" 
                value="Crear Cuenta"
                className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />
        </form>

        <nav className="lg:flex lg:justify-between">
            <Link
                className="block text-center my-5 text-slate-500 uppercase text-sm"
                to='/'
            >
                ¿Ya tienes una cuenta? Inicia Sesión
            </Link>
            <Link
                className="block text-center my-5 text-slate-500 uppercase text-sm"
                to='olvide-password'
            >
                Olvide Mi Password
            </Link>

        </nav>
    </>
  )
}

export default Registrar
