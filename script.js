// script.js - Lógica para cargar y mostrar publicaciones en la página principal

// Función principal que se ejecuta cuando la página se carga
document.addEventListener('DOMContentLoaded', function() {
    loadPosts();
});

// Función para cargar las publicaciones desde posts.json
async function loadPosts() {
    try {
        // Obtener el contenedor donde se mostrarán los posts
        const postsContainer = document.getElementById('posts-container');
        
        // Realizar petición al archivo posts.json
        const response = await fetch('posts.json');
        
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo posts.json');
        }
        
        // Convertir la respuesta a JSON
        const posts = await response.json();
        
        // Verificar si hay posts disponibles
        if (!posts || posts.length === 0) {
            postsContainer.innerHTML = '<div class="error">No hay publicaciones disponibles.</div>';
            return;
        }
        
        // Generar HTML para todas las publicaciones
        const postsHTML = posts.map(post => createPostCard(post)).join('');
        
        // Insertar las tarjetas en el contenedor
        postsContainer.innerHTML = postsHTML;
        
    } catch (error) {
        // Manejar errores de carga
        console.error('Error al cargar las publicaciones:', error);
        const postsContainer = document.getElementById('posts-container');
        postsContainer.innerHTML = '<div class="error">Error al cargar las publicaciones. Por favor, intenta más tarde.</div>';
    }
}

// Función para crear el HTML de una tarjeta de publicación
function createPostCard(post) {
    // Crear resumen del contenido (primeros 100 caracteres)
    const summary = createSummary(post.content, 100);
    
    // Formatear la fecha para mostrarla de manera legible
    const formattedDate = formatDate(post.date);
    
    // Retornar el HTML de la tarjeta
    return `
        <article class="post-card">
            <img src="${post.image}" alt="${post.title}" class="post-card-image" loading="lazy">
            <div class="post-card-content">
                <h2 class="post-card-title">${post.title}</h2>
                <time class="post-card-date">${formattedDate}</time>
                <p class="post-card-summary">${summary}</p>
                <a href="post.html?id=${post.id}" class="read-more">Leer más →</a>
            </div>
        </article>
    `;
}

// Función para crear un resumen del contenido
function createSummary(content, maxLength) {
    // Si el contenido es más corto que maxLength, devolverlo completo
    if (content.length <= maxLength) {
        return content;
    }
    
    // Cortar el texto y buscar el último espacio para no cortar palabras
    let summary = content.substring(0, maxLength);
    const lastSpaceIndex = summary.lastIndexOf(' ');
    
    // Si encontramos un espacio, cortar ahí; si no, usar el corte original
    if (lastSpaceIndex > 0) {
        summary = summary.substring(0, lastSpaceIndex);
    }
    
    return summary + '...';
}

// Función para formatear fechas de manera legible
function formatDate(dateString) {
    try {
        // Crear objeto Date desde el string
        const date = new Date(dateString);
        
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
