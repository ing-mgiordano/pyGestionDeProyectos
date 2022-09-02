## APP Gestion de PY

https://mongoosejs.com/docs/guide.html

#BACKEND

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

Dentro del Controlador Creamos:
 la funcion de nuevo proyecto
 la funcion de obtener proyectos 
 la funcion de obtener un proyecto
 la funcion para ediar un proyecto
 la funcion para eliminar un proyecto

Creamos el Modelo el Controlador y Routes para Tareas
 y creamos las funciones del controlador para las tareas


#FRONTEND

npm create vite@latest
framework REACT

intalamos las dependencias con npm intall
intalamos axios para peticiones HTTPpara cominacion con backend y react-router-dom para tener routing en el py
npm i axios react-router-dom

y corremos el py. npm run dev

intalamos tailwindcss para los estilos.

npm i -D tailwindcss postcss autoprefixer

creamos el archivo de configuracion de tailwindcss y post
npx tailwindcss init -p

en tailwind.config agregamos content: ["index.html", "./src/**/*.jsx"]

y en index.css escribimos @tailwind base;
@tailwind components;
@tailwind utilities;

reiniciamos el servidor y lo volvemos a ejecutar.

Creamos routing. 
vamos a tener dos grupos de rutas uno privado para los usuarios registrados y una publica para registrarser

Creamos el layout principal con todas las paginas publicas, creamos todas las paginas necesarias y añadimos routing entre ellas.

Agregamos useState en el formulario de registro y validamos el formulario. 
Creamos el componente de Alerta.jsx
Validamos que password sean iguales

Una vez validados los campos de Registro, enviamos un request a la API. Conectamos backend con frontend mediante axios.
Debemos habilitar peticiones por CORS en el backend para poder conectas las peticiones entre los localhost

en la carpeta del backend intalamos CORS 
npm i cors 
y lo importamos en index.js en el backend

creamos la whitelist y configuramos cors.

Agregamos las rutas de la API como variables de entorno