## APP Gestion de PY

https://mongoosejs.com/docs/guide.html

en la carpeta backend:

creamos el package.json: en la terminal escribimos npm init.

intalamos express: npm i express

ejecutamos scripts": {
    "dev": "node index.js"
} 

npm run dev.

intalamos nodemon para que se reinicie el servidor automaticamente cada vez que hay un cambio. npm i -D nodemon.

usamos MongoDB como base de datos. 
conectamos MongoDB con Compass y conectamos la app con mongodb+srv://ing-mgiordano:<password>@cluster0.vt6ax.mongodb.net/?retryWrites=true&w=majority .
cramos el archivo db.js en config.
en el directorio base del py intalamos mongoose: npm i mongoose para conetar la App a la base de datos(db)

en el directorio backend
ocultamos la conexion de la BD con variables de entorno: intalamos npm i dotenv.

Model View Controler. Lo usamos como patron de arquitectura del software. 
MODELO encargado de todo lo relacionado con la base de datos. Se encarga de consultar una base de datos.
VISTA se encarga de mostrar todo el contenido en pantalla (HTML). Muestra los resultados obtenidos por el MODELO al consultar la base de datos. En este caso REACT es la VISTA.
CONTROLADOR comunica el MODELO y VISTA. Le dice al MODELO que consule la base de datos y le comnunica a la VISTA los datos obtenidos del MODELO. En el CONTROLADOR van las interacciones con la base de datos y las respuestas tipo JSON.
ROUTER encargado de registrar las URLs o Endpoints que posorta la aplicacion


usamos Postman. Plataforma API para construir y usar API. Postman simplifica cada paso del ciclo de vida de la API y agiliza la colaboración para que pueda crear mejores API, más rápido.

instalamos bcrypt para encriptar las contraseñas: npm i bcrypt

Generamos un ID con un token unico para la validacion de usuarios. Creamos el archivo generarID. 

Creamos ENDPOINT de autenticacion. creamos la funcion autenticar y en postman creamos el endpoint.
realizamos la comprobacion si existe usuario, si el usuario esta confirmado y por ultimo comprobamos password.

Creamos un JWT (JSON web token - https://jwt.io/). Instalamos JWT con npm i jsonwebtoken y creamos otro helpers generarJWR.js

Creamos ENDPOINT para la confirmacion de las cuentas.
en Routers creamos una nueva ruta para confirmar la cuenta creando la funcion confirmar.

Creamos una funcion para resetear el password en caso de que el usuario se olvide. 
creamos una nueva ruta en Routes para enviar un nuevo token y creamos una nueva ruta para confirmar ese token.
Ahora creamos una nueva ruta para modificar el password

Creamos el middleware para realizar el checkeo de que el usuario este autenticado y mostrar su perfil

Creamos el MODELO para Proyectos
Creamos el CONTROLADOR para Proyectos
Creamos routes para los proyectos

Dentro del Controlador Creamos la funcion de nuevo proyecto