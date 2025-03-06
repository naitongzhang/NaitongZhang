// script.js

document.addEventListener('DOMContentLoaded', function () {
    const languageSelect = document.getElementById('language-select');
    const translatableElements = document.querySelectorAll('[data-en][data-zh]');

    // Function to set the language
    function setLanguage(lang) {
        localStorage.setItem('lang', lang); // Store language preference in localStorage

        // Translate text content
        translatableElements.forEach(element => {
            if (lang === 'zh') {
                element.textContent = element.dataset.zh;
            } else {
                element.textContent = element.dataset.en;
            }
        });

        // Trigger Google Translate
        googleTranslateElementInit(lang); // Call the Google Translate initialization function with the selected language
    }

    function googleTranslateElementInit(lang) {
        new google.translate.TranslateElement({
            pageLanguage: 'en', // Your website's default language
            includedLanguages: 'en,zh-CN', // Languages you want to offer
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false, // Prevent initial automatic display
        }, 'google_translate_element');

        // Manually trigger translation after widget is initialized and language is set
        const googleTranslateFrame = document.querySelector('#google_translate_element iframe');
        if (googleTranslateFrame) {
            const languageSelectDropdown = googleTranslateFrame.contentDocument.querySelector('select.goog-te-combo');
            if (languageSelectDropdown) {
                languageSelectDropdown.value = lang; // Set the language in the dropdown
                languageSelectDropdown.dispatchEvent(new Event('change')); // Trigger the change event to translate
            }
        }
    }

    // Get stored language preference from localStorage or default to 'en'
    const currentLang = localStorage.getItem('lang') || 'en';
    setLanguage(currentLang);

    // No need for separate button event listeners anymore, dropdown handles it directly via onchange
});