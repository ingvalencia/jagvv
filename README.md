# MyApp

## 0. Descripción
La aplicación desarrollada que da solución al ejercicio propuesto se basa en un frontend (un formulario) hecho con Angular y Material 17. Para lograr lo anterior se utilizó Docker, quien conteneriza todo este ecosistema basado en Angular. La comunicación con el backend se hace por medio de un service y la creación de un proxy que permite solventar el problema de restricción por CORS que se tiene al llamar a un servicio expuesto en un servidor (en este caso el API de proc-leads) desde un desarrollo o servidor local.

## 1. Software previo requerido
Se debe instalar Docker y también Docker Compose, esto depende del sistema operativo que se use. La forma más sencilla de contar con lo anterior es, en Windows y/o Mac, instalando Docker Desktop.

## 2. Uso

### 2.1 Clonar el repositorio
`https://github.com/ingvalencia/jagvv`

### 2.2 Acceder a la carpeta raíz usando la terminal del S. Op.
`cd jagvv`

### 2.3 Iniciar el contenedor
Desde la misma terminal, ejecutar el comando que se encargará de ejecutar todo el pipeline descrito en el archivo docker-compose.yml:

`docker-compose up --build`

### 2.4 Desde un navegador web, ingresar a
`http://localhost:4200/`

### 2.5 Capturar los datos para el registro del lead

## 3. Otros comandos Docker

- Listar los contenedores:
`docker ps`

- Acceder al contenedor de la aplicación:
`docker exec -it jagvv-angular-dev-1 /bin/bash`

- Detener el contenedor:
`docker stop jagvv-angular-dev-1`

- Iniciar el contenedor:
`docker-compose up --build`

- Reiniciar el contenedor:
`docker-compose restart`

- Recrear desde cero el contenedor:
`docker-compose down && docker-compose up --build`

## Desarrollo con Angular

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 17.3.1. Para obtener más ayuda sobre Angular CLI use `ng help` o vaya a la [página de Angular CLI Overview and Command Reference](https://angular.io/cli).
