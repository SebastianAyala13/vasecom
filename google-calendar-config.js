// Google Calendar API Configuration
const GOOGLE_CONFIG = {
    // Reemplaza con tu API Key de Google Calendar
    API_KEY: 'TU_API_KEY_AQUI',
    // Reemplaza con tu Client ID de Google OAuth
    CLIENT_ID: 'TU_CLIENT_ID_AQUI.apps.googleusercontent.com',
    // Scopes necesarios para Google Calendar
    DISCOVERY_DOC: 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
    SCOPES: 'https://www.googleapis.com/auth/calendar.events',
    // ID del calendario (por defecto 'primary' es el calendario principal)
    CALENDAR_ID: 'primary'
};

// Inicializar Google API
let gapi;
let google;
let tokenClient;
let isGapiLoaded = false;
let isGsiLoaded = false;

// Cargar Google API
function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

// Inicializar cliente GAPI
async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: GOOGLE_CONFIG.API_KEY,
        discoveryDocs: [GOOGLE_CONFIG.DISCOVERY_DOC],
    });
    isGapiLoaded = true;
    checkIfReady();
}

// Cargar Google Identity Services
function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CONFIG.CLIENT_ID,
        scope: GOOGLE_CONFIG.SCOPES,
        callback: '', // Se define en tiempo de ejecución
    });
    isGsiLoaded = true;
    checkIfReady();
}

// Verificar si ambos APIs están cargados
function checkIfReady() {
    if (isGapiLoaded && isGsiLoaded) {
        console.log('✅ Google Calendar API está listo');
        // Habilitar botón de calendario si existe
        const calendarButtons = document.querySelectorAll('.calendar-btn, [onclick*="openCalendarModal"]');
        calendarButtons.forEach(btn => {
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
        });
    }
}

// Función para autenticar y crear evento
async function createCalendarEvent(eventDetails) {
    return new Promise((resolve, reject) => {
        tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
                reject(resp);
                return;
            }

            try {
                const event = {
                    'summary': eventDetails.summary,
                    'description': eventDetails.description,
                    'start': {
                        'dateTime': eventDetails.startDateTime,
                        'timeZone': 'America/Bogota'
                    },
                    'end': {
                        'dateTime': eventDetails.endDateTime,
                        'timeZone': 'America/Bogota'
                    },
                    'attendees': eventDetails.attendees || [],
                    'reminders': {
                        'useDefault': false,
                        'overrides': [
                            {'method': 'email', 'minutes': 24 * 60}, // 1 día antes
                            {'method': 'popup', 'minutes': 30}       // 30 min antes
                        ]
                    }
                };

                const request = await gapi.client.calendar.events.insert({
                    'calendarId': GOOGLE_CONFIG.CALENDAR_ID,
                    'resource': event
                });

                resolve(request.result);
            } catch (error) {
                reject(error);
            }
        };

        if (gapi.client.getToken() === null) {
            tokenClient.requestAccessToken({prompt: 'consent'});
        } else {
            tokenClient.requestAccessToken({prompt: ''});
        }
    });
}

// Función para verificar disponibilidad
async function checkAvailability(startDateTime, endDateTime) {
    try {
        const request = await gapi.client.calendar.freebusy.query({
            'resource': {
                'timeMin': startDateTime,
                'timeMax': endDateTime,
                'timeZone': 'America/Bogota',
                'items': [{'id': GOOGLE_CONFIG.CALENDAR_ID}]
            }
        });

        const busyTimes = request.result.calendars[GOOGLE_CONFIG.CALENDAR_ID].busy;
        return busyTimes.length === 0; // true si está disponible
    } catch (error) {
        console.error('Error checking availability:', error);
        return true; // Asumir disponible si hay error
    }
}

// Cargar APIs cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Cargar Google API
    if (typeof gapi !== 'undefined') {
        gapiLoaded();
    } else {
        window.gapiLoaded = gapiLoaded;
    }

    // Cargar Google Identity Services
    if (typeof google !== 'undefined') {
        gisLoaded();
    } else {
        window.gisLoaded = gisLoaded;
    }
});

// Exportar funciones para uso global
window.createCalendarEvent = createCalendarEvent;
window.checkAvailability = checkAvailability;
window.gapiLoaded = gapiLoaded;
window.gisLoaded = gisLoaded;
