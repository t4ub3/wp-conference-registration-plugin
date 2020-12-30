<template>
  <div>
    <h1>{{ name }}</h1>
    <edit-event-form
      button-text="Aktualisieren"
      @event-submit="updateEvent"
      :event="{ name, contact_mail, default_slot_max }"
    ></edit-event-form>
    <tag-editor :event_id="id"> </tag-editor>
    <session-editor :event_id="id"> </session-editor>
  </div>
</template>

<script>
import EditEventForm from "../components/EditEventForm.vue";
import TagEditor from "../components/TagEditor.vue";
import SessionEditor from "../components/SessionEditor.vue";
import { updateEvent } from "../utils/api-services";

export default {
  name: "EditEvent",
  components: { EditEventForm, TagEditor, SessionEditor },
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