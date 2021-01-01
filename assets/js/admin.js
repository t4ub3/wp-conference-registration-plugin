(window.webpackJsonp=window.webpackJsonp||[]).push([[2],[,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,n){"use strict";var a=n(8);n.n(a).a},function(e,t,n){"use strict";var a=n(9);n.n(a).a},function(e,t,n){"use strict";var a=n(10);n.n(a).a},function(e,t,n){"use strict";var a=n(11);n.n(a).a},function(e,t,n){"use strict";var a=n(12);n.n(a).a},,function(e,t,n){"use strict";var a=n(13);n.n(a).a},function(e,t,n){"use strict";var a=n(14);n.n(a).a},function(e,t,n){"use strict";var a=n(15);n.n(a).a},,,function(e,t,n){"use strict";n.r(t);var a=n(3),s={name:"App"},i=n(0),r=Object(i.a)(s,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"vue-backend-app"}},[t("router-view")],1)}),[],!1,null,null,null).exports,o=n(4),l=n(2),c=(n(5),n(17)),m=n.n(c);const u=(window.crep?window.crep.rest_url:"http://127.0.0.1:8000/wp-json/")+"crep/v1/";async function d(e){return await w({method:"delete",url:u+"events",data:{ids:e}})}async function p(e){return await w({method:"get",url:`${u}events/${e}`})}async function h(e){return await w({method:"delete",url:u+"speakers",data:{ids:e}})}async function v(e){return await w({method:"delete",url:u+"tags",data:{ids:e}})}async function _(e){return await w({method:"delete",url:u+"sessions",data:{ids:e}})}async function f(e){return await w({method:"delete",url:u+"seminars",data:{ids:e}})}async function w(e){try{return(await m()(e)).data}catch(e){return console.error(e),{error:"Bei der Verbindung zum Server ist ein Fehler aufgetreten! Stelle sicher, dass du als Admin eingeloggt bist und versuche es noch einmal."}}}m.a.defaults.headers.common["X-WP-Nonce"]=window.crep?window.crep.nonce:null;var b={name:"Events",components:{ListTable:l.a},data:()=>({items:[],per_page:20,text:{select_bulk_action:"Mehrfachaktionen auswählen",bulk_actions:"Mehrfachaktionen",items:"Einträge",apply:"Übernehmen"},columns:{name:{label:"Event"},contact_mail:{label:"Kontakt"},created:{label:"Erstellt am"},default_slot_max:{label:"max. Teilnehmer je Seminar"}},actions:[{key:"edit",label:"Bearbeiten"},{key:"delete",label:"Löschen"}],bulk_actions:[{key:"delete",label:"Löschen"}]}),created(){this.loadItems()},methods:{async loadItems(){const e=await async function(){return(await w({method:"get",url:u+"events"})).map(e=>({...e,id:parseInt(e.id),default_slot_max:parseInt(e.default_slot_max)}))}();e.error?alert(e.error):(this.items=e,this.per_page=this.items.length)},async onActionClick(e,t){if("delete"===e){if(confirm("Event "+t.name+" wirklich löschen?")){const e=await d([t.id]);e.error?alert(e.error):(this.loadItems(),alert(t.name+" gelöscht!"))}}else"edit"===e&&this.$router.push({path:`/${t.id}/edit-event`})},async onBulkActionClick(e,t){if("delete"===e&&confirm("Gewählte Events wirklich löschen?")){const e=await d(t);e.error?alert(e.error):(this.loadItems(),alert(e.success))}}}},g=(n(51),Object(i.a)(b,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"events"},[n("div",[n("h1",{staticClass:"events__headline"},[e._v("Events")]),e._v(" "),n("router-link",{staticClass:"page-title-action",attrs:{to:"/new-event"}},[e._v("\n      Neues Event erstellen\n    ")])],1),e._v(" "),n("list-table",{attrs:{rows:e.items,perPage:e.per_page,text:e.text,columns:e.columns,actions:e.actions,"bulk-actions":e.bulk_actions,"action-column":"name",notFound:"Keine Einträge gefunden"},on:{"action:click":e.onActionClick,"bulk:click":e.onBulkActionClick}})],1)}),[],!1,null,"bbd0b1ea",null).exports),k={name:"EditEventForm",props:{buttonText:{type:String,default:"Speichern"},event:{type:Object,default:()=>({name:"",contact_mail:"",default_slot_max:25})}},data(){return{newEvent:{name:this.event.name,contact_mail:this.event.contact_mail,default_slot_max:this.event.default_slot_max}}},methods:{submit(e){e.preventDefault(),this.$emit("event-submit",this.newEvent)}}},S=(n(52),Object(i.a)(k,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("form",{staticClass:"edit-event-form",on:{submit:e.submit}},[n("table",{staticClass:"form-table",attrs:{role:"presentation"}},[n("tr",{staticClass:"form-field"},[n("th",{attrs:{scope:"row"}},[e._v("Name")]),e._v(" "),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newEvent.name,expression:"newEvent.name"}],attrs:{id:"crep-name",type:"text"},domProps:{value:e.newEvent.name},on:{input:function(t){t.target.composing||e.$set(e.newEvent,"name",t.target.value)}}})])]),e._v(" "),n("tr",{staticClass:"form-field"},[n("th",{attrs:{scope:"row"}},[e._v("Kontakt")]),e._v(" "),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newEvent.contact_mail,expression:"newEvent.contact_mail"}],attrs:{id:"crep-contact",type:"text"},domProps:{value:e.newEvent.contact_mail},on:{input:function(t){t.target.composing||e.$set(e.newEvent,"contact_mail",t.target.value)}}}),e._v(" "),n("p",{staticClass:"description"},[e._v("\n          E-Mail-Adressen der Organisatoren. Diese Personen werden bei einer\n          Registrierung benachrichtigt. Mehrere Adressen können mit Komma\n          getrennt eingegeben werden.\n        ")])])]),e._v(" "),n("tr",{staticClass:"form-field"},[n("th",{attrs:{scope:"row"}},[e._v("max. Teilnehmer je Seminar ")]),e._v(" "),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newEvent.default_slot_max,expression:"newEvent.default_slot_max"}],staticClass:"edit-event-form__number-field",attrs:{id:"crep-contact",type:"number"},domProps:{value:e.newEvent.default_slot_max},on:{input:function(t){t.target.composing||e.$set(e.newEvent,"default_slot_max",t.target.value)}}}),e._v(" "),n("p",{staticClass:"description"},[e._v("\n          Die Anzahl kann später pro Seminar geändert werden. Wenn es kein Teilnehmer-Limit geben soll, bitte 0 eintragen.\n        ")])])])]),e._v(" "),n("button",{staticClass:"button button-primary",attrs:{type:"submit"}},[e._v("\n    "+e._s(e.buttonText)+"\n  ")])])}),[],!1,null,"799b7e08",null).exports),y={name:"NewEvent",components:{EditEventForm:S},methods:{async createEvent(e){const t=await async function(e){return await w({method:"post",url:u+"events",data:e})}(e);t.error?alert(t.error):(alert(`Event ${e.name} wurde angelegt!`),this.$router.push("/"))}}},x=Object(i.a)(y,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("h1",[this._v("Neues Event erstellen")]),this._v(" "),t("edit-event-form",{attrs:{"button-text":"Neues Event erstellen"},on:{"event-submit":this.createEvent}})],1)}),[],!1,null,null,null).exports,E={name:"TagEditor",components:{ListTable:l.a},props:{tagsPreloaded:{type:Array,default:()=>[]},event_id:{type:Number,required:!0}},data(){return{newTag:{name:"",event_id:this.event_id},tags:this.tagsPreloaded.map(e=>({...e,editing:!1})),per_page:50,text:{select_bulk_action:"Mehrfachaktionen auswählen",bulk_actions:"Mehrfachaktionen",items:"Einträge",apply:"Übernehmen"},columns:{name:{label:"Name"},count:{label:"Anzahl"}},actions:[{key:"edit",label:"Bearbeiten"},{key:"delete",label:"Löschen"}],bulk_actions:[{key:"delete",label:"Löschen"}]}},created(){this.tags.length||this.loadTags()},methods:{async loadTags(){const e=await async function(e){return(await w({method:"get",url:u+"tags",params:{event_id:e}})).map(e=>({...e,id:parseInt(e.id),event_id:parseInt(e.event_id)}))}(this.event_id);e.error?alert(e.error):(this.tags=e.map(e=>({...e,editing:!1})),this.per_page=this.tags.length)},async submit(e){e.preventDefault();const t=await async function(e){return await w({method:"post",url:u+"tags",data:e})}(this.newTag);t.error?alert(t.error):(alert(`Schlagwort ${this.newTag.name} wurde angelegt!`),this.newTag.name="",this.loadTags())},async onActionClick(e,t){if("delete"===e){if(confirm("Schlagwort "+t.name+" wirklich löschen?")){const e=await v([t.id]);e.error?alert(e.error):(this.loadTags(),alert(t.name+" gelöscht!"))}}else"edit"===e&&(t.editing=!0)},async onBulkActionClick(e,t){if("delete"===e&&confirm("Gewählte Schlagwörter wirklich löschen?")){const e=await v(t);e.error?alert(e.error):(this.loadTags(),alert(e.success))}},async submitUpdate(e,t){e.preventDefault();const n=await async function(e){return await w({method:"put",url:`${u}tags/${e.id}`,data:e})}(t);n.error?alert(n.error):this.loadTags()}}},C=(n(53),Object(i.a)(E,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"tag-editor"},[n("h1",[e._v("Schlagwörter")]),e._v(" "),n("div",{staticClass:"wp-clearfix",attrs:{id:"col-container"}},[n("div",{attrs:{id:"col-left"}},[n("div",{staticClass:"col-wrap"},[n("h2",[e._v("Neues Schlagwort erstellen")]),e._v(" "),n("form",{staticClass:"edit-tag-form form-wrap",on:{submit:e.submit}},[n("div",{staticClass:"form-field"},[n("label",{attrs:{for:"crep-tag-name"}},[e._v("Name")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newTag.name,expression:"newTag.name"}],attrs:{id:"crep-tag-name",type:"text"},domProps:{value:e.newTag.name},on:{input:function(t){t.target.composing||e.$set(e.newTag,"name",t.target.value)}}})]),e._v(" "),e._m(0)])])]),e._v(" "),n("div",{attrs:{id:"col-right"}},[n("div",{staticClass:"col-wrap"},[n("list-table",{attrs:{rows:e.tags,perPage:e.per_page,text:e.text,columns:e.columns,actions:e.actions,"bulk-actions":e.bulk_actions,"action-column":"name",notFound:"Keine Einträge gefunden"},on:{"action:click":e.onActionClick,"bulk:click":e.onBulkActionClick},scopedSlots:e._u([{key:"name",fn:function(t){return[t.row.editing?n("form",{staticClass:"tag-editor__update-form",on:{submit:function(n){return e.submitUpdate(n,t.row)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.row.name,expression:"data.row.name"}],attrs:{type:"text"},domProps:{value:t.row.name},on:{input:function(n){n.target.composing||e.$set(t.row,"name",n.target.value)}}}),e._v(" "),n("button",{staticClass:"button button-primary",attrs:{type:"submit"}},[e._v("Speichern")])]):n("div",[e._v(e._s(t.row.name))])]}}])})],1)])])])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("p",{staticClass:"submit"},[t("button",{staticClass:"button button-primary",attrs:{type:"submit"}},[this._v("\n              Neues Schlagwort erstellen\n            ")])])}],!1,null,"47a58f1b",null).exports),$={name:"SessionEditor",components:{ListTable:l.a},props:{sessionsPreloaded:{type:Array,default:()=>[]},event_id:{type:Number,required:!0}},data(){return{newSession:{name:"",event_id:this.event_id},sessions:this.sessionsPreloaded.map(e=>({...e,editing:!1})),per_page:50,text:{select_bulk_action:"Mehrfachaktionen auswählen",bulk_actions:"Mehrfachaktionen",items:"Einträge",apply:"Übernehmen"},columns:{name:{label:"Name"},count:{label:"Anzahl"}},actions:[{key:"edit",label:"Bearbeiten"},{key:"delete",label:"Löschen"}],bulk_actions:[{key:"delete",label:"Löschen"}]}},created(){this.sessions.length||this.loadSessions()},methods:{async loadSessions(){const e=await async function(e){return(await w({method:"get",url:u+"sessions",params:{event_id:e}})).map(e=>({...e,id:parseInt(e.id),event_id:parseInt(e.event_id)}))}(this.event_id);e.error?alert(e.error):(this.sessions=e.map(e=>({...e,editing:!1})),this.per_page=this.sessions.length)},async submit(e){e.preventDefault();const t=await async function(e){return await w({method:"post",url:u+"sessions",data:e})}(this.newSession);t.error?alert(t.error):(alert(`Session ${this.newSession.name} wurde angelegt!`),this.newSession.name="",this.loadSessions())},async onActionClick(e,t){if("delete"===e){if(confirm("Session "+t.name+" wirklich löschen?")){const e=await _([t.id]);e.error?alert(e.error):(this.loadSessions(),alert(t.name+" gelöscht!"))}}else"edit"===e&&(t.editing=!0)},async onBulkActionClick(e,t){if("delete"===e&&confirm("Gewählte Sessions wirklich löschen?")){const e=await _(t);e.error?alert(e.error):(this.loadSessions(),alert(e.success))}},async submitUpdate(e,t){e.preventDefault();const n=await async function(e){return await w({method:"put",url:`${u}sessions/${e.id}`,data:e})}(t);n.error?alert(n.error):this.loadSessions()}}},N=(n(54),Object(i.a)($,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"session-editor"},[n("h1",[e._v("Sessions")]),e._v(" "),n("div",{staticClass:"wp-clearfix",attrs:{id:"col-container"}},[n("div",{attrs:{id:"col-left"}},[n("div",{staticClass:"col-wrap"},[n("h2",[e._v("Neue Session erstellen")]),e._v(" "),n("form",{staticClass:"edit-session-form form-wrap",on:{submit:e.submit}},[n("div",{staticClass:"form-field"},[n("label",{attrs:{for:"crep-session-name"}},[e._v("Name")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newSession.name,expression:"newSession.name"}],attrs:{id:"crep-session-name",type:"text"},domProps:{value:e.newSession.name},on:{input:function(t){t.target.composing||e.$set(e.newSession,"name",t.target.value)}}})]),e._v(" "),e._m(0)])])]),e._v(" "),n("div",{attrs:{id:"col-right"}},[n("div",{staticClass:"col-wrap"},[n("list-table",{attrs:{rows:e.sessions,perPage:e.per_page,text:e.text,columns:e.columns,actions:e.actions,"bulk-actions":e.bulk_actions,"action-column":"name",notFound:"Keine Einträge gefunden"},on:{"action:click":e.onActionClick,"bulk:click":e.onBulkActionClick},scopedSlots:e._u([{key:"name",fn:function(t){return[t.row.editing?n("form",{staticClass:"session-editor__update-form",on:{submit:function(n){return e.submitUpdate(n,t.row)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.row.name,expression:"data.row.name"}],attrs:{type:"text"},domProps:{value:t.row.name},on:{input:function(n){n.target.composing||e.$set(t.row,"name",n.target.value)}}}),e._v(" "),n("button",{staticClass:"button button-primary",attrs:{type:"submit"}},[e._v("Speichern")])]):n("div",[e._v(e._s(t.row.name))])]}}])})],1)])])])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("p",{staticClass:"submit"},[t("button",{staticClass:"button button-primary",attrs:{type:"submit"}},[this._v("\n              Neue Session erstellen\n            ")])])}],!1,null,"e5b7bab6",null).exports),A={name:"SeminarEditor",components:{ListTable:l.a},props:{event_id:{type:Number,required:!0}},data(){return{newSeminar:{name:"",event_id:this.event_id},seminars:[],per_page:50,text:{select_bulk_action:"Mehrfachaktionen auswählen",bulk_actions:"Mehrfachaktionen",items:"Einträge",apply:"Übernehmen"},columns:{name:{label:"Name"},number:{label:"Nummer"},description:{label:"Beschreibung"},slot_max:{label:"max. Teilnehmerzahl"},sessions:{label:"Sessions"}},actions:[{key:"edit",label:"Bearbeiten"},{key:"delete",label:"Löschen"}],bulk_actions:[{key:"delete",label:"Löschen"}]}},created(){this.loadSeminars()},methods:{async loadSeminars(){const e=await async function(e){return(await w({method:"get",url:u+"seminars",params:{event_id:e}})).map(e=>({...e,id:parseInt(e.id),event_id:parseInt(e.event_id)}))}(this.event_id);e.error?alert(e.error):(this.seminars=e,this.per_page=this.seminars.length)},async onActionClick(e,t){if("delete"===e){if(confirm("Seminar "+t.name+" wirklich löschen?")){const e=await f([t.id]);e.error?alert(e.error):(this.loadSeminars(),alert(t.name+" gelöscht!"))}}else"edit"===e&&this.$router.push({path:`/${this.event_id}/edit-seminar/${t.id}`})},async onBulkActionClick(e,t){if("delete"===e&&confirm("Gewählte Seminare wirklich löschen?")){const e=await f(t);e.error?alert(e.error):(this.loadSeminars(),alert(e.success))}}}},T=(n(55),{name:"EditEvent",components:{EditEventForm:S,TagEditor:C,SessionEditor:N,SeminarEditor:Object(i.a)(A,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"seminar-editor"},[n("div",[n("h1",{staticClass:"seminar-editor__headline"},[e._v("Seminare")]),e._v(" "),n("router-link",{staticClass:"page-title-action",attrs:{to:"/"+e.event_id+"/new-seminar"}},[e._v("\n      Neues Seminar erstellen\n    ")])],1),e._v(" "),n("list-table",{attrs:{rows:e.seminars,perPage:e.per_page,text:e.text,columns:e.columns,actions:e.actions,"bulk-actions":e.bulk_actions,"action-column":"name",notFound:"Keine Einträge gefunden"},on:{"action:click":e.onActionClick,"bulk:click":e.onBulkActionClick}})],1)}),[],!1,null,"3846143d",null).exports},data(){return{id:parseInt(this.$route.params.event_id),event:null}},async created(){this.event=await p(this.id)},methods:{async updateEvent(e){e.id=this.id;const t=await async function(e){return await w({method:"put",url:`${u}events/${e.id}`,data:e})}(e);t.error?alert(t.error):(alert(`Event ${e.name} wurde aktualisiert!`),this.$router.push("/"))}}}),I=Object(i.a)(T,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v(e._s(e.event?e.event.name:"Lade Event-Daten ..."))]),e._v(" "),e.event?[n("edit-event-form",{attrs:{"button-text":"Aktualisieren",event:e.event},on:{"event-submit":e.updateEvent}}),e._v(" "),n("session-editor",{attrs:{"sessions-preloaded":e.event.sessions,event_id:e.id}}),e._v(" "),n("seminar-editor",{attrs:{event_id:e.id}}),e._v(" "),n("tag-editor",{attrs:{"tags-preloaded":e.event.tags,event_id:e.id}})]:e._e()],2)}),[],!1,null,null,null).exports,O=n(29),P=n.n(O),B=(n(56),{name:"EditSeminarForm",components:{Multiselect:P.a},props:{buttonText:{type:String,default:"Speichern"},seminarId:{type:Number},eventId:{type:Number,required:!0}},data:()=>({newSeminar:{number:null,name:"",description:"",slot_max:null},event:{sessions_data:[],tags_data:[],speakers_data:[]},sessionsValue:[],sessionsOptions:[],speakersValue:[],speakersOptions:[],tagsValue:[],tagsOptions:[]}),async created(){let e=null;this.seminarId&&(e=await async function(e){return await w({method:"get",url:`${u}seminars/${e}`})}(this.$route.params.seminar_id),this.newSeminar.name=e.name,this.newSeminar.number=e.number,this.newSeminar.description=e.description,this.newSeminar.slot_max=e.slot_max),this.event=await p(this.eventId),this.event.sessions.forEach(t=>{this.sessionsOptions.push({name:t.name,code:t.id}),e&&e.session_ids.includes(t.id)&&this.sessionsValue.push({name:t.name,code:t.id})}),this.event.speakers.forEach(t=>{this.speakersOptions.push({name:`${t.first_name} ${t.surname}`,code:t.id}),e&&e.speaker_ids.includes(t.id)&&this.speakersValue.push({name:`${t.first_name} ${t.surname}`,code:t.id})}),this.event.tags.forEach(t=>{this.tagsOptions.push({name:t.name,code:t.id}),e&&e.tag_ids.includes(t.id)&&this.tagsValue.push({name:t.name,code:t.id})})},methods:{submit(e){e.preventDefault(),this.newSeminar.session_ids=this.sessionsValue.map(e=>e.code),this.newSeminar.speaker_ids=this.speakersValue.map(e=>e.code),this.newSeminar.tag_ids=this.tagsValue.map(e=>e.code),this.newSeminar.event_id=this.eventId,this.$emit("seminar-submit",this.newSeminar)}}}),j=(n(57),Object(i.a)(B,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("form",{staticClass:"edit-seminar-form",on:{submit:e.submit}},[n("table",{staticClass:"form-table",attrs:{role:"presentation"}},[n("tr",{staticClass:"form-field"},[n("th",{attrs:{scope:"row"}},[e._v("Nummer")]),e._v(" "),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newSeminar.number,expression:"newSeminar.number"}],staticClass:"edit-seminar-form__number-field",attrs:{id:"crep-contact",type:"number"},domProps:{value:e.newSeminar.number},on:{input:function(t){t.target.composing||e.$set(e.newSeminar,"number",t.target.value)}}}),e._v(" "),n("p",{staticClass:"description"},[e._v("\n          Optionaler Wert. Falls angegeben, werden Seminare in der Übersicht\n          danach sortiert.\n        ")])])]),e._v(" "),n("tr",{staticClass:"form-field"},[n("th",{attrs:{scope:"row"}},[e._v("Name")]),e._v(" "),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newSeminar.name,expression:"newSeminar.name"}],attrs:{id:"crep-name",type:"text"},domProps:{value:e.newSeminar.name},on:{input:function(t){t.target.composing||e.$set(e.newSeminar,"name",t.target.value)}}})])]),e._v(" "),n("tr",{staticClass:"form-field"},[n("th",{attrs:{scope:"row"}},[e._v("Beschreibung")]),e._v(" "),n("td",[n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.newSeminar.description,expression:"newSeminar.description"}],attrs:{id:"crep-contact"},domProps:{value:e.newSeminar.description},on:{input:function(t){t.target.composing||e.$set(e.newSeminar,"description",t.target.value)}}})])]),e._v(" "),n("tr",{staticClass:"form-field"},[n("th",{attrs:{scope:"row"}},[e._v("max. Teilnehmerzahl")]),e._v(" "),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newSeminar.slot_max,expression:"newSeminar.slot_max"}],staticClass:"edit-seminar-form__number-field",attrs:{id:"crep-contact",type:"number"},domProps:{value:e.newSeminar.slot_max},on:{input:function(t){t.target.composing||e.$set(e.newSeminar,"slot_max",t.target.value)}}}),e._v(" "),n("p",{staticClass:"description"},[e._v("\n          Wenn es kein Teilnehmer-Limit geben soll, bitte 0 eintragen. Frei\n          lassen, um den Standardwert des Events zu übernehmen.\n        ")])])]),e._v(" "),n("tr",{staticClass:"form-field"},[n("th",{attrs:{scope:"row"}},[e._v("Sessions")]),e._v(" "),n("td",[n("multiselect",{staticClass:"edit-seminar-form__fullwidth-field",attrs:{"tag-placeholder":"Session nicht gefunden",placeholder:"Suche nach einer Session",selectLabel:"Enter oder Anklicken zum Auswählen",label:"name","track-by":"code",options:e.sessionsOptions,multiple:!0,taggable:!0},model:{value:e.sessionsValue,callback:function(t){e.sessionsValue=t},expression:"sessionsValue"}})],1)]),e._v(" "),n("tr",{staticClass:"form-field"},[n("th",{attrs:{scope:"row"}},[e._v("Referenten")]),e._v(" "),n("td",[n("multiselect",{staticClass:"edit-seminar-form__fullwidth-field",attrs:{"tag-placeholder":"Referent nicht gefunden",placeholder:"Suche nach einem Referenten",selectLabel:"Enter oder Anklicken zum Auswählen",label:"name","track-by":"code",options:e.speakersOptions,multiple:!0,taggable:!0},model:{value:e.speakersValue,callback:function(t){e.speakersValue=t},expression:"speakersValue"}})],1)]),e._v(" "),n("tr",{staticClass:"form-field"},[n("th",{attrs:{scope:"row"}},[e._v("Schlagwörter")]),e._v(" "),n("td",[n("multiselect",{staticClass:"edit-seminar-form__fullwidth-field",attrs:{"tag-placeholder":"Schlagwort nicht gefunden",placeholder:"Suche nach einem Schlagwort",selectLabel:"Enter oder Anklicken zum Auswählen",label:"name","track-by":"code",options:e.tagsOptions,multiple:!0,taggable:!0},model:{value:e.tagsValue,callback:function(t){e.tagsValue=t},expression:"tagsValue"}})],1)])]),e._v(" "),n("button",{staticClass:"button button-primary",attrs:{type:"submit"}},[e._v("\n    "+e._s(e.buttonText)+"\n  ")])])}),[],!1,null,"a87bff3c",null).exports),L={name:"NewSeminar",components:{EditSeminarForm:j},data(){return{eventId:parseInt(this.$route.params.event_id)}},methods:{async createSeminar(e){const t=await async function(e){return await w({method:"post",url:u+"seminars",data:e})}(e);t.error?alert(t.error):(alert(`Seminar ${e.name} wurde angelegt!`),this.$router.push({path:`/${this.eventId}/edit-event`}))}}},V=Object(i.a)(L,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("h1",[this._v("Neues Seminar erstellen")]),this._v(" "),t("edit-seminar-form",{attrs:{"button-text":"Neues Seminar erstellen","event-id":this.eventId},on:{"seminar-submit":this.createSeminar}})],1)}),[],!1,null,null,null).exports,F={name:"EditSeminar",components:{EditSeminarForm:j},data(){return{id:parseInt(this.$route.params.seminar_id),eventId:parseInt(this.$route.params.event_id)}},methods:{async updateSeminar(e){e.id=this.id;const t=await async function(e){return await w({method:"put",url:`${u}seminars/${e.id}`,data:e})}(e);t.error?alert(t.error):(alert(`Seminar ${e.name} wurde aktualisiert!`),this.$router.push({path:`/${this.eventId}/edit-event`}))}}},M=Object(i.a)(F,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("h1",[this._v("Seminar bearbeiten")]),this._v(" "),t("edit-seminar-form",{attrs:{"button-text":"Aktualisieren","seminar-id":this.id,"event-id":this.eventId},on:{"seminar-submit":this.updateSeminar}})],1)}),[],!1,null,null,null).exports,z={name:"Speakers",components:{ListTable:l.a},data:()=>({items:[],per_page:20,text:{select_bulk_action:"Mehrfachaktionen auswählen",bulk_actions:"Mehrfachaktionen",items:"Einträge",apply:"Übernehmen"},columns:{first_name:{label:"Vorname"},surname:{label:"Nachname"},location:{label:"Ort"},description:{label:"Beschreibung"},path_to_picture:{label:"Bild"}},actions:[{key:"edit",label:"Bearbeiten"},{key:"delete",label:"Löschen"}],bulk_actions:[{key:"delete",label:"Löschen"}]}),created(){this.loadItems()},methods:{async loadItems(){const e=await async function(){return(await w({method:"get",url:u+"speakers"})).map(e=>({...e,id:parseInt(e.id)}))}();e.error?alert(e.error):(this.items=e,this.per_page=this.items.length)},async onActionClick(e,t){if("delete"===e){if(confirm(t.first_name+" "+t.surname+" wirklich löschen?")){const e=await h([t.id]);e.error?alert(e.error):(this.loadItems(),alert(t.first_name+" "+t.surname+" gelöscht!"))}}else"edit"===e&&this.$router.push({path:"/edit-speaker/"+t.id})},async onBulkActionClick(e,t){if("delete"===e&&confirm("Gewählte Referenten wirklich löschen?")){const e=await h(t);e.error?alert(e.error):(this.loadItems(),alert(e.success))}}}},D=(n(58),Object(i.a)(z,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"speakers"},[n("div",[n("h1",{staticClass:"speakers__headline"},[e._v("Referenten")]),e._v(" "),n("router-link",{staticClass:"page-title-action",attrs:{to:"/new-speaker"}},[e._v("\n      Neuen Referent anlegen\n    ")])],1),e._v(" "),n("list-table",{attrs:{rows:e.items,perPage:e.per_page,text:e.text,columns:e.columns,actions:e.actions,"bulk-actions":e.bulk_actions,"action-column":"first_name",notFound:"Keine Einträge gefunden"},on:{"action:click":e.onActionClick,"bulk:click":e.onBulkActionClick}})],1)}),[],!1,null,"93badb2e",null).exports),R={name:"EditSpeakerForm",props:{buttonText:{type:String,default:"Speichern"},speaker:{type:Object,default:()=>({first_name:"",surname:"",location:"",description:"",path_to_picture:""})}},data(){return{newSpeaker:{first_name:this.speaker.first_name,surname:this.speaker.surname,location:this.speaker.location,description:this.speaker.description,path_to_picture:this.speaker.path_to_picture}}},methods:{submit(e){e.preventDefault(),this.$emit("speaker-submit",this.newSpeaker)}}},K=(n(59),Object(i.a)(R,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("form",{staticClass:"edit-speaker-form",on:{submit:e.submit}},[n("table",{staticClass:"form-table",attrs:{role:"presentation"}},[n("tr",{staticClass:"form-field"},[n("th",{attrs:{scope:"row"}},[e._v("Vorname")]),e._v(" "),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newSpeaker.first_name,expression:"newSpeaker.first_name"}],attrs:{id:"crep-first_name",type:"text"},domProps:{value:e.newSpeaker.first_name},on:{input:function(t){t.target.composing||e.$set(e.newSpeaker,"first_name",t.target.value)}}})])]),e._v(" "),n("tr",{staticClass:"form-field"},[n("th",{attrs:{scope:"row"}},[e._v("Nachname")]),e._v(" "),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newSpeaker.surname,expression:"newSpeaker.surname"}],attrs:{id:"crep-surname",type:"text"},domProps:{value:e.newSpeaker.surname},on:{input:function(t){t.target.composing||e.$set(e.newSpeaker,"surname",t.target.value)}}})])]),e._v(" "),n("tr",{staticClass:"form-field"},[n("th",{attrs:{scope:"row"}},[e._v("Ort")]),e._v(" "),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newSpeaker.location,expression:"newSpeaker.location"}],attrs:{id:"crep-location",type:"text"},domProps:{value:e.newSpeaker.location},on:{input:function(t){t.target.composing||e.$set(e.newSpeaker,"location",t.target.value)}}})])]),e._v(" "),n("tr",{staticClass:"form-field"},[n("th",{attrs:{scope:"row"}},[e._v("Beschreibung")]),e._v(" "),n("td",[n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.newSpeaker.description,expression:"newSpeaker.description"}],attrs:{id:"crep-description"},domProps:{value:e.newSpeaker.description},on:{input:function(t){t.target.composing||e.$set(e.newSpeaker,"description",t.target.value)}}})])]),e._v(" "),n("tr",{staticClass:"form-field"},[n("th",{attrs:{scope:"row"}},[e._v("Pfad zum Bild")]),e._v(" "),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newSpeaker.path_to_picture,expression:"newSpeaker.path_to_picture"}],attrs:{id:"crep-path_to_picture",type:"text"},domProps:{value:e.newSpeaker.path_to_picture},on:{input:function(t){t.target.composing||e.$set(e.newSpeaker,"path_to_picture",t.target.value)}}})])])]),e._v(" "),n("button",{staticClass:"button button-primary",attrs:{type:"submit"}},[e._v("\n    "+e._s(e.buttonText)+"\n  ")])])}),[],!1,null,"17778faf",null).exports),G={name:"NewSpeaker",components:{EditSpeakerForm:K},methods:{async createSpeaker(e){const t=await async function(e){return await w({method:"post",url:u+"speakers",data:e})}(e);t.error?alert(t.error):(alert(` ${e.first_name} ${e.surname} wurde angelegt!`),this.$router.push("/speakers"))}}},q=Object(i.a)(G,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("h1",[this._v("Neuen Referenten erstellen")]),this._v(" "),t("edit-speaker-form",{attrs:{"button-text":"Neuen Referenten erstellen"},on:{"speaker-submit":this.createSpeaker}})],1)}),[],!1,null,null,null).exports,U={name:"EditSpeaker",components:{EditSpeakerForm:K},data(){return{id:parseInt(this.$route.params.speaker_id),speaker:null}},async created(){this.speaker=await async function(e){return await w({method:"get",url:`${u}speakers/${e}`})}(this.id)},methods:{async updateSpeaker(e){e.id=this.id;const t=await async function(e){return await w({method:"put",url:`${u}speakers/${e.id}`,data:e})}(e);t.error?alert(t.error):(alert(`${e.first_name} ${e.surname} wurde aktualisiert!`),this.$router.push("/speakers"))}}},W=Object(i.a)(U,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("h1",[this._v("Referent bearbeiten")]),this._v(" "),this.speaker?t("edit-speaker-form",{attrs:{"button-text":"Aktualisieren",speaker:this.speaker},on:{"speaker-submit":this.updateSpeaker}}):this._e()],1)}),[],!1,null,null,null).exports;a.a.use(o.a);var J=new o.a({routes:[{path:"/new-event",name:"NewEvent",component:x},{path:"/:event_id/edit-event",name:"EditEvent",component:I},{path:"/:event_id/new-seminar",name:"NewSeminar",component:V},{path:"/:event_id/edit-seminar/:seminar_id",name:"EditSeminar",component:M},{path:"/new-speaker",name:"NewSpeaker",component:q},{path:"/edit-speaker/:speaker_id",name:"EditSpeaker",component:W},{path:"/speakers",name:"Speakers",component:D},{path:"/",name:"Events",component:g}]});var Q=function(e){var t=jQuery;let n=t("#toplevel_page_"+e),a=window.location.href,s=a.substr(a.indexOf("admin.php"));n.on("click","a",(function(){var e=t(this);t("ul.wp-submenu li",n).removeClass("current"),e.hasClass("wp-has-submenu")?t("li.wp-first-item",n).addClass("current"):e.parents("li").addClass("current")})),t("ul.wp-submenu a",n).each((function(e,n){t(n).attr("href")!==s||t(n).parent().addClass("current")}))};a.a.config.productionTip=!1,new a.a({el:"#vue-admin-app",router:J,render:e=>e(r)}),Q("vue-app")}],[[62,0,1]]]);