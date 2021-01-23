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

export async function exportRegistrationsBySeminars(seminars, event) {
  let registrations = await getRegistrations(event.id);
  let additionalParams = parseJSONStringArray(event.additional_params);
  let csvHead = "Vorname;Nachname,E-Mail,Bestätigt,Anmeldedatum";
  additionalParams.forEach(param => {
    csvHead += "," + param.name;
  });
  registrations.forEach(registration => {
    registration.additionalParams = parseJSONStringObject(registration.additional_params);
    registration.seminars.forEach(seminar => {
      if (seminars[seminar.seminar_id]) {
        seminars[seminar.seminar_id].sessions[
          seminar.session_id
        ].registrations.push([
          registration.first_name,
          registration.surname,
          registration.contact_mail, 
          registration.confirmed === "1" ? "Ja" : "Nein", 
          registration.registration_date,
          ...additionalParams.map(param => registration.additionalParams[param.code])
        ]);
      }
    });
  });

  Object.values(seminars).forEach(seminar => {
    let csvContent = "data:text/csv;charset=utf-8,";
    Object.values(seminar.sessions).forEach(session => {
      csvContent += session.name + "\n\n";
      csvContent += csvHead + "\n";
      csvContent += session.registrations.map(registration => registration.map(value => value ? `"${value}"` : "-").join(",")).join("\n");
      csvContent += "\n\n\n"
    });
    createCsv(csvContent, seminar.name);
  });
}

export function exportAllRegistrations(registrations, event) {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Vorname,Nachname,E-Mail,Bestätigt,Anmeldedatum";
  event.sessions.forEach(session => {
    csvContent += "," + session.name;
  });
  let additionalParams = parseJSONStringArray(event.additional_params);
  additionalParams.forEach(param => {
    csvContent += "," + param.name;
  });
  csvContent += "\n";

  registrations.forEach(registration => {
    registration.additionalParams = parseJSONStringObject(registration.additional_params);
    const values = [registration.first_name,
                    registration.surname, 
                    registration.contact_mail, 
                    registration.confirmed === "1" ? "Ja" : "Nein", 
                    registration.registration_date,
                    ... event.sessions.map(session => registration["session_" + session.id] || "-"),
                    ...additionalParams.map(param => registration.additionalParams[param.code])
                  ];
    csvContent += values.map(value => value ? `"${value}"` : "-").join(",") + "\n";
  });
  createCsv(csvContent, event.name);
}

function createCsv(content, filename) {
  const data = encodeURI(content);
  const link = document.createElement("a");
  link.setAttribute("href", data);
  link.setAttribute("download", filename.replaceAll(" ", "_").replace(/\W/g, "") + ".csv");
  link.click();
}
