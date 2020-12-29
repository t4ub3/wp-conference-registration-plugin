<template>
  <div>
    <h1>Event bearbeiten</h1>
    <edit-event-form
      button-text="Aktualisieren"
      @event-submit="updateEvent"
      :event="{ name, contact_mail, default_slot_max }"
    ></edit-event-form>
  </div>
</template>

<script>
import EditEventForm from "../components/EditEventForm.vue";
import { updateEvent } from "../utils/api-services";

export default {
  name: "EditEvent",
  components: { EditEventForm },
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    contact_mail: {
      type: String,
      required: true,
    },
    default_slot_max: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async updateEvent(event) {
      event.id = this.id;
      const result = await updateEvent(event);
      if (result.error) {
        alert(result.error);
      } else {
        alert(`Event ${event.name} wurde aktualisiert!`);
        this.$router.push("/");
      }
    },
  },
};
</script>

<style>
</style>