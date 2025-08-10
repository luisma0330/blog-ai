# Mi Blog Minimalista

Un blog sencillo y elegante creado con HTML, CSS y JavaScript puro, sin frameworks ni bases de datos. Perfecto para compartir ideas de manera rápida y eficiente.

## 🚀 Características

- **Sin dependencias**: Solo HTML, CSS y JavaScript puro
- **Sin base de datos**: Las publicaciones se almacenan en un archivo JSON
- **Responsive**: Se adapta perfectamente a móviles, tablets y escritorio
- **Fácil de usar**: Agregar nuevas publicaciones es tan simple como editar un archivo JSON
- **Rápido**: Carga instantánea sin consultas a servidor
- **Minimalista**: Diseño limpio y enfocado en el contenido

## 📁 Estructura del proyecto

```
/blog
 ├─ index.html      → Página principal con lista de publicaciones
 ├─ post.html       → Plantilla para mostrar una publicación individual
 ├─ style.css       → Estilos generales del blog
 ├─ script.js       → Lógica para cargar publicaciones en la página principal
 ├─ post.js         → Lógica para mostrar un post individual
 ├─ posts.json      → Archivo con todas las publicaciones
 ├─ imagenes/       → Carpeta con imágenes usadas en los posts
 └─ README.md       → Este archivo con instrucciones
```

## 🛠️ Instalación y uso

### 1. Descargar los archivos
Descarga todos los archivos del blog en una carpeta de tu computadora.

### 2. Abrir el blog localmente
Tienes varias opciones para ver tu blog (recomendado usar un servidor local para que `posts.json` y las imágenes carguen correctamente):

**Opción A: Servidor local con Python (Recomendado)**
```bash
# Python 3 (macOS/Linux/Windows)
python3 -m http.server 5500 --bind 127.0.0.1
```
Luego abre en tu navegador:
- Página principal: http://127.0.0.1:5500/index.html
- Página de detalle: http://127.0.0.1:5500/post.html?id=1

Para detener el servidor: presiona Ctrl + C en la terminal.

**Opción B: Servidor local con Node.js**
```bash
npx http-server -p 5500 -a 127.0.0.1
```
Abre http://127.0.0.1:5500/index.html

**Opción C: Extensión de VS Code (Live Server)**
Instala la extensión "Live Server" y haz clic derecho en `index.html` → "Open with Live Server".

**Importante**
- Evita abrir `index.html` con doble clic (file://). Los navegadores bloquean `fetch('posts.json')` por seguridad y no se cargarán publicaciones ni imágenes.

### 3. ¡Listo!
Tu blog debería estar funcionando. Verás las publicaciones de ejemplo en la página principal.

## ✏️ Cómo agregar nuevas publicaciones

### Paso 1: Abrir posts.json
Abre el archivo `posts.json` en cualquier editor de texto.

### Paso 2: Agregar nueva publicación
Agrega un nuevo objeto al array siguiendo esta estructura:

```json
{
  "id": "4",
  "title": "Título de tu nueva publicación",
  "date": "2025-08-09",
  "image": "https://via.placeholder.com/800x400",
  "content": "Aquí va el contenido completo de tu publicación. Puedes escribir varios párrafos separándolos con \\n\\n para crear saltos de párrafo."
}
```

### Paso 3: Guardar y actualizar
Guarda el archivo y recarga tu navegador. ¡Tu nueva publicación aparecerá automáticamente!

### Ejemplo completo:
```json
[
  {
    "id": "1",
    "title": "Mi primera publicación",
    "date": "2025-08-09",
    "image": "https://via.placeholder.com/800x400",
    "content": "Contenido de la primera publicación..."
  },
  {
    "id": "4",
    "title": "Mi nueva publicación",
    "date": "2025-08-10",
    "image": "https://via.placeholder.com/800x400",
    "content": "Este es mi nuevo post.\\n\\nAquí hay un segundo párrafo."
  }
]
```

## 🎨 Personalización

### Cambiar colores y estilos
Edita el archivo `style.css` para personalizar:

- **Colores principales**: Busca las variables de color como `#2c3e50`, `#007bff`, etc.
- **Tipografía**: Cambia la propiedad `font-family` en el selector `body`
- **Espaciado**: Modifica los valores de `padding` y `margin`
- **Tamaños**: Ajusta los valores de `font-size` para títulos y texto

### Cambiar el título del blog
En `index.html` y `post.html`, busca:
```html
<h1 class="blog-title">Mi Blog Minimalista</h1>
<p class="blog-description">Un espacio para compartir ideas y experiencias</p>
```

### Personalizar imágenes
- Usa servicios como [Unsplash](https://unsplash.com) para imágenes gratuitas
- O crea una carpeta `images/` y guarda tus propias imágenes
- Actualiza las URLs en `posts.json`

## 📱 Características técnicas

### Responsive Design
El blog se adapta automáticamente a diferentes tamaños de pantalla:
- **Escritorio**: Grid de múltiples columnas
- **Tablet**: Grid de una columna más ancha
- **Móvil**: Diseño optimizado para pantallas pequeñas

### Funcionalidades JavaScript
- **Carga asíncrona**: Los posts se cargan de forma no bloqueante
- **Manejo de errores**: Mensajes informativos si algo falla
- **Formateo automático**: Fechas y contenido se formatean automáticamente
- **Navegación**: Sistema de enlaces entre páginas

### SEO Básico
- Títulos dinámicos para cada post
- Atributos `alt` en imágenes
- Estructura semántica HTML5
- Meta tags básicos

## 🔧 Solución de problemas

### Las imágenes no se ven
1. Asegúrate de estar usando un servidor local (no file://).
2. Revisa la consola del navegador por errores 404 hacia `imagenes/...` o fallos de `fetch('posts.json')`.
3. Verifica que existan los archivos dentro de `imagenes/` y que las rutas en `posts.json` sean correctas (recomendado usar `./imagenes/...`).

### Las publicaciones no se cargan
1. Verifica que `posts.json` tenga formato JSON válido
2. Asegúrate de estar usando un servidor local (no abrir el archivo directamente)
3. Revisa la consola del navegador (F12) para ver errores

### Una publicación específica no aparece
1. Verifica que el `id` sea único y no contenga espacios
2. Asegúrate de que todos los campos requeridos estén presentes
3. Revisa que no haya comas extra en el JSON

### El diseño se ve mal
1. Verifica que `style.css` esté en la misma carpeta
2. Asegúrate de que no haya errores en el CSS
3. Prueba en diferentes navegadores

## 🚀 Despliegue en producción

### GitHub Pages (Gratis)
1. Sube todos los archivos a un repositorio de GitHub
2. Ve a Settings → Pages
3. Selecciona la rama main como fuente
4. ¡Tu blog estará disponible en `usuario.github.io/repositorio`!

### Netlify (Gratis)
1. Arrastra la carpeta del blog a [netlify.com/drop](https://netlify.com/drop)
2. ¡Tu blog estará online inmediatamente!

### Otros servicios
El blog funciona en cualquier servidor web que sirva archivos estáticos:
- Vercel
- Surge.sh
- Firebase Hosting
- Cualquier hosting tradicional

## 📝 Consejos adicionales

### Para escribir contenido
- Usa `\\n\\n` en el JSON para crear párrafos separados
- Mantén los resúmenes interesantes (se muestran los primeros 100 caracteres)
- Usa imágenes de buena calidad (recomendado: 800x400px)

### Para mantener el blog
- Haz copias de seguridad regulares del archivo `posts.json`
- Mantén un orden cronológico en las fechas
- Usa IDs secuenciales para facilitar la organización

### Para expandir funcionalidades
- Puedes agregar categorías o tags modificando la estructura JSON
- Es posible agregar un buscador simple con JavaScript
- Se pueden implementar comentarios usando servicios externos como Disqus

## 🤝 Contribuir

Este es un proyecto de código abierto. Si encuentras errores o tienes sugerencias:
1. Reporta problemas describiendo el error detalladamente
2. Sugiere mejoras explicando el beneficio
3. Comparte tu versión personalizada para inspirar a otros

---

¡Disfruta de tu nuevo blog minimalista! 🎉
