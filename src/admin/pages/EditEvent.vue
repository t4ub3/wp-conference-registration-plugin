<template>
  <div>
    <h1>{{ event ? event.name : "Lade Event-Daten ..." }}</h1>
    <template v-if="event">
      <edit-event-form
        button-text="Aktualisieren"
        @event-submit="updateEvent"
        :event="event"
      ></edit-event-form>
      <session-editor :sessions-preloaded="event.sessions" :event_id="id"> </session-editor>
      <seminar-editor :event_id="id"> </seminar-editor>
      <tag-editor :tags-preloaded="event.tags"  :event_id="id"> </tag-editor>
    </template>
  </div>
</template>

<script>
import EditEventForm from "../components/EditEventForm.vue";
import TagEditor from "../components/TagEditor.vue";
import SessionEditor from "../components/SessionEditor.vue";
import SeminarEditor from "../components/SeminarEditor.vue";
import { getEvent, updateEvent } from "../utils/api-services";

export default {
  name: "EditEvent",
  components: { EditEventForm, TagEditor, SessionEditor, SeminarEditor },
  data() {
    return {
      id: parseInt(this.$route.params.event_id),
      event: null
    };
  },
  async created() {
    this.event = await getEvent(this.id);
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