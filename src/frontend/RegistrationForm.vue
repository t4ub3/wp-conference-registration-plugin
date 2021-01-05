<template>
  <form class="registration-form" @submit="submit">
    <h4 class="registration-form__headline">Persönliche Daten:</h4>
    <fieldset class="registration-form__set">
      <label
        class="registration-form__block registration-form__label"
        for="crep-first-name"
        >Vorname:<em> (Pflichtfeld)</em></label
      >
      <input
        class="registration-form__block"
        type="text"
        id="crep-first-name"
        required
        v-model="newRegistration.first_name"
      />
      <label
        class="registration-form__block registration-form__label"
        for="crep-surname"
        >Nachname:<em> (Pflichtfeld)</em></label
      >
      <input
        class="registration-form__block"
        type="text"
        id="crep-surname"
        required
        v-model="newRegistration.surname"
      />
      <label
        class="registration-form__block registration-form__label"
        for="crep-contact_mail"
        >E-Mail-Adresse:<em> (Pflichtfeld)</em></label
      >
      <input
        class="registration-form__block"
        type="email"
        id="crep-contact_mail"
        required
        v-model="newRegistration.contact_mail"
      />
    </fieldset>
    <h4 class="registration-form__headline">Seminare auswählen:</h4>
    <fieldset class="registration-form__set">
      <template v-for="session in seminarSelections">
        <label
          class="registration-form__block registration-form__label"
          :key="`label_${session.id}`"
          :for="`seminar_${session.id}`"
          >{{ session.label }}</label
        >
        <multiselect
          :id="`seminar_${session.id}`"
          :key="session.id"
          class="edit-registration-form__fullwidth-field"
          v-model="session.value"
          placeholder="Suche nach einem Seminar"
          selectLabel="Enter oder Anklicken zum Auswählen"
          label="name"
          track-by="code"
          :options="session.options"
        >
          <template slot="noOptions">Keine Einträge.</template>
        </multiselect>
      </template>
    </fieldset>
    <template>
      <h4 class="registration-form__headline">Sonstiges</h4>
      <fieldset class="registration-form__set">
        <template v-for="param in additionalParamFields">
          <label
            class="registration-form__block registration-form__label"
            :key="`label_${param.code}`"
            :for="param.code"
            >{{ param.name }}
            <em v-if="param.required"> (Pflichtfeld)</em></label
          >
          <input
            class="registration-form__block"
            :key="param.code"
            :required="param.required"
            type="text"
            v-model="newRegistration.additional_params_object[param.code]"
          />
        </template>
        <div class="registration-form__label">
          <input
            type="checkbox"
            id="crep_consent"
            required
            v-model="newRegistration.consent"
          />
          <label
            class="registration-form__label registration-form__inline"
            for="crep_consent"
            >Mit der Nutzung dieses Formulars erkläre ich mich mit der
            Speicherung und Verarbeitung meiner Daten durch diese Website
            einverstanden.<em> (Pflichtfeld)</em></label
          >
        </div>
        <div class="registration-form__label">
          <span class="registration-form__equation"
            >{{ equation.summand }}&nbsp;&nbsp;+&nbsp;&nbsp;{{
              equation.addend
            }}&nbsp;&nbsp;=&nbsp;</span
          >
          <input
            class="registration-form__number"
            type="text"
            required
            v-model="newRegistration.result"
          /><em> (Pflichtfeld)</em>
        </div>
      </fieldset>
    </template>

    <button class="button button-primary" type="submit">Anmelden</button>
  </form>
</template>

<script>
import { getEvent, createRegistration } from "./utils/api-services";
import { parseJSONStringArray, getEquationData } from "./utils/helpers";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

export default {
  name: "RegistrationForm",
  components: { Multiselect },
  props: {
    eventId: {
      type: Number,
      required: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      newRegistration: {
        first_name: "",
        surname: "",
        contact_mail: "",
        event_id: this.eventId,
        additional_params_object: {},
        consent: false,
        result: "",
      },
      event: {
        sessions: [],
        seminars: [],
      },
      seminar_map: {},
      seminarSelections: [],
      additionalParamFields: [],
      equation: getEquationData(),
      requiredFields: ["Vorname", "Nachname", "E-Mail-Adresse"]
    };
  },
  async created() {
    this.event = await getEvent(this.eventId);
    this.event.seminars.forEach((seminar) => {
      this.seminar_map[seminar.id] = seminar.name;
    });

    this.event.sessions.forEach((session) => {
      const seminarSelection = {
        label: session.name,
        id: session.id,
        value: {},
        options: [],
      };
      session.seminar_ids.forEach((seminarId) => {
        seminarSelection.options.push({
          code: seminarId,
          name: this.seminar_map[seminarId],
        });
      });
      this.seminarSelections.push(seminarSelection);
    });

    this.additionalParamFields = parseJSONStringArray(
      this.event.additional_params
    );
    this.additionalParamFields.forEach((param) => {
      if (
        !Object.keys(this.newRegistration.additional_params_object).includes(
          param.code
        )
      ) {
        this.newRegistration.additional_params_object[param.code] = "";
      }
      if (param.required) {
        this.requiredFields.push(param.name);
      }
    });
  },
  methods: {
    async submit(event) {
      event.preventDefault();
      const empty_required_fields = this.additionalParamFields.filter(param => param.required && !this.newRegistration.additional_params_object[param.code]);
      if (empty_required_fields.length || !this.newRegistration.first_name || !this.newRegistration.surname || !this.newRegistration.contact_mail) {
        alert("Die Felder:\n\n" + this.requiredFields.join(', ') + "\n\nsind Pflichtfelder und müssen angegeben werden!");
        return;
      }
      if (!this.newRegistration.consent) {
        alert("Bitte bestätige den Hinweis zum Datenschutz, um dich anzumelden!");
        return;
      }
      if (this.newRegistration.result === "" || parseInt(this.newRegistration.result) !== this.equation.sum) {
        alert("Bitte gib die korrekte Summe an, um zu bestätigen, dass du kein Roboter bist.");
        return;
      }
      this.newRegistration.seminars = [];
      this.seminarSelections.forEach((seminarSelection) => {
        if (seminarSelection.value && seminarSelection.value.code) {
          this.newRegistration.seminars.push({
            session_id: seminarSelection.id,
            seminar_id: seminarSelection.value.code,
          });
        }
      });
      this.newRegistration.additional_params = JSON.stringify(
        this.newRegistration.additional_params_object
      );
      this.newRegistration.confirmed = 0;
      this.newRegistration.number_one = this.equation.summand;
      this.newRegistration.number_two = this.equation.addend;
      const result = await createRegistration(this.newRegistration);
      alert(
        result.success
          ? "Deine Anmeldung wurde versandt. Du erhälst bald eine Bestätigungsmail. Vielen Dank!"
          : "Beim Senden ist ein Fehler aufgetreten:\n\n" + (result.error || "Unbekannter Fehler")
      );
      if (result.success) {
        window.location.href = this.redirectUrl;
      }
    },
  },
};
</script>

<style scoped>
.registration-form__block {
  display: block;
  width: 100%;
}
.registration-form__inline {
  display: inline;
}
.registration-form__label {
  margin-top: 16px;
}
.registration-form__number {
  width: 100px;
}
.registration-form__equation {
  font-weight: bold;
}
.registration-form__set {
  margin: 0 0 56px 16px;
}
.registration-form__headline {
  margin-bottom: 0;
}
</style>

<style>
.registration-form .multiselect__input {
  border: none;
}
</style>