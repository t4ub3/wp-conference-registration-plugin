<template>
  <div id="crep-seminar-list">
    <div class="crep-seminar" v-for="seminar in seminars" :key="seminar.id">
      <div v-if="seminar.number" class="crep-seminar__number">
        {{ seminar.number.padStart(2, "0") }}
      </div>
      <div>
        <h4 class="crep-seminar__name">{{ seminar.name }}</h4>
        <small class="crep-seminar__sessions">
          <template v-for="(session_id, index) in seminar.session_ids">
            <span :key="`${seminar.id}_${session_id}`">
              <template
                v-if="
                  seminar.slot_max !== 0 &&
                  seminar.slot_max <=
                  seminar.registrations[parseInt(session_id)]
                "
              >
                <span class="crep-seminar__session--full"
                  ><span class="crep-seminar__session-name">
                    {{ session_map[session_id] }}
                  </span></span
                ><span class="crep-seminar__warning">&nbsp;(ausgebucht)</span>
              </template>
              <template v-else>
                {{ session_map[session_id] }}
              </template>
              <template v-if="index < seminar.session_ids.length - 1">
                &nbsp;<span class="crep-seminar__pipe">|</span>&nbsp;
              </template>
            </span>
          </template>
        </small>
        <p class="crep-seminar__description">{{ seminar.description }}</p>
        <small class="crep-seminar__speakers">{{
          getSpeakers(seminar.speaker_ids)
        }}</small>
        <ul v-if="seminar.tag_ids.length" class="crep-seminar__tags">
          <li
            v-for="tagId in seminar.tag_ids"
            :key="tagId"
            class="crep-seminar__tag"
          >
            {{ tag_map[tagId] }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getEvent, getSeminars } from "./utils/api-services";

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
      session_map: {},
      speaker_map: {},
      tag_map: {},
    };
  },
  async created() {
    this.event = await getEvent(this.eventId);
    this.seminars = await getSeminars(this.eventId);
    this.seminars.sort(this.compareSeminarByNumber);
    this.event.sessions.forEach((session) => {
      this.session_map[session.id] = session.name;
    });
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
    compareSeminarByNumber(a, b) {
      let aInt = parseInt(a.number);
      let bInt = parseInt(b.number);
      if (aInt < bInt) {
        return -1;
      }
      if (aInt > bInt) {
        return 1;
      }
      return 0;
    },
  },
};
</script>

<style scoped>
.crep-seminar {
  display: flex;
  align-items: flex-start;
  padding-bottom: 24px;
}
.crep-seminar__number {
  background-color: #a21b2a;
  color: white;
  padding: 4px;
  min-width: 34px;
  margin-right: 16px;
  text-align: center;
  font-weight: bold;
}
.crep-seminar__name {
  color: #a21b2a;
  margin-top: 0;
}
.crep-seminar__description {
  color: #022232;
}
@media only screen and (max-width: 600px)  {
  .crep-seminar__description,
  .crep-seminar__speakers {
    margin-left: -50px;
  }
}
.crep-seminar__speakers,
.crep-seminar__sessions {
  color: #6bac2e;
  font-weight: bold;
  display: block;
}
.crep-seminar__sessions {
  text-align: right;
}
.crep-seminar__session--full {
  text-decoration: line-through;
  color: #7a7171;
}
.crep-seminar__session-name {
  color: #6bac2e;
}
.crep-seminar__warning {
  color: #7a7171;
}
.crep-seminar__pipe {
  font-size: medium;
}
.crep-seminar__tags {
  padding: 0;
  list-style: none;
  text-align: right;
}
.crep-seminar__tag {
  background-color: #7a7171;
  color: white;
  padding: 0 6px;
  border-radius: 7px;
  display: inline-block;
  font-size: medium;
}
</style>
