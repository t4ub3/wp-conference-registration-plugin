<template>
  <form class="registration-form" @submit="submit">
    <h4 class="registration-form__headline">Persönliche Daten:</h4>
    <fieldset class="registration-form__set">
      <label
        class="registration-form__block registration-form__label"
        for="crep-first-name"
        >Vorname:</label
      >
      <input
        class="registration-form__block"
        type="text"
        id="crep-first-name"
        v-model="newRegistration.first_name"
      />
      <label
        class="registration-form__block registration-form__label"
        for="crep-surname"
        >Nachname:</label
      >
      <input
        class="registration-form__block"
        type="text"
        id="crep-surname"
        v-model="newRegistration.surname"
      />
      <label
        class="registration-form__block registration-form__label"
        for="crep-contact_mail"
        >E-Mail-Adresse:</label
      >
      <input
        class="registration-form__block"
        type="email"
        id="crep-contact_mail"
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
    <template v-if="additionalParamFields.length">
      <h4 class="registration-form__headline">Sonstiges</h4>
      <fieldset class="registration-form__set">
        <template v-for="param in additionalParamFields">
          <label
            class="registration-form__block registration-form__label"
            :key="`label_${param.code}`"
            :for="param.code"
            >{{ param.name }}</label
          >
          <input
            class="registration-form__block"
            :key="param.code"
            type="text"
            v-model="newRegistration.additional_params[param.code]"
          />
        </template>
      </fieldset>
    </template>

    <button class="button button-primary" type="submit">Anmelden</button>
  </form>
</template>

<script>
import { getEvent, createRegistration } from "./utils/api-services";
import { parseJSONStringArray } from "./utils/helpers";
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
  },
  data() {
    return {
      newRegistration: {
        first_name: "",
        surname: "",
        contact_mail: "",
        event_id: this.eventId,
        additional_params: {},
      },
      event: {
        sessions: [],
        seminars: [],
      },
      seminar_map: {},
      seminarSelections: [],
      additionalParamFields: [],
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
        !Object.keys(this.newRegistration.additional_params).includes(
          param.code
        )
      ) {
        this.newRegistration.additional_params[param.code] = "";
      }
    });
  },
  methods: {
    submit(event) {
      event.preventDefault();
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
        this.newRegistration.additional_params
      );
      this.newRegistration.confirmed = 0;
      const result = createRegistration(this.newRegistration);
      alert(
        result.error
          ? "Beim Senden ist ein Fehler aufgetreten."
          : "Deine Anmeldung wurde versandt. Du erhälst bald eine Bestätigungsmail. Vielen Dank!"
      );
    },
  },
};
</script>

<style scoped>
.registration-form__block {
  display: block;
  width: 100%;
}
.registration-form__label {
  margin-top: 16px;
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