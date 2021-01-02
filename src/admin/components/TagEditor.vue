<template>
  <div class="tag-editor">
    <h1>Schlagwörter</h1>
    <div id="col-container" class="wp-clearfix">
      <div id="col-left">
        <div class="col-wrap">
          <h2>Neues Schlagwort erstellen</h2>
          <form @submit="submit" class="edit-tag-form form-wrap">
            <div class="form-field">
              <label for="crep-tag-name">Name</label>
              <input id="crep-tag-name" v-model="newTag.name" type="text" />
            </div>
            <p class="submit">
              <button class="button button-primary" type="submit">
                Neues Schlagwort erstellen
              </button>
            </p>
          </form>
        </div>
      </div>
      <div id="col-right">
        <div class="col-wrap">
          <list-table
            :rows="tags"
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
                class="tag-editor__update-form"
                v-else
                @submit="(event) => submitUpdate(event, data.row)"
              >
                <input type="text" v-model="data.row.name" />
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
  createTag,
  deleteTags,
  getTags,
  updateTag,
} from "../utils/api-services";
import ListTable from "vue-wp-list-table";
import "vue-wp-list-table/dist/vue-wp-list-table.css";

export default {
  name: "TagEditor",
  components: { ListTable },
  props: {
    tagsPreloaded: {
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
      newTag: {
        name: "",
        event_id: this.event_id,
      },
      tags: this.tagsPreloaded.map((tag) => ({ ...tag, editing: false })),
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
    if (!this.tags.length) {
      this.loadTags();
    }
  },
  methods: {
    async loadTags() {
      const result = await getTags(this.event_id);
      if (result.error) {
        alert(result.error);
        return;
      }
      this.tags = result.map((tag) => ({ ...tag, editing: false }));
      this.per_page = this.tags.length;
      this.$emit("update-event-data");
    },

    async submit(event) {
      event.preventDefault();
      const result = await createTag(this.newTag);
      if (result.error) {
        alert(result.error);
      } else {
        alert(`Schlagwort ${this.newTag.name} wurde angelegt!`);
        this.newTag.name = "";
        this.loadTags();
      }
    },

    async onActionClick(action, row) {
      if ("delete" === action) {
        if (confirm("Schlagwort " + row.name + " wirklich löschen?")) {
          const result = await deleteTags([row.id]);
          if (result.error) {
            alert(result.error);
          } else {
            this.loadTags();
            alert(row.name + " gelöscht!");
          }
        }
      } else if ("edit" === action) {
        row.editing = true;
      }
    },

    async onBulkActionClick(action, rowIds) {
      if ("delete" === action) {
        if (confirm("Gewählte Schlagwörter wirklich löschen?")) {
          const result = await deleteTags(rowIds);
          if (result.error) {
            alert(result.error);
          } else {
            this.loadTags();
            alert(result.success);
          }
        }
      }
    },

    async submitUpdate(event, row) {
      event.preventDefault();
      const result = await updateTag(row);
      if (result.error) {
        alert(result.error);
      } else {
        this.loadTags();
      }
    },
  },
};
</script>

<style scoped>
.tag-editor {
  padding-top: 30px;
}
.tag-editor__update-form {
  display: flex;
}
</style>