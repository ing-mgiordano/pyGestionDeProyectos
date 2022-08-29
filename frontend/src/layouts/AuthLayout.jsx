import { Outlet } from "react-router-dom" // muestra el contenido de los componentes hijos que definimos en el routing

const AuthLayout = () => {
  return (
    <>
        <div>authlayout</div>

        <Outlet />
    </>
  )
}

export default AuthLayout
