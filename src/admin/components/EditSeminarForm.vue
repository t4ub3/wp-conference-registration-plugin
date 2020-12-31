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
            Optionaler Wert. Falls angegeben, werden Seminare in der Übersicht danach sortiert.
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
          <textarea
            id="crep-contact"
            v-model="newSeminar.description"
          />
        </td>
      </tr>
      <tr class="form-field">
        <th scope="row">max. Teilnehmerzahl </th>
        <td>
          <input
            id="crep-contact"
            v-model="newSeminar.slot_max"
            type="number"
            class="edit-seminar-form__number-field"
          />
          <p class="description">
            Wenn es kein Teilnehmer-Limit geben soll, bitte 0 eintragen. Frei lassen, um den Standardwert des Events zu übernehmen.
          </p>
        </td>
      </tr>
    </table>
    <button class="button button-primary" type="submit">
      {{ buttonText }}
    </button>
  </form>
</template>

<script>
export default {
  name: "EditSeminarForm",
  props: {
    buttonText: {
      type: String,
      default: "Speichern",
    },
    seminar: {
      type: Object,
      default: () => ({
        number: null,
        name: "",
        description: "",
        slot_max: null,
      }),
    },
  },
  data() {
    return {
      newSeminar: {
        number: this.seminar.number,
        name: this.seminar.name,
        description: this.seminar.description,
        slot_max: this.seminar.slot_max,
      },
    };
  },
  methods: {
    submit(event) {
      event.preventDefault();
      this.$emit("seminar-submit", this.newSeminar);
    },
  },
};
</script>

<style scoped>
  .edit-seminar-form .edit-seminar-form__number-field {
    width: 80px;
  }
</style>