# SubliStore - PWA de Ventas de Productos Sublimables

Una aplicación web progresiva (PWA) moderna y profesional para ventas de productos sublimables personalizables, con panel de administración completo y integración directa con WhatsApp.

## 🚀 Características Principales

### Para Clientes (Marketplace)
- **Diseño Responsivo y Moderno**: Interfaz elegante con glassmorphism y animaciones fluidas
- **Marketplace Dinámico**: Grid de productos con diferentes tamaños (efecto masonry)
- **Animaciones Profesionales**: Transiciones suaves entre productos con Framer Motion
- **Categorías Visuales**: Secciones por álbumes con imágenes destacadas
- **Contacto Directo**: Botón flotante de WhatsApp para consultas rápidas
- **Instalable como App**: Funcionalidad PWA para instalación en dispositivos

### Para Administradores
- **Autenticación Segura**: Sistema de login/signup con Supabase
- **Gestión de Productos**: CRUD completo con imágenes múltiples
- **Gestión de Categorías**: Organiza productos en álbumes
- **Configuración de Tienda**: Personaliza nombre, logo, banner y número de WhatsApp
- **Panel Dashboard**: Estadísticas y accesos rápidos
- **Interfaz Intuitiva**: Diseño profesional y fácil de usar

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 16**: Framework React con App Router
- **TypeScript**: Tipado estático para mayor seguridad
- **Tailwind CSS v4**: Diseño responsive con utilidades
- **Framer Motion**: Animaciones y transiciones profesionales
- **ShadcN/UI**: Componentes accesibles y polished

### Backend & Database
- **Supabase**: Backend as a Service con PostgreSQL
- **Authentication**: Sistema de autenticación seguro con JWT
- **Row Level Security (RLS)**: Seguridad a nivel de base de datos

### DevOps & Deployment
- **Vercel**: Hosting y deployment automático
- **PWA**: Soporte para instalación como aplicación nativa

## 📋 Requisitos Previos

- Node.js 18+ 
- pnpm o npm
- Cuenta de Supabase (gratuita)

## 🔧 Instalación

### 1. Clonar el repositorio
```bash
git clone <tu-repositorio>
cd sublistore
```

### 2. Instalar dependencias
```bash
pnpm install
# o
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Obtén estas credenciales desde tu proyecto de Supabase.

### 4. Configurar Base de Datos
Sigue los pasos en `DATABASE_SETUP.md` para:
- Crear las tablas necesarias
- Configurar Row Level Security
- Crear el primer administrador

### 5. Ejecutar en desarrollo
```bash
pnpm dev
# o
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📖 Uso

### Acceder al Marketplace
1. Ve a `http://localhost:3000`
2. Explora las categorías y productos
3. Usa el botón de WhatsApp flotante para contactar

### Acceder al Panel de Administración
1. Ve a `http://localhost:3000/admin`
2. Haz clic en "Crear cuenta" para registrarte como administrador
3. Verifica tu email
4. Ejecuta el comando SQL en `DATABASE_SETUP.md` para darle permisos de admin

### Panel de Admin - Opciones Principales

#### Dashboard
- Vista general de estadísticas
- Accesos rápidos a gestión de productos y categorías

#### Gestionar Productos
- Crear, editar y eliminar productos
- Agregar imágenes
- Establecer precios y descripciones
- Marcar como destacados
- Cambiar estado (activo/inactivo)

#### Gestionar Categorías
- Crear álbumes/categorías
- Añadir imágenes de portada
- Escribir descripciones
- Activar/desactivar categorías

#### Configuración
- **Nombre de la Tienda**: Personaliza el nombre visible
- **Logo y Banner**: URLs de tus imágenes personalizadas
- **Número de WhatsApp**: Configura el número para recibir consultas
- **Mensaje Predeterminado**: Personaliza el mensaje inicial en WhatsApp

## 📱 PWA - Instalación como App

### En Móviles
1. Abre la app en el navegador
2. Busca la opción "Agregar a pantalla de inicio" o "Instalar app"
3. Acepta y la app se instalará

### En Escritorio
1. Abre el navegador en la esquina superior derecha
2. Busca "Instalar SubliStore" 
3. Haz clic para instalar

## 🔐 Seguridad

- **Autenticación**: JWT tokens seguros con Supabase
- **Row Level Security**: Las políticas de RLS protegen los datos
- **HTTPS**: Requerido en producción
- **Contraseñas**: Hasheadas con bcrypt

### Políticas de Acceso
- **Clientes**: Pueden ver productos y categorías (acceso público)
- **Administradores**: Acceso total a gestión de productos y configuración

## 📦 Estructura del Proyecto

```
.
├── app/
│   ├── page.tsx                 # Página principal (marketplace)
│   ├── layout.tsx               # Layout raíz
│   ├── globals.css              # Estilos globales
│   ├── auth/                    # Autenticación
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── callback/route.ts
│   └── admin/                   # Panel de administración
│       ├── page.tsx             # Dashboard
│       ├── productos/page.tsx   # Gestión de productos
│       ├── categorias/page.tsx  # Gestión de categorías
│       └── configuracion/page.tsx # Configuración de tienda
├── components/
│   ├── ProductCard.tsx          # Tarjeta de producto
│   ├── HeroSection.tsx          # Sección hero del marketplace
│   ├── CategoriesSection.tsx    # Sección de categorías
│   ├── AdminNavbar.tsx          # Navbar del panel admin
│   └── WhatsAppButton.tsx       # Botón flotante de WhatsApp
├── lib/
│   ├── supabase/                # Configuración de Supabase
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   └── types.ts                 # Tipos TypeScript
├── public/                      # Archivos estáticos
├── scripts/
│   └── 001_create_tables.sql    # Schema de la base de datos
├── DATABASE_SETUP.md            # Guía de configuración BD
└── README.md                    # Este archivo
```

## 🚀 Deployment

### En Vercel (Recomendado)

1. Sube el código a GitHub
2. Conecta tu repositorio a Vercel
3. Configura las variables de entorno
4. Haz deploy con un clic

```bash
# Si usas la CLI de Vercel
vercel deploy
```

### Variables de Entorno en Producción
Asegúrate de configurar en Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🎨 Personalización

### Colores y Temas
Los estilos se definen en:
- `app/globals.css` - Variables CSS personalizables
- Colores base: azul (#3b82f6), slate (gris oscuro)

### Fuentes
- Sans: Geist (configurada en Next.js)
- Mono: Geist Mono

### Animaciones
Personalizables en cada componente con Framer Motion

## 📞 Soporte y Contacto

Para soporte técnico o consultas:
- Abre un issue en el repositorio
- Contacta al equipo de desarrollo

## 📄 Licencia

Este proyecto está bajo licencia MIT. Siéntete libre de usarlo y modificarlo.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## ✨ Características Futuras

- [ ] Carrito de compras
- [ ] Sistema de pagos (Stripe, MercadoPago)
- [ ] Órdenes y seguimiento
- [ ] Reseñas de productos
- [ ] Wishlist
- [ ] Búsqueda avanzada y filtros
- [ ] Panel de analíticas
- [ ] Notificaciones por email
- [ ] Sistema de descuentos y cupones

## 🐛 Reporte de Bugs

Si encuentras un bug, por favor abre un issue con:
- Descripción clara del problema
- Pasos para reproducirlo
- Navegador y versión
- Screenshots si es posible

---

**Hecho con ❤️ para comerciantes de productos sublimables**

¡Disfruta usando SubliStore! 🚀
