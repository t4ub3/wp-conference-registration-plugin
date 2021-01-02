<template>
  <div class="seminar-editor">
    <div>
      <h1 class="seminar-editor__headline">Seminare</h1>
      <router-link :to="`/${event_id}/new-seminar`" class="page-title-action">
        Neues Seminar erstellen
      </router-link>
    </div>
    <list-table
      :rows="seminars"
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
      <template slot="speakers" slot-scope="data">
        <ul>
          <li v-for="speaker in data.row.speakers" :key="speaker">
            {{ speaker }}
          </li>
        </ul>
      </template>
      <template slot="sessions" slot-scope="data">
        <ul>
          <li v-for="session in data.row.sessions" :key="session">
            {{ session }}
          </li>
        </ul>
      </template>
      <template slot="tags" slot-scope="data">
        <ul>
          <li
            class="seminar-editor__tag"
            v-for="tag in data.row.tags"
            :key="tag"
          >
            {{ tag }}
          </li>
        </ul>
      </template>
    </list-table>
  </div>
</template>

<script>
import {
  deleteSeminars,
  getSeminars,
  getSpeakers,
} from "../utils/api-services";
import ListTable from "vue-wp-list-table";
import "vue-wp-list-table/dist/vue-wp-list-table.css";

export default {
  name: "SeminarEditor",
  components: { ListTable },
  props: {
    event_id: {
      type: Number,
      required: true,
    },
    tags: {
      type: Array,
      default: () => [],
    },
    sessions: {
      type: Array,
      default: () => [],
    },
    speakers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      newSeminar: {
        name: "",
        event_id: this.event_id,
      },
      seminars: [],
      tag_map: {},
      session_map: {},
      speaker_map: {},
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
        number: {
          label: "Nummer",
        },
        description: {
          label: "Beschreibung",
        },
        speakers: {
          label: "Referenten",
        },
        sessions: {
          label: "Sessions",
        },
        slot_max: {
          label: "max. Teilnehmerzahl",
        },
        tags: {
          label: "Schlagwörter",
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
    this.speakers.forEach((speaker) => {
      this.speaker_map[speaker.id] = `${speaker.first_name} ${speaker.surname}`;
    });
    this.tags.forEach((tag) => {
      this.tag_map[tag.id] = tag.name;
    });
    this.sessions.forEach((session) => {
      this.session_map[session.id] = session.name;
    });
    this.loadSeminars();
  },
  methods: {
    async loadSeminars() {
      const result = await getSeminars(this.event_id);
      if (result.error) {
        alert(result.error);
        return;
      }
      this.seminars = result.map((seminar) => ({
        ...seminar,
        sessions: seminar.session_ids.map((id) => this.session_map[id]),
        tags: seminar.tag_ids.map((id) => this.tag_map[id]),
        speakers: seminar.speaker_ids.map((id) => this.speaker_map[id]),
      }));
      this.per_page = this.seminars.length;
    },

    async onActionClick(action, row) {
      if ("delete" === action) {
        if (confirm("Seminar " + row.name + " wirklich löschen?")) {
          const result = await deleteSeminars([row.id]);
          if (result.error) {
            alert(result.error);
          } else {
            this.loadSeminars();
            alert(row.name + " gelöscht!");
          }
        }
      } else if ("edit" === action) {
        this.$router.push({ path: `/${this.event_id}/edit-seminar/${row.id}` });
      }
    },

    async onBulkActionClick(action, rowIds) {
      if ("delete" === action) {
        if (confirm("Gewählte Seminare wirklich löschen?")) {
          const result = await deleteSeminars(rowIds);
          if (result.error) {
            alert(result.error);
          } else {
            this.loadSeminars();
            alert(result.success);
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.seminar-editor {
  padding-top: 30px;
}
.seminar-editor__headline {
  display: inline-block;
}
.seminar-editor__tag {
  position: relative;
  display: inline-block;
  padding: 4px;
  border-radius: 5px;
  margin-right: 6px;
  color: #fff;
  line-height: 1;
  background: #32373c;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
}
</style>