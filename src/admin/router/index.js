import Vue from 'vue'
import Router from 'vue-router'
import Events from 'admin/pages/Events.vue'
import NewEvent from 'admin/pages/NewEvent.vue'
import EditEvent from 'admin/pages/EditEvent.vue'
import NewSeminar from 'admin/pages/NewSeminar.vue'
import EditSeminar from 'admin/pages/EditSeminar.vue'
import NewRegistration from 'admin/pages/NewRegistration.vue'
import EditRegistration from 'admin/pages/EditRegistration.vue'
import Speakers from 'admin/pages/Speakers.vue'
import NewSpeaker from 'admin/pages/NewSpeaker.vue'
import EditSpeaker from 'admin/pages/EditSpeaker.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/new-event',
      name: 'NewEvent',
      component: NewEvent
    },
    {
      path: '/:event_id/edit-event',
      name: 'EditEvent',
      component: EditEvent
    },
    {
      path: '/:event_id/new-seminar',
      name: 'NewSeminar',
      component: NewSeminar
    },
    {
      path: '/:event_id/edit-seminar/:seminar_id',
      name: 'EditSeminar',
      component: EditSeminar
    },
    {
      path: '/:event_id/new-registration',
      name: 'NewRegistration',
      component: NewRegistration
    },
    {
      path: '/:event_id/edit-registration/:registration_id',
      name: 'EditRegistration',
      component: EditRegistration
    },
    {
      path: '/new-speaker',
      name: 'NewSpeaker',
      component: NewSpeaker
    },
    {
      path: '/edit-speaker/:speaker_id',
      name: 'EditSpeaker',
      component: EditSpeaker
    },
    {
      path: '/speakers',
      name: 'Speakers',
      component: Speakers
    },
    {
      path: '/',
      name: 'Events',
      component: Events
    },
  ]
})
