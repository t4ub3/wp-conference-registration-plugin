<template>
  <div>
    <h1>Referent bearbeiten</h1>
    <edit-speaker-form
      button-text="Aktualisieren"
      @speaker-submit="updateSpeaker"
      :speaker="{ first_name, surname, location, description, path_to_picture }"
    ></edit-speaker-form>
  </div>
</template>

<script>
import EditSpeakerForm from "../components/EditSpeakerForm.vue";
import { updateSpeaker } from "../utils/api-services";

export default {
  name: "EditSpeaker",
  components: { EditSpeakerForm },
  props: {
      id: {
      type: Number,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    path_to_picture: {
      type: String,
    },
  },
  methods: {
    async updateSpeaker(speaker) {
      speaker.id = this.id;
      const result = await updateSpeaker(speaker);
      if (result.error) {
        alert(result.error);
      } else {
        alert(`${speaker.first_name} ${speaker.surname} wurde aktualisiert!`);
        this.$router.push("/speakers");
      }
    },
  },
};
</script>

<style>
</style>