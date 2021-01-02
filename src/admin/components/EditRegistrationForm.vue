<template>
  <form @submit="submit" class="edit-registration-form">
    <h2>Persönliche Daten</h2>
    <table class="form-table" role="presentation">
      <tr class="form-field">
        <th scope="row">Vorname</th>
        <td>
          <input v-model="newRegistration.first_name" type="text" />
        </td>
      </tr>
      <tr class="form-field">
        <th scope="row">Nachname</th>
        <td>
          <input v-model="newRegistration.surname" type="text" />
        </td>
      </tr>
      <tr class="form-field">
        <th scope="row">E-Mail</th>
        <td>
          <input v-model="newRegistration.contact_mail" type="email" />
        </td>
      </tr>
    </table>
    <h2>Seminare auswählen</h2>
    <table class="form-table" role="presentation">
      <tr
        class="form-field"
        v-for="session in seminarSelections"
        :key="session.id"
      >
        <th scope="row">{{ session.label }}</th>
        <td>
          <multiselect
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
        </td>
      </tr>
    </table>
    <button class="button button-primary" type="submit">
      {{ buttonText }}
    </button>
  </form>
</template>

<script>
import { getRegistration, getEvent } from "../utils/api-services";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

export default {
  name: "EditRegistrationForm",
  components: { Multiselect },
  props: {
    buttonText: {
      type: String,
      default: "Speichern",
    },
    registrationId: {
      type: Number,
    },
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
        event_id: this.eventId
      },
      event: {
        sessions: [],
        seminars: [],
      },
      seminar_map: {},
      seminarSelections: [],
    };
  },
  async created() {
    let registration = null;

    if (this.registrationId) {
      registration = await getRegistration(this.$route.params.registration_id);
      this.newRegistration.first_name = registration.first_name;
      this.newRegistration.surname = registration.surname;
      this.newRegistration.contact_mail = registration.contact_mail;
    }

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

      if (registration && registration.seminars) {
        registration.seminars.forEach(seminarPreloaded => {
          if (seminarPreloaded.session_id === session.id) {
            seminarSelection.value = {code: seminarPreloaded.seminar_id, name: this.seminar_map[seminarPreloaded.seminar_id]};
          }
        });
      }

      this.seminarSelections.push(seminarSelection);
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
      this.$emit("registration-submit", this.newRegistration);
    },
  },
};
</script>

<style scoped>
.edit-registration-form .edit-registration-form__number-field {
  width: 80px;
}
.edit-registration-form .edit-registration-form__fullwidth-field {
  width: 95%;
}
</style>