document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar el contenedor para el contenido dinámico adicional
    const additionalContentContainer = document.createElement('div');
    additionalContentContainer.id = 'additional-content';
    
    // Crear y agregar el contenido dinámico adicional
    const textContent = document.createElement('p');
    const anotherContent = document.createElement('p');

    textContent.textContent = 'Texto dinámico cargado desde el script.';
    anotherContent.textContent = 'Otro contenido dinámico cargado desde el script.';

    additionalContentContainer.appendChild(textContent);
    additionalContentContainer.appendChild(anotherContent);

     /*  // Agregar el contenido dinámico al final del body o a otro lugar específico
    document.body.appendChild(additionalContentContainer);

    // Función para actualizar el contenido dinámico
    function updateDynamicContent() {
        textContent.textContent = 'Texto actualizado: ' + new Date().toLocaleTimeString();
        anotherContent.textContent = 'Otro contenido actualizado: ' + new Date().toLocaleDateString();
    }

    // Actualizar el contenido cada 10 segundos
    setInterval(updateDynamicContent, 10000);

    // Inicializar el contenido dinámico
    updateDynamicContent();*/
});
