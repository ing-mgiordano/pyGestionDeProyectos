import { useState, useEffect, createContext } from "react"
import { useNavigate } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"

const ProyectosContext = createContext()

const ProyectosProvider = ({children}) => {

    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState({})
    const [proyecto, setProyecto] = useState({})
    const [cargando, setCargando] = useState(false)
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false)
    const [tarea, setTarea] = useState({})
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
    const [colaborador, setColaborador] = useState({})
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return
    
                //configuracion para el token de autenticacion (mirar el middleware)
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios.get('/proyectos', config)
                /* console.log(data) */
                setProyectos(data)

            } catch (error) {
                console.log(error)
            }
        }
        obtenerProyectos()
    }, [])

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 3000)
    }


    const submitProyecto = async proyecto => {

        /* console.log(proyecto) */
        
        if(proyecto.id) {
            await editarProyecto(proyecto)
        } else {
            await nuevoProyecto(proyecto)
        }
    }

    const editarProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            //configuracion para el token de autenticacion (mirar el middleware)
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)
            /* console.log(data) */

            //Sincronizamos el state
            const proyectosActualizados = proyectos.map(proyectoState => 
                proyectoState._id === data._id ? data : proyectoState
            )

            /* console.log(proyectosActualizados) */
            setProyectos(proyectosActualizados)
            
            mostrarAlerta({
                msg: 'Proyecto Actualizado Correctamente',
                error: false
            })
            
            setTimeout(() => {
                navigate(`/proyectos`)
            }, 4000)

        } catch (error) {
            console.log(error)
        }
    }

    const nuevoProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            //configuracion para el token de autenticacion (mirar el middleware)
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/proyectos', proyecto, config)
            /* console.log(data) */
            setProyectos([...proyectos, data]) //para poder mostrar el utimo proyecto en la lista de py sin actualizar pagina

            mostrarAlerta({
                msg: 'Proyecto Creado Correctamente',
                error: false
            })

            setTimeout(() => {
                navigate('/proyectos')
            }, 4000)

        } catch (error) {
            console.log(error)
        }
    }

    const obtenerProyecto = async id => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
                if(!token) return
    
            //configuracion para el token de autenticacion (mirar el middleware)
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.get(`/proyectos/${id}`, config)
            setProyecto(data)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setCargando(false)
        }
    }

    const eliminarProyecto = async id => {
        try {
            const token = localStorage.getItem('token')
                if(!token) return
    
            //configuracion para el token de autenticacion (mirar el middleware)
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.delete(`/proyectos/${id}`, config)
            /* console.log(data) */

            //Sincronizamos el state
            const proyectosActualizados = proyectos.filter(proyectoState => 
                proyectoState._id !== id
            )
            /* console.log(proyectosActualizados) */
            setProyectos(proyectosActualizados)
            
            setAlerta({
                msg: data.msg,
                error: true
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 4000)
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalTarea = () => {
        setModalFormularioTarea(!modalFormularioTarea)
        setTarea({})
    }

    const handleModalEditarTarea = tarea => {
        setTarea(tarea)
        setModalFormularioTarea(true)
    }

    const handleModalEliminarTarea = tarea => {
        setTarea(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }

    const submitTarea = async tarea => {
        /* console.log(tarea) */

        if(tarea?.id) {
            await editarTarea(tarea)
        } else {
            await crearTarea(tarea)
        }

    }

    const editarTarea = async tarea => {
        try {
            const token = localStorage.getItem('token')
                if(!token) return
    
            //configuracion para el token de autenticacion (mirar el middleware)
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
    
            const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config)

            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => 
                tareaState._id === data._id ? data : tareaState)

            setProyecto(proyectoActualizado)
            setAlerta({})
            setModalFormularioTarea(false)
        } catch (error) {
            console.log(error)
        }
    }
    
    const crearTarea = async tarea => {
        try {
            const token = localStorage.getItem('token')
                if(!token) return
    
            //configuracion para el token de autenticacion (mirar el middleware)
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
    
            const { data } = await clienteAxios.post('/tareas', tarea, config)
            /* console.log(data) */
    
            //Agregamos tarea al State
            const proyectoActualizado = {...proyecto }
            proyectoActualizado.tareas = [...proyecto.tareas, data]
    
            setProyecto(proyectoActualizado)
    
            setAlerta({})
            setModalFormularioTarea(false)
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarTarea = async () => {
        try {
            const token = localStorage.getItem('token')
                if(!token) return
    
            //configuracion para el token de autenticacion (mirar el middleware)
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`, config)

            //Sincronizamos el state
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState => 
                tareaState._id !== tarea._id
            )
            /* console.log(proyectosActualizados) */
            setProyecto(proyectoActualizado)
            setAlerta({
                msg: data.msg,
                error: true
            })
            setModalEliminarTarea(false)
            setTarea({})
            
            setTimeout(() => {
                setAlerta({})
            }, 3000)
        } catch (error) {
            console.log(error)
        }
    }

    const submitColaborador = async email => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
                if(!token) return
    
            //configuracion para el token de autenticacion (mirar el middleware)
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            } 

            const { data } = await clienteAxios.post('/proyectos/colaboradores', {email}, config)
            /* console.log(data)*/

            setColaborador(data)
            setAlerta({})
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setCargando(false)
        }
    }

    const agregarColaborador = async email => {
        /* console.log(email)
        console.log(proyecto) */
    
        try {
            const token = localStorage.getItem('token')
                if(!token) return
    
            //configuracion para el token de autenticacion (mirar el middleware)
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            } 

            const { data } = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, email, config)
            /* console.log(data) */

            setAlerta({
                msg: data.msg,
                error: false,
            })
            setColaborador({})
            
            setTimeout(() => {
                setAlerta({})
            }, 3000)
            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true,
            })
        }
    }

    const handleEliminarColaborador = (colaborador) => {
        setModalEliminarColaborador(!modalEliminarColaborador)
        setColaborador(colaborador)
    }

    const eliminarColaborador = async () => {
        try {
            const token = localStorage.getItem('token')
                if(!token) return
    
            //configuracion para el token de autenticacion (mirar el middleware)
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            } 

            const { data } = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, { id: colaborador._id }, config)

            const proyectoActualizado = {...proyecto}

            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id)

            setProyecto(proyectoActualizado)

            setAlerta({
                msg: data.msg,
                error: true
            })
            setColaborador({})
            setModalEliminarColaborador(false)
            setTimeout(() => {
                setAlerta({})
            }, 3000)
        } catch (error) {
            console.log(error.response)
        }
    }

    return (
        <ProyectosContext.Provider
            value={{
                proyectos,
                mostrarAlerta,
                alerta,
                submitProyecto,
                obtenerProyecto,
                proyecto,
                cargando,
                eliminarProyecto,
                modalFormularioTarea,
                handleModalTarea,
                submitTarea,
                handleModalEditarTarea,
                tarea,
                modalEliminarTarea,
                handleModalEliminarTarea,
                eliminarTarea,
                submitColaborador,
                colaborador,
                agregarColaborador,
                handleEliminarColaborador,
                modalEliminarColaborador,
                eliminarColaborador
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export {
    ProyectosProvider
}
export default ProyectosContext
