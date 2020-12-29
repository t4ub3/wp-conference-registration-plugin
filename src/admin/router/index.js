import Vue from 'vue'
import Router from 'vue-router'
import Events from 'admin/pages/Events.vue'
import NewEvent from 'admin/pages/NewEvent.vue'
import EditEvent from 'admin/pages/EditEvent.vue'

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
      path: '/',
      name: 'Events',
      component: Events
    },
  ]
})
