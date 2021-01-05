<template>
  <div class="speakers">
    <div>
      <h1 class="speakers__headline">Referenten</h1>
      <router-link to="/new-speaker" class="page-title-action">
        Neuen Referent anlegen
      </router-link>
    </div>
    <list-table
      :rows="speakers"
      :perPage="per_page"
      :text="text"
      :columns="columns"
      :actions="actions"
      :bulk-actions="bulk_actions"
      action-column="first_name"
      notFound="Keine Einträge gefunden"
      @action:click="onActionClick"
      @bulk:click="onBulkActionClick"
    >
    </list-table>
  </div>
</template>

<script>
import ListTable from "vue-wp-list-table";
import "vue-wp-list-table/dist/vue-wp-list-table.css";
import { deleteSpeakers, getSpeakers } from "../utils/api-services";
import { truncate } from '../utils/helpers';

export default {
  name: "Speakers",

  components: {
    ListTable,
  },

  data() {
    return {
      speakers: [],
      per_page: 20,
      text: {
        select_bulk_action: "Mehrfachaktionen auswählen",
        bulk_actions: "Mehrfachaktionen",
        items: "Einträge",
        apply: "Übernehmen",
      },
      columns: {
        first_name: {
          label: "Vorname",
        },
        surname: {
          label: "Nachname",
        },
        location: {
          label: "Ort",
        },
        description: {
          label: "Beschreibung",
        },
        path_to_picture: {
          label: "Bild",
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
    this.loadItems();
  },

  methods: {
    async loadItems() {
      const result = await getSpeakers();
      if (result.error) {
        alert(result.error);
        return;
      }
      this.speakers = result.map(speaker => ({
        ...speaker,
        description: truncate(speaker.description, 100)
      }));
      this.per_page = this.speakers.length;
    },

    async onActionClick(action, row) {
      if ("delete" === action) {
        if (confirm(row.first_name + " " + row.surname + " wirklich löschen?")) {
          const result = await deleteSpeakers([row.id]);
          if (result.error) {
            alert(result.error);
          } else {
            this.loadItems();
            alert(row.first_name + " " + row.surname + " gelöscht!");
          }
        }
      } else if ("edit" === action) {
        this.$router.push({path: `/edit-speaker/${row.id}` });
      }
    },

    async onBulkActionClick(action, rowIds) {
      if ("delete" === action) {
        if (confirm("Gewählte Referenten wirklich löschen?")) {
          const result = await deleteSpeakers(rowIds);
          if (result.error) {
            alert(result.error);
          } else {
            this.loadItems();
            alert(result.success);
          }
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .speakers__headline {
    display: inline-block;
  }
</style>
