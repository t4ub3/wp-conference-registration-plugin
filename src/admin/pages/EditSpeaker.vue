<template>
  <div>
    <h1>Referent bearbeiten</h1>
    <edit-speaker-form v-if="speaker"
      button-text="Aktualisieren"
      @speaker-submit="updateSpeaker"
      :speaker="speaker"
    ></edit-speaker-form>
  </div>
</template>

<script>
import EditSpeakerForm from "../components/EditSpeakerForm.vue";
import { getSpeaker, updateSpeaker } from "../utils/api-services";

export default {
  name: "EditSpeaker",
  components: { EditSpeakerForm },
  data() {
    return {
      id: parseInt(this.$route.params.speaker_id),
      speaker: null
    };
  },
  async created() {
    this.speaker = await getSpeaker(this.id);
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