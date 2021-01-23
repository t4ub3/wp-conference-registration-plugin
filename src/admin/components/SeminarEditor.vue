<template>
  <div class="seminar-editor">
    <div>
      <h1 class="seminar-editor__headline">Seminare</h1>
      <router-link
        v-if="sessions.length"
        :to="`/${event_id}/new-seminar`"
        class="page-title-action"
      >
        Neues Seminar erstellen
      </router-link>
      <em v-else
        >&nbsp; (Sie müssen zuerst Sessions anlegen, um Seminare erstellen zu
        können)</em
      >
    </div>
    <list-table
      :rows="seminars"
      :perPage="per_page"
      :text="text"
      :columns="columns"
      :actions="actions"
      :bulk-actions="bulk_actions"
      :sortBy="sortBy"
      :sortOrder="sortOrder"
      action-column="name"
      notFound="Keine Einträge gefunden"
      @action:click="onActionClick"
      @bulk:click="onBulkActionClick"
      @sort="sortCallback"
    >
      <template slot="speakers" slot-scope="data">
        <ul class="seminar-editor__list">
          <li v-for="speaker in data.row.speakers" :key="speaker">
            {{ speaker }}
          </li>
        </ul>
      </template>
      <template slot="sessions" slot-scope="data">
        <ul class="seminar-editor__list">
          <li v-for="session in data.row.sessions" :key="session.id">
            {{ session.name }}
          </li>
        </ul>
      </template>
      <template slot="registrations" slot-scope="data">
        <ul class="seminar-editor__list">
          <li v-for="session in data.row.sessions" :key="session.id">
            {{ data.row.registrations[session.id] }}
          </li>
        </ul>
      </template>
      <template slot="tags" slot-scope="data">
        <ul class="seminar-editor__list">
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
  getRegistrations,
  getSeminars,
} from "../utils/api-services";
import { exportRegistrations } from "../utils/helpers";
import ListTable from "vue-wp-list-table";
import "vue-wp-list-table/dist/vue-wp-list-table.css";
import { truncate } from '../utils/helpers';

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
          sortable: true,
        },
        number: {
          label: "Nummer",
          sortable: true,
        },
        description: {
          label: "Beschreibung",
        },
        speakers: {
          label: "Referenten",
          sortable: true,
        },
        sessions: {
          label: "Sessions"
        },
        registrations: {
          label: "Anmeldungen"
        },
        slot_max: {
          label: "max. Teilnehmerzahl",
          sortable: true,
        },
        tags: {
          label: "Schlagwörter",
          sortable: true,
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
        {
          key: "export",
          label: "Exportieren"
        }
      ],
      bulk_actions: [
        {
          key: "delete",
          label: "Löschen",
        },
      ],
      sortBy: "number",
      sortOrder: "asc",
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
        description: truncate(seminar.description, 100),
        sessions: seminar.session_ids.map((id) => ({"name": this.session_map[id], "id": id})),
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
      } else if ("export" === action) {
        let seminars = {[row.id] : {"name":row.name, "sessions": row.sessions.reduce((sessionsObj, session) => {
          sessionsObj[session.id] = {"name": session.name, "registrations": []};
          return sessionsObj;
        }, {})}};
        await exportRegistrations(seminars, this.event_id)
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

    sortCallback(column, order) {
      this.sortBy = column;
      this.sortOrder = order;
      function compareSeminars(a, b) {
        if (a[column] < b[column]) {
          return order === "asc" ? -1 : 1;
        }
        if (a[column] > b[column]) {
          return order === "asc" ? 1 : -1;
        }
        return 0;
      }
      this.seminars.sort(compareSeminars);
    },
  },
};
</script>

<style scoped>
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
.seminar-editor__list {
  margin: 0;
}
</style>