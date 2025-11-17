# 🎨 Sistema de Diseño - QR Survey

## Paleta de Colores

### Colores Principales
```css
--color-primary: #3b82f6        /* Blue 500 */
--color-primary-light: #60a5fa  /* Blue 400 */
--color-primary-dark: #2563eb   /* Blue 600 */

--color-secondary: #8b5cf6      /* Purple 500 */
--color-secondary-light: #a78bfa /* Purple 400 */
--color-secondary-dark: #7c3aed  /* Purple 600 */

--color-accent: #06b6d4         /* Cyan 500 */
```

### Colores de Estado
```css
--color-success: #10b981   /* Green 500 */
--color-warning: #f59e0b   /* Amber 500 */
--color-error: #ef4444     /* Red 500 */
```

### Colores de Superficie
```css
--color-background: #0f0f23  /* Dark Blue */
--color-surface: #1a1a2e     /* Lighter Dark */
--color-foreground: #e4e4e7  /* Light Gray */
--color-muted: #71717a       /* Gray 500 */
```

## Tipografía

### Familia de Fuentes
```css
font-family: 'Inter var', 'Inter', system-ui, -apple-system, sans-serif
```

### Escala de Tamaños
- **Hero**: `text-6xl` → `text-8xl` (60px - 96px)
- **Heading 1**: `text-4xl` → `text-5xl` (36px - 48px)
- **Heading 2**: `text-3xl` → `text-4xl` (30px - 36px)
- **Heading 3**: `text-2xl` → `text-3xl` (24px - 30px)
- **Body Large**: `text-xl` (20px)
- **Body**: `text-base` (16px)
- **Small**: `text-sm` (14px)
- **Extra Small**: `text-xs` (12px)

### Pesos de Fuente
- **Regular**: `font-normal` (400)
- **Medium**: `font-medium` (500)
- **Semibold**: `font-semibold` (600)
- **Bold**: `font-bold` (700)

## Espaciado

### Radio de Bordes
```css
--radius-sm: 8px    /* rounded-lg */
--radius: 12px      /* rounded-xl */
--radius-lg: 16px   /* rounded-2xl */
--radius-xl: 24px   /* rounded-3xl */
```

### Espaciado Estándar
- **Pequeño**: `p-4`, `gap-4` (16px)
- **Medio**: `p-6`, `gap-6` (24px)
- **Grande**: `p-8`, `gap-8` (32px)
- **Extra Grande**: `p-10`, `gap-10` (40px)
- **Secciones**: `py-16`, `py-24` (64px - 96px)

## Componentes Base

### Glass Morphism
```css
.glass {
  background: rgba(26, 26, 46, 0.6);
  backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(228, 228, 231, 0.1);
  border-radius: var(--radius-lg);
  box-shadow:
    0 8px 32px 0 rgba(0, 0, 0, 0.37),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
}

.glass-secondary {
  background: rgba(26, 26, 46, 0.4);
  backdrop-filter: blur(12px) saturate(150%);
  border: 1px solid rgba(139, 92, 246, 0.15);
  border-radius: var(--radius);
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.25);
}
```

### Botones

#### Botón Primario
```css
.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}
```

#### Botón Secundario
```css
.btn-secondary {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}
```

### Inputs

```css
.input-modern {
  background: rgba(26, 26, 46, 0.5);
  border: 1px solid rgba(228, 228, 231, 0.1);
  border-radius: var(--radius);
  color: var(--color-foreground);
  padding: 0.75rem 1rem;
  transition: all 0.3s ease;
}

.input-modern:focus {
  border-color: #3b82f6;
  background: rgba(26, 26, 46, 0.7);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

### Tarjetas

```css
.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(59, 130, 246, 0.2);
}
```

## Efectos

### Gradientes de Texto
```css
.text-gradient {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text {
  /* Alias de text-gradient */
}
```

### Efectos de Glow
```css
.glow-cyan {
  box-shadow:
    0 0 20px rgba(59, 130, 246, 0.2),
    0 0 40px rgba(59, 130, 246, 0.1);
}

.glow-magenta {
  box-shadow:
    0 0 20px rgba(139, 92, 246, 0.2),
    0 0 40px rgba(139, 92, 246, 0.1);
}

.glow-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glow-hover:hover {
  box-shadow:
    0 0 30px rgba(59, 130, 246, 0.3),
    0 0 60px rgba(59, 130, 246, 0.15);
  transform: translateY(-2px);
}
```

## Animaciones

### Animaciones Disponibles
```css
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}

.animate-slideIn {
  animation: slideIn 0.5s ease-out;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}
```

### Keyframes
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
```

## Patrones de Diseño

### Orbes Flotantes Decorativos
```jsx
<div className="fixed top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float pointer-events-none" />
<div className="fixed bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
```

### Headers con Badge
```jsx
<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30">
  <Sparkles size={16} className="text-accent" />
  <span className="text-sm font-medium text-foreground/90">Badge Text</span>
</div>
```

### Títulos con Gradiente
```jsx
<h1 className="text-5xl font-bold">
  <span className="gradient-text">
    Título Principal
  </span>
</h1>
```

### Tarjetas de Estadísticas
```jsx
<div className="glass card-hover p-6 rounded-2xl border border-primary/20">
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
      <Icon className="text-primary" size={24} />
    </div>
    <div>
      <p className="text-4xl font-bold text-gradient">1000+</p>
      <p className="text-muted text-sm">Label</p>
    </div>
  </div>
</div>
```

### Botones con Iconos
```jsx
<button className="btn-primary flex items-center gap-2">
  <Icon size={20} />
  <span>Button Text</span>
</button>
```

## Estados Interactivos

### Hover
- Escala: `hover:scale-105` (105%)
- Traslación: `hover:-translate-y-1` (4px arriba)
- Sombra: Aumentar intensidad
- Color: Transición suave

### Focus
- Ring: `focus:ring-2 focus:ring-primary/20`
- Border: `focus:border-primary`
- Outline: `focus:outline-none`

### Disabled
- Opacidad: `disabled:opacity-50`
- Cursor: `disabled:cursor-not-allowed`
- Transform: `disabled:transform-none`

## Responsive Design

### Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

### Patrones Comunes
```css
/* Texto responsive */
text-4xl md:text-5xl lg:text-6xl

/* Padding responsive */
px-4 sm:px-6 lg:px-8

/* Grid responsive */
grid-cols-1 md:grid-cols-2 lg:grid-cols-3

/* Flex responsive */
flex-col sm:flex-row
```

## Mejores Prácticas

### DO ✅
- Usar clases predefinidas del sistema de diseño
- Mantener consistencia en espaciado
- Aplicar animaciones sutiles
- Usar gradientes en títulos y botones principales
- Implementar estados hover/focus
- Usar glassmorphism para tarjetas
- Añadir orbes flotantes decorativos
- Espaciado generoso (más aire)

### DON'T ❌
- Crear colores personalizados fuera de la paleta
- Usar animaciones exageradas
- Mezclar diferentes sistemas de espaciado
- Olvidar estados disabled/loading
- Usar fondos sólidos en lugar de glass
- Saturar con demasiados gradientes
- Espaciado muy ajustado

## Accesibilidad

- Contraste mínimo 4.5:1 para texto
- Focus visible en todos los elementos interactivos
- Tamaño mínimo de touch target: 44x44px
- Labels en todos los inputs
- Textos alternativos en iconos importantes
- Navegación por teclado funcional

---

**Versión**: 1.0
**Última actualización**: Nov 2025
**Autor**: QR Survey Team
