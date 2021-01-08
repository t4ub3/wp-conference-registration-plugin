<template>
  <div>
    <h1>Seminar bearbeiten</h1>
    <edit-seminar-form
      button-text="Aktualisieren"
      @seminar-submit="updateSeminar"
      :seminar-id="id"
      :event-id="eventId"
    ></edit-seminar-form>
  </div>
</template>

<script>
import EditSeminarForm from "../components/EditSeminarForm.vue";
import { updateSeminar } from "../utils/api-services";

export default {
  name: "EditSeminar",
  components: { EditSeminarForm },
  data() {
    return {
      id: parseInt(this.$route.params.seminar_id),
      eventId: parseInt(this.$route.params.event_id)
    };
  },
  methods: {
    async updateSeminar(seminar) {
      seminar.id = this.id;
      const result = await updateSeminar(seminar);
      if (result.error) {
        alert(result.error);
        this.$router.go();
      } else {
        alert(`Seminar ${seminar.name} wurde aktualisiert!`);
        this.$router.push({path: `/${this.eventId}/edit-event` });
      }
    },
  },
};
</script>

<style>
</style>