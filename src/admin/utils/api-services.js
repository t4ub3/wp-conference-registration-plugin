import axios from "axios";

const restRoot = window.crep ? window.crep.rest_url : "http://127.0.0.1:8000/wp-json/";
const baseUrl = restRoot + "crep/v1/";
axios.defaults.headers.common["X-WP-Nonce"] = window.crep ? window.crep.nonce : null;

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