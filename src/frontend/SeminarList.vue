<template>
  <div id="crep-seminar-list">
    <div class="crep-seminar" v-for="seminar in seminars" :key="seminar.id">
      <div v-if="seminar.number" class="crep-seminar__number">{{ seminar.number }}</div>
      <div class="crep-seminar__content">
        <h2 class="crep-seminar__name">{{ seminar.name }}</h2>
        <p class="crep-seminar__description">{{ seminar.description }}</p>
        <small class="crep-seminar__speakers">{{ getSpeakers(seminar.speaker_ids) }}</small>
        <ul v-if="seminar.tag_ids.length" class="crep-seminar__tags">
          <li v-for="tagId in seminar.tag_ids" :key="tagId" class="crep-seminar__tag">
            {{ tag_map[tagId] }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getEvent, getSeminars } from "../admin/utils/api-services";

export default {
  name: "SeminarList",
  props: {
    eventId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      event: {},
      seminars: [],
      speaker_map: {},
      tag_map: {},
    };
  },
  async created() {
    this.event = await getEvent(this.eventId);
    this.seminars = await getSeminars(this.eventId);
    this.event.speakers.forEach((speaker) => {
      this.speaker_map[speaker.id] = speaker;
    });
    this.event.tags.forEach((tag) => {
      this.tag_map[tag.id] = tag.name;
    });
  },
  methods: {
    getSpeakers(speaker_ids) {
      let speakers = "";
      speaker_ids.forEach((speaker_id) => {
        const speaker = this.speaker_map[speaker_id];
        speakers += `${speaker.first_name} ${speaker.surname}, ${speaker.location} & `;
      });
      return speakers.slice(0, -3);
    },
  },
};
</script>

<style scoped>
.crep-seminar {
  display: flex;
}
.crep-seminar__number {
  background-color: #A21B2A;
  color: white;
  padding: 4px;
}
.crep-seminar__content {

}
.crep-seminar__name {
  color: #A21B2A;
}
.crep-seminar__description {
  color: #022232;
}
.crep-seminar__speakers {
  color: #6bac2e;
  font-weight: bold;
}
.crep-seminar__tags {
  
}
.crep-seminar__tag {
  background-color: #022232;
  color: white;
  padding: 4px;
  border-radius: 5px;  
}
</style>
