<template>
  <div>
    <h1>Neues Seminar erstellen</h1>
    <edit-seminar-form
      button-text="Neues Seminar erstellen"
      @seminar-submit="createSeminar"
      :event-id="eventId"
    ></edit-seminar-form>
  </div>
</template>

<script>
import EditSeminarForm from "../components/EditSeminarForm.vue";
import { createSeminar } from "../utils/api-services";

export default {
  name: "NewSeminar",
  components: { EditSeminarForm },
  data() {
    return {
      eventId: parseInt(this.$route.params.event_id)
    };
  },
  methods: {
    async createSeminar(seminar) {
      const result = await createSeminar(seminar);
      if (result.error) {
        alert(result.error);
      } else {
        alert(`Seminar ${seminar.name} wurde angelegt!`);
        this.$router.push({path: `/${this.eventId}/edit-event` });
      }
    },
  },
};
</script>

<style>
</style>