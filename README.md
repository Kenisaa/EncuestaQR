# QR Survey - Sistema de Encuestas con QR

Una aplicación moderna para crear y gestionar encuestas con códigos QR, construida con React, Vite, Supabase y desplegada en Vercel.

## 🚀 Características

- ✨ Interfaz moderna con diseño futurista (Glassmorphism & Neon)
- 🔐 Autenticación segura con Supabase Auth
- 📊 Creación de encuestas con múltiples tipos de preguntas
- 📱 Generación automática de códigos QR para compartir encuestas
- 📈 Dashboard con estadísticas y análisis de respuestas
- 🎨 Diseño responsive y optimizado para móviles
- ⚡ Despliegue automático con CI/CD en Vercel

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Base de Datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Estilos**: Tailwind CSS 4
- **UI Components**: Radix UI
- **QR Codes**: qrcode.react
- **Gráficos**: Recharts
- **Despliegue**: Vercel
- **CI/CD**: GitHub Actions

## 📋 Requisitos Previos

- Node.js 18 o superior
- npm o pnpm
- Cuenta de Supabase (gratuita)
- Cuenta de Vercel (gratuita)
- Cuenta de GitHub

## 🔧 Configuración del Proyecto

### 1. Clonar el Repositorio

```bash
git clone <tu-repositorio>
cd QREncuestas
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Supabase

#### a) Crear un Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Guarda la URL del proyecto y la clave anónima (anon key)

#### b) Ejecutar el Schema de la Base de Datos

1. En el panel de Supabase, ve a **SQL Editor**
2. Abre el archivo `supabase/schema.sql` de este proyecto
3. Copia y pega el contenido completo en el editor SQL
4. Ejecuta el script (botón "Run")

Esto creará:
- Tablas: `profiles`, `surveys`, `survey_responses`
- Políticas de seguridad (RLS)
- Triggers automáticos
- Índices para optimización

#### c) Verificar la Configuración

1. Ve a **Authentication** > **Providers** en Supabase
2. Asegúrate de que "Email" esté habilitado
3. (Opcional) Desactiva la confirmación de email para desarrollo:
   - Ve a **Authentication** > **Settings**
   - Desactiva "Enable email confirmations"

### 4. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales de Supabase:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anon_key
```

### 5. Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🚢 Despliegue en Vercel

### Opción 1: Despliegue Manual

1. Instala Vercel CLI:
```bash
npm install -g vercel
```

2. Despliega el proyecto:
```bash
vercel
```

3. Sigue las instrucciones en pantalla

4. Configura las variables de entorno en Vercel:
   - Ve a tu proyecto en vercel.com
   - Settings > Environment Variables
   - Agrega:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

### Opción 2: Despliegue Automático con GitHub (CI/CD)

#### a) Conectar GitHub con Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Crea un nuevo proyecto
3. Conecta tu repositorio de GitHub
4. Configura las variables de entorno:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

#### b) Configurar GitHub Secrets

Para usar GitHub Actions, necesitas configurar estos secrets:

1. Ve a tu repositorio en GitHub
2. Settings > Secrets and variables > Actions
3. Agrega los siguientes secrets:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VERCEL_TOKEN` (obtén en vercel.com/account/tokens)
   - `VERCEL_ORG_ID` (obtén ejecutando `vercel` en tu terminal)
   - `VERCEL_PROJECT_ID` (obtén ejecutando `vercel` en tu terminal)

#### c) Despliegue Automático

Cada vez que hagas push a la rama `main`, GitHub Actions automáticamente:
1. Instalará las dependencias
2. Compilará el proyecto
3. Desplegará a Vercel

## 📁 Estructura del Proyecto

```
QREncuestas/
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── Navbar.tsx
│   │   └── ui/            # Componentes UI (Radix)
│   ├── pages/             # Páginas de la aplicación
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── CreateSurvey.tsx
│   │   ├── SurveyForm.tsx
│   │   └── Results.tsx
│   ├── hooks/             # Custom hooks
│   │   └── useAuth.ts
│   ├── services/          # Servicios de API
│   │   └── surveys.service.ts
│   ├── types/             # Definiciones de TypeScript
│   │   └── database.types.ts
│   ├── lib/               # Utilidades y configuración
│   │   └── supabase.ts
│   ├── App.tsx            # Componente principal
│   ├── main.tsx           # Punto de entrada
│   └── globals.css        # Estilos globales
├── supabase/
│   └── schema.sql         # Schema de base de datos
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions CI/CD
├── public/                # Archivos estáticos
├── index.html             # HTML principal
├── vite.config.ts         # Configuración de Vite
├── vercel.json            # Configuración de Vercel
├── .env.example           # Ejemplo de variables de entorno
└── README.md              # Este archivo
```

## 🔐 Seguridad

- **Row Level Security (RLS)**: Todas las tablas tienen políticas RLS habilitadas
- **Autenticación**: Supabase Auth maneja la autenticación de usuarios
- **Variables de Entorno**: Las credenciales sensibles están protegidas
- **Validación**: Validación tanto en cliente como servidor

## 🎯 Uso de la Aplicación

### Crear una Cuenta

1. Ve a `/register`
2. Completa el formulario de registro
3. Inicia sesión automáticamente

### Crear una Encuesta

1. Ve a `/create`
2. Ingresa título y descripción
3. Agrega preguntas (texto, opción múltiple, o calificación)
4. Haz clic en "Crear Encuesta"
5. Descarga el código QR generado

### Compartir una Encuesta

1. Comparte el código QR o la URL directa
2. Los usuarios pueden responder sin necesidad de cuenta

### Ver Resultados

1. Ve a `/dashboard`
2. Haz clic en "Ver Resultados" en cualquier encuesta
3. Visualiza gráficos y estadísticas

## 🧪 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview de la build
npm run preview

# Linting
npm run lint
```

## 🐛 Solución de Problemas

### Error: "Supabase credentials are missing"

- Verifica que el archivo `.env` existe y tiene las variables correctas
- Asegúrate de que las variables empiezan con `VITE_`

### Error al crear encuestas

- Verifica que ejecutaste el schema SQL en Supabase
- Comprueba que RLS está correctamente configurado

### No puedo iniciar sesión

- Verifica que el email está confirmado (o desactiva la confirmación en Supabase)
- Revisa la consola del navegador para más detalles

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Contacto

Para preguntas o sugerencias, por favor abre un issue en GitHub.

---

Hecho con ❤️ usando React, Vite, Supabase y Vercel
