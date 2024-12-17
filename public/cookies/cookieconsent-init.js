import "../cookies/cookieconsent.umd.js";

let cookieConsentInstance;

export function initializeCookieConsent(language = 'en') {
    cookieConsentInstance = CookieConsent.run({
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
                readOnly: false, // Allow toggling
                enabled: true
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
                        title: '<span id="cookieTitle">Hello traveller, it\'s cookie time!</span>',
                        description: `
                            <span id="cookieDesc">
                                Our website uses tracking cookies to understand how you interact with it. 
                                The tracking will be enabled only if you accept explicitly. 
                                <a href="#privacy-policy" id="cookieManageLink" data-cc="show-preferencesModal" class="cc__link">
                                    Manage preferences
                                </a>
                            </span>
                        `,
                        acceptAllBtn: '<span id="cookieAcceptAll">Accept all</span>',
                        acceptNecessaryBtn: '<span id="cookieRejectAll">Reject all</span>',
                        footer: `
                            <a id="cookiePrivacyLink" href="#test">Privacy Policy</a>
                            <a id="cookieImpressumLink" href="#test">Impressum</a>
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
                                        These cookies are essential for the website to function.
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
                        title: '<span id="cookieTitle">Hallo Besucher, Zeit für Cookies!</span>',
                        description: `
                            <span id="cookieDesc">
                                Unsere Website verwendet Tracking-Cookies, um zu verstehen, wie Sie mit ihr interagieren.
                                Das Tracking wird nur aktiviert, wenn Sie es ausdrücklich akzeptieren. 
                                <a href="#privacy-policy" id="cookieManageLink" data-cc="show-preferencesModal" class="cc__link">
                                    Präferenzen verwalten
                                </a>
                            </span>
                        `,
                        acceptAllBtn: '<span id="cookieAcceptAll">Alle akzeptieren</span>',
                        acceptNecessaryBtn: '<span id="cookieRejectAll">Alle ablehnen</span>',
                        footer: `
                            <a id="cookiePrivacyLink" href="https://geongroup.de/dev/public/main/subSites/privacyPolicy/index.html">Datenschutzerklärung</a>
                            <a id="cookieImpressumLink" href="#test">Impressum</a>
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
                                        Diese Cookies sind für die Funktion der Website unerlässlich.
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
}
