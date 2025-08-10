// post.js - Lógica para cargar y mostrar una publicación individual

// Función principal que se ejecuta cuando la página se carga
document.addEventListener('DOMContentLoaded', function() {
    loadPost();
});

// Función para cargar una publicación específica
async function loadPost() {
    try {
        // Obtener el ID del post desde la URL
        const postId = getPostIdFromURL();
        
        // Verificar si se encontró un ID válido
        if (!postId) {
            showError('No se especificó una publicación válida.');
            return;
        }
        
        // Obtener el contenedor donde se mostrará el post
        const postContainer = document.getElementById('post-content');
        
        // Realizar petición al archivo posts.json
        const response = await fetch('posts.json');
        
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo posts.json');
        }
        
        // Convertir la respuesta a JSON
        const posts = await response.json();
        
        // Buscar el post con el ID especificado
        const post = posts.find(p => p.id === postId);
        
        // Verificar si se encontró el post
        if (!post) {
            showError('La publicación solicitada no existe.');
            return;
        }
        
        // Mostrar el post
        displayPost(post);
        
        // Actualizar el título de la página
        updatePageTitle(post.title);
        
    } catch (error) {
        // Manejar errores de carga
        console.error('Error al cargar la publicación:', error);
        showError('Error al cargar la publicación. Por favor, intenta más tarde.');
    }
}

// Función para obtener el ID del post desde la URL
function getPostIdFromURL() {
    // Obtener los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    
    // Extraer el parámetro 'id'
    const postId = urlParams.get('id');
    
    // Verificar si el ID existe y no está vacío
    if (!postId || postId.trim() === '') {
        return null;
    }
    
    return postId.trim();
}

// Función para mostrar el contenido de una publicación
function displayPost(post) {
    // Formatear la fecha para mostrarla de manera legible
    const formattedDate = formatDate(post.date);
    
    // Crear el HTML del post
    const postHTML = `
        <header class="post-header">
            <h1 class="post-title">${post.title}</h1>
            <time class="post-date">${formattedDate}</time>
        </header>
        
        <div class="post-body">
            <img src="${post.image}" alt="${post.title}" class="post-image" loading="lazy">
            <div class="post-content">
                ${formatContent(post.content)}
            </div>
        </div>
    `;
    
    // Insertar el HTML en el contenedor
    const postContainer = document.getElementById('post-content');
    postContainer.innerHTML = postHTML;
}

// Función para formatear el contenido del post
function formatContent(content) {
    // Dividir el contenido en párrafos basándose en saltos de línea dobles
    const paragraphs = content.split('\n\n');
    
    // Convertir cada párrafo en un elemento <p>
    return paragraphs
        .map(paragraph => paragraph.trim())
        .filter(paragraph => paragraph.length > 0)
        .map(paragraph => `<p>${paragraph}</p>`)
        .join('');
}

// Función para mostrar mensajes de error
function showError(message) {
    const postContainer = document.getElementById('post-content');
    postContainer.innerHTML = `
        <div class="error">
            <h2>Error</h2>
            <p>${message}</p>
            <a href="index.html" class="back-link">← Volver al blog</a>
        </div>
    `;
}

// Función para actualizar el título de la página
function updatePageTitle(postTitle) {
    // Actualizar el título del documento
    document.title = `${postTitle} - Mi Blog Minimalista`;
}

// Función para formatear fechas de manera legible
function formatDate(dateString) {
    try {
        // Crear objeto Date desde el string
        // Nota: strings en formato YYYY-MM-DD se interpretan como UTC en JS y pueden mostrar el día anterior
        // en zonas horarias negativas. Para evitarlo, parseamos ese formato como fecha LOCAL.
        let date;
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            const [y, m, d] = dateString.split('-').map(Number);
            date = new Date(y, m - 1, d); // fecha local (sin desfase de zona horaria)
        } else {
            date = new Date(dateString);
        }
        
        // Verificar si la fecha es válida
        if (isNaN(date.getTime())) {
            return dateString; // Devolver el string original si no es una fecha válida
        }
        
        // Opciones para formatear la fecha en español
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        
        // Formatear la fecha en español
        return date.toLocaleDateString('es-ES', options);
        
    } catch (error) {
        console.error('Error al formatear la fecha:', error);
        return dateString; // Devolver el string original en caso de error
    }
}
