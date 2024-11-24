# SocialPet - Backend 🐾

**SocialPet** es una red social diseñada para los amantes de los animales. Este repositorio contiene el backend del proyecto, que maneja la lógica del servidor, la base de datos y las APIs necesarias para conectar a los usuarios y sus mascotas.

---

## 🚀 Funcionalidades

- 🛡️ **Autenticación**: Registro de usuarios con contraseñas seguras y tokens JWT.  
- 📄 **Gestión de publicaciones**: Crear, leer, actualizar y eliminar publicaciones con imágenes.  
- 💬 **Sistema de comentarios**: Interactuar dejando comentarios en las publicaciones.  
- 🤝 **Amistades**: Enviar, aceptar y gestionar solicitudes de amistad.  
- 🐾 **Perfiles personalizados**: Personaliza tu perfil con información sobre ti y tus mascotas.  

---

## 📚 Tecnologías Utilizadas

| Tecnología | Descripción                  |
|------------|------------------------------|
| Node.js    | Servidor backend             |
| Express    | Framework web para Node.js   |
| MongoDB    | Base de datos NoSQL          |
| JWT        | Autenticación basada en tokens |
| Multer     | Carga de archivos (imágenes) |
| Dotenv     | Gestión de variables de entorno |

---


---

## 🌟 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/socialpet-backend.git
cd Back-Social-Pet


### 2. Instalar dependencias
```bash
npm install

### 3. Configurar variables de entorno

```bash
PORT=4000
MONGO_URI=tu_mongo_uri
JWT_SECRET=tu_secreto_para_tokens

### 4. Iniciar el servidor
npm start
