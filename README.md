# Sistema de Alquiler de Canchas

Una aplicación web full-stack para la gestión y reserva de canchas deportivas, desarrollada con React, Node.js, Express y MySQL.

## 🏆 Características

- **Gestión de Canchas**: Panel administrativo para agregar y gestionar canchas
- **Sistema de Reservas**: Los usuarios pueden reservar canchas por fecha y hora
- **Autenticación**: Sistema de login seguro con JWT
- **Panel Administrativo**: Visualización y gestión de todas las reservas
- **Interfaz Moderna**: UI responsive con Bootstrap

## 🛠️ Tecnologías

### Frontend
- React 19
- Vite
- Bootstrap 5
- Axios
- React Router
- FullCalendar

### Backend
- Node.js
- Express
- MySQL
- JWT (JSON Web Tokens)
- bcrypt
- CORS

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- MySQL
- npm o yarn

## 🚀 Instalación

1. Clona el repositorio
\`\`\`bash
git clone https://github.com/TU_USUARIO/alquiler_canchas.git
cd alquiler_canchas
\`\`\`

2. Instala las dependencias
\`\`\`bash
npm install
\`\`\`

3. Configura la base de datos MySQL y crea un archivo `.env` en la raíz del proyecto:
\`\`\`env
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=alquiler_canchas
JWT_SECRET=tu_clave_secreta
\`\`\`

4. Inicia el servidor de desarrollo
\`\`\`bash
npm start
\`\`\`

## 📁 Estructura del Proyecto

\`\`\`
alquiler_canchas/
├── src/                    # Código fuente del frontend
│   ├── components/         # Componentes React
│   ├── styles/            # Archivos CSS
│   └── main.jsx           # Punto de entrada
├── server/                # Código del backend
│   ├── index.js          # Servidor Express
│   └── ...
├── public/               # Archivos estáticos
├── package.json          # Dependencias del proyecto
└── README.md            # Este archivo
\`\`\`

## 🎯 Scripts Disponibles

- \`npm run dev\` - Inicia el servidor de desarrollo de Vite
- \`npm run build\` - Construye la aplicación para producción
- \`npm run server\` - Inicia solo el servidor backend
- \`npm start\` - Inicia tanto el frontend como el backend concurrentemente

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit tus cambios (\`git commit -m 'Add some AmazingFeature'\`)
4. Push a la rama (\`git push origin feature/AmazingFeature\`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo \`LICENSE\` para más detalles.

## 👨‍💻 Autor

Tu Nombre - [@tu_usuario](https://github.com/tu_usuario)

## 🙏 Agradecimientos

- React team por la increíble biblioteca
- Bootstrap team por el framework CSS
- Todos los contribuidores de las librerías open source utilizadas