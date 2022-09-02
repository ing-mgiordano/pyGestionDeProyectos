import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {
    /* console.log('DATOS', datos) */

    const { email, nombre, token } = datos

    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "c3c7b83b44caed",
          pass: "9307f872497bb6"
        }
    });

    //Informacion de email
    const info = await transport.sendMail({
        from: '"Up-Task - Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Confirma tu Cuenta",
        text: "Compueba tu cuenta en UpTask",
        html: `<p>Hola ${nombre}, confirma tu cuenta en UpTask</p>
        <p>Tu cuenta ya esta casi lista, solo debes confirmarla en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
        </p>

        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje.</p>
        `
    })

}