# 🛒 MiInventarioExpress

## 📌 Descripción
Aplicación web desarrollada con Node.js, Express y MongoDB que permite la gestión de productos mediante un sistema CRUD completo.  
Incluye autenticación de usuarios, carga de imágenes, validaciones de formularios y un chat en tiempo real.


---

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB + Mongoose
- Handlebars (Motor de vistas)
- Multer (Carga de imágenes)
- bcrypt (Encriptación)
- express-session (Sesiones)
- express-validator (Validaciones)
- Socket.io (Chat en tiempo real)
- Bootstrap + CSS personalizado

---

## 📂 Estructura del proyecto


MiInventarioExpress/
│
├── models/
│ ├── Producto.js
│ └── Usuario.js
│
├── routes/
│ ├── productos.js
│ ├── auth.js
│ └── chat.js
│
├── views/
│ ├── layouts/
│ │ └── main.handlebars
│ ├── productos/
│ ├── auth/
│ └── chat.handlebars
│
├── public/
│ ├── css/
│ └── js/
│
├── uploads/
├── app.js
└── package.json


---

## ⚙️ Instalación y ejecución

1. Clonar el repositorio:

git clone https://github.com/TU-USUARIO/MiInventarioExpress.git


2. Entrar al proyecto:

cd MiInventarioExpress


3. Instalar dependencias:

npm install


4. Ejecutar el servidor:

node app.js


5. Abrir en navegador:

http://localhost:3000


---

## 🔐 Funcionalidades

### 👤 Autenticación
- Registro de usuarios
- Inicio de sesión
- Cierre de sesión
- Protección de rutas

---

### 📦 CRUD de Productos
- Crear productos
- Listar productos
- Editar productos
- Eliminar productos
- Carga de imágenes

---

### ✅ Validaciones
- Campos obligatorios
- Validación de precio
- Manejo de errores en formularios

---

### 💬 Chat en tiempo real
- Comunicación entre usuarios autenticados
- Actualización en tiempo real con Socket.io

---

## 🧪 Pruebas realizadas

- Pruebas de registro y login ✔
- Validación de formularios ✔
- CRUD completo ✔
- Pruebas en navegador ✔
- Pruebas con Postman ✔
- Verificación en consola ✔
- Chat en tiempo real ✔


## 📌 Notas
- Las imágenes subidas se almacenan en la carpeta `/uploads`
- `node_modules` no está incluido en el repositorio
- Se requiere MongoDB ejecutándose en local

---

