(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{456:function(e,t,o){e.exports=o.p+"img/btn1.79bc649.png"},457:function(e,t,o){e.exports=o.p+"img/btn2.95dec07.png"},509:function(e,t,o){var content=o(538);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(109).default)("06236406",content,!0,{sourceMap:!1})},536:function(e,t,o){e.exports=o.p+"img/tarot-chkobba.69a2233.png"},537:function(e,t,o){"use strict";o(509)},538:function(e,t,o){var r=o(108),n=o(200),l=o(291),c=o(292),m=r((function(i){return i[1]})),d=n(l),f=n(c);m.push([e.i,"form[data-v-60459f5c]{display:flex;flex-direction:column;justify-self:center;position:absolute;right:50%;top:20%;width:-moz-min-content;width:min-content}.btn_img[data-v-60459f5c]:hover{transform:scale(1.1)}.btn_img[data-v-60459f5c]{padding:20px}.v-modal[data-v-60459f5c]{display:none}.background-main[data-v-60459f5c]{background-attachment:fixed;background-image:url("+d+");background-position:50%;background-repeat:no-repeat;background-size:cover;height:100%;margin:0 auto;position:absolute;width:100%}@media (max-width:480px){.background-main[data-v-60459f5c]{background-image:url("+f+");background-repeat:no-repeat;background-size:cover;height:100%;margin:0 auto;position:absolute;width:100%}#table_login[data-v-60459f5c]{display:none}form[data-v-60459f5c]{right:50%;top:30%;width:90%}.btn_img[data-v-60459f5c]{padding:10px}}",""]),m.locals={},e.exports=m},542:function(e,t,o){"use strict";o.r(t);var r=o(7),n=(o(45),{middleware:!1,auth:!1,data:function(){return{dialogFormVisibleJoin:!1,dialogFormVisible:!1,username:"",roomID:"",error:"",nbPlayer:2}},mounted:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.RoomID=e.$route.query.roomID;case 1:case"end":return t.stop()}}),t)})))()},methods:{login:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var o,r,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,""!=e.roomID){t.next=9;break}return console.warn("creating room"),t.next=5,e.$auth.loginWith("local",{data:{username:e.username,nbPlayer:e.nbPlayer}});case 5:o=t.sent,console.log(o),t.next=13;break;case 9:return t.next=11,e.$auth.loginWith("local",{data:{username:e.username,roomID:e.roomID}});case 11:r=t.sent,console.log(r);case 13:return t.next=15,e.$axios.get("/protected");case 15:n=t.sent,console.log(n),e.$router.push("/game"),t.next=24;break;case 20:t.prev=20,t.t0=t.catch(0),console.error("Login error:",t.t0),t.t0.response?e.error=t.t0.response.data.message:e.error="An unexpected error occurred.";case 24:case"end":return t.stop()}}),t,null,[[0,20]])})))()},submitRoomID:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.dialogFormVisible=!1,t.next=3,e.login();case 3:case"end":return t.stop()}}),t)})))()}}}),l=(o(537),o(43)),component=Object(l.a)(n,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"background-main"},[t("img",{staticStyle:{position:"absolute",top:"20%",left:"50%",transform:"translateX(-50%) translateY(-25%) scale(1.5)"},attrs:{id:"table_login",src:o(536),alt:"Card Image"}}),e._v(" "),t("form",{on:{submit:function(t){return t.preventDefault(),e.login.apply(null,arguments)}}},[t("img",{staticClass:"btn_img",staticStyle:{transform:"translateX(50%)"},attrs:{src:o(456),alt:"Card Image"},on:{click:function(t){e.dialogFormVisibleJoin=!0}}}),e._v(" "),t("img",{staticClass:"btn_img",staticStyle:{transform:"translateX(50%)"},attrs:{src:o(457),alt:"Card Image"},on:{click:function(t){e.dialogFormVisible=!0}}}),e._v(" "),t("el-dialog",{attrs:{width:"95%",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[t("div",{staticStyle:{display:"grid","justify-content":"center"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{type:"text",placeholder:"Username",required:""},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}}),e._v(" "),t("br"),e._v(" "),t("label",[e._v("who many players:")]),e._v(" "),t("br"),e._v(" "),t("el-input-number",{attrs:{min:2,max:4,step:2},model:{value:e.nbPlayer,callback:function(t){e.nbPlayer=t},expression:"nbPlayer"}})],1),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("Cancel")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.submitRoomID}},[e._v("Login")])],1)]),e._v(" "),t("el-dialog",{attrs:{width:"95%",visible:e.dialogFormVisibleJoin},on:{"update:visible":function(t){e.dialogFormVisibleJoin=t}}},[t("div",{staticStyle:{display:"grid","justify-content":"center"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{type:"text",placeholder:"Username",required:""},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}}),e._v(" "),t("br"),e._v(" "),t("label",[e._v("Room ID:")]),e._v(" "),t("el-input",{attrs:{type:"text",placeholder:"Room ID",autocomplete:"off"},model:{value:e.roomID,callback:function(t){e.roomID=t},expression:"roomID"}}),e._v(" "),e.error?t("p",[e._v(e._s(e.error))]):e._e()],1),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.dialogFormVisibleJoin=!1}}},[e._v("Cancel")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.submitRoomID}},[e._v("Login")])],1)])],1)])}),[],!1,null,"60459f5c",null);t.default=component.exports}}]);