<template>
  <div>
    <h1>Neue Anmeldung erstellen</h1>
    <edit-registration-form
      button-text="Neue Anmeldung erstellen"
      delete-button-text="Verwerfen"
      @registration-submit="createRegistration"
      :event-id="eventId"
    ></edit-registration-form>
  </div>
</template>

<script>
import EditRegistrationForm from "../components/EditRegistrationForm.vue";
import { createRegistration } from "../utils/api-services";

export default {
  name: "NewRegistration",
  components: { EditRegistrationForm },
  data() {
    return {
      eventId: parseInt(this.$route.params.event_id)
    };
  },
  methods: {
    async createRegistration(registration) {
      registration.confirmed = 1;
      const result = await createRegistration(registration);
      if (result.error) {
        alert(result.error);
      } else {
        alert(`Anmeldung für ${registration.first_name} ${registration.surname} wurde angelegt!`);
        this.$router.push({path: `/${this.eventId}/edit-event` });
      }
    },
  },
};
</script>

<style>
</style>