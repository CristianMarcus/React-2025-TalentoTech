# Nombre de Tu Tienda E-commerce

Una aplicación de E-commerce básica construida con React y React-Bootstrap, con un sistema de carrito de compras funcional y gestión de estado utilizando Context API.

## Características

* **Página de Inicio:** Muestra un listado de productos disponibles.
* **Detalles del Producto:** Página dedicada para cada producto con descripción, precio, y opción para añadir al carrito.
* **Carrito de Compras:**
    * Añadir/Eliminar productos.
    * Actualizar cantidades.
    * Vaciar el carrito completamente.
    * Persistencia de datos del carrito en `localStorage`.
    * Simulación de "Finalizar Compra".
* **Notificaciones:** Retroalimentación al usuario mediante `react-toastify`.
* **Estilos:** Implementado con React-Bootstrap para un diseño responsivo y moderno.
* **Gestión de Estado:** `React Context API` para el estado global del carrito.

## Tecnologías Utilizadas

* **React** (con Vite)
* **React Router DOM**
* **React Bootstrap**
* **React Toastify**
* **Framer Motion** (para animaciones, si la sigues usando)
* **React Helmet Async** (para SEO, si la sigues usando)

## Instalación y Ejecución

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local.

### Prerrequisitos

Asegúrate de tener Node.js y npm (o Yarn) instalados en tu sistema.

* [Node.js](https://nodejs.org/) (versión LTS recomendada)

### Pasos

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)
    cd tu-repositorio
    ```
    (Reemplaza `https://github.com/tu-usuario/tu-repositorio.git` con la URL de tu repositorio real).

2.  **Instalar dependencias:**
    ```bash
    npm install
    # o si usas yarn
    # yarn install
    ```

3.  **Ejecutar la aplicación en modo desarrollo:**
    ```bash
    npm run dev
    # o si usas yarn
    # yarn dev
    ```
    La aplicación se iniciará en `http://localhost:5173` (o un puerto similar).

4.  **Construir para producción (opcional):**
    ```bash
    npm run build
    # o si usas yarn
    # yarn build
    ```
    Esto creará una carpeta `dist` con la versión optimizada de tu aplicación lista para desplegar.

## Estructura del Proyecto