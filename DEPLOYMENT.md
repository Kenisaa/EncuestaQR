# Guía Rápida de Despliegue

## ✅ Checklist Pre-Despliegue

### 1. Configurar Supabase

- [ ] Crear proyecto en [supabase.com](https://supabase.com)
- [ ] Ejecutar el schema SQL (`supabase/schema.sql`) en SQL Editor
- [ ] Copiar URL del proyecto y Anon Key
- [ ] Configurar Authentication > Email (habilitar provider)
- [ ] (Opcional) Desactivar confirmación de email para desarrollo

### 2. Configurar Variables de Entorno Locales

Crear archivo `.env` en la raíz:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

### 3. Probar Localmente

```bash
npm install
npm run dev
```

Verificar que:
- [ ] La aplicación carga sin errores en http://localhost:3000
- [ ] Puedes registrar un nuevo usuario
- [ ] Puedes crear una encuesta
- [ ] Se genera el código QR correctamente
- [ ] Puedes responder una encuesta
- [ ] Los resultados se muestran correctamente

## 🚀 Despliegue en Vercel

### Opción A: Interfaz Web de Vercel (Recomendado)

1. **Conectar Repositorio**
   - Ve a [vercel.com](https://vercel.com)
   - Click en "New Project"
   - Importa tu repositorio de GitHub

2. **Configurar el Proyecto**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Variables de Entorno**
   - Click en "Environment Variables"
   - Agregar:
     ```
     VITE_SUPABASE_URL = tu_url_de_supabase
     VITE_SUPABASE_ANON_KEY = tu_anon_key
     ```

4. **Deploy**
   - Click en "Deploy"
   - Espera a que termine el build (2-3 minutos)

### Opción B: Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

## 🔄 CI/CD con GitHub Actions

### Configurar Secrets en GitHub

1. Ve a tu repositorio en GitHub
2. Settings > Secrets and variables > Actions > New repository secret

Agregar estos secrets:

```
VITE_SUPABASE_URL = tu_url_de_supabase
VITE_SUPABASE_ANON_KEY = tu_anon_key
VERCEL_TOKEN = obtener_de_vercel.com/account/tokens
VERCEL_ORG_ID = obtener_ejecutando_vercel_en_terminal
VERCEL_PROJECT_ID = obtener_ejecutando_vercel_en_terminal
```

### Obtener Vercel Tokens

```bash
# Ejecutar en la terminal del proyecto
vercel

# El comando mostrará:
# Vercel Organization ID: org_xxxxx
# Vercel Project ID: prj_xxxxx

# Para el token:
# Ve a vercel.com/account/tokens
# Create Token > Create
```

### Activar Workflow

El workflow en `.github/workflows/deploy.yml` se ejecutará automáticamente en cada push a `main`.

## 📊 Verificación Post-Despliegue

- [ ] Visitar la URL de producción
- [ ] Verificar que no hay errores en la consola del navegador
- [ ] Registrar un usuario nuevo
- [ ] Crear una encuesta de prueba
- [ ] Compartir y responder la encuesta
- [ ] Verificar resultados en el dashboard

## 🐛 Troubleshooting

### Error: "Supabase credentials are missing"

**Causa**: Variables de entorno no configuradas correctamente

**Solución**:
1. Verifica que las variables en Vercel empiecen con `VITE_`
2. Redeploya el proyecto después de agregar las variables
3. Verifica que no hay espacios en blanco en los valores

### Error 404 en rutas al refrescar

**Causa**: SPA routing no configurado

**Solución**: El archivo `vercel.json` ya tiene la configuración correcta. Verifica que existe:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Build falla en Vercel

**Causa**: Dependencias o errores de TypeScript

**Solución**:
```bash
# Probar build local
npm run build

# Si falla, revisar errores y corregir
# Luego push a GitHub
```

### No puedo iniciar sesión después del deploy

**Causa**: Configuración de Supabase Auth

**Solución**:
1. Ve a Supabase > Authentication > URL Configuration
2. Agrega tu dominio de Vercel a "Site URL"
3. Agrega tu dominio a "Redirect URLs"

## 📝 Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Verificar errores
npm run lint

# Ver logs de Vercel
vercel logs [url-del-deployment]

# Ver lista de deployments
vercel ls
```

## 🔒 Seguridad

### Checklist de Seguridad

- [ ] Row Level Security (RLS) habilitado en Supabase
- [ ] Variables de entorno configuradas (no hardcodeadas)
- [ ] `.env` está en `.gitignore`
- [ ] Anon Key de Supabase (no la service key)
- [ ] HTTPS habilitado (automático en Vercel)

## 📈 Monitoreo

### Vercel Analytics

1. Ve a tu proyecto en Vercel
2. Analytics tab
3. Habilita Analytics (gratis hasta 100k eventos/mes)

### Supabase Dashboard

1. Database > Tables: Ver datos en tiempo real
2. Auth > Users: Monitorear usuarios
3. Logs: Ver queries y errores

## 🎯 Próximos Pasos

- [ ] Configurar dominio personalizado en Vercel
- [ ] Habilitar Vercel Analytics
- [ ] Configurar backups en Supabase
- [ ] Implementar rate limiting
- [ ] Agregar tests automatizados
- [ ] Configurar Sentry para error tracking

---

¿Problemas? Revisa el archivo `README.md` principal o abre un issue en GitHub.
