// script.js

document.addEventListener('DOMContentLoaded', function () {
    const langButtons = document.querySelectorAll('.lang-switcher button');
    const translatableElements = document.querySelectorAll('[data-en][data-zh]');

    // Function to set the language
    function setLanguage(lang) {
        localStorage.setItem('lang', lang); // Store language preference in localStorage

        langButtons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.lang === lang) {
                button.classList.add('active');
            }
        });

        translatableElements.forEach(element => {
            if (lang === 'zh') {
                element.textContent = element.dataset.zh;
            } else {
                element.textContent = element.dataset.en;
            }
        });
    }

    // Get stored language preference from localStorage or default to 'en'
    const currentLang = localStorage.getItem('lang') || 'en';
    setLanguage(currentLang);

    // Add event listeners to language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', function () {
            const lang = this.dataset.lang;
            setLanguage(lang);
        });
    });
});