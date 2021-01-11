<template>
  <div>
    <h1>Anmeldung bearbeiten</h1>
    <edit-registration-form
      button-text="Aktualisieren"
      @registration-submit="updateRegistration"
      :registration-id="id"
      :event-id="eventId"
    ></edit-registration-form>
  </div>
</template>

<script>
import EditRegistrationForm from "../components/EditRegistrationForm.vue";
import { updateRegistration } from "../utils/api-services";

export default {
  name: "EditRegistration",
  components: { EditRegistrationForm },
  data() {
    return {
      id: parseInt(this.$route.params.registration_id),
      eventId: parseInt(this.$route.params.event_id)
    };
  },
  methods: {
    async updateRegistration(registration) {
      registration.id = this.id;
      const result = await updateRegistration(registration);
      if (result.error) {
        alert(result.error);
      } else {
        alert(`Anmeldung für ${registration.first_name} ${registration.surname} wurde aktualisiert!`);
        this.$router.push({path: `/${this.eventId}/edit-event` });
      }
    },
  },
};
</script>

<style>
</style>