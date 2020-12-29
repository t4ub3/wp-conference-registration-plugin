<template>
  <div>
      <h1>Neues Event erstellen</h1>
      <edit-event-form button-text="Neues Event erstellen" @event-submit="createEvent"></edit-event-form>
  </div>
</template>

<script>
import EditEventForm from "../components/EditEventForm.vue";
import { createEvent } from '../utils/api-services';

export default {
    name: "NewEvent",
    components: { EditEventForm },
    methods: {
        async createEvent(event) {
            const result = await createEvent(event);
            if (result.error) {
                alert(result.error);
            } else {
                alert(`Event ${event.name} wurde angelegt!`);
                this.$router.push("/");
            }
        }
    }

}
</script>

<style>

</style>