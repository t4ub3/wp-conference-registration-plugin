<template>
  <div>
    <h1>Neues Seminar erstellen</h1>
    <edit-seminar-form
      button-text="Neues Seminar erstellen"
      @seminar-submit="createSeminar"
      :event-id="parseInt($route.params.event_id)"
    ></edit-seminar-form>
  </div>
</template>

<script>
import EditSeminarForm from "../components/EditSeminarForm.vue";
import { createSeminar } from "../utils/api-services";

export default {
  name: "NewSeminar",
  components: { EditSeminarForm },
  methods: {
    async createSeminar(seminar) {
      const result = await createSeminar(seminar);
      if (result.error) {
        alert(result.error);
      } else {
        alert(`Seminar ${seminar.name} wurde angelegt!`);
        // TODO: route to edit event
        this.$router.push("/");
      }
    },
  },
};
</script>

<style>
</style>