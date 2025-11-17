# 📋 Próximos Pasos para Desplegar

## ✅ Lo que ya está hecho

- ✅ Proyecto configurado con React + Vite
- ✅ Integración completa con Supabase
- ✅ Todos los componentes migrados
- ✅ Build de producción funcional
- ✅ Configuración de Vercel lista
- ✅ GitHub Actions configurado
- ✅ Documentación completa

## 🚀 Pasos para ir a Producción

### 1. Configurar Supabase (15 minutos)

```bash
# 1. Ve a https://supabase.com y crea una cuenta
# 2. Crea un nuevo proyecto
# 3. Espera a que el proyecto se inicialice (2-3 minutos)
```

**Ejecutar Schema:**
1. En Supabase, ve a **SQL Editor**
2. Abre el archivo `supabase/schema.sql` de este proyecto
3. Copia todo el contenido
4. Pégalo en el editor SQL de Supabase
5. Click en **Run** (esquina inferior derecha)
6. Verifica que se ejecutó sin errores

**Configurar Auth:**
1. Ve a **Authentication** > **Providers**
2. Asegúrate de que **Email** está habilitado
3. Para desarrollo, desactiva confirmación de email:
   - Ve a **Settings** > **Auth**
   - Desactiva "Enable email confirmations"

**Obtener Credenciales:**
1. Ve a **Settings** > **API**
2. Copia:
   - **Project URL** (ejemplo: `https://xxxxx.supabase.co`)
   - **anon/public key** (la clave larga que empieza con `eyJ...`)

### 2. Configurar Variables de Entorno Locales (2 minutos)

```bash
# Crear archivo .env
cp .env.example .env

# Editar .env y agregar tus credenciales:
# VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
# VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

### 3. Probar Localmente (5 minutos)

```bash
# Instalar dependencias (si no lo hiciste)
npm install

# Iniciar servidor de desarrollo
npm run dev
```

**Prueba estos flujos:**
- [ ] Registrar un nuevo usuario
- [ ] Iniciar sesión
- [ ] Crear una encuesta
- [ ] Ver el código QR generado
- [ ] Abrir la URL de la encuesta (en otra ventana/incógnito)
- [ ] Responder la encuesta
- [ ] Ver los resultados en el dashboard

### 4. Subir a GitHub (5 minutos)

```bash
# Inicializar repositorio (si no existe)
git init

# Agregar archivos
git add .

# Commit inicial
git commit -m "Initial commit: QR Survey with Supabase"

# Crear repositorio en GitHub
# Ve a github.com/new y crea un nuevo repositorio

# Conectar con GitHub
git remote add origin https://github.com/tu-usuario/tu-repo.git

# Push
git branch -M main
git push -u origin main
```

### 5. Desplegar en Vercel (10 minutos)

#### Opción A: Desde la Web (Más fácil)

1. **Conectar Repositorio:**
   - Ve a [vercel.com](https://vercel.com)
   - Click en **Add New** > **Project**
   - Importa tu repositorio de GitHub
   - Click en **Import**

2. **Configurar Proyecto:**
   - **Framework Preset**: Vite (detectado automáticamente)
   - **Build Command**: `npm run build` (ya configurado)
   - **Output Directory**: `dist` (ya configurado)

3. **Variables de Entorno:**
   - Click en **Environment Variables**
   - Agregar variable:
     - Name: `VITE_SUPABASE_URL`
     - Value: tu URL de Supabase
   - Agregar otra variable:
     - Name: `VITE_SUPABASE_ANON_KEY`
     - Value: tu anon key
   - Aplica a: **Production**, **Preview**, **Development**

4. **Deploy:**
   - Click en **Deploy**
   - Espera 2-3 minutos
   - Tu app estará en línea!

#### Opción B: Desde la Terminal

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Seguir las instrucciones
# Cuando pregunte por variables de entorno, agrégalas

# Deploy a producción
vercel --prod
```

### 6. (Opcional) Configurar CI/CD con GitHub Actions (10 minutos)

Para que cada push a `main` despliegue automáticamente:

1. **Obtener Tokens de Vercel:**
```bash
# Ejecutar en la terminal del proyecto
vercel

# Toma nota de:
# - Organization ID (org_xxxxx)
# - Project ID (prj_xxxxx)

# Para el token:
# Ve a vercel.com/account/tokens
# Click en "Create Token"
# Dale un nombre (ej: "GitHub Actions")
# Copia el token generado
```

2. **Configurar Secrets en GitHub:**
   - Ve a tu repositorio en GitHub
   - **Settings** > **Secrets and variables** > **Actions**
   - Click en **New repository secret** para cada uno:

```
VITE_SUPABASE_URL = tu_url_de_supabase
VITE_SUPABASE_ANON_KEY = tu_anon_key
VERCEL_TOKEN = tu_token_de_vercel
VERCEL_ORG_ID = tu_org_id (de vercel)
VERCEL_PROJECT_ID = tu_project_id (de vercel)
```

3. **Verificar Workflow:**
   - El archivo `.github/workflows/deploy.yml` ya está configurado
   - En cada push a `main`, GitHub Actions automáticamente:
     - Instalará dependencias
     - Compilará el proyecto
     - Desplegará a Vercel

### 7. Post-Despliegue (5 minutos)

**Verificaciones:**
- [ ] Visita tu URL de Vercel
- [ ] Verifica que no hay errores en la consola del navegador
- [ ] Registra un usuario de prueba
- [ ] Crea una encuesta
- [ ] Comparte y responde la encuesta
- [ ] Verifica resultados

**Configuraciones Adicionales en Supabase:**
1. Ve a **Authentication** > **URL Configuration**
2. Agrega tu dominio de Vercel a:
   - **Site URL**: `https://tu-app.vercel.app`
   - **Redirect URLs**: `https://tu-app.vercel.app/**`

## 🎯 Checklist Completo

- [ ] Cuenta de Supabase creada
- [ ] Proyecto de Supabase creado
- [ ] Schema SQL ejecutado en Supabase
- [ ] Credenciales de Supabase obtenidas
- [ ] Archivo `.env` creado localmente
- [ ] Aplicación probada localmente
- [ ] Código subido a GitHub
- [ ] Cuenta de Vercel creada
- [ ] Proyecto conectado en Vercel
- [ ] Variables de entorno configuradas en Vercel
- [ ] Aplicación desplegada en Vercel
- [ ] Aplicación probada en producción
- [ ] (Opcional) Secrets de GitHub configurados
- [ ] (Opcional) CI/CD funcionando

## 📊 Tiempos Estimados

| Tarea | Tiempo Estimado |
|-------|----------------|
| Configurar Supabase | 15 minutos |
| Variables de entorno | 2 minutos |
| Probar localmente | 5 minutos |
| Subir a GitHub | 5 minutos |
| Desplegar en Vercel | 10 minutos |
| CI/CD (opcional) | 10 minutos |
| **Total** | **37-47 minutos** |

## 🆘 Problemas Comunes

### "Cannot find module @supabase/supabase-js"
```bash
npm install
```

### Build falla con errores de TypeScript
```bash
# Ejecutar build localmente para ver errores
npm run build

# Si es un error de tipos, puede ser seguro ignorarlo en producción
# O contacta para ayuda
```

### No puedo ver mis encuestas en producción
1. Abre la consola del navegador (F12)
2. Ve a la pestaña Network
3. Busca errores en las peticiones a Supabase
4. Verifica que las variables de entorno están configuradas en Vercel

### 404 al refrescar página
- El archivo `vercel.json` ya tiene la configuración correcta
- Si persiste, verifica que `vercel.json` está en el repositorio

## 📚 Recursos Útiles

- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **React Router**: https://reactrouter.com
- **Tailwind CSS**: https://tailwindcss.com

## ✨ Próximos Pasos Después del Despliegue

1. **Dominio Personalizado** (opcional):
   - Ve a Vercel > Settings > Domains
   - Agrega tu dominio personalizado

2. **Monitoreo**:
   - Habilita Vercel Analytics
   - Revisa Supabase Dashboard regularmente

3. **Mejoras**:
   - Revisa `PROJECT_SUMMARY.md` para ideas de mejoras
   - Implementa nuevas funcionalidades
   - Agrega tests automatizados

---

¿Listo para desplegar? Sigue los pasos en orden y tendrás tu aplicación en producción en menos de 1 hora! 🚀

Si tienes problemas, revisa:
- `README.md` - Documentación completa
- `DEPLOYMENT.md` - Guía detallada de despliegue
- Consola del navegador para errores específicos
