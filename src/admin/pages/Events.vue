<template>
  <div class="events">
    <div>
      <h1 class="events__headline">Events</h1>
      <router-link to="/new-event" class="page-title-action">
        Neues Event erstellen
      </router-link>
    </div>
    <list-table
      :rows="items"
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
import ListTable from "vue-wp-list-table";
import "vue-wp-list-table/dist/vue-wp-list-table.css";
import { deleteEvents, getEvents } from "../utils/api-services";
import { getParameterByName } from '../utils/helpers';

export default {
  name: "Events",

  components: {
    ListTable,
  },

  data() {
    return {
      items: [],
      per_page: 20,
      text: {
        select_bulk_action: "Mehrfachaktionen auswählen",
        bulk_actions: "Mehrfachaktionen",
        items: "Einträge",
        apply: "Übernehmen",
      },
      columns: {
        name: {
          label: "Event",
        },
        id: {
          label: "ID"
        },
        contact_mail: {
          label: "Kontakt",
        },
        created: {
          label: "Erstellt am",
        },
        default_slot_max: {
          label: "max. Teilnehmer je Seminar",
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
    const registration_id = getParameterByName("confirm_registration");
    const event_id = getParameterByName("event_id");
    if (registration_id && event_id) {
      this.$router.push({path: `/${event_id}/edit-registration/${registration_id}` });
    }

    this.loadItems();
  },

  methods: {
    async loadItems() {
      const result = await getEvents();
      if (result.error) {
        alert(result.error);
        return;
      }
      this.items = result;
      this.per_page = this.items.length;
    },

    async onActionClick(action, row) {
      if ("delete" === action) {
        if (confirm("Event " + row.name + " wirklich löschen? Dabei werden ALLE zugehörigen Daten (Seminar, Anmeldungen usw.) gelöscht!")) {
          const result = await deleteEvents([row.id]);
          if (result.error) {
            alert(result.error);
          } else {
            this.loadItems();
            alert(row.name + " gelöscht!");
          }
        }
      } else if ("edit" === action) {
        this.$router.push({path: `/${row.id}/edit-event` });
      }
    },

    async onBulkActionClick(action, rowIds) {
      if ("delete" === action) {
        if (confirm("Gewählte Events wirklich löschen? Dabei werden ALLE zugehörigen Daten (Seminar, Anmeldungen usw.) gelöscht!")) {
          const result = await deleteEvents(rowIds);
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
  .events__headline {
    display: inline-block;
  }
</style>
