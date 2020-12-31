<template>
  <div>
    <h1>{{ name }}</h1>
    <edit-seminar-form
      button-text="Aktualisieren"
      @seminar-submit="updateSeminar"
      :seminar="{ number, name, description, slot_max }"
    ></edit-seminar-form>
  </div>
</template>

<script>
import EditSeminarForm from "../components/EditSeminarForm.vue";
import { updateSeminar } from "../utils/api-services";

export default {
  name: "EditSeminar",
  components: { EditSeminarForm },
  props: {
    number: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slot_max: {
      type: Number,
      required: true,
    },
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