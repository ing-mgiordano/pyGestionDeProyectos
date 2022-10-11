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

Instalamos Nodemailer para enviar el email con Node, para confirmacion de la cuenta  (https://nodemailer.com/about/) en el backend
npm install nodemailer.

Tenemos que configurar un servidor de emails, podemos utilizar mailtrap (https://mailtrap.io/). 

copiamos las credenciales para Nodemailer y creamos un archivo helpers para enviar los emails de confirmacion y de olvide-password.

creamos la funcion de confirmarcuenta
Confirmamos cuenta via token

Creamos funcion para recuperar password

Movemos todo a una instancia de Axios con variables de entorno
Creamos carpeta config y creamos archivo clienteAxios

Validamos y autenticmos el inicio de secion del usuario y almacenamos el token del usuario en localstorage porq para poder crear proyectos o modificar algo necesitamos el token de validacion del usuario.

Creamos contex API
creamos la carpeta context y archivo AuthProvider
y creamos un hook para el context de autenticacion para poder acceder a los datos
y creamos el state para autenticacion

Revisamos el token almacenado en localStorage para autenticar al usuario.

Creamos el routing para el area privada
Definimos el area privada dentro de App.jsx

Realizamos la autenticacion del usuario para poder acceder al area privada 

Dentro del area de proyectos creamos el header y la sidebar

Creamos la ruta a nuevo proyecto

Creamos el context para proyectos y creamos el hook para el context de proyectos

Creamos el formulario para crear un nuevo proyecto, lo validamos y enviamos los datos al context.

Obtenemos los datos del proyecto y los mostramos en la pagina proyectos. 

Creamos una copia del array proyectos y le agregamos data nuevamente para que se muestre el ultimo py creado sin tener que actualizar la pagina

Creamos el componente proyecto para poder visualizar un proyecto y sus tareas mediante su ID.

Añadimos routing para poder editar un py.
vamos a https://heroicons.com/ y seleccionamos un icono de editar.
Creamos la pagina de EditarProyecto

Actualizamos el state para visualizar las ediciones realizadas

Creamos la funcion para eliminar un proyecto
vamos a https://heroicons.com/ y buscamos un icono de trash.
Actualizamos el state para eliminar el py

Creamos boton para agregar tareas al py
Agregamos una ventana modal usando https://headlessui.com/ Headless UI. Intalamos una ventana modal npm install @headlessui/react y creamos un componente Modal. Creamos el formulario para crear tareas dentro del modal.
Validamos el formulario y enviamos los datos obtenidos de tarea a la base de datos.

En el backend almacenamos el ID de las tareas en los proyectos que pertenecen c/u (pyoyecto.js)

En tareasController agregamos la tarea mediante un push(). (lo podemos usar porq es node, no react)

En proyectoController agrego un populate a la funcion de obtenerProyecto y en la funcion obtenerProyectos agregamos select("-tareas") para que no me liste las tareas cuando consulto los proyectos en general.

Creamos el componente Tarea y extraemos la info de las tareas mediante un .map

Actualizamos el state con las tareas y limpiamos el modal una vez q se haya creado la tarea

Creamos funcion para editar tareas. Realizamos la actualizacion del state con la tarea actualizada
Creamos funcion para eliminar tareas. Realizamos la actualizacion del state

Creamos funcion para añadir un colaborador al proyecto
Creamos la ruta en app.jsx para añadir colaborador y el componenete NuevoColaborador y el componente FormularioColaborador para agregar los datos.

Creamos funcion para eliminar colaborador y actualizamos el state

Mostramos los proyectos dentro del perfil de los usuarios que son colaboradores y les damos los permisos para ver la info

Restringimos los permisos para crear o eliminar tareas y agregar colaboradores. Para esto creamos un hook useAdmin y verificamos que proyecto.creador === auth._id

Creamos funcion para cambiar el estado de las tareas(incompletas o completas)

Agregamos etiqueta de colaborador si corresponde en cada proyecto.

Mostramos quien completo una tarea.

Añadimos un buscador de proyectos.

Instalamos socket.IO (https://socket.io/). Instalamos la API del servidor y la API del cliente
En Frontend intalamos: npm i socket.io-client
En backend instalamos: npm i socket.io (servidor)

Añadimos socket.io al servidor.

Conectamos socket con el frontend
Enviamos datos desde el Front al back con Socket. usamos el evento emit() para emitir un evento y on() para decirle que hacer con ese evento

Enviamos datos del back al front con Socket.

Modificamos la funcion agrgar tarea, editar, eliminar y completar con socket.io para que se actuaize en tiempo real en todos los usuariios 