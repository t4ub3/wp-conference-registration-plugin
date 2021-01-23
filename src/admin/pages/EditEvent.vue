<template>
  <div>
    <h1>{{ event ? event.name : "Lade Event-Daten ..." }}</h1>
    <template v-if="event">
      <edit-event-form
        button-text="Aktualisieren"
        @event-submit="updateEvent"
        :event="event"
      ></edit-event-form>
      <nav class="nav-tab-wrapper wp-clearfix edit-event__nav">
        <a
          href="#"
          class="nav-tab"
          :class="[activeTab === 'seminars' ? 'nav-tab-active' : '']"
          @click="(event) => changeTab(event, 'seminars')"
          >Seminare</a
        >
        <a
          href="#"
          class="nav-tab"
          :class="[activeTab === 'registrations' ? 'nav-tab-active' : '']"
          @click="(event) => changeTab(event, 'registrations')"
          >Anmeldungen</a
        >
        <a
          href="#"
          class="nav-tab"
          :class="[activeTab === 'sessions' ? 'nav-tab-active' : '']"
          @click="(event) => changeTab(event, 'sessions')"
          >Sessions</a
        >
        <a
          href="#"
          class="nav-tab"
          :class="[activeTab === 'tags' ? 'nav-tab-active' : '']"
          @click="(event) => changeTab(event, 'tags')"
          >Schlagwörter</a
        >
      </nav>
      <seminar-editor
        v-if="activeTab === 'seminars'"
        :tags="event.tags"
        :sessions="event.sessions"
        :speakers="event.speakers"
        :event="event"
      >
      </seminar-editor>
      <registration-editor
        v-if="activeTab === 'registrations'"
        :sessions="event.sessions"
        :seminars="event.seminars"
        :additional-params="event.additional_params"
        :event_id="id"
        @update-event-data="refresh"
      >
      </registration-editor>
      <session-editor
        v-if="activeTab === 'sessions'"
        :sessions-preloaded="event.sessions"
        :event_id="id"
        @update-event-data="refresh"
      >
      </session-editor>
      <tag-editor
        v-if="activeTab === 'tags'"
        :tags-preloaded="event.tags"
        :event_id="id"
        @update-event-data="refresh"
      >
      </tag-editor>
    </template>
  </div>
</template>

<script>
import EditEventForm from "../components/EditEventForm.vue";
import TagEditor from "../components/TagEditor.vue";
import SessionEditor from "../components/SessionEditor.vue";
import SeminarEditor from "../components/SeminarEditor.vue";
import RegistrationEditor from "../components/RegistrationEditor.vue";
import { getEvent, updateEvent } from "../utils/api-services";

export default {
  name: "EditEvent",
  components: {
    EditEventForm,
    TagEditor,
    SessionEditor,
    SeminarEditor,
    RegistrationEditor,
  },
  data() {
    return {
      id: parseInt(this.$route.params.event_id),
      event: null,
      activeTab: "seminars",
    };
  },
  created() {
    this.loadEvent();
  },
  methods: {
    async loadEvent() {
      this.event = await getEvent(this.id);
    },
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
    changeTab(event, newTab) {
      event.preventDefault();
      this.activeTab = newTab;
    },
    refresh() {
      this.loadEvent();
    },
  },
};
</script>

<style scoped>
.edit-event__nav {
  margin: 30px 0 20px;
}
</style>