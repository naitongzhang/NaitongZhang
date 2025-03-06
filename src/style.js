// script.js

document.addEventListener('DOMContentLoaded', function () {
    const translateEnButton = document.getElementById('translate_en');
    const translateZhButton = document.getElementById('translate_zh');
    const translatableElements = document.querySelectorAll('[data-en][data-zh]');

    // Function to set the language
    function setLanguage(lang) {
        localStorage.setItem('lang', lang); // Store language preference in localStorage

        // Update button active state
        translateEnButton.classList.remove('active');
        translateZhButton.classList.remove('active');
        if (lang === 'en') {
            translateEnButton.classList.add('active');
        } else if (lang === 'zh') {
            translateZhButton.classList.add('active');
        }

        // Translate text content
        translatableElements.forEach(element => {
            if (lang === 'zh') {
                element.textContent = element.dataset.zh;
            } else {
                element.textContent = element.dataset.en;
            }
        });

        // Trigger Google Translate (replace with your actual Google Translate Widget code)
        googleTranslateElementInit(lang); // Call the Google Translate initialization function with the selected language
    }


    function googleTranslateElementInit(lang) {
        new google.translate.TranslateElement({
            pageLanguage: 'en', // Your website's default language
            includedLanguages: 'en,zh-CN', // Languages you want to offer (English and Chinese Simplified)
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false, // Prevent initial automatic display
        }, 'google_translate_element');

        // Manually trigger translation after widget is initialized and language is set
        const googleTranslateFrame = document.querySelector('#google_translate_element iframe');
        if (googleTranslateFrame) {
            const languageSelect = googleTranslateFrame.contentDocument.querySelector('select.goog-te-combo');
            if (languageSelect) {
                languageSelect.value = lang; // Set the language in the dropdown
                languageSelect.dispatchEvent(new Event('change')); // Trigger the change event to translate
            }
        }
    }


    // Get stored language preference from localStorage or default to 'en'
    const currentLang = localStorage.getItem('lang') || 'en';
    setLanguage(currentLang);

    // Add event listeners to language buttons
    translateEnButton.addEventListener('click', function () {
        setLanguage('en');
    });

    translateZhButton.addEventListener('click', function () {
        setLanguage('zh');
    });
});