import Vue from 'vue'
import SeminarList from './SeminarList.vue'

Vue.config.productionTip = false

/* eslint-disable no-new */
const mountElementSeminarList = document.getElementById("crep-seminar-list")
if (mountElementSeminarList) {
  new Vue({
    el: '#crep-seminar-list',
    render: h => h(SeminarList, {
      props: {
        eventId: parseInt(mountElementSeminarList.dataset.eventId)
      }
    })
  });
}

