Ember.TEMPLATES.application=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e,f,g,h="";return b.buffer.push("\n	"),e={store:a},f={store:"ID"},g={hash:{store:"store"},contexts:[],types:[],hashContexts:e,hashTypes:f,data:b},b.buffer.push(k((d=c["we-messenger"]||a["we-messenger"],d?d.call(a,g):j.call(a,"we-messenger",g)))),b.buffer.push("\n"),h}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var g,h,i,j=c.helperMissing,k=this.escapeExpression,l=this;h={},i={},g=c["if"].call(b,"isAuthenticated",{hash:{},inverse:l.noop,fn:l.program(1,f,e),contexts:[b],types:["ID"],hashContexts:i,hashTypes:h,data:e}),e.buffer.push(g||0===g?g:"")}),Ember.TEMPLATES.box=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){b.buffer.push('\n          <i class="IR sprt-chat"></i>\n        ')}function g(a,b){var c="";return b.buffer.push("\n          "),b.buffer.push("\n        "),c}function h(a,b){var d,e,f,g,h,l="";return b.buffer.push("\n        <div>\n          "),f={},g={},d=c["if"].call(a,"isLoading",{hash:{},inverse:t.noop,fn:t.program(6,i,b),contexts:[a],types:["ID"],hashContexts:g,hashTypes:f,data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push("\n\n          "),g={id:a},f={id:"ID"},h={hash:{id:"boxId"},contexts:[a,a],types:["STRING","ID"],hashContexts:g,hashTypes:f,data:b},b.buffer.push(s((d=c.render||a.render,d?d.call(a,"messages","messages",h):r.call(a,"render","messages","messages",h)))),b.buffer.push("\n\n"),b.buffer.push('\n\n          <div class="footer">\n            <form '),g={on:a},f={on:"STRING"},b.buffer.push(s(c.action.call(a,"sendMessage",{hash:{on:"submit"},contexts:[a],types:["STRING"],hashContexts:g,hashTypes:f,data:b}))),b.buffer.push(' method="post">\n              <div class="input-group">\n                <span class="input-group-btn">\n                '),f={},g={},e=c["if"].call(a,"isWriting",{hash:{},inverse:t.program(10,k,b),fn:t.program(8,j,b),contexts:[a],types:["ID"],hashContexts:g,hashTypes:f,data:b}),(e||0===e)&&b.buffer.push(e),b.buffer.push("\n                </span>\n                "),g={name:a,value:a,placeholder:a,submit:a,rows:a},f={name:"STRING",value:"ID",placeholder:"ID",submit:"STRING",rows:"STRING"},h={hash:{name:"messageNew",value:"messageNew",placeholder:"messagePlaceholder",submit:"sendMessage",rows:"1"},contexts:[],types:[],hashContexts:g,hashTypes:f,data:b},b.buffer.push(s((d=c["auto-expanding-text-area"]||a["auto-expanding-text-area"],d?d.call(a,h):r.call(a,"auto-expanding-text-area",h)))),b.buffer.push('\n                <span class="input-group-btn">\n                  <button  '),f={},g={},b.buffer.push(s(c.action.call(a,"sendMessage",{hash:{},contexts:[a],types:["STRING"],hashContexts:g,hashTypes:f,data:b}))),b.buffer.push(' class="btn btn-xs btn-send" type="submit"><i class="IR sprt-chat-send"></i></button>\n                </span>\n              </div>\n            </form>\n          </div>\n        </div>\n      '),l}function i(a,b){var d,e,f,g,h="";return b.buffer.push('\n            <div class="messenger-loading"><img '),e={src:a},f={src:"ID"},g={hash:{src:"cdpLoading"},contexts:[],types:[],hashContexts:e,hashTypes:f,data:b},b.buffer.push(s((d=c["bind-attr"]||a["bind-attr"],d?d.call(a,g):r.call(a,"bind-attr",g)))),b.buffer.push("> Carregando ... </div>\n          "),h}function j(a,b){b.buffer.push('\n                  <i class="IR sprt-chat-typing"></i>\n                ')}function k(a,b){b.buffer.push('\n                  <i class="IR sprt-chat-lines"></i>\n                ')}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var l,m,n,o,p,q="",r=c.helperMissing,s=this.escapeExpression,t=this;return e.buffer.push('<div class="messenger-column">\n  <div class="messenger-chat-area">\n    <div class="contact-chat" tabindex="0">\n      <div '),n={"class":b},o={"class":"STRING"},p={hash:{"class":"isOnline:header-online:header-offline :header"},contexts:[],types:[],hashContexts:n,hashTypes:o,data:e},e.buffer.push(s((l=c["bind-attr"]||b["bind-attr"],l?l.call(b,p):r.call(b,"bind-attr",p)))),e.buffer.push(">\n        "),o={},n={},m=c["if"].call(b,"isOnline",{hash:{},inverse:t.program(3,g,e),fn:t.program(1,f,e),contexts:[b],types:["ID"],hashContexts:n,hashTypes:o,data:e}),(m||0===m)&&e.buffer.push(m),e.buffer.push("\n        "),e.buffer.push('\n        <span class="contact-name cursor-pointer" '),o={},n={},e.buffer.push(s(c.action.call(b,"openProfile","",{hash:{},contexts:[b,b],types:["STRING","ID"],hashContexts:n,hashTypes:o,data:e}))),e.buffer.push("> "),o={},n={},e.buffer.push(s(c._triageMustache.call(b,"displayName",{hash:{},contexts:[b],types:["ID"],hashContexts:n,hashTypes:o,data:e}))),e.buffer.push('</span>\n      </div>\n      <div class="actions">\n        <button '),o={},n={},e.buffer.push(s(c.action.call(b,"toggleList",{hash:{},contexts:[b],types:["STRING"],hashContexts:n,hashTypes:o,data:e}))),e.buffer.push(' type="button" class="remove btn btn-xs">\n          <i class="IR sprt-chat-minimize"></i>\n        </button>\n        <button '),o={},n={},e.buffer.push(s(c.action.call(b,"closeList",{hash:{},contexts:[b],types:["STRING"],hashContexts:n,hashTypes:o,data:e}))),e.buffer.push(' type="button" class="remove btn btn-xs">\n          <i class="IR sprt-chat-close"></i>\n        </button>\n      </div>\n\n      <div class="action-bar">\n\n      </div>\n\n      '),o={},n={},m=c["if"].call(b,"isListOpen",{hash:{},inverse:t.noop,fn:t.program(5,h,e),contexts:[b],types:["ID"],hashContexts:n,hashTypes:o,data:e}),(m||0===m)&&e.buffer.push(m),e.buffer.push("\n\n    </div>\n  </div>\n</div>"),q}),Ember.TEMPLATES["components/we-messenger-public-box"]=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e,f,g,h="";return b.buffer.push('\n          <div class="messenger-loading"><img '),e={src:a},f={src:"ID"},g={hash:{src:"cdpLoading"},contexts:[],types:[],hashContexts:e,hashTypes:f,data:b},b.buffer.push(m((d=c["bind-attr"]||a["bind-attr"],d?d.call(a,g):l.call(a,"bind-attr",g)))),b.buffer.push("> Carregando ... </div>\n        "),h}function g(a,b){var d,e,f,g,h="";return b.buffer.push("\n          "),e={controller:a},f={controller:"STRING"},g={hash:{controller:"Messages"},contexts:[a,a],types:["STRING","ID"],hashContexts:e,hashTypes:f,data:b},b.buffer.push(m((d=c.render||a.render,d?d.call(a,"messages-public-room","messages",g):l.call(a,"render","messages-public-room","messages",g)))),b.buffer.push('\n\n          <div class="footer">\n            <form '),e={on:a},f={on:"STRING"},b.buffer.push(m(c.action.call(a,"sendMessage",{hash:{on:"submit"},contexts:[a],types:["STRING"],hashContexts:e,hashTypes:f,data:b}))),b.buffer.push(' >\n              <div class="input-group">\n                <span class="input-group-btn">\n                  <i class="IR sprt-chat-lines"></i>\n                </span>\n                '),e={name:a,value:a,placeholder:a,submit:a,rows:a},f={name:"STRING",value:"ID",placeholder:"ID",submit:"STRING",rows:"STRING"},g={hash:{name:"messageNew",value:"messageNew",placeholder:"messagePlaceholder",submit:"sendMessage",rows:"1"},contexts:[],types:[],hashContexts:e,hashTypes:f,data:b},b.buffer.push(m((d=c["auto-expanding-text-area"]||a["auto-expanding-text-area"],d?d.call(a,g):l.call(a,"auto-expanding-text-area",g)))),b.buffer.push('\n\n                <span class="input-group-btn">\n                  <button  '),f={},e={},b.buffer.push(m(c.action.call(a,"sendMessage",{hash:{},contexts:[a],types:["STRING"],hashContexts:e,hashTypes:f,data:b}))),b.buffer.push(' class="btn btn-xs btn-send" type="submit"><i class="IR sprt-chat-send"></i></button>\n                </span>\n              </div>\n            </form>\n          </div>\n\n        '),h}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var h,i,j,k="",l=c.helperMissing,m=this.escapeExpression,n=this;return e.buffer.push('<div class="public-room-container">\n  <div class="messenger-column">\n    <div class="messenger-chat-area">\n      <div class="contact-chat">\n        <div class="header">\n          <i class="IR sprt-chat"></i> <span class="contact-name">Público</span>\n        </div>\n        <div class="actions">\n          <button '),i={},j={},e.buffer.push(m(c.action.call(b,"toggleList",{hash:{},contexts:[b],types:["STRING"],hashContexts:j,hashTypes:i,data:e}))),e.buffer.push(' type="button" class="remove btn btn-xs">\n            <i class="IR sprt-chat-minimize"></i>\n          </button>\n          <button '),i={},j={},e.buffer.push(m(c.action.call(b,"closeList",{hash:{},contexts:[b],types:["STRING"],hashContexts:j,hashTypes:i,data:e}))),e.buffer.push(' type="button" class="remove btn btn-xs">\n            <i class="IR sprt-chat-close"></i>\n          </button>\n        </div>\n\n        '),i={},j={},h=c["if"].call(b,"isLoading",{hash:{},inverse:n.noop,fn:n.program(1,f,e),contexts:[b],types:["ID"],hashContexts:j,hashTypes:i,data:e}),(h||0===h)&&e.buffer.push(h),e.buffer.push("\n\n        "),i={},j={},h=c["if"].call(b,"isListOpen",{hash:{},inverse:n.noop,fn:n.program(3,g,e),contexts:[b],types:["ID"],hashContexts:j,hashTypes:i,data:e}),(h||0===h)&&e.buffer.push(h),e.buffer.push("\n      </div>\n    </div>\n  </div>\n</div>"),k}),Ember.TEMPLATES["components/we-messenger"]=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e,f,h,k="";return b.buffer.push('\n\n<div class="messenger-area-wrapper">\n  <div class="messenger-column contacts">\n    <div class="messenger-area">\n      '),e={},f={},d=c["if"].call(a,"isListOpen",{hash:{},inverse:q.program(5,i,b),fn:q.program(2,g,b),contexts:[a],types:["ID"],hashContexts:f,hashTypes:e,data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push("\n    </div>\n  </div>\n\n  "),e={},f={},d=c.each.call(a,"openContacts",{hash:{},inverse:q.noop,fn:q.program(7,j,b),contexts:[a],types:["ID"],hashContexts:f,hashTypes:e,data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push("\n\n  "),f={store:a},e={store:"ID"},h={hash:{store:"store"},contexts:[],types:[],hashContexts:f,hashTypes:e,data:b},b.buffer.push(p((d=c["we-messenger-public-box"]||a["we-messenger-public-box"],d?d.call(a,h):o.call(a,"we-messenger-public-box",h)))),b.buffer.push("\n\n</div>\n\n"),k}function g(a,b){var d,e,f,g="";return b.buffer.push('\n        <div class="messenger">\n          <div class="header">\n            Bate-papo\n            <div class="actions">\n              <button '),e={},f={},b.buffer.push(p(c.action.call(a,"closeList",{hash:{},contexts:[a],types:["STRING"],hashContexts:f,hashTypes:e,data:b}))),b.buffer.push(' type="button" class="remove btn btn-xs">\n                <i class="IR sprt-chat-minimize"></i>\n              </button>\n              <button '),e={},f={},b.buffer.push(p(c.action.call(a,"turnOff",{hash:{},contexts:[a],types:["STRING"],hashContexts:f,hashTypes:e,data:b}))),b.buffer.push(' type="button" class="remove btn btn-xs">\n                <i class="IR sprt-chat-close"></i>\n              </button>\n            </div>\n          </div>\n          <ul class="nav nav-list friendlist contact-list">\n            '),e={},f={},d=c.each.call(a,"filteredContacts",{hash:{},inverse:q.noop,fn:q.program(3,h,b),contexts:[a],types:["ID"],hashContexts:f,hashTypes:e,data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push('\n          </ul>\n          <ul class="nav nav-list rooms-list contact-list">\n            <li class="global-room messenger-room">\n              <a '),e={},f={},b.buffer.push(p(c.action.call(a,"openPublicBox",{hash:{},contexts:[a],types:["STRING"],hashContexts:f,hashTypes:e,data:b}))),b.buffer.push(">\n                Sala Pública\n              </a>\n            </li>\n          </ul>\n"),b.buffer.push("\n        </div>\n      "),g}function h(a,b){var d,e,f,g,h="";return b.buffer.push("\n              "),e={},f={},g={hash:{},contexts:[a,a],types:["STRING","ID"],hashContexts:f,hashTypes:e,data:b},b.buffer.push(p((d=c.render||a.render,d?d.call(a,"contact","",g):o.call(a,"render","contact","",g)))),b.buffer.push("\n            "),h}function i(a,b){var d,e,f="";return b.buffer.push('\n        <div class="messenger-off">\n          <span class="ui-icon ui-icon-person"></span>\n          <span class="text">Bate-Papo</span>\n          <div class="actions">\n              <button '),d={},e={},b.buffer.push(p(c.action.call(a,"openList",{hash:{},contexts:[a],types:["STRING"],hashContexts:e,hashTypes:d,data:b}))),b.buffer.push(' type="button" class="remove btn btn-xs">\n                <i class="IR sprt-chat-minimize"></i>\n              </button>\n            </div>\n        </div>\n      '),f}function j(a,b){var d,e,f,g,h="";return b.buffer.push("\n    "),e={},f={},g={hash:{},contexts:[a,a],types:["STRING","ID"],hashContexts:f,hashTypes:e,data:b},b.buffer.push(p((d=c.render||a.render,d?d.call(a,"box","",g):o.call(a,"render","box","",g)))),b.buffer.push("\n  "),h}function k(a,b){var d,e,f="";return b.buffer.push('\n\n<div class="messenger-area-wrapper">\n  <div class="messenger-column contacts">\n    <div class="messenger-area">\n      <div class="messenger-off">\n        <div class="text-center">\n          <button '),d={},e={},b.buffer.push(p(c.action.call(a,"turnOn",{hash:{},contexts:[a],types:["STRING"],hashContexts:e,hashTypes:d,data:b}))),b.buffer.push(' type="button" class="btn btn-default btn-xs">\n            Ligar o messenger\n          </button>\n        </div>\n\n      </div>\n    </div>\n  </div>\n</div>\n\n'),f}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var l,m,n,o=c.helperMissing,p=this.escapeExpression,q=this;m={},n={},l=c["if"].call(b,"isActive",{hash:{},inverse:q.program(9,k,e),fn:q.program(1,f,e),contexts:[b],types:["ID"],hashContexts:n,hashTypes:m,data:e}),e.buffer.push(l||0===l?l:"")}),Ember.TEMPLATES.contact=Ember.Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var f,g,h,i,j="",k=c.helperMissing,l=this.escapeExpression;return e.buffer.push("<li "),g={"class":b},h={"class":"ID"},i={hash:{"class":"contactClass"},contexts:[],types:[],hashContexts:g,hashTypes:h,data:e},e.buffer.push(l((f=c["bind-attr"]||b["bind-attr"],f?f.call(b,i):k.call(b,"bind-attr",i)))),e.buffer.push(">\n  <a "),h={},g={},e.buffer.push(l(c.action.call(b,"startTalk","",{hash:{},contexts:[b,b],types:["STRING","ID"],hashContexts:g,hashTypes:h,data:e}))),e.buffer.push(" >\n    "),e.buffer.push('\n    <span class="avatar-small">'),g={user:b},h={user:"ID"},i={hash:{user:""},contexts:[],types:[],hashContexts:g,hashTypes:h,data:e},e.buffer.push(l((f=c["user-avatar"]||b["user-avatar"],f?f.call(b,i):k.call(b,"user-avatar",i)))),e.buffer.push("</span>\n    "),h={},g={},i={hash:{},contexts:[b],types:["ID"],hashContexts:g,hashTypes:h,data:e},e.buffer.push(l((f=c["unread-messages"]||b["unread-messages"],f?f.call(b,"unreadMessages",i):k.call(b,"unread-messages","unreadMessages",i)))),e.buffer.push("\n    "),h={},g={},e.buffer.push(l(c._triageMustache.call(b,"displayName",{hash:{},contexts:[b],types:["ID"],hashContexts:g,hashTypes:h,data:e}))),e.buffer.push("\n  </a>\n</li>"),j}),Ember.TEMPLATES["message-room"]=Ember.Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var f,g,h,i,j,k="",l=c.helperMissing,m=this.escapeExpression;return e.buffer.push("<div "),h={"class":b},i={"class":"ID"},j={hash:{"class":"messageClass"},contexts:[],types:[],hashContexts:h,hashTypes:i,data:e},e.buffer.push(m((f=c["bind-attr"]||b["bind-attr"],f?f.call(b,j):l.call(b,"bind-attr",j)))),e.buffer.push(' >\n  <span class="avatar-small cursor-pointer" '),i={},h={},e.buffer.push(m(c.action.call(b,"talkToUser","fromId",{hash:{},contexts:[b,b],types:["STRING","ID"],hashContexts:h,hashTypes:i,data:e}))),e.buffer.push(">"),h={user:b},i={user:"ID"},j={hash:{user:"fromId"},contexts:[],types:[],hashContexts:h,hashTypes:i,data:e},e.buffer.push(m((f=c["user-avatar"]||b["user-avatar"],f?f.call(b,j):l.call(b,"user-avatar",j)))),e.buffer.push("</span>\n  <small "),i={},h={},e.buffer.push(m(c.action.call(b,"talkToUser","fromId",{hash:{},contexts:[b,b],types:["STRING","ID"],hashContexts:h,hashTypes:i,data:e}))),e.buffer.push(">"),i={},h={},e.buffer.push(m(c._triageMustache.call(b,"fromId.displayName",{hash:{},contexts:[b],types:["ID"],hashContexts:h,hashTypes:i,data:e}))),e.buffer.push('</small>\n  <br>\n  <span class="message">'),i={},h={},j={hash:{},contexts:[b],types:["ID"],hashContexts:h,hashTypes:i,data:e},e.buffer.push(m((f=c.html||b.html,f?f.call(b,"content.content",j):l.call(b,"html","content.content",j)))),e.buffer.push('</span>\n  <div class="message-footer">\n    <span class="createdAt">'),i={},h={},j={hash:{},contexts:[b],types:["ID"],hashContexts:h,hashTypes:i,data:e},f=c["format-date"]||b["format-date"],g=f?f.call(b,"createdAt",j):l.call(b,"format-date","createdAt",j),(g||0===g)&&e.buffer.push(g),e.buffer.push("</span>\n  </div>\n</div>"),k}),Ember.TEMPLATES.message=Ember.Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var f,g,h,i,j,k="",l=c.helperMissing,m=this.escapeExpression;return e.buffer.push("<div "),h={"class":b},i={"class":"ID"},j={hash:{"class":"messageClass"},contexts:[],types:[],hashContexts:h,hashTypes:i,data:e},e.buffer.push(m((f=c["bind-attr"]||b["bind-attr"],f?f.call(b,j):l.call(b,"bind-attr",j)))),e.buffer.push(" >\n  "),e.buffer.push('\n  <span class="avatar-small cursor-pointer" '),i={},h={},e.buffer.push(m(c.action.call(b,"openProfile","fromId",{hash:{},contexts:[b,b],types:["STRING","ID"],hashContexts:h,hashTypes:i,data:e}))),e.buffer.push(">"),h={user:b},i={user:"ID"},j={hash:{user:"fromId"},contexts:[],types:[],hashContexts:h,hashTypes:i,data:e},e.buffer.push(m((f=c["user-avatar"]||b["user-avatar"],f?f.call(b,j):l.call(b,"user-avatar",j)))),e.buffer.push('</span>\n  <span class="message">'),i={},h={},j={hash:{},contexts:[b],types:["ID"],hashContexts:h,hashTypes:i,data:e},e.buffer.push(m((f=c.html||b.html,f?f.call(b,"content.content",j):l.call(b,"html","content.content",j)))),e.buffer.push('</span>\n  <div class="message-footer">\n    <span class="createdAt">\n      '),i={},h={},j={hash:{},contexts:[b],types:["ID"],hashContexts:h,hashTypes:i,data:e},f=c["format-date"]||b["format-date"],g=f?f.call(b,"createdAt",j):l.call(b,"format-date","createdAt",j),(g||0===g)&&e.buffer.push(g),e.buffer.push("\n    </span>\n  </div>\n</div>"),k}),Ember.TEMPLATES["messages-public-room"]=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e,f,g,h="";return b.buffer.push("\n    "),e={controller:a},f={controller:"STRING"},g={hash:{controller:"Message"},contexts:[a,a],types:["STRING","ID"],hashContexts:e,hashTypes:f,data:b},b.buffer.push(l((d=c.render||a.render,d?d.call(a,"message-room","",g):k.call(a,"render","message-room","",g)))),b.buffer.push("\n  "),h}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var g,h,i,j="",k=c.helperMissing,l=this.escapeExpression,m=this;return e.buffer.push('<div scrollto="bottom" id="messengerBox-public" class="messages">\n  '),h={},i={},g=c.each.call(b,{hash:{},inverse:m.noop,fn:m.program(1,f,e),contexts:[],types:[],hashContexts:i,hashTypes:h,data:e}),(g||0===g)&&e.buffer.push(g),e.buffer.push("\n</div>"),j}),Ember.TEMPLATES["messages-room"]=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e,f,g,h="";return b.buffer.push("\n  "),e={},f={},g={hash:{},contexts:[a,a],types:["STRING","ID"],hashContexts:f,hashTypes:e,data:b},b.buffer.push(k((d=c.render||a.render,d?d.call(a,"message-room","",g):j.call(a,"render","message-room","",g)))),b.buffer.push("\n"),h}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var g,h,i,j=c.helperMissing,k=this.escapeExpression,l=this;h={},i={},g=c.each.call(b,{hash:{},inverse:l.noop,fn:l.program(1,f,e),contexts:[],types:[],hashContexts:i,hashTypes:h,data:e}),e.buffer.push(g||0===g?g:"")}),Ember.TEMPLATES.messages=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e,f,g,h="";return b.buffer.push("\n  "),e={},f={},g={hash:{},contexts:[a,a],types:["STRING","ID"],hashContexts:f,hashTypes:e,data:b},b.buffer.push(k((d=c.render||a.render,d?d.call(a,"message","",g):j.call(a,"render","message","",g)))),b.buffer.push("\n"),h}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var g,h,i,j=c.helperMissing,k=this.escapeExpression,l=this;h={},i={},g=c.each.call(b,{hash:{},inverse:l.noop,fn:l.program(1,f,e),contexts:[],types:[],hashContexts:i,hashTypes:h,data:e}),e.buffer.push(g||0===g?g:"")});