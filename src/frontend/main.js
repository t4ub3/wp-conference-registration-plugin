import Vue from 'vue'
import SeminarList from './SeminarList.vue'
import RegistrationForm from './RegistrationForm.vue'

Vue.config.productionTip = false

/* eslint-disable no-new */
const mountSeminarList = document.getElementById("crep-seminar-list")
if (mountSeminarList) {
  new Vue({
    el: '#crep-seminar-list',
    render: h => h(SeminarList, {
      props: {
        eventId: parseInt(mountSeminarList.dataset.eventId)
      }
    })
  });
}

const mountRegistrationForm = document.getElementById("crep-registration-form")
if (mountRegistrationForm) {
  new Vue({
    el: '#crep-registration-form',
    render: h => h(RegistrationForm, {
      props: {
        eventId: parseInt(mountRegistrationForm.dataset.eventId)
      }
    })
  });
}

