import "../cookies/cookieFormFunction.js";

let cookieConsentInstance;


// Add listener for contact nav link
const setupContactNavListener = () => {
    const contactNav = document.getElementById('contactNavId');
    const contactSection = document.getElementById('contact');
    
    if (contactNav) {
        contactNav.addEventListener('click', () => {
            // Check if cookies are accepted by checking contact section visibility
            if (contactSection && contactSection.style.display === 'flex') {
                // If cookies are accepted, only scroll
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
};


const toggleContactForm = (cookie) => {
    const contactSection = document.getElementById('contact');

    if (!contactSection) {
        console.error('Contact section not found');
        return;
    }

    // Hide contact section by default
    contactSection.style.display = 'none';
    
    if (cookie && cookie.categories) {
        // Show form only if necessary cookies are accepted
        if (cookie.categories.includes('necessary')) {
            contactSection.style.display = 'flex';
        }
    } else {
        console.log('No cookie preferences found - keeping form hidden');
    }
};

// Single export declaration for initializeCookieConsent
export function initializeCookieConsent(language = 'en') {
    const contactSection = document.getElementById('contact');
    
    if (contactSection) {
        contactSection.style.display = 'none';
    }

    cookieConsentInstance = CookieConsent.run({
        onFirstConsent: ({cookie}) => {
            toggleContactForm(cookie);
        },
        onConsent: ({cookie}) => {
            toggleContactForm(cookie);
        }, 
        onChange: ({cookie}) => {
            toggleContactForm(cookie);
        },

        cookie: {
            name: 'cc_cookie_demo1',
        },

        guiOptions: {
            consentModal: {
                layout: 'box inline',
                position: 'bottom right',
                flipButtons: false
            },
            preferencesModal: {
                layout: 'box',
                position: 'left',
                flipButtons: false
            }
        },

        categories: {
            necessary: {
                readOnly: false,
                enabled: false,  // Set to false by default
                onAccept: () => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        contactSection.style.display = 'flex';
                    }
                },
                onReject: () => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        contactSection.style.display = 'none';
                    }
                }
            },
            analytics: {
                autoClear: {
                    cookies: [
                        {
                            name: /^(_ga|_gid)/
                        }
                    ]
                }
            }
        },

        language: {
            default: language,
            translations: {
                en: {
                    consentModal: {
                        showAgain: '<span id="cookieShowAgain">To access the contact form, you need to accept necessary cookies. Please review your cookie settings.</span>',
                        title: '<span id="cookieTitle">Hello traveller, it\'s cookie time!</span>',
                        description: `
                            <span id="cookieDesc">
                                Our website uses cookies to enable core functionality and improve your experience. 
                                The contact form will only be enabled if you accept necessary cookies.
                                <a href="#privacy-policy" id="cookieManageLink" data-cc="show-preferencesModal" class="cc__link">
                                    Manage preferences
                                </a>
                            </span>
                        `,
                        acceptAllBtn: '<span id="cookieAcceptAll">Accept all</span>',
                        acceptNecessaryBtn: '<span id="cookieRejectAll">Reject all</span>',
                        footer: `
                            <a id="cookiePrivacyLink" href="https://geongroup.de/subSites/privacyPolicy/index.html">Privacy Policy</a>
                            <a id="cookieImpressumLink" href="https://geongroup.de/subSites/imprint/index.html">Impressum</a>
                        `
                    },
                    preferencesModal: {
                        title: '<span id="preferencesTitle">Cookie preferences</span>',
                        acceptAllBtn: '<span id="preferencesAcceptAll">Accept all</span>',
                        acceptNecessaryBtn: '<span id="preferencesRejectAll">Reject all</span>',
                        savePreferencesBtn: '<span id="preferencesSave">Save preferences</span>',
                        closeIconLabel: '<span id="preferencesClose">Close</span>',
                        sections: [
                            {
                                title: '<span id="cookieUsageTitle">Cookie usage</span>',
                                description: `
                                    <span id="cookieUsageDesc">
                                        For more details, refer to our 
                                        <a href="https://geongroup.de/dev/public/main/subSites/privacyPolicy/index.html" class="cc__link" id="privacyPolicyLink">privacy policy</a>.
                                    </span>
                                `
                            },
                            {
                                title: '<span id="necessaryCookiesTitle">Strictly necessary cookies</span>',
                                description: `
                                    <span id="necessaryCookiesDesc">
                                        These cookies are essential for the website to function and enable features like the contact form.
                                    </span>
                                `,
                                linkedCategory: 'necessary'
                            },
                            {
                                title: '<span id="analyticsCookiesTitle">Performance and analytics cookies</span>',
                                description: `
                                    <span id="analyticsCookiesDesc">
                                        These cookies help us analyze usage and improve performance.
                                    </span>
                                `,
                                linkedCategory: 'analytics'
                            },
                            {
                                title: '<span id="moreInfoTitle">More information</span>',
                                description: `
                                    <span id="moreInfoDesc">
                                        For queries, please 
                                        <a class="cc__link" id="contactLink" href="#yourdomain.com">contact us</a>.
                                    </span>
                                `
                            }
                        ]
                    }
                },
                de: {
                    consentModal: {
                        showAgain: '<span id="cookieShowAgain">Um das Kontaktformular zu nutzen, müssen Sie die notwendigen Cookies akzeptieren. Bitte überprüfen Sie Ihre Cookie-Einstellungen.</span>',
                        title: '<span id="cookieTitle">Hallo Besucher, Zeit für Cookies!</span>',
                        description: `
                            <span id="cookieDesc">
                                Unsere Website verwendet Cookies für Kernfunktionen und zur Verbesserung Ihrer Erfahrung.
                                Das Kontaktformular wird nur aktiviert, wenn Sie notwendige Cookies akzeptieren.
                                <a href="#privacy-policy" id="cookieManageLink" data-cc="show-preferencesModal" class="cc__link">
                                    Präferenzen verwalten
                                </a>
                            </span>
                        `,
                        acceptAllBtn: '<span id="cookieAcceptAll">Alle akzeptieren</span>',
                        acceptNecessaryBtn: '<span id="cookieRejectAll">Alle ablehnen</span>',
                        footer: `
                            <a id="cookiePrivacyLink" href="#Line193">Datenschutzerklärung</a>
                            <a id="cookieImpressumLink" href="#Line194">Impressum</a>
                        `
                    },
                    preferencesModal: {
                        title: '<span id="preferencesTitle">Cookie-Einstellungen</span>',
                        acceptAllBtn: '<span id="preferencesAcceptAll">Alle akzeptieren</span>',
                        acceptNecessaryBtn: '<span id="preferencesRejectAll">Nur notwendige akzeptieren</span>',
                        savePreferencesBtn: '<span id="preferencesSave">Einstellungen speichern</span>',
                        closeIconLabel: '<span id="preferencesClose">Schließen</span>',
                        sections: [
                            {
                                title: '<span id="cookieUsageTitle">Cookie-Nutzung</span>',
                                description: `
                                    <span id="cookieUsageDesc">
                                        Weitere Informationen finden Sie in unserer 
                                        <a href="https://geongroup.de/dev/public/main/subSites/privacyPolicy/index.html" class="cc__link" id="privacyPolicyLink">Datenschutzerklärung</a>.
                                    </span>
                                `
                            },
                            {
                                title: '<span id="necessaryCookiesTitle">Unbedingt erforderliche Cookies</span>',
                                description: `
                                    <span id="necessaryCookiesDesc">
                                        Diese Cookies sind für die Funktion der Website und das Kontaktformular unerlässlich.
                                    </span>
                                `,
                                linkedCategory: 'necessary'
                            },
                            {
                                title: '<span id="analyticsCookiesTitle">Leistungs- und Analyse-Cookies</span>',
                                description: `
                                    <span id="analyticsCookiesDesc">
                                        Diese Cookies helfen uns, die Nutzung zu analysieren und die Leistung zu verbessern.
                                    </span>
                                `,
                                linkedCategory: 'analytics'
                            },
                            {
                                title: '<span id="moreInfoTitle">Weitere Informationen</span>',
                                description: `
                                    <span id="moreInfoDesc">
                                        Für Anfragen wenden Sie sich bitte an 
                                        <a class="cc__link" id="contactLink" href="#yourdomain.com">uns</a>.
                                    </span>
                                `
                            }
                        ]
                    }
                }
            }
        }
    });

    // Set up contact nav link listener
    setupContactNavListener();

    // Check existing cookie consent on page load
    const existingCookie = localStorage.getItem('cookie_consent');
    if (existingCookie) {
        try {
            const cookie = JSON.parse(existingCookie);
            toggleContactForm(cookie);
        } catch (e) {
            console.error('Error parsing existing cookie consent:', e);
            // If there's an error parsing the cookie, ensure the form is hidden
            if (contactSection) {
                contactSection.style.display = 'none';
            }
        }
    }
};

initializeCookieConsent();