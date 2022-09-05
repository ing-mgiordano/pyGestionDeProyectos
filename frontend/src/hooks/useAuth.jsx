import { useContext } from "react";  //usecontext sirve para acceder a la info de un context
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth