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
    </list-table>
  </div>
</template>

<script>
import {
  deleteSeminars,
  getSeminars,
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
  },
  data() {
    return {
      newSeminar: {
        name: "",
        event_id: this.event_id,
      },
      seminars: [],
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
        slot_max: {
          label: "max. Teilnehmerzahl",
        },
        sessions: {
          label: "Sessions",
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
    this.loadSeminars();
  },
  methods: {
    async loadSeminars() {
      const result = await getSeminars(this.event_id);
      if (result.error) {
        alert(result.error);
        return;
      }
      this.seminars = result;
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
        this.$router.push({path: `/${this.event_id}/edit-seminar/${row.id}` });
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
</style>