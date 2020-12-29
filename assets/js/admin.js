(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{44:function(e,t,n){"use strict";var a=n(6);n.n(a).a},45:function(e,t,n){"use strict";var a=n(7);n.n(a).a},48:function(e,t,n){"use strict";n.r(t);var a=n(2),r={name:"App"},s=n(0),i=Object(s.a)(r,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"vue-backend-app"}},[t("router-view")],1)}),[],!1,null,null,null).exports,l=n(3),o=n(21),c=(n(26),n(9)),u=n.n(c);const m=(window.crep?window.crep.rest_url:"http://127.0.0.1:8000/wp-json/")+"crep/v1/";async function d(e){return await v({method:"delete",url:m+"events",data:{ids:e}})}async function v(e){try{return(await u()(e)).data}catch(e){return console.error(e),{error:"Bei der Verbindung zum Server ist ein Fehler aufgetreten! Stelle sicher, dass du als Admin eingeloggt bist und versuche es noch einmal."}}}u.a.defaults.headers.common["X-WP-Nonce"]=window.crep?window.crep.nonce:null;var p={name:"Events",components:{ListTable:o.a},data:()=>({items:[],per_page:20,text:{select_bulk_action:"Mehrfachaktionen auswählen",bulk_actions:"Mehrfachaktionen",items:"Einträge",apply:"Übernehmen"},columns:{name:{label:"Event"},contact_mail:{label:"Kontakt"},created:{label:"Erstellt am"},default_slot_max:{label:"max. Teilnehmer je Seminar"}},actions:[{key:"seminars",label:"Seminare"},{key:"edit",label:"Bearbeiten"},{key:"delete",label:"Löschen"}],bulk_actions:[{key:"delete",label:"Löschen"}]}),created(){this.loadItems()},methods:{async loadItems(){const e=await async function(){return await v({method:"get",url:m+"events"})}();e.error?alert(e.error):(this.items=e,this.per_page=this.items.length)},async onActionClick(e,t){if("delete"===e){if(confirm("Event "+t.name+" wirklich löschen?")){const e=await d([t.id]);e.error?alert(e.error):(this.loadItems(),alert(t.name+" gelöscht!"))}}else"edit"===e&&this.$router.push({name:"EditEvent",params:t})},async onBulkActionClick(e,t){if("delete"===e&&confirm("Gewählte Events wirklich löschen?")){const e=await d(t);e.error?alert(e.error):(this.loadItems(),alert(e.success))}}}},h=(n(44),Object(s.a)(p,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"events"},[n("div",[n("h1",{staticClass:"events__headline"},[e._v("Events")]),e._v(" "),n("router-link",{staticClass:"page-title-action",attrs:{to:"/new-event"}},[e._v("\n      Neues Event erstellen\n    ")])],1),e._v(" "),n("list-table",{attrs:{rows:e.items,perPage:e.per_page,text:e.text,columns:e.columns,actions:e.actions,"bulk-actions":e.bulk_actions,"action-column":"name",notFound:"Keine Einträge gefunden"},on:{"action:click":e.onActionClick,"bulk:click":e.onBulkActionClick}})],1)}),[],!1,null,"7e383385",null).exports),_={name:"EditEventForm",props:{buttonText:{type:String,default:"Speichern"},event:{type:Object,default:()=>({name:"",contact_mail:"",default_slot_max:25})}},data(){return{newEvent:{name:this.event.name,contact_mail:this.event.contact_mail,default_slot_max:this.event.default_slot_max}}},methods:{submit(e){e.preventDefault(),this.$emit("event-submit",this.newEvent)}}},f=(n(45),Object(s.a)(_,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("form",{staticClass:"edit-event-form",on:{submit:e.submit}},[n("table",{staticClass:"form-table",attrs:{role:"presentation"}},[n("tr",{staticClass:"form-field"},[n("th",{attrs:{scope:"row"}},[e._v("Name")]),e._v(" "),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newEvent.name,expression:"newEvent.name"}],attrs:{id:"crep-name",type:"text"},domProps:{value:e.newEvent.name},on:{input:function(t){t.target.composing||e.$set(e.newEvent,"name",t.target.value)}}})])]),e._v(" "),n("tr",{staticClass:"form-field"},[n("th",{attrs:{scope:"row"}},[e._v("Kontakt")]),e._v(" "),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newEvent.contact_mail,expression:"newEvent.contact_mail"}],attrs:{id:"crep-contact",type:"text"},domProps:{value:e.newEvent.contact_mail},on:{input:function(t){t.target.composing||e.$set(e.newEvent,"contact_mail",t.target.value)}}}),e._v(" "),n("p",{staticClass:"description"},[e._v("\n          E-Mail-Adressen der Organisatoren. Diese Personen werden bei einer\n          Registrierung benachrichtigt. Mehrere Adressen können mit Komma\n          getrennt eingegeben werden.\n        ")])])]),e._v(" "),n("tr",{staticClass:"form-field"},[n("th",{attrs:{scope:"row"}},[e._v("max. Teilnehmer je Seminar ")]),e._v(" "),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newEvent.default_slot_max,expression:"newEvent.default_slot_max"}],staticClass:"edit-event-form__number-field",attrs:{id:"crep-contact",type:"number"},domProps:{value:e.newEvent.default_slot_max},on:{input:function(t){t.target.composing||e.$set(e.newEvent,"default_slot_max",t.target.value)}}}),e._v(" "),n("p",{staticClass:"description"},[e._v("\n          Die Anzahl kann später pro Seminar geändert werden. Wenn es kein Teilnehmer-Limit geben soll, bitte 0 eintragen.\n        ")])])])]),e._v(" "),n("button",{staticClass:"button button-primary",attrs:{type:"submit"}},[e._v("\n    "+e._s(e.buttonText)+"\n  ")])])}),[],!1,null,"799b7e08",null).exports),w={name:"NewEvent",components:{EditEventForm:f},methods:{async createEvent(e){const t=await async function(e){return await v({method:"post",url:m+"events",data:e})}(e);t.error?alert(t.error):(alert(`Event ${e.name} wurde angelegt!`),this.$router.push("/"))}}},b=Object(s.a)(w,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("h1",[this._v("Neues Event erstellen")]),this._v(" "),t("edit-event-form",{attrs:{"button-text":"Neues Event erstellen"},on:{"event-submit":this.createEvent}})],1)}),[],!1,null,null,null).exports,E={name:"EditEvent",components:{EditEventForm:f},props:{name:{type:String,required:!0},id:{type:Number,required:!0},contact_mail:{type:String,required:!0},default_slot_max:{type:Number,required:!0}},methods:{async updateEvent(e){e.id=this.id;const t=await async function(e){return await v({method:"put",url:`${m}events/${e.id}`,data:e})}(e);t.error?alert(t.error):(alert(`Event ${e.name} wurde aktualisiert!`),this.$router.push("/"))}}},g=Object(s.a)(E,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("h1",[this._v("Event bearbeiten")]),this._v(" "),t("edit-event-form",{attrs:{"button-text":"Aktualisieren",event:{name:this.name,contact_mail:this.contact_mail,default_slot_max:this.default_slot_max}},on:{"event-submit":this.updateEvent}})],1)}),[],!1,null,null,null).exports;a.a.use(l.a);var k=new l.a({routes:[{path:"/new-event",name:"NewEvent",component:b},{path:"/edit-event",name:"EditEvent",component:g,props:!0},{path:"/",name:"Events",component:h}]});var x=function(e){var t=jQuery;let n=t("#toplevel_page_"+e),a=window.location.href,r=a.substr(a.indexOf("admin.php"));n.on("click","a",(function(){var e=t(this);t("ul.wp-submenu li",n).removeClass("current"),e.hasClass("wp-has-submenu")?t("li.wp-first-item",n).addClass("current"):e.parents("li").addClass("current")})),t("ul.wp-submenu a",n).each((function(e,n){t(n).attr("href")!==r||t(n).parent().addClass("current")}))};a.a.config.productionTip=!1,new a.a({el:"#vue-admin-app",router:k,render:e=>e(i)}),x("vue-app")},6:function(e,t,n){},7:function(e,t,n){}},[[48,0,1]]]);