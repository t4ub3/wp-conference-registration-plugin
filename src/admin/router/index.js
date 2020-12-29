import Vue from 'vue'
import Router from 'vue-router'
import Events from 'admin/pages/Events.vue'
import NewEvent from 'admin/pages/NewEvent.vue'
import EditEvent from 'admin/pages/EditEvent.vue'
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
      path: '/edit-event',
      name: 'EditEvent',
      component: EditEvent,
      props: true
    },
    {
      path: '/new-speaker',
      name: 'NewSpeaker',
      component: NewSpeaker
    },
    {
      path: '/edit-speaker',
      name: 'EditSpeaker',
      component: EditSpeaker,
      props: true
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
