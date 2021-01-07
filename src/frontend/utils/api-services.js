import axios from "axios";

const restRoot = window.crep ? window.crep.rest_url : "http://127.0.0.1:8000/wp-json/";
const baseUrl = restRoot + "crep/v1/";
axios.defaults.headers.common["X-WP-Nonce"] = window.crep ? window.crep.nonce : null;

// ===== Events Api =========================================================== //

export async function getEvent(event_id) {
    return await safeRequest({
        method: "get",
        url: `${baseUrl}events/${event_id}`
    });
}

// ===== Seminars Api ========================================================= //

export async function getSeminars(event_id) {
    const untypedResult = await safeRequest({
        method: "get",
        url: `${baseUrl}seminars`,
        params: {event_id: event_id}
    });

    return untypedResult.map(seminar => ({
        ...seminar, id: parseInt(seminar.id), event_id: parseInt(seminar.event_id), slot_max: parseInt(seminar.slot_max)
    }))
}

// ===== Registrations Api ==================================================== //

export async function createRegistration(registration) {
    return await safeRequest({
        method: "post",
        url: `${baseUrl}registrations/validate`,
        data: registration
    });
}

// ===== Helpers ============================================================== //

async function safeRequest(axiosConfig) {
    try {
        const response = await axios(axiosConfig);
        return response.data;
    } catch(e) {
        console.error(e);
        return {error: "Bei der Verbindung zum Server ist ein Fehler aufgetreten! " +
      "Stelle sicher, dass du als Admin eingeloggt bist und versuche es noch einmal."};
    }
}