<template>
  <div class="session-editor">
    <h1>Sessions</h1>
    <div id="col-container" class="wp-clearfix">
      <div id="col-left">
        <div class="col-wrap">
          <h2>Neue Session erstellen</h2>
          <form @submit="submit" class="edit-session-form form-wrap">
            <div class="form-field">
              <label for="crep-session-name">Name</label>
              <input
                id="crep-session-name"
                v-model="newSession.name"
                type="text"
              />
            </div>
            <p class="submit">
              <button class="button button-primary" type="submit">
                Neue Session erstellen
              </button>
            </p>
          </form>
        </div>
      </div>
      <div id="col-right">
        <div class="col-wrap">
          <list-table
            :rows="sessions"
            :perPage="per_page"
            :text="text"
            :columns="columns"
            :actions="actions"
            :bulk-actions="bulk_actions"
            action-column="name"
            notFound="Keine Einträge gefunden"
            @action:click="onActionClick"
            @bulk:click="onBulkActionClick"
          >
            <template slot="name" slot-scope="data">
              <div v-if="!data.row.editing">{{ data.row.name }}</div>
              <form
                class="session-editor__update-form"
                v-else
                @submit="(event) => submitUpdate(event, data.row)"
              >
                <input type="text" required v-model="data.row.name" />
                <button class="button button-primary" type="submit">
                  Speichern
                </button>
              </form>
            </template>
          </list-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  createSession,
  deleteSessions,
  getSessions,
  updateSession,
} from "../utils/api-services";
import ListTable from "vue-wp-list-table";
import "vue-wp-list-table/dist/vue-wp-list-table.css";

export default {
  name: "SessionEditor",
  components: { ListTable },
  props: {
    sessionsPreloaded: {
      type: Array,
      default: () => [],
    },
    event_id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      newSession: {
        name: "",
        event_id: this.event_id,
      },
      sessions: this.sessionsPreloaded.map((session) => ({
        ...session,
        editing: false,
      })),
      per_page: 50,
      text: {
        select_bulk_action: "Mehrfachaktionen auswählen",
        bulk_actions: "Mehrfachaktionen",
        items: "Einträge",
        apply: "Übernehmen",
      },
      columns: {
        name: {
          label: "Name",
        },
        count: {
          label: "Anzahl Seminare",
        },
      },
      actions: [
        {
          key: "edit",
          label: "Bearbeiten",
        },
        {
          key: "delete",
          label: "Löschen",
        },
      ],
      bulk_actions: [
        {
          key: "delete",
          label: "Löschen",
        },
      ],
    };
  },
  created() {
    if (!this.sessions.length) {
      this.loadSessions();
    }
  },
  methods: {
    async loadSessions() {
      const result = await getSessions(this.event_id);
      if (result.error) {
        alert(result.error);
        return;
      }
      this.sessions = result.map((session) => ({ ...session, editing: false }));
      this.per_page = this.sessions.length;
      this.$emit("update-event-data");
    },

    async submit(event) {
      event.preventDefault();
      const result = await createSession(this.newSession);
      if (result.error) {
        alert(result.error);
      } else {
        alert(`Session ${this.newSession.name} wurde angelegt!`);
        this.newSession.name = "";
        this.loadSessions();
      }
    },

    async onActionClick(action, row) {
      if ("delete" === action) {
        if (confirm("Session " + row.name + " wirklich löschen?")) {
          const result = await deleteSessions([row.id]);
          if (result.error) {
            alert(result.error);
          } else {
            this.loadSessions();
            alert(row.name + " gelöscht!");
          }
        }
      } else if ("edit" === action) {
        row.editing = true;
      }
    },

    async onBulkActionClick(action, rowIds) {
      if ("delete" === action) {
        if (confirm("Gewählte Sessions wirklich löschen?")) {
          const result = await deleteSessions(rowIds);
          if (result.error) {
            alert(result.error);
          } else {
            this.loadSessions();
            alert(result.success);
          }
        }
      }
    },

    async submitUpdate(event, row) {
      event.preventDefault();
      const result = await updateSession(row);
      if (result.error) {
        alert(result.error);
      } else {
        this.loadSessions();
      }
    },
  },
};
</script>

<style scoped>
.session-editor__update-form {
  display: flex;
}
</style>