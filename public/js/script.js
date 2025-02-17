$(document).ready(function() {
    const currentLanguageElement = $('#current-language'); // Para el texto del dropdown
    const languageLinks = $('.dropdown-item');
    let currentLanguage = localStorage.getItem('language') || 'es'; // Obtiene el idioma del localStorage, o 'es' por defecto

    // Función para cargar las traducciones y aplicar los cambios
    function loadTranslations(language) {
        $.getJSON('./language/' + language + '.json', function(translations) {
            // Actualizar el texto del dropdown
            currentLanguageElement.text(translations.idioma_actual);
           
            // Aplicar traducciones a los elementos
            $('[data-translate]').each(function() {
                const key = $(this).data('translate');
                if (translations[key]) {
                    $(this).text(translations[key]);
                }
            });

            // Actualizar el atributo "lang" del elemento <html>
            $('html').attr('lang', language);
        });
    }


    // Cargar las traducciones iniciales
    loadTranslations(currentLanguage);

    // Manejar el click en los enlaces de idioma
    languageLinks.on('click', function(e) {
        e.preventDefault();
        const selectedLanguage = $(this).data('lang');
        localStorage.setItem('language', selectedLanguage); // Guarda el idioma en el localStorage
        loadTranslations(selectedLanguage);
    });
});