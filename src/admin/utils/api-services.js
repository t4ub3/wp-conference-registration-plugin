import axios from "axios";

const restRoot = window.crep ? window.crep.rest_url : "http://127.0.0.1:8000/wp-json/";
const baseUrl = restRoot + "crep/v1/";
axios.defaults.headers.common["X-WP-Nonce"] = window.crep ? window.crep.nonce : null;

// ===== Events Api =========================================================== //

export async function getEvents() {
    const untypedResult = await safeRequest({
        method: "get",
        url: `${baseUrl}events`
    });

    return untypedResult.map(event => ({
        ...event, id: parseInt(event.id), default_slot_max: parseInt(event.default_slot_max)
    }))
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

export async function getEvent(event_id) {
    return await safeRequest({
        method: "get",
        url: `${baseUrl}events/${event_id}`
    });
}

// ===== Speakers Api ========================================================= //

export async function getSpeakers() {
    const untypedResult = await safeRequest({
        method: "get",
        url: `${baseUrl}speakers`
    });

    return untypedResult.map(speaker => ({
        ...speaker, id: parseInt(speaker.id)
    }))
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

export async function getSpeaker(speaker_id) {
    return await safeRequest({
        method: "get",
        url: `${baseUrl}speakers/${speaker_id}`
    });
}

// ===== Tags Api ============================================================= //

export async function getTags(event_id) {
    const untypedResult = await safeRequest({
        method: "get",
        url: `${baseUrl}tags`,
        params: {event_id: event_id}
    });

    return untypedResult.map(tag => ({
        ...tag, id: parseInt(tag.id), event_id: parseInt(tag.event_id)
    }))
}

export async function deleteTags(ids) {
    return await safeRequest({
        method: "delete",
        url: `${baseUrl}tags`,
        data: {ids: ids}
    });
}

export async function createTag(tag) {
    return await safeRequest({
        method: "post",
        url: `${baseUrl}tags`,
        data: tag
    });
}

export async function updateTag(tag) {
    return await safeRequest({
        method: "put",
        url: `${baseUrl}tags/${tag.id}`,
        data: tag
    });
}

// ===== Sessions Api ======================================================== //

export async function getSessions(event_id) {
    const untypedResult = await safeRequest({
        method: "get",
        url: `${baseUrl}sessions`,
        params: {event_id: event_id}
    });

    return untypedResult.map(session => ({
        ...session, id: parseInt(session.id), event_id: parseInt(session.event_id)
    }))
}

export async function deleteSessions(ids) {
    return await safeRequest({
        method: "delete",
        url: `${baseUrl}sessions`,
        data: {ids: ids}
    });
}

export async function createSession(session) {
    return await safeRequest({
        method: "post",
        url: `${baseUrl}sessions`,
        data: session
    });
}

export async function updateSession(session) {
    return await safeRequest({
        method: "put",
        url: `${baseUrl}sessions/${session.id}`,
        data: session
    });
}

// ===== Registrations Api ==================================================== //

export async function getRegistrations(event_id) {
    const untypedResult = await safeRequest({
        method: "get",
        url: `${baseUrl}registrations`,
        params: {event_id: event_id}
    });

    return untypedResult.map(registration => ({
        ...registration, id: parseInt(registration.id), event_id: parseInt(registration.event_id)
    }))
}

export async function deleteRegistrations(ids) {
    return await safeRequest({
        method: "delete",
        url: `${baseUrl}registrations`,
        data: {ids: ids}
    });
}

export async function createRegistration(registration) {
    return await safeRequest({
        method: "post",
        url: `${baseUrl}registrations`,
        data: registration
    });
}

export async function updateRegistration(registration) {
    return await safeRequest({
        method: "put",
        url: `${baseUrl}registrations/${registration.id}`,
        data: registration
    });
}

export async function getRegistration(registration_id) {
    return await safeRequest({
        method: "get",
        url: `${baseUrl}registrations/${registration_id}`
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
        ...seminar, id: parseInt(seminar.id), event_id: parseInt(seminar.event_id), number: seminar.number !== null ? parseInt(seminar.number) : seminar.number
    }))
}

export async function deleteSeminars(ids) {
    return await safeRequest({
        method: "delete",
        url: `${baseUrl}seminars`,
        data: {ids: ids}
    });
}

export async function createSeminar(seminar) {
    return await safeRequest({
        method: "post",
        url: `${baseUrl}seminars`,
        data: seminar
    });
}

export async function updateSeminar(seminar) {
    return await safeRequest({
        method: "put",
        url: `${baseUrl}seminars/${seminar.id}`,
        data: seminar
    });
}

export async function getSeminar(seminar_id) {
    return await safeRequest({
        method: "get",
        url: `${baseUrl}seminars/${seminar_id}`
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