(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{11:function(e,t,n){},12:function(e,t,n){},13:function(e,t,n){},61:function(e,t,n){"use strict";var r=n(11);n.n(r).a},62:function(e,t,n){"use strict";var r=n(12);n.n(r).a},63:function(e,t,n){"use strict";var r=n(13);n.n(r).a},87:function(e,t,n){"use strict";n.r(t);var r=n(6),a=n(0),s=n.n(a),i=n(1),o=n.n(i),c=n(3),l=n.n(c),u=n(9),m=n.n(u);function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function _(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){l()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var p=(window.crep?window.crep.rest_url:"http://127.0.0.1:8000/wp-json/")+"crep/v1/";function f(e){return v.apply(this,arguments)}function v(){return(v=o()(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y({method:"get",url:"".concat(p,"events/").concat(t)});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function g(e){return h.apply(this,arguments)}function h(){return(h=o()(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y({method:"get",url:"".concat(p,"seminars"),params:{event_id:t}});case 2:return n=e.sent,e.abrupt("return",n.map((function(e){return _(_({},e),{},{id:parseInt(e.id),event_id:parseInt(e.event_id),slot_max:null!==e.slot_max?parseInt(e.slot_max):e.slot_max})})));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function b(e){return w.apply(this,arguments)}function w(){return(w=o()(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y({method:"post",url:"".concat(p,"registrations/validate"),data:t});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function y(e){return k.apply(this,arguments)}function k(){return(k=o()(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m()(t);case 3:return n=e.sent,e.abrupt("return",n.data);case 7:return e.prev=7,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return",{error:"Bei der Verbindung zum Server ist ein Fehler aufgetreten! Stelle sicher, dass du als Admin eingeloggt bist und versuche es noch einmal."});case 11:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}m.a.defaults.headers.common["X-WP-Nonce"]=window.crep?window.crep.nonce:null;var R={name:"SeminarList",props:{eventId:{type:Number,required:!0}},data:function(){return{event:{},seminars:[],session_map:{},speaker_map:{},tag_map:{}}},created:function(){var e=this;return o()(s.a.mark((function t(){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f(e.eventId);case 2:return e.event=t.sent,t.next=5,g(e.eventId);case 5:e.seminars=t.sent,e.seminars.sort(e.compareSeminarByNumber),e.event.sessions.forEach((function(t){e.session_map[t.id]=t.name})),e.event.speakers.forEach((function(t){e.speaker_map[t.id]=t})),e.event.tags.forEach((function(t){e.tag_map[t.id]=t.name}));case 10:case"end":return t.stop()}}),t)})))()},methods:{getSpeakers:function(e){var t=this,n="";return e.forEach((function(e){var r=t.speaker_map[e];n+="".concat(r.first_name," ").concat(r.surname,", ").concat(r.location," & ")})),n.slice(0,-3)},compareSeminarByNumber:function(e,t){var n=parseInt(e.number),r=parseInt(t.number);return n<r?-1:n>r?1:0}}},x=(n(61),n(2)),O=Object(x.a)(R,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"crep-seminar-list"}},e._l(e.seminars,(function(t){return n("div",{key:t.id,staticClass:"crep-seminar"},[t.number?n("div",{staticClass:"crep-seminar__number"},[e._v("\n      "+e._s(t.number.padStart(2,"0"))+"\n    ")]):e._e(),e._v(" "),n("div",[n("h4",{staticClass:"crep-seminar__name"},[e._v(e._s(t.name))]),e._v(" "),n("small",{staticClass:"crep-seminar__sessions"},[e._l(t.session_ids,(function(r,a){return[n("span",{key:t.id+"_"+r},[0!==t.slot_max&&t.slot_max<=t.registrations[parseInt(r)]?[n("span",{staticClass:"crep-seminar__session--full"},[n("span",{staticClass:"crep-seminar__session-name"},[e._v("\n                  "+e._s(e.session_map[r])+"\n                ")])]),n("span",{staticClass:"crep-seminar__warning"},[e._v(" (ausgebucht)")])]:[e._v("\n              "+e._s(e.session_map[r])+"\n            ")],e._v(" "),a<t.session_ids.length-1?[e._v("\n               "),n("span",{staticClass:"crep-seminar__pipe"},[e._v("|")]),e._v(" \n            ")]:e._e()],2)]}))],2),e._v(" "),n("p",{staticClass:"crep-seminar__description"},[e._v(e._s(t.description))]),e._v(" "),n("small",{staticClass:"crep-seminar__speakers"},[e._v(e._s(e.getSpeakers(t.speaker_ids)))]),e._v(" "),t.tag_ids.length?n("ul",{staticClass:"crep-seminar__tags"},e._l(t.tag_ids,(function(t){return n("li",{key:t,staticClass:"crep-seminar__tag"},[e._v("\n          "+e._s(e.tag_map[t])+"\n        ")])})),0):e._e()])])})),0)}),[],!1,null,"fb6e5094",null).exports;function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function P(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(Object(n),!0).forEach((function(t){l()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function C(e){var t=[];try{t=JSON.parse(e),Array.isArray(t)||(console.error("Input to parseJSONStringArray was not parsed into array correctly!"),t=[])}catch(e){console.error(e)}return t}function S(){var e={summand:E(1,21),addend:E(1,21)};return P(P({},e),{},{sum:e.summand+e.addend})}function E(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e)+e)}var q=n(8),I=n.n(q),D=(n(29),{name:"RegistrationForm",components:{Multiselect:I.a},props:{eventId:{type:Number,required:!0},redirectUrl:{type:String,required:!0}},data:function(){return{newRegistration:{first_name:"",surname:"",contact_mail:"",event_id:this.eventId,additional_params_object:{},consent:!1,result:""},event:{sessions:[],seminars:[]},seminar_map:{},seminarSelections:[],additionalParamFields:[],equation:S(),requiredFields:["Vorname","Nachname","E-Mail-Adresse"]}},created:function(){var e=this;return o()(s.a.mark((function t(){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f(e.eventId);case 2:return e.event=t.sent,t.next=5,g(e.eventId);case 5:e.seminars=t.sent,e.seminars.forEach((function(t){e.seminar_map[t.id]=t})),e.event.sessions.forEach((function(t){var n={label:t.name,id:t.id,value:{},options:[]};t.seminar_ids.forEach((function(r){n.options.push({code:r,name:e.seminar_map[r].name,$isDisabled:0!==e.seminar_map[r].slot_max&&e.seminar_map[r].slot_max<=e.seminar_map[r].registrations[t.id]})})),e.seminarSelections.push(n)})),e.additionalParamFields=C(e.event.additional_params),e.additionalParamFields.forEach((function(t){Object.keys(e.newRegistration.additional_params_object).includes(t.code)||(e.newRegistration.additional_params_object[t.code]=""),t.required&&e.requiredFields.push(t.name)}));case 10:case"end":return t.stop()}}),t)})))()},methods:{submit:function(e){var t=this;return o()(s.a.mark((function n(){var r;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(e.preventDefault(),!t.additionalParamFields.filter((function(e){return e.required&&!t.newRegistration.additional_params_object[e.code]})).length&&t.newRegistration.first_name&&t.newRegistration.surname&&t.newRegistration.contact_mail){n.next=5;break}return alert("Die Felder:\n\n"+t.requiredFields.join(", ")+"\n\nsind Pflichtfelder und müssen angegeben werden!"),n.abrupt("return");case 5:if(t.newRegistration.consent){n.next=8;break}return alert("Bitte bestätige den Hinweis zum Datenschutz, um dich anzumelden!"),n.abrupt("return");case 8:if(""!==t.newRegistration.result&&parseInt(t.newRegistration.result)===t.equation.sum){n.next=11;break}return alert("Bitte gib die korrekte Summe an, um zu bestätigen, dass du kein Roboter bist."),n.abrupt("return");case 11:return t.newRegistration.seminars=[],t.seminarSelections.forEach((function(e){e.value&&e.value.code&&t.newRegistration.seminars.push({session_id:e.id,seminar_id:e.value.code})})),t.newRegistration.additional_params=JSON.stringify(t.newRegistration.additional_params_object),t.newRegistration.confirmed=0,t.newRegistration.number_one=t.equation.summand,t.newRegistration.number_two=t.equation.addend,n.next=19,b(t.newRegistration);case 19:r=n.sent,alert(r.success?"Deine Anmeldung wurde versandt. Du erhälst bald eine Bestätigungsmail. Vielen Dank!":"Beim Senden ist ein Fehler aufgetreten:\n\n"+(r.error||"Unbekannter Fehler")),r.success&&(window.location.href=t.redirectUrl);case 22:case"end":return n.stop()}}),n)})))()}}}),N=(n(62),n(63),Object(x.a)(D,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("form",{staticClass:"registration-form",on:{submit:e.submit}},[n("h4",{staticClass:"registration-form__headline"},[e._v("Persönliche Daten:")]),e._v(" "),n("fieldset",{staticClass:"registration-form__set"},[e._m(0),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newRegistration.first_name,expression:"newRegistration.first_name"}],staticClass:"registration-form__block",attrs:{type:"text",id:"crep-first-name",required:""},domProps:{value:e.newRegistration.first_name},on:{input:function(t){t.target.composing||e.$set(e.newRegistration,"first_name",t.target.value)}}}),e._v(" "),e._m(1),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newRegistration.surname,expression:"newRegistration.surname"}],staticClass:"registration-form__block",attrs:{type:"text",id:"crep-surname",required:""},domProps:{value:e.newRegistration.surname},on:{input:function(t){t.target.composing||e.$set(e.newRegistration,"surname",t.target.value)}}}),e._v(" "),e._m(2),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newRegistration.contact_mail,expression:"newRegistration.contact_mail"}],staticClass:"registration-form__block",attrs:{type:"email",id:"crep-contact_mail",required:""},domProps:{value:e.newRegistration.contact_mail},on:{input:function(t){t.target.composing||e.$set(e.newRegistration,"contact_mail",t.target.value)}}})]),e._v(" "),n("h4",{staticClass:"registration-form__headline"},[e._v("Seminare auswählen:")]),e._v(" "),n("fieldset",{staticClass:"registration-form__set"},[e._l(e.seminarSelections,(function(t){return[n("label",{key:"label_"+t.id,staticClass:"registration-form__block registration-form__label",attrs:{for:"seminar_"+t.id}},[e._v(e._s(t.label))]),e._v(" "),n("multiselect",{key:t.id,staticClass:"edit-registration-form__fullwidth-field",attrs:{id:"seminar_"+t.id,placeholder:"Suche nach einem Seminar",selectedLabel:"Ausgewählt",selectLabel:"Auswählen",deselectLabel:"Entfernen",label:"name","track-by":"code",options:t.options},model:{value:t.value,callback:function(n){e.$set(t,"value",n)},expression:"session.value"}},[n("template",{slot:"noOptions"},[e._v("Keine Einträge.")]),e._v(" "),n("template",{slot:"noResults"},[e._v("Keine Einträge gefunden. Ändere deine Suche!")]),e._v(" "),n("template",{slot:"maxElements"},[e._v("Entferne zunächst eine ausgewählte Option, um eine andere\n          auszuwählen.")])],2)]}))],2),e._v(" "),[n("h4",{staticClass:"registration-form__headline"},[e._v("Sonstiges")]),e._v(" "),n("fieldset",{staticClass:"registration-form__set"},[e._l(e.additionalParamFields,(function(t){return[n("label",{key:"label_"+t.code,staticClass:"registration-form__block registration-form__label",attrs:{for:t.code}},[e._v(e._s(t.name)+"\n          "),t.required?n("em",[e._v(" (Pflichtfeld)")]):e._e()]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newRegistration.additional_params_object[t.code],expression:"newRegistration.additional_params_object[param.code]"}],key:t.code,staticClass:"registration-form__block",attrs:{required:t.required,type:"text"},domProps:{value:e.newRegistration.additional_params_object[t.code]},on:{input:function(n){n.target.composing||e.$set(e.newRegistration.additional_params_object,t.code,n.target.value)}}})]})),e._v(" "),n("div",{staticClass:"registration-form__label"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newRegistration.consent,expression:"newRegistration.consent"}],attrs:{type:"checkbox",id:"crep_consent",required:""},domProps:{checked:Array.isArray(e.newRegistration.consent)?e._i(e.newRegistration.consent,null)>-1:e.newRegistration.consent},on:{change:function(t){var n=e.newRegistration.consent,r=t.target,a=!!r.checked;if(Array.isArray(n)){var s=e._i(n,null);r.checked?s<0&&e.$set(e.newRegistration,"consent",n.concat([null])):s>-1&&e.$set(e.newRegistration,"consent",n.slice(0,s).concat(n.slice(s+1)))}else e.$set(e.newRegistration,"consent",a)}}}),e._v(" "),e._m(3)]),e._v(" "),n("div",{staticClass:"registration-form__label"},[n("span",{staticClass:"registration-form__equation"},[e._v(e._s(e.equation.summand)+"  +  "+e._s(e.equation.addend)+"  = ")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newRegistration.result,expression:"newRegistration.result"}],staticClass:"registration-form__number",attrs:{type:"text",required:""},domProps:{value:e.newRegistration.result},on:{input:function(t){t.target.composing||e.$set(e.newRegistration,"result",t.target.value)}}}),n("em",[e._v(" (Pflichtfeld)")])])],2)],e._v(" "),n("button",{staticClass:"button button-primary",attrs:{type:"submit"}},[e._v("Anmelden")])],2)}),[function(){var e=this.$createElement,t=this._self._c||e;return t("label",{staticClass:"registration-form__block registration-form__label",attrs:{for:"crep-first-name"}},[this._v("Vorname:"),t("em",[this._v(" (Pflichtfeld)")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("label",{staticClass:"registration-form__block registration-form__label",attrs:{for:"crep-surname"}},[this._v("Nachname:"),t("em",[this._v(" (Pflichtfeld)")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("label",{staticClass:"registration-form__block registration-form__label",attrs:{for:"crep-contact_mail"}},[this._v("E-Mail-Adresse:"),t("em",[this._v(" (Pflichtfeld)")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("label",{staticClass:"registration-form__label registration-form__inline",attrs:{for:"crep_consent"}},[this._v("Mit der Nutzung dieses Formulars erkläre ich mich mit der\n          Speicherung und Verarbeitung meiner Daten durch diese Website\n          einverstanden."),t("em",[this._v(" (Pflichtfeld)")])])}],!1,null,"4d0fafd4",null).exports);r.a.config.productionTip=!1;var $=document.getElementById("crep-seminar-list");$&&new r.a({el:"#crep-seminar-list",render:function(e){return e(O,{props:{eventId:parseInt($.dataset.eventId)}})}});var A=document.getElementById("crep-registration-form");A&&new r.a({el:"#crep-registration-form",render:function(e){return e(N,{props:{eventId:parseInt(A.dataset.eventId),redirectUrl:A.dataset.redirectUrl}})}})}},[[87,0,1]]]);