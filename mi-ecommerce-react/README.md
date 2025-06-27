🚀 TalentoTech en comercio electrónico
Una plataforma de comercio electrónico moderna y responsiva, construida con React, que ofrece una experiencia de compra intuitiva y un panel de administración robusto para la gestión de productos.

🌟 Resumen del proyecto
E-Commerce Talento Tech es una aplicación web dinámica de comercio electrónico diseñada para simular una tienda en línea completa. Permite a los usuarios explorar productos, gestionar un carrito de compras y disfrutar de una experiencia de usuario fluida y reactiva. Además, cuenta con un panel de administración protegido por autenticación para la gestión eficiente del catálogo de productos.

El proyecto se enfoca en las mejores prácticas de desarrollo frontend, utilizando Context API para una gestión de estado escalable y React-Bootstrap para un diseño atractivo y adaptable. La implementación de carga perezosa ( lazy loading) y animaciones mejoran significativamente el rendimiento y la experiencia del usuario.

✨ Características principales

🛒 Carrito de Compras Completo:

Añadir, eliminar y actualizar cantidades de productos.

Vaciar el carrito por completo.

Persistencia de datos del carrito en localStoragepara una experiencia ininterrumpida.

Simulación de un proceso de "Finalizar Compra".

Componente FloatingCart para un acceso rápido al resumen del carrito.

🛡️ Autenticación y Rutas Protegidas:

Sistema de inicio de sesión básico.

PrivateRoute para restringir el acceso a secciones sensibles como el Dashboard y el Carrito.

Manejo de sesiones de usuario.

📊 Panel de Administración (Dashboard):

Interfaz dedicada para la gestión de productos.

Funcionalidades CRUD completas (Crear, Leer, Actualizar, Eliminar productos).

Formularios intuitivos para añadir y editar productos.

Modal de confirmación para eliminaciones, previniendo errores.

🚀 Rendimiento y Experiencia de Usuario (UX):

Carga Perezosa (Lazy Loading): Las páginas se cargan bajo demanda, reduciendo el tiempo inicial de carga y mejorando el rendimiento.

Pantalla de carga personalizada: un LoadingScreen cómodo y animado que proporciona retroalimentación visual durante la carga de contenido.

Animaciones Fluidas: Implementación de Framer Motionpara transiciones suaves y atractivas.

Notificaciones Interactiva: Feedback al usuario en tiempo real mediante react-toastify para operaciones como añadir al carrito, eliminar, etc.

Diseño Responsivo: Basado en React-Bootstrap para una visualización óptima en cualquier dispositivo.

🔍 Optimización para Motores de Búsqueda (SEO):

Uso de React Helmet Async para la gestión dinámica de etiquetas <head>, permitiendo títulos y meta descripciones personalizadas por página.

🛠️ Tecnologías Utilizadas
Este proyecto está construido sobre una sólida base de tecnologías modernas:

Marco de interfaz de usuario: React.js (Vite como paquete)

Gestión de Rutas: React Router DOM

Estilos y componentes UI: React Bootstrap

Animaciones: Framer Motion

Notificaciones: React Toastify

Gestión de Estado Global: React Context API

Optimización SEO: React Helmet Async

Iconografía: React Icons

Simulación de API: MockAPI.io

⚙️ Gestión de la API
Los datos de los productos y la gestión del CRUD se realizan a través de una API simulada.

URL Base de la API: La URL de la API se configura a través de variables de entorno para facilitar su gestión y implementación.

# En tu archivo .env 
VITE_MOCKAPI_PRODUCTS_URL=https://<tu-id-de-mockapi>.mockapi.io/api/v1/productos
Asegúrate de reemplazar <tu-id-de-mockapi>con la URL de tu propio proyecto en MockAPI.io.

Configuración en el Proyecto: La URL de la API se importa de manera centralizada desde src/config/api.js.

JavaScript

// src/config/api.js
export const MOCKAPI_PRODUCTS_URL = import.meta.env.VITE_MOCKAPI_PRODUCTS_URL;

🚀 Instalación y Ejecución Local
Siga estos pasos para configurar y ejecutar el proyecto en su máquina local.

Prerrequisitos
Asegúrate de tener instaladoNode.js(versión LTS recomendada) y un gestor de paquetes como npm o Yarn.

Pasos desde la consola(CMD / Powershell)
Clonar el repositorio:

Intento

git clone https://github.com/CristianMarcus/React-2025-TalentoTech.git
cd tu-repositorio
Reemplaza https://github.com/tu-usuario/tu-repositorio.git con la URL de tu repositorio real.

Configurar variables de entorno: 
crea un archivo .env local en la raíz de tu proyecto y agrega la URL de tu API de MockAPI.io:

VITE_MOCKAPI_PRODUCTS_URL=https://************.mockapi.io/api/v1/productos
Si aún no tienes una, puedes crear una fácilmente enMockAPI.io.

Instalar dependencias:

Intento

npm install
# o si usas yarn
# yarn install
Ejecutar la aplicación en modo desarrollo:

Intento

npm run dev
# o si usas yarn
# yarn dev
La aplicación se iniciará en http://localhost:5173(o un puerto similar). Abra esta URL en su navegador.

Construir para producción (opcional):

Intento

npm run build
# o si usas yarn
# yarn build
Esto creará una carpeta dist con la versión optimizada de tu aplicación, lista para desplegar en un servidor web estático.

🗺️Rutas de la Aplicación
Aquí se listan las principales rutas disponibles en la aplicación:

/: Página de inicio (Página de inicio).

/products: Listado completo de productos.

/products/:id: Página de detalles de un producto específico.

/about: Página "Acerca de nosotros".

/login: Página de inicio de sesión.

/cart(Protegida): Página del carrito de compras.

/dashboard(Protegida): Panel de administración de productos (requiere autenticación).

*: Ruta 404 para páginas no encontradas.

📂 Estructura del Proyecto
tu-proyecto/
├── public/
├── src/
│   ├── assets/              # Imágenes, iconos, etc.
│   ├── components/
│   │   ├── Auth/            # Lógica y componentes de autenticación (Login, PrivateRoute)
│   │   ├── ConfirmationModal/ # Modal de confirmación genérico
│   │   ├── FloatingCart/    # Componente del carrito flotante
│   │   ├── Layout/          # Componentes de diseño global (Navbar, Footer, etc.)
│   │   ├── LoadingScreen/   # Componente de carga personalizada
│   │   └── ProductForm/     # Formulario para añadir/editar productos
│   ├── context/             # Contextos de React para gestión de estado (CarritoContext, AuthContext)
│   ├── pages/               # Componentes de nivel de página(HomePage,ProductsPage,DashboardPage,etc.)
│   ├── config/              # Configuraciones de la aplicación (e.g., api.js)
│   ├── App.jsx              # Componente principal de la aplicación y enrutamiento
│   ├── main.jsx             # Punto de entrada de la aplicación
│   └── index.css            # Estilos globales
├── .env               # Variables de entorno (no subido a Git)
├── .gitignore
├── package.json
├── vite.config.js
└── README.md

🚀 Despliegue
Puedes implementar esta aplicación estática generada por Vite en varios servicios de hosting:

Netlify: Muy fácil para proyectos Vite. Simplemente conecta tu repositorio Git.

Vercel: Similar a Netlify, también con integración directa de Git.

Páginas de GitHub: Requiere una configuración específica en vite.config.js si tu repositorio no es la raíz.

Render: Una opción versátil para aplicaciones estáticas.

Después de ejecutar npm run build, la carpeta dist contendrá todos los archivos necesarios para el despliegue.

🧑‍💻 Autor
Tu Nombre / Alias: [Cristian Alejandro Marcus  /  Pola-Powa]

GitHub: https://github.com/CristianMarcus/React-2025-TalentoTech

LinkedIn: https://www.linkedin.com/in/cristian-marcus34738462/

📄 Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivoLICENCIAPara más detalles.

🤝 Contribuciones
Las contribuciones son bienvenidas. Si tienes sugerencias de mejora o encuentras algún error, por favor, abre un "problema" o envía un "pull request".