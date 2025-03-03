<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Requisitos para iniciar configuración.

- Tener instalado nodejs 22.x.
- Tener instalado docker.

> [!NOTE]
> Esta configuración solo se hace una cada vez que es clonado.
# Configuración del Proyecto.

Esta configuración solo se aplica una vez clonado el repositorio.

- Clonar el repositorio.
- Instalar los paquetes con el comando ```npm install```.
- Copiar el archivo  ```.env.template```, pegarlo en raiz del directorio y renombrarlo a ```.env```.
- Levantar el contenedor con el comando  ```docker compose up -d```.
- Finalmente, levantar el proyecto con ```npm run start:dev```

# Correr el proyecto
Una vez configurado todo lo anterior , para levantar el proyecto
- Abrir Docker.
- Poner el comando ```npm run start:dev```

## Documentación con swagger
Acceder a la documentación de la API
- Levantar el servidor con el comando ```npm run start:dev```
- Posteriormete de levantar el proyecto ir a la url ```http://localhost:3001/api``` 

***NOTA:*** El **puerto** dependerá de tu variable de entorno.
