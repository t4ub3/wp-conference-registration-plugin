import Vue from 'vue'
import Router from 'vue-router'
import Events from 'admin/pages/Events.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Events',
      component: Events
    },
  ]
})
