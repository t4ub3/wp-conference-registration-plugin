<template>
  <form @submit="submit" class="edit-seminar-form">
    <table class="form-table" role="presentation">
      <tr class="form-field">
        <th scope="row">Nummer</th>
        <td>
          <input
            id="crep-contact"
            v-model="newSeminar.number"
            type="number"
            class="edit-seminar-form__number-field"
          />
          <p class="description">
            Optionaler Wert. Falls angegeben, werden Seminare in der Übersicht
            danach sortiert.
          </p>
        </td>
      </tr>
      <tr class="form-field">
        <th scope="row">Name</th>
        <td>
          <input id="crep-name" v-model="newSeminar.name" type="text" />
        </td>
      </tr>
      <tr class="form-field">
        <th scope="row">Beschreibung</th>
        <td>
          <textarea id="crep-contact" v-model="newSeminar.description" />
        </td>
      </tr>
      <tr class="form-field">
        <th scope="row">max. Teilnehmerzahl</th>
        <td>
          <input
            id="crep-contact"
            v-model="newSeminar.slot_max"
            type="number"
            class="edit-seminar-form__number-field"
          />
          <p class="description">
            Wenn es kein Teilnehmer-Limit geben soll, bitte 0 eintragen. Frei
            lassen, um den Standardwert des Events zu übernehmen.
          </p>
        </td>
      </tr>
      <tr class="form-field">
        <th scope="row">Sessions</th>
        <td>
          <multiselect
            class="edit-seminar-form__fullwidth-field"
            v-model="sessionsValue"
            tag-placeholder="Session nicht gefunden"
            placeholder="Suche nach einer Session"
            selectLabel="Enter oder Anklicken zum Auswählen"
            label="name"
            track-by="code"
            :options="sessionsOptions"
            :multiple="true"
            :taggable="true"
          ></multiselect>
        </td>
      </tr>
      <tr class="form-field">
        <th scope="row">Referenten</th>
        <td>
          <multiselect
            class="edit-seminar-form__fullwidth-field"
            v-model="speakersValue"
            tag-placeholder="Referent nicht gefunden"
            placeholder="Suche nach einem Referenten"
            selectLabel="Enter oder Anklicken zum Auswählen"
            label="name"
            track-by="code"
            :options="speakersOptions"
            :multiple="true"
            :taggable="true"
          ></multiselect>
        </td>
      </tr>
      <tr class="form-field">
        <th scope="row">Schlagwörter</th>
        <td>
          <multiselect
            class="edit-seminar-form__fullwidth-field"
            v-model="tagsValue"
            tag-placeholder="Schlagwort nicht gefunden"
            placeholder="Suche nach einem Schlagwort"
            selectLabel="Enter oder Anklicken zum Auswählen"
            label="name"
            track-by="code"
            :options="tagsOptions"
            :multiple="true"
            :taggable="true"
          ></multiselect>
        </td>
      </tr>
    </table>
    <button class="button button-primary" type="submit">
      {{ buttonText }}
    </button>
  </form>
</template>

<script>
import { getSeminar, getEvent } from "../utils/api-services";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

export default {
  name: "EditSeminarForm",
  components: { Multiselect },
  props: {
    buttonText: {
      type: String,
      default: "Speichern",
    },
    seminarId: {
      type: Number,
    },
    eventId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      newSeminar: {
        number: null,
        name: "",
        description: "",
        slot_max: null,
      },
      event: {
        sessions_data: [],
        tags_data: [],
        speakers_data: [],
      },
      sessionsValue: [],
      sessionsOptions: [],
      speakersValue: [],
      speakersOptions: [],
      tagsValue: [],
      tagsOptions: [],
    };
  },
  async created() {
    let seminar = null;

    if (this.seminarId) {
      seminar = await getSeminar(this.$route.params.seminar_id);
      this.newSeminar.name = seminar.seminar_data.name;
      this.newSeminar.number = seminar.seminar_data.number;
      this.newSeminar.description = seminar.seminar_data.description;
      this.newSeminar.slot_max = seminar.seminar_data.slot_max;
    }

    this.event = await getEvent(this.eventId);
    this.event.sessions_data.forEach((session) => {
      this.sessionsOptions.push({
        name: session.name,
        code: session.id,
      });
      if (seminar && seminar.sessions_data.includes(session.id)) {
        this.sessionsValue.push({
          name: session.name,
          code: session.id,
        });
      }
    });
    this.event.speakers_data.forEach((speaker) => {
      this.speakersOptions.push({
        name: `${speaker.first_name} ${speaker.surname}`,
        code: speaker.id,
      });
      if (seminar && seminar.speakers_data.includes(speaker.id)) {
        this.speakersValue.push({
          name: `${speaker.first_name} ${speaker.surname}`,
          code: speaker.id,
        });
      }
    });
    this.event.tags_data.forEach((tag) => {
      this.tagsOptions.push({
        name: tag.name,
        code: tag.id,
      });
      if (seminar && seminar.tags_data.includes(tag.id)) {
        this.tagsValue.push({
          name: tag.name,
          code: tag.id,
        });
      }
    });
  },
  methods: {
    submit(event) {
      event.preventDefault();
      this.newSeminar.session_ids = this.sessionsValue.map(
        (session) => session.code
      );
      this.newSeminar.speaker_ids = this.speakersValue.map(
        (speaker) => speaker.code
      );
      this.newSeminar.tag_ids = this.tagsValue.map((tag) => tag.code);
      this.newSeminar.event_id = this.eventId;
      this.$emit("seminar-submit", this.newSeminar);
    },
  },
};
</script>

<style scoped>
.edit-seminar-form .edit-seminar-form__number-field {
  width: 80px;
}
.edit-seminar-form .edit-seminar-form__fullwidth-field {
  width: 95%;
}
</style>