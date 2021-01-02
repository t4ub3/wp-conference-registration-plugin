<template>
  <div id="crep-seminar-list">
    <div v-for="seminar in seminars" :key="seminar.id">
      <div v-if="seminar.number">{{ seminar.number }}</div>
      <div>
        <h2>{{ seminar.name }}</h2>
        <p>{{ seminar.description }}</p>
        <small>{{ getSpeakers(seminar.speaker_ids) }}</small>
        <ul v-if="seminar.tag_ids.length">
          <li v-for="tagId in seminar.tag_ids" :key="tagId">
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

<style>
</style>
