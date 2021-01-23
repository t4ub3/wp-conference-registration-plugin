import { getRegistrations } from "./api-services";

export function parseJSONStringArray(input) {
  let output = [];
  try {
    output = JSON.parse(input);
    if (!Array.isArray(output)) {
      console.error(
        "Input to parseJSONStringArray was not parsed into array correctly!"
      );
      output = [];
    }
  } catch (e) {
    console.error(e);
  }
  return output;
}

export function parseJSONStringObject(input) {
  let output = {};
  try {
    output = JSON.parse(input);
    if (Array.isArray(output) || !output) {
      console.error(
        "Input to parseJSONStringObject was not parsed into object correctly!"
      );
      output = {};
    }
  } catch (e) {
    console.error(e);
  }
  return output;
}

export function truncate(str, n) {
  if (!str) {
    return str;
  }
  return str.length > n ? str.substr(0, n - 1) + " ..." : str;
}

export function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export async function exportRegistrations(seminars, event_id) {
  let registrations = await getRegistrations(event_id);
  let csv_head = "Vorname;Nachname;E-Mail;Anmeldedatum";
  registrations.forEach(registration => {
    registration.seminars.forEach(seminar => {
      if (seminars[seminar.seminar_id]) {
        seminars[seminar.seminar_id].sessions[
          seminar.session_id
        ].registrations.push([
          registration.first_name,
          registration.surname,
          registration.contact_mail,
          registration.registration_date
        ]);
      }
    });
  });

  Object.values(seminars).forEach(seminar => {
    let csvContent = "data:text/csv;charset=utf-8,";
    Object.values(seminar.sessions).forEach(session => {
      csvContent += session.name + "\n\n";
      csvContent += csv_head + "\n";
      csvContent += session.registrations.map(registration => registration.join(";")).join("\n");
      csvContent += "\n\n\n"
    });
    const data = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", data);
      link.setAttribute("download", seminar.name.replaceAll(" ", "_") + ".csv");
      link.click();
  });
}
