import axios from "axios";

const restRoot = window.crep ? window.crep.rest_url : "http://127.0.0.1:8000/wp-json/";
const baseUrl = restRoot + "crep/v1/";
axios.defaults.headers.common["X-WP-Nonce"] = window.crep ? window.crep.nonce : null;

// ===== Events Api =========================================================== //

export async function getEvents() {
    return await safeRequest({
        method: "get",
        url: `${baseUrl}events`
    });
}

export async function deleteEvents(ids) {
    return await safeRequest({
        method: "delete",
        url: `${baseUrl}events`,
        data: {ids: ids}
    });
}

export async function createEvent(event) {
    return await safeRequest({
        method: "post",
        url: `${baseUrl}events`,
        data: event
    });
}

export async function updateEvent(event) {
    return await safeRequest({
        method: "put",
        url: `${baseUrl}events/${event.id}`,
        data: event
    });
}

// ===== Speakers Api ========================================================= //

export async function getSpeakers() {
    return await safeRequest({
        method: "get",
        url: `${baseUrl}speakers`
    });
}

export async function deleteSpeakers(ids) {
    return await safeRequest({
        method: "delete",
        url: `${baseUrl}speakers`,
        data: {ids: ids}
    });
}

export async function createSpeaker(speaker) {
    return await safeRequest({
        method: "post",
        url: `${baseUrl}speakers`,
        data: speaker
    });
}

export async function updateSpeaker(speaker) {
    return await safeRequest({
        method: "put",
        url: `${baseUrl}speakers/${speaker.id}`,
        data: speaker
    });
}

// ===== Tags Api ============================================================= //

// ===== Timeslots Api ======================================================== //

// ===== Registrations Api ==================================================== //

// ===== Seminars Api ========================================================= //

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