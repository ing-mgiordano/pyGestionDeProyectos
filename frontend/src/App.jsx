import { BrowserRouter, Routes, Route} from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import OlvidePassword from './paginas/OlvidePassword'
import NuevoPassword from './paginas/NuevoPassword'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout />}> {/* Seccion publica */}
          <Route index element={<Login />} /> {/* index es lo q se va a cargar en el path /  */}
          <Route path='registrar' element={<Registrar />} />
          <Route path='olvide-password' element={<OlvidePassword />} />
          <Route path='olvide-password/:token' element={<NuevoPassword />} />
          <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
