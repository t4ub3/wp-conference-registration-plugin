<template>
  <form @submit="submit" class="edit-registration-form">
    <h2>Persönliche Daten</h2>
    <table class="form-table" role="presentation">
      <tr class="form-field">
        <th scope="row">Vorname*</th>
        <td>
          <input v-model="newRegistration.first_name" required type="text" />
        </td>
      </tr>
      <tr class="form-field">
        <th scope="row">Nachname*</th>
        <td>
          <input v-model="newRegistration.surname" required type="text" />
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
    <template v-if="additionalParamFields.length">
      <h2>Sonstiges</h2>
      <table class="form-table" role="presentation">
        <tr
          class="form-field"
          v-for="param in additionalParamFields"
          :key="param.code"
        >
          <th scope="row">{{ param.name + (param.required ? "*" : "") }}</th>
          <td>
            <input
              type="text"
              :required="param.required"
              v-model="newRegistration.additional_params[param.code]"
            />
          </td>
        </tr>
      </table>
    </template>
    <p>
      <em>* = Pflichtfeld</em>
    </p>
    <button class="button button-primary" type="submit">
      {{ isConfirmation ? "Anmeldung bestätigen" : buttonText }}
    </button>
    <span id="delete-link">
      <a class="delete" @click="deleteRegistration" href="#">
        {{ deleteButtonText }}
      </a>
    </span>
  </form>
</template>

<script>
import {
  getRegistration,
  getEvent,
  getSeminars,
  deleteRegistrations,
} from "../utils/api-services";
import {
  getParameterByName,
  parseJSONStringArray,
  parseJSONStringObject,
} from "../utils/helpers";
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
    deleteButtonText: {
      type: String,
      default: "Löschen",
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
      seminars: [],
      isConfirmation: false,
    };
  },
  async created() {
    this.isConfirmation = !!getParameterByName("confirm_registration");
    let registration = null;

    if (this.registrationId) {
      registration = await getRegistration(this.$route.params.registration_id);
      this.newRegistration.first_name = registration.first_name;
      this.newRegistration.surname = registration.surname;
      this.newRegistration.contact_mail = registration.contact_mail;
      this.newRegistration.additional_params = parseJSONStringObject(
        registration.additional_params
      );
    }

    this.event = await getEvent(this.eventId);
    this.seminars = await getSeminars(this.eventId);

    this.seminars.forEach((seminar) => {
      this.seminar_map[seminar.id] = seminar;
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
          name: this.seminar_map[seminarId].name,
          $isDisabled:
            this.seminar_map[seminarId].slot_max <=
            this.seminar_map[seminarId].registrations[session.id],
        });
      });

      if (registration && registration.seminars) {
        registration.seminars.forEach((seminarPreloaded) => {
          if (seminarPreloaded.session_id === session.id) {
            seminarSelection.value = {
              code: seminarPreloaded.seminar_id,
              name: this.seminar_map[seminarPreloaded.seminar_id].name,
            };
          }
        });
      }

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
      this.newRegistration.is_confirmation = this.isConfirmation;
      this.$emit("registration-submit", this.newRegistration);
    },
    async deleteRegistration(event) {
      event.preventDefault();
      if (this.registrationId) {
        if (
          confirm(
            `Anmeldung für ${this.newRegistration.first_name} ${this.newRegistration.surname} wirklich löschen`
          )
        ) {
          const result = await deleteRegistrations([this.registrationId]);
          if (result.error) {
            alert(result.error);
            return;
          } else {
            alert(
              `Anmeldung für ${this.newRegistration.first_name} ${this.newRegistration.surname} gelöscht!`
            );
          }
        } else {
          return;
        }
      }
      this.$router.push({ path: `/${this.eventId}/edit-event` });
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