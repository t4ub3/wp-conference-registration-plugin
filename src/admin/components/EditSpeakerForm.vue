<template>
  <form @submit="submit" class="edit-speaker-form">
    <table class="form-table" role="presentation">      
      <tr class="form-field">
        <th scope="row">Vorname</th>
        <td>
          <input id="crep-first_name" v-model="newSpeaker.first_name" type="text" />
        </td>
      </tr>
      <tr class="form-field">
        <th scope="row">Nachname</th>
        <td>
          <input id="crep-surname" v-model="newSpeaker.surname" type="text" />
        </td>
      </tr>
      <tr class="form-field">
        <th scope="row">Ort</th>
        <td>
          <input id="crep-location" v-model="newSpeaker.location" type="text" />
        </td>
      </tr>
      <tr class="form-field">
        <th scope="row">Beschreibung</th>
        <td>
          <input id="crep-description" v-model="newSpeaker.description" type="text" />
        </td>
      </tr>
      <tr class="form-field">
        <th scope="row">Pfad zum Bild</th>
        <td>
          <input id="crep-path_to_picture" v-model="newSpeaker.path_to_picture" type="text" />
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
  name: "EditSpeakerForm",
  props: {
    buttonText: {
      type: String,
      default: "Speichern",
    },
    speaker: {
      type: Object,
      default: () => ({
        first_name: "",
        surname: "",
        location: "",
        description: "",
        path_to_picture: "",
      }),
    },
  },
  data() {
    return {
      newSpeaker: {
        first_name: this.speaker.first_name,
        surname: this.speaker.surname,
        location: this.speaker.location,
        description: this.speaker.description,
        path_to_picture: this.speaker.path_to_picture,
      },
    };
  },
  methods: {
    submit(speaker) {
      speaker.preventDefault();
      this.$emit("speaker-submit", this.newSpeaker);
    },
  },
};
</script>

<style scoped>
.edit-speaker-form .edit-speaker-form__number-field {
  width: 80px;
}
</style>