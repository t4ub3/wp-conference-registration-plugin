<template>
  <div>
      <h1>Neuen Referenten erstellen</h1>
      <edit-speaker-form button-text="Neuen Referenten erstellen" @speaker-submit="createSpeaker"></edit-speaker-form>
  </div>
</template>

<script>
import EditSpeakerForm from "../components/EditSpeakerForm.vue";
import { createSpeaker } from '../utils/api-services';

export default {
    name: "NewSpeaker",
    components: { EditSpeakerForm },
    methods: {
        async createSpeaker(speaker) {
            const result = await createSpeaker(speaker);
            if (result.error) {
                alert(result.error);
            } else {
                alert(` ${speaker.first_name} ${speaker.surname} wurde angelegt!`);
                this.$router.push("/speakers");
            }
        }
    }
}
</script>

<style>

</style>