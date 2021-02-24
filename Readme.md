Pasos para correr el aplicativo:
1. Crear una base de datos 
2. Crear un archivo .env con las siguientes propiedades y poner la información para la conexión a la base de datos
    DB_USERNAME
    DB_PASSWORD
    DB_HOST
    DB_DATABASE
    JWT_SECRET
    PORT
    DB_DATABASE_TEST
3. Ejecutar los siguientes comandos:
    npm install (para instalar las dependencias)
    npx sequelize-cli db:migrate (para correr las migraciones)
    npx sequelize-cli db:seed:all (para correr los seeders)
    npm start (para iniciar el servidor)


Pasos para correr las pruebas:
1. Ejecutar el siguiente comando:
    npm run db:create:test (esto creará una BD para correr las pruebas)
2. En el archivo config/config.js en en atributo "database" de development, cambiar process.env.DB_DATABASE por process.env.DB_DATABASE_TEST (para conectar con la BD para pruebas) y correr los siguientes comandos:
    npx sequelize-cli db:migrate (para correr las migraciones en la BD para pruebas)
    npx sequelize-cli db:seed:all (para correr los seeders en la BD para pruebas)
3. En el archivo config/config.js, para las credenciales de development, en el atributo "database" volver a cambiar process.env.DB_DATABASE_TEST por process.env.DB_DATABASE
3. Ejecutar el siguiente comando:
    npm run test  (para correr las pruebas)      