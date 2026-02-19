# 🦷 PM3 - Sistema de Gestión de Turnos | Consultorio Odontológico

---

## 📖 About

Aplicación web **Full Stack** para la gestión de turnos de un consultorio odontológico. Permite a los pacientes registrarse, iniciar sesión, agendar citas y cancelarlas desde la interfaz.

Backend en **Node.js + Express + TypeScript** con **PostgreSQL** y **TypeORM**. Frontend en **React + Vite** con **Context API** para el manejo de estado global.

---

## 🛠️ Tecnologías Usadas

### Backend
- **Node.js / Express / TypeScript** — Servidor y API REST tipada
- **TypeORM / PostgreSQL** — Base de datos relacional con ORM
- **bcryptjs** — Encriptación de contraseñas
- **dotenv / Morgan / CORS** — Variables de entorno, logging y solicitudes entre dominios
- **Nodemon + ts-node** — Desarrollo con recarga automática

### Frontend
- **React 19 + Vite** — Interfaz de usuario y bundler moderno
- **React Router DOM** — Enrutamiento del lado del cliente
- **Axios** — Peticiones HTTP al backend
- **Formik + Yup** — Formularios con validaciones declarativas
- **SweetAlert2** — Alertas y modales estilizados
- **CSS Modules / Google Fonts** — Estilos encapsulados por componente

---

## ✨ Funcionalidades Principales

- 📋 **Registro** — Formulario validado con Formik y Yup (nombre, email, DNI, fecha de nacimiento, username y contraseña)
- 🔐 **Login / Logout** — Autenticación con bcrypt, sesión persistida en `localStorage`
- 📅 **Agendar turno** — Modal con validación de fechas, horarios (Lun–Vie 8:00–18:00 / Sáb hasta 12:00) y festivos colombianos bloqueados
- ❌ **Cancelar turno** — El paciente cancela sus turnos activos desde su panel
- 👤 **Mis turnos** — Vista personalizada con turnos ordenados por estado y fecha
- 🦷 **Servicios** — Página con los 9 servicios odontológicos disponibles
- 📞 **Contacto** — Tarjeta con información del consultorio
- 🖼️ **Perfil** — Avatar con foto subida desde el dispositivo, persistida en `localStorage`

---

## 🏗️ Arquitectura

```
PM3-LACanonNieto/
├── back/
│   └── src/
│       ├── config/          # Conexión DB y variables de entorno
│       ├── entities/        # User, Credential, Appointment (TypeORM)
│       ├── dto/             # Data Transfer Objects
│       ├── repositories/    # Repositorios TypeORM
│       ├── services/        # Lógica de negocio
│       ├── controllers/     # Endpoints
│       └── routes/          # Rutas agrupadas
│
└── front/
    └── src/
        ├── context/         # UserContext (estado global)
        ├── components/      # Navbar, FormAppointments, AppointmentCard...
        ├── views/           # Home, Login, Register, MyAppointments, Services, Contact
        └── helpers/         # Validaciones de formularios
```

- Capas: **Routes → Controllers → Services → Repositories → Entities**
- Transacciones en DB al crear usuario con sus credenciales
- Validaciones tanto en cliente (Formik/Yup) como en servidor

---

## ⚙️ Instalación y Ejecución

### Backend

```bash
cd back
npm install
```

Crear `.env` en `back/`:

```env
PORT=3312
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_base_de_datos
```

```bash
npm run dev
```

Servidor en: `http://localhost:3312`

### Frontend

```bash
cd front
npm install
npm run dev
```

App en: `http://localhost:5173`

---

## 🔗 Endpoints de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/users` | Todos los usuarios |
| `GET` | `/users/:id` | Usuario por ID con sus turnos |
| `POST` | `/users/register` | Registro de nuevo usuario |
| `POST` | `/users/login` | Inicio de sesión |
| `GET` | `/appointments` | Todos los turnos |
| `GET` | `/appointments/:id` | Turno por ID |
| `GET` | `/appointments/user/:userId` | Turnos de un usuario |
| `POST` | `/appointments/schedule` | Agendar turno |
| `PUT` | `/appointments/cancel/:id` | Cancelar turno |
