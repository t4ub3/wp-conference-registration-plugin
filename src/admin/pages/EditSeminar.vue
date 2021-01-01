<template>
  <div>
    <h1>Seminar bearbeiten</h1>
    <edit-seminar-form
      button-text="Aktualisieren"
      @seminar-submit="updateSeminar"
      :seminar-id="id"
      :event-id="parseInt($route.params.event_id)"
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
      id: parseInt(this.$route.params.seminar_id)
    };
  },
  methods: {
    async updateSeminar(seminar) {
      seminar.id = this.id;
      const result = await updateSeminar(seminar);
      if (result.error) {
        alert(result.error);
      } else {
        alert(`Seminar ${seminar.name} wurde aktualisiert!`);
        // TODO: route to edit event
        this.$router.push("/");
      }
    },
  },
};
</script>

<style>
</style>