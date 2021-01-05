<template>
  <form @submit="submit" class="edit-event-form">
    <table class="form-table" role="presentation">
      <tr class="form-field">
        <th scope="row">Name*</th>
        <td>
          <input id="crep-name" v-model="newEvent.name" required type="text" />
        </td>
      </tr>
      <tr class="form-field">
        <th scope="row">Kontakt*</th>
        <td>
          <input
            id="crep-contact"
            v-model="newEvent.contact_mail"
            required 
            type="text"
          />
          <p class="description">
            E-Mail-Adressen der Organisatoren. Diese Personen werden bei einer
            Registrierung benachrichtigt. Mehrere Adressen können mit Komma
            getrennt eingegeben werden.
          </p>
        </td>
      </tr>
      <tr class="form-field">
        <th scope="row">max. Teilnehmer je Seminar</th>
        <td>
          <input
            id="crep-contact"
            v-model="newEvent.default_slot_max"
            type="number"
            class="edit-event-form__number-field"
          />
          <p class="description">
            Die Anzahl kann später pro Seminar geändert werden. Wenn es kein
            Teilnehmer-Limit geben soll, bitte 0 eintragen.
          </p>
        </td>
      </tr>
      <tr class="form-field">
        <th scope="row">Weitere Felder</th>
        <td>
          <textarea v-model="newEvent.additional_params" />
          <p class="description">
            Zusätzliche Felder für das Anmeldeformular können hier im JSON
            Format eingetragen werden. Nur ändern, wenn man weiß, was man tut :)
          </p>
        </td>
      </tr>
    </table>
    <p>
      <em>* = Pflichtfeld</em>
    </p>
    <button class="button button-primary" type="submit">
      {{ buttonText }}
    </button>
  </form>
</template>

<script>
export default {
  name: "EditEventForm",
  props: {
    buttonText: {
      type: String,
      default: "Speichern",
    },
    event: {
      type: Object,
      default: () => ({
        name: "",
        contact_mail: "",
        default_slot_max: 25,
        additional_params: "",
      }),
    },
  },
  data() {
    return {
      newEvent: {
        name: this.event.name,
        contact_mail: this.event.contact_mail,
        default_slot_max: this.event.default_slot_max,
        additional_params: this.event.additional_params,
      },
    };
  },
  methods: {
    submit(event) {
      event.preventDefault();
      this.$emit("event-submit", this.newEvent);
    },
  },
};
</script>

<style scoped>
.edit-event-form .edit-event-form__number-field {
  width: 80px;
}
</style>