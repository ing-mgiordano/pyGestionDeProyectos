import Usuario from "../models/Usuario.js"
import generarID from "../helpers/generarID.js"
import generarJWT from "../helpers/generarJWT.js"
import { emailRegistro, emailOlvidePassword } from "../helpers/email.js"

const registrar = async (req, res) => {

    //Evitar usuarios duplicados
    const {email} = req.body
    const existeUsuario = await Usuario.findOne({email: email})
    
    if(existeUsuario) {
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({msg: error.message})
    }
    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarID()
        await usuario.save()

        //Enviar email de confirmacion
        /* console.log(usuario) */
        emailRegistro({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })

        res.json({msg: 'Usuario Creado Correctamente, Revisa tu Email para confirmar tu Cuenta'})
    } catch (error) {
        console.log(error)
    }
}

const autenticar = async (req, res) => {
    const {email, password} = req.body

    // Comprobamos si usuario existe
    const usuario = await Usuario.findOne({email})
    if(!usuario) {
        const error = new Error("El Usuario no existe")
        return res.status(404).json({msg: error.message})
    }
    // Comprobamos si usuario esta confirmado
    if(!usuario.confirmado) {
        const error = new Error("Tu cuenta no ha sido confirmada")
        return res.status(403).json({msg: error.message})
    }
    // Comprobamos password
    if(await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
        })
    } else  {
        const error = new Error("El Password es Incorrecto")
        return res.status(403).json({msg: error.message})
    }
}

// Confirmar cuenta
const confirmar = async (req, res) => {
    const {token} = req.params
    const usuarioConfirmar = await Usuario.findOne({token})
    if(!usuarioConfirmar) {
        const error = new Error("Token no Valido")
        return res.status(403).json({msg: error.message})
    }
    try {
        usuarioConfirmar.confirmado = true
        usuarioConfirmar.token = ""
        await usuarioConfirmar.save()
        res.json({msg: 'Usuario Confirmado Correctamente'})
    } catch (error) {
        console.log(error)
    }
}

// Olvido de contraseña
const olvidePassword = async (req, res) => {
    const {email} = req.body  //le pedimos al usuario su email
    const usuario = await Usuario.findOne({email})
    if(!usuario) {
        const error = new Error("El Usuario no existe")
        return res.status(404).json({msg: error.message})
    }
    try {
       usuario.token = generarID()
       await usuario.save()

       //Enviar mail de recuperacion
       emailOlvidePassword({
        email: usuario.email,
        nombre: usuario.nombre,
        token: usuario.token
       })
       
       res.json({msg: "Hemos enviado un email con las instrucciones"})
    } catch (error) {
        console.log(error)
    }
}

const comprobarToken = async (req, res) => {
    const {token} = req.params
    const tokenValido = await Usuario.findOne({token})
    if(tokenValido) {
        res.json({msg: "Token Valido y el Usuario Existe"})
    } else {
        const error = new Error("Token no Valido")
        return res.status(404).json({msg: error.message})
    }
}

const nuevoPassword = async (req, res) => {
    const {token} = req.params
    const {password} = req.body
    
    const usuario = await Usuario.findOne({token})
    if(usuario) {
        usuario.password = password
        usuario.token = ""
        try {
            await usuario.save()
            res.json({msg: "Password modificado Correctamente"})
        } catch (error) {
            console.log(error)
        }
    } else {
        const error = new Error("Token no Valido")
        return res.status(404).json({msg: error.message})
    }
}

const perfil = async (req, res) => {
    const {usuario} =req

    res.json(usuario)
}

export {
    registrar,
    autenticar, 
    confirmar, 
    olvidePassword, 
    comprobarToken,
    nuevoPassword, 
    perfil
}