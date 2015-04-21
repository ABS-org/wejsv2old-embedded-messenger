!function(){"use strict";if(window.WeMessenger)return console.log("Namespace already taken. Exiting script...");var a=window.WeMessenger={},b=window.document.createElement("div");b.setAttribute("id","we-mesenger"),window.document.getElementsByTagName("body")[0].appendChild(b);var c=window.App=a.App=Ember.Application.create({rootElement:b});c.deferReadiness(),c.set("LOG_TRANSITIONS",!0),c.set("LOG_TRANSITIONS_INTERNAL",!0),c.set("LOG_VIEW_LOOKUPS",!0),c.Router=Ember.Router.extend({location:"none"}),c.auth=Ember.Object.create({isAuthenticated:!1,authToken:null}),a.initialize=function(b){var d=b||{};d.server=d.server||"http://localhost:1420",a.options=d,c.ApplicationAdapter.reopen({host:a.options.server}),c.ApplicationRoute=Ember.Route.extend({beforeModel:function(){var b=this;return Ember.RSVP.hash({currentUser:$.getJSON(a.options.server+"/account").done(function(a){a.user&&c.set("currentUser",b.store.push("user",a.user))}).fail(function(a){Ember.Logger.error("Error on get current user data",a)})})}}),c.UserAvatarComponent.reopen({init:function(){this._super(),this.set("defaultSrc",a.options.server+"/core/images/avatars/user-avatar.png")}}),c.WeMessengerPublicBoxComponent.reopen({cdpLoading:a.options.server+"/core/images/loading.gif"}),c.BoxController.reopen({cdpLoading:a.options.server+"/core/images/loading.gif",cdpOnline:a.options.server+"/core/images/connected.png",cdpOffline:a.options.server+"/core/images/disconnected.png"}),c.ContactController.reopen({cdpOnline:a.options.server+"/core/images/connected.png"}),window.jQuery(window.document).ready(function(){var b="",e=d.authTokenName;return e="string"==typeof e||"wetoken",(b=d.wetoken?d.wetoken:$.cookie(e))?($.ajaxPrefilter(function(a){a.beforeSend||(a.beforeSend=function(a){a.setRequestHeader("Accept","application/json"),a.setRequestHeader("Authorization","Bearer "+b)})}),void $.getJSON(a.options.server+"/account").done(function(a){c.get("auth").setProperties({isAuthenticated:!0,authToken:b}),window.io.socket=window.io.sails.connect(d.server),c.advanceReadiness()}).fail(function(a){console.log("WeMessenger:: No authenticated cookie nor token could be inferred"),console.log("WeMessenger:: Access Denied"),console.log("WeMessenger:: You gotta login first on CdP server"),c.set("auth.isAuthenticated",!1)})):(console.log("WeMessenger:: No authenticated cookie nor token could be inferred"),console.log("WeMessenger:: Access Denied"),console.log("WeMessenger:: You gotta login first on CdP server"),void c.set("auth.isAuthenticated",!1))})}}(),function(){"use strict";App.ApplicationController=Ember.ObjectController.extend({isAuthenticated:function(){return App.get("auth.isAuthenticated")}.property("App.auth.isAuthenticated")})}(),function(){"use strict";App.BoxController=Ember.ObjectController.extend({messageNew:"",contact:{},messages:[],isListOpen:!0,isVisible:!0,isWriting:!1,isContactWritingTime:2e3,iAmWritingTimeout:!1,isWritingTime:3500,messagePlaceholder:"",socket:null,isScrolled:!1,hasNews:!1,hasFocus:!1,isStarted:!1,count:null,limit:15,page:1,messagesElementSelector:".messages",isOnline:function(){return"online"===this.get("model.messengerStatus")?!0:!1}.property("model.messengerStatus"),boxId:function(){return"messengerBox-"+this.get("id")}.property("id"),goToBottomTimeOut:null,sendIsWriting:function(){this.get("messageNew").trim()&&this.send("emitIsWriting")}.observes("messageNew"),goToBottomOnUpdate:function(){this.get("isScrolled")||this.send("scrollToBottom"),this.get("isStarted")&&!this.get("hasFocus")&&this.set("hasNews",!0)}.observes("messages.@each"),init:function(){this._super();var a=this,b=a.get("model.id");if(b&&this.getMessagesWithUser().then(function(){Ember.run.scheduleOnce("afterRender",a,function(){this.send("scrollToBottom")})}),!this.get("socket")){if(!window.io||!window.io.socket)return console.error("Socket.io not found in App.WeMessengerComponent.init()");this.set("socket",window.io.socket)}this.get("store").filter("message",function(a){return a.get("toId.id")===App.currentUser.id&&a.get("fromId.id")===b?!0:a.get("fromId.id")===App.currentUser.id&&a.get("toId.id")===b?!0:!1}).then(function(b){a.set("messages",b)}),this.get("socket").on("user:writing",this.onContactWriting.bind(this))},onContactWriting:function(a){var b=this;a.user&&a.user.id&&(Number(this.get("model.id"))!==a.user.id||this.get("isWriting")||(b.set("isWriting",!0),setTimeout(function(){b.set("isWriting",!1)},b.get("isContactWritingTime"))))},willDestroyElement:function(){this._super(),this.get("socket").removeListener("user:writing",this.onContactWriting.bind(this))},getMessagesWithUser:function(){var a=this;a.set("isLoading",!0);var b=a.get("model.id");return a.get("store").find("message",{uid:b,limit:this.get("limit"),skip:(this.get("page")-1)*this.get("limit")}).then(function(b){b&&b.meta&&a.set("count",b.meta.count),a.set("isLoading",!1),a.set("isStarted",!0)})},actions:{scrollAtTop:function(a,b){var c=this;this.get("messages.length")<this.get("count")&&(this.incrementProperty("page"),this.getMessagesWithUser().then(function(){Ember.run.scheduleOnce("afterRender",c,function(){a.scrollTop(a[0].scrollHeight-b)})}))},lockScroll:function(a){this.set("isScrolled",a)},focusToggle:function(a){this.set("hasFocus",a),a&&this.get("isVisible")&&(this.set("hasNews",!1),this.send("markAllAsRead"))},markAllAsRead:function(){var a=this.get("messages");a.forEach(function(a){a.get("read")||a.get("fromId.id")!==App.currentUser.id&&(a.set("read",!0),a.save())})},openList:function(){this.set("isVisible","show")}.observes("messages"),closeList:function(){this.set("model.isTalking",!1)},toggleList:function(){this.toggleProperty("isListOpen")},scrollToBottom:function(){var a=this;setTimeout(function(){var b=$("#"+a.get("boxId"));b&&b.scrollTop&&b.scrollTop(b.prop("scrollHeight"))},10)},sendMessage:function(){var a=this;if(this.get("messageNew")){var b=a.get("store").createRecord("message",{content:a.get("messageNew"),toId:a.get("model"),fromId:App.currentUser,createdAt:new Date,status:"sending"});a.set("messageNew",""),a.send("scrollToBottom"),b.save().then(function(){setTimeout(function(){b.set("status","salved")},3e3),b.set("status","send")},function(a){console.warn("err:",a)})}},emitIsWriting:function(){var a=this,b=a.get("model.id");a.get("iAmWritingTimeout")||(this.get("socket").post("/messenger/user/writing?access_token="+App.get("auth.authToken"),{toUserId:b},function(a,b){b.statusCode&&200!==b.statusCode&&Ember.Logger.error("Error on emitIsWriting",a)}),a.set("iAmWritingTimeout",setTimeout(function(){a.set("iAmWritingTimeout",!1)},a.get("isWritingTime"))))}}})}(),function(){"use strict";App.ContactController=Ember.ObjectController.extend({contactClass:function(){return this.get("model.messengerStatus")?"contact "+this.get("model.messengerStatus"):"contact offline"}.property("model.messengerStatus"),isOnline:function(){return"online"===this.get("model.messengerStatus")?!0:!1}.property("model.messengerStatus")})}(),function(){"use strict";App.ContactListController=Ember.ArrayController.extend({contacts:[],openContacts:[],publicMessages:[],isListOpen:!1,init:function(){this._super();var a=this;console.warn("we messenger innit"),a.get("WeMessengerEvents").on("weMessengerSendPublicMessage",function(b){console.warn("we messenger send public message",b);var c=a.get("store"),d=c.createRecord("messages",b);d.save().then(function(a){console.warn(a)},function(a){console.warn("error",a)})})},didInsertElement:function(){if(!this.get("store"))throw"WeMessengerComponent requires store for autocomplete feature. Inject as store=store"},actions:{openList:function(){this.set("isListOpen",!0)},closeList:function(){this.set("isListOpen",!1)},startTalk:function(a){console.warn("start talk",a),this.getMessages(a)}},getMessages:function(a,b){var c=this.get("store");c.find("messages",{uid:a}).then(function(a){b(null,a)},function(a){b(a,null)})}})}(),function(){"use strict";App.MessageController=Ember.ObjectController.extend({messageClass:function(){return"message "+this.get("status")}.property("status")})}(),function(){"use strict";App.MessagesController=Ember.ArrayController.extend({sortProperties:["createdAt"],sortAscending:!0})}(),function(){"use strict";Ember.Handlebars.helper("format-date",function(a){return moment(a).fromNow()})}(),function(){"use strict";String.prototype.removeSomeSpecialCharacters=function(){var a=this,b={a:/[\xE0-\xE6]/g,e:/[\xE8-\xEB]/g,i:/[\xEC-\xEF]/g,o:/[\xF2-\xF6]/g,u:/[\xF9-\xFC]/g,c:/\xE7/g,n:/\xF1/g};for(var c in b){var d=b[c];a=a.replace(d,c)}return a}}(),function(){"use strict";App.ApplicationAdapter=DS.RESTAdapter.extend({pathForType:function(a){var b=Ember.String.camelize(a);return Ember.String.singularize(b)}}),App.ApplicationSerializer=DS.RESTSerializer.extend({serializeIntoHash:function(a,b,c,d){Ember.merge(a,this.serialize(c,d))}})}(),function(){"use strict";App.Message=DS.Model.extend({fromId:DS.belongsTo("user",{async:!0}),toId:DS.belongsTo("user",{async:!0}),roomId:DS.belongsTo("room",{async:!0}),content:DS.attr("string"),status:DS.attr("string",{defaultValue:"salved"}),read:DS.attr("boolean",{defaultValue:!1}),contactId:function(){var a=App.get("currentUser.id");return a?this.get(this.get("toId")===a?"fromId":this.get("fromId")===a?"toId":"fromId"):null}.property("toId","fromId"),createdAt:DS.attr("date"),updatedAt:DS.attr("date")})}(),function(){"use strict";App.Room=DS.Model.extend({name:DS.attr("string"),description:DS.attr("string"),createdAt:DS.attr("date"),updatedAt:DS.attr("date")})}(),function(){"use strict";App.User=DS.Model.extend({idInProvider:DS.attr("string",{}),username:DS.attr("string",{}),biography:DS.attr("string",{}),gender:DS.attr("string",{}),email:DS.attr("string",{}),password:DS.attr("string",{}),displayName:DS.attr("string",{}),birthDate:DS.attr("date",{}),avatar:DS.attr("number",{}),active:DS.attr("boolean",{}),isAdmin:DS.attr("boolean",{}),isModerator:DS.attr("boolean",{}),language:DS.attr("string",{defaultValue:"pt-br"}),locationState:DS.attr("string",{}),city:DS.attr("string",{}),emailNotificationFrequency:DS.attr("string",{defaultValue:"instant"}),cpf:DS.attr("string"),fullName:DS.attr("string"),major:DS.attr("string"),grade:DS.attr("string"),fbprofile:DS.attr("string"),instprofile:DS.attr("string"),lkinprofile:DS.attr("string"),twitprofile:DS.attr("string"),youtbprofile:DS.attr("string"),otherprofile:DS.attr("string"),lattes:DS.attr("string"),showBday:DS.attr("boolean",{defaultValue:"true"}),showGenre:DS.attr("boolean",{defaultValue:"true"}),aboutMe:DS.attr("boolean"),createdAt:DS.attr("date"),updatedAt:DS.attr("date"),messengerStatus:DS.attr("string",{defaultValue:"offline"}),isTalking:DS.attr("string",{defaultValue:!1})})}(),function(){"use strict";App.BoxView=Ember.View.extend({tabindex:"0",attributeBindings:["tabindex"],didInsertElement:function(){var a=this;this.$("input").focus(),this.$(".contact-chat").on("focusin",$.proxy(this.focusIn,this)),this.$(".contact-chat").on("focusout",$.proxy(this.focusOut,this));var b=this.$(".messages");b.scroll(function(){return b[0].scrollHeight-b.scrollTop()===b.height()?a.get("controller").send("lockScroll",!1):(a.get("controller").send("lockScroll",!0),void(0===b.scrollTop()&&a.get("controller").send("scrollAtTop",b,b[0].scrollHeight)))})},willDestroyElement:function(){this.$(".contact-chat").off("focusin",$.proxy(this.focusIn,this)),this.$(".contact-chat").off("focusout",$.proxy(this.focusOut,this))},focusIn:function(){this.get("controller").send("focusToggle",!0)},focusOut:function(){this.get("controller").send("focusToggle",!1)}})}(),function(){"use strict";App.MessagesView=Ember.View.extend({classNames:["messages"],didInsertElement:function(){this.$().on("scroll",$.proxy(this.didScroll,this))},willDestroyElement:function(){this.$().off("scroll",$.proxy(this.didScroll,this))},didScroll:function(){this.$()[0].scrollHeight-this.$().scrollTop()===this.$().outerHeight()?this.get("controller").send("lockScroll",!1):this.get("controller").send("lockScroll",!0)}})}(),function(){"use strict";App.UserAvatarComponent=Ember.Component.extend({tagName:"img",width:"100%",attributeBindings:["src","width","data-lightbox","dataToggle:data-toggle","dataPlacement:data-placement","title"],webp:"auto",size:"medium",classNames:["thumbnail"],classNameBindings:["clickClass"],src:null,url:null,user:null,onClick:null,refreshImage:function(){var a=this.get("user.avatar.urls."+this.get("size"));a?this.set("src",a):this.set("src",this.get("defaultSrc"))}.observes("user.avatar.urls","user.avatar.id").on("init"),click:function(){this.get("onClick")&&this.sendAction("onClick",this.get("user"),this)}})}(),function(){"use strict";App.inject("component:we-messenger","store","store:main"),App.WeMessengerComponent=Ember.Component.extend({contacts:[],openContacts:[],isListOpen:!0,socket:null,reconnected:!1,resolvedContacts:function(){var a=this,b=this.get("srcCriteria");return Ember.isEmpty(b)?this.set("filteredContacts",this.get("contacts")):this.set("filteredContacts",this.get("contacts").filter(function(c){var d=a.removeSomeSpecialCharacters(c.get("displayName").toLowerCase()),e=a.removeSomeSpecialCharacters(b.toLowerCase()),f=-1!==d.indexOf(e);return f}))}.observes("srcCriteria","contacts.[]").on("init"),init:function(){this._super();var a=this;if(!this.get("socket")){if(!window.io||!window.io.socket)return console.error("Socket.io not found in App.WeMessengerComponent.init()");this.set("socket",window.io.socket)}this.set("contacts",this.get("store").filter("user",function(a){return"online"===a.get("messengerStatus")})),this.set("openContacts",this.get("store").filter("user",function(a){return a.get("isTalking")})),a.setMessengerEvents(),Ember.run.later(a,function(){a.send("startMessenger")},1500),a.get("WeMessengerEvents").on("we-messenger-contact-connected",function(b){var c=a.get("store").push("user",b);c.set("messengerStatus","online")}),a.get("WeMessengerEvents").on("we-messenger-contact-diconnected",function(b){var c=a.get("contacts").findBy("id",String(b.id));c.set("messengerStatus","offline")}),a.get("WeMessengerEvents").on("we-messenger-message-received",function(b){a.get("store").pushPayload("message",{message:b.message}),b.message.fromId.set("isTalking",!0)})},didInsertElement:function(){if(!this.get("store"))throw"WeMessengerComponent requires store for autocomplete feature. Inject as store=store"},willDestroyElement:function(){console.warn("TODO! willDestroyElement unsubscribe from events here",this)},actions:{openList:function(){this.set("isListOpen",!0)},closeList:function(){this.set("isListOpen",!1)},startTalk:function(a){a.set("isTalking",!0)},openPublicBox:function(){this.get("WeMessengerEvents").trigger("weMessengerOpenPublicBox")},startMessenger:function(){var a=this;this.get("socket").get("/messenger/start?access_token="+App.get("auth.authToken"),function(b){200!==b.status&&b.status?console.error(b):b.usersOnline&&a.get("store").pushMany("user",b.usersOnline)})}},getMessages:function(a,b){var c=this.get("store");c.find("messages",{uid:a}).then(function(a){b(null,a)},function(a){b(a,null)})},isOpenContactBox:function(a){for(var b=this.get("openContacts"),c=b.length,d=0;c>d;d++)if(b[d].id===a)return!0;return!1},getUserFromContacts:function(a){for(var b=this.get("contacts"),c=b.length,d=0;c>d;d++)if(b[d].id===a)return b[d];return!1},setMessengerEvents:function(){var a=this,b=this.get("socket");b.on("receive:message",function(b){return App.get("auth.isAuthenticated")?void(b.message&&a.get("WeMessengerEvents").trigger("we-messenger-message-received",b)):!1}),b.on("receive:public:message",function(b){return App.get("auth.isAuthenticated")?void(b.message&&b.message.fromId!==App.currentUser.id&&a.get("WeMessengerEvents").trigger("weMessengerPublicMessageReceived",b)):!1}),b.on("contact:connect",function(b){if(!App.get("auth.isAuthenticated"))return!1;var c=b.item;App.currentUser.id!==c.id&&(c.messages||(c.messages=[]),c.messengerBox||(c.messengerBox={}),a.get("WeMessengerEvents").trigger("we-messenger-contact-connected",c))}),b.on("contact:disconnect",function(b){return App.get("auth.isAuthenticated")?void(b.item&&b.item.id&&a.get("WeMessengerEvents").trigger("we-messenger-contact-diconnected",b.item)):!1}),b.on("reconnect",function(){a.set("reconnected",!0)}),b.on("connect",function(){a.get("reconnected")&&a.send("startMessenger")})}})}(),function(){"use strict";App.inject("component:we-messenger-public-box","store","store:main"),App.WeMessengerPublicBoxComponent=Ember.Component.extend({messages:null,messageNew:"",isListOpen:!0,isVisible:!1,isScrolled:!0,messageSize:10,messagesElementSelector:".messages",count:null,limit:15,page:1,init:function(){this._super();var a=this;this.getMessagesPublic(),a.get("WeMessengerEvents").on("weMessengerOpenPublicBox",function(){a.send("openList")}),a.get("WeMessengerEvents").on("weMessengerPublicMessageReceived",function(b){a.get("store").pushPayload("message",{message:b.message}),a.get("isScrolled")&&a.scrollToBottom()})},scrollToBottom:function(){var a=this.$(this.get("messagesElementSelector"));setTimeout(function(){a&&a.scrollTop(a.prop("scrollHeight"))},10)},actions:{scrollAtTop:function(a){var b=this;this.get("messages.length")<this.get("count")&&(this.incrementProperty("page"),this.getMessagesPublic().then(function(){Ember.run.scheduleOnce("afterRender",b,function(){var b=this.$(this.get("messagesElementSelector"));b.scrollTop(b[0].scrollHeight-a)})}))},openList:function(){this.set("messages",this.get("store").filter("message",function(a){return Ember.get(a,"toId.content")?!1:!0})),this.set("isVisible",!0),this.scrollToBottom()},closeList:function(){this.set("messages",null),this.set("isVisible",!1)},toggleList:function(){this.get("isListOpen")?this.set("isListOpen",!1):this.set("isListOpen",!0)},sendMessage:function(){var a=this;if(this.get("messageNew")){var b={};b.content=this.get("messageNew"),b.toId=null,b.status="sending",b.createdAt=new Date;var c=this.store.createRecord("message",b);c.set("fromId",App.currentUser),c.save().then(function(){a.set("messageNew",""),a.scrollToBottom()})}}},getMessagesPublic:function(){var a=this;return a.set("isLoading",!0),this.store.find("message",{limit:this.get("limit"),skip:(this.get("page")-1)*this.get("limit")}).then(function(b){b&&b.meta&&a.set("count",b.meta.count),a.set("isLoading",!1)})},didInsertElement:function(){var a=this,b=this.$(this.get("messagesElementSelector"));b.scroll(function(){return b[0].scrollHeight-b.scrollTop()===b.height()?a.set("isScrolled",!0):(a.set("isScrolled",!1),void(0===b.scrollTop()&&a.send("scrollAtTop",b[0].scrollHeight)))})}})}(),function(){App.Router.map(function(){})}(),function(){"use strict";App.register("we-messenger-events:main",Ember.Object.extend(Ember.Evented),{singleton:!0}),App.inject("controller","WeMessengerEvents","we-messenger-events:main"),App.inject("component","WeMessengerEvents","we-messenger-events:main")}();