Ember.TEMPLATES.application=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e,f,g,h="";return b.buffer.push("\n	"),e={store:a},f={store:"ID"},g={hash:{store:"store"},contexts:[],types:[],hashContexts:e,hashTypes:f,data:b},b.buffer.push(k((d=c["we-messenger"]||a["we-messenger"],d?d.call(a,g):j.call(a,"we-messenger",g)))),b.buffer.push("\n"),h}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var g,h,i,j=c.helperMissing,k=this.escapeExpression,l=this;h={},i={},g=c["if"].call(b,"isAuthenticated",{hash:{},inverse:l.noop,fn:l.program(1,f,e),contexts:[b],types:["ID"],hashContexts:i,hashTypes:h,data:e}),e.buffer.push(g||0===g?g:"")}),Ember.TEMPLATES.box=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e,f,g,h="";return b.buffer.push("\n          <span class=\"messenger-status\"><img width='17px' "),e={src:a},f={src:"ID"},g={hash:{src:"cdpOnline"},contexts:[],types:[],hashContexts:e,hashTypes:f,data:b},b.buffer.push(p((d=c["bind-attr"]||a["bind-attr"],d?d.call(a,g):o.call(a,"bind-attr",g)))),b.buffer.push("></span>\n        "),h}function g(a,b){var d,e,f,g,h="";return b.buffer.push("\n          <span class=\"messenger-status\"><img width='17px' "),e={src:a},f={src:"ID"},g={hash:{src:"cdpOffline"},contexts:[],types:[],hashContexts:e,hashTypes:f,data:b},b.buffer.push(p((d=c["bind-attr"]||a["bind-attr"],d?d.call(a,g):o.call(a,"bind-attr",g)))),b.buffer.push("></span>\n        "),h}function h(a,b){var d,e,f,g,h,k="";return b.buffer.push("\n        <div>\n          "),f={},g={},d=c["if"].call(a,"isLoading",{hash:{},inverse:q.noop,fn:q.program(6,i,b),contexts:[a],types:["ID"],hashContexts:g,hashTypes:f,data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push("\n\n          "),g={id:a},f={id:"ID"},h={hash:{id:"boxId"},contexts:[a,a],types:["STRING","ID"],hashContexts:g,hashTypes:f,data:b},b.buffer.push(p((d=c.render||a.render,d?d.call(a,"messages","messages",h):o.call(a,"render","messages","messages",h)))),b.buffer.push("\n\n          "),f={},g={},e=c["if"].call(a,"isWriting",{hash:{},inverse:q.noop,fn:q.program(8,j,b),contexts:[a],types:["ID"],hashContexts:g,hashTypes:f,data:b}),(e||0===e)&&b.buffer.push(e),b.buffer.push('\n          <div class="footer">\n            <form '),g={on:a},f={on:"STRING"},b.buffer.push(p(c.action.call(a,"sendMessage",{hash:{on:"submit"},contexts:[a],types:["STRING"],hashContexts:g,hashTypes:f,data:b}))),b.buffer.push(' method="post">\n              <div class="input-group">\n                '),g={name:a,value:a,type:a,placeholder:a,classNames:a},f={name:"STRING",value:"ID",type:"STRING",placeholder:"ID",classNames:"STRING"},h={hash:{name:"messageNew",value:"messageNew",type:"text",placeholder:"messagePlaceholder",classNames:"input-xs"},contexts:[],types:[],hashContexts:g,hashTypes:f,data:b},b.buffer.push(p((d=c.input||a.input,d?d.call(a,h):o.call(a,"input",h)))),b.buffer.push('\n                <span class="input-group-btn">\n                  <button  '),f={},g={},b.buffer.push(p(c.action.call(a,"sendMessage",{hash:{},contexts:[a],types:["STRING"],hashContexts:g,hashTypes:f,data:b}))),b.buffer.push(' class="btn btn-xs btn-primary" type="submit">Enviar</button>\n                </span>\n              </div>\n            </form>\n          </div>\n        </div>\n      '),k}function i(a,b){var d,e,f,g,h="";return b.buffer.push("\n            <span><img "),e={src:a},f={src:"ID"},g={hash:{src:"cdpLoading"},contexts:[],types:[],hashContexts:e,hashTypes:f,data:b},b.buffer.push(p((d=c["bind-attr"]||a["bind-attr"],d?d.call(a,g):o.call(a,"bind-attr",g)))),b.buffer.push("></span>\n          "),h}function j(a,b){var d,e,f,g,h="";return b.buffer.push('\n            <div class="contact is-writing">              \n              '),e={user:a},f={user:"ID"},g={hash:{user:""},contexts:[],types:[],hashContexts:e,hashTypes:f,data:b},b.buffer.push(p((d=c["user-avatar"]||a["user-avatar"],d?d.call(a,g):o.call(a,"user-avatar",g)))),b.buffer.push('\n              <span class="small is-writing-text">digitando...</span>\n            </div>\n          '),h}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var k,l,m,n="",o=c.helperMissing,p=this.escapeExpression,q=this;return e.buffer.push('<div class="messenger-column">\n  <div class="messenger-chat-area">\n    <div class="contact-chat" tabindex="0">\n      <div '),l={},m={},e.buffer.push(p(c.action.call(b,"toggleList",{hash:{},contexts:[b],types:["STRING"],hashContexts:m,hashTypes:l,data:e}))),e.buffer.push(' class="header">\n        '),l={},m={},k=c["if"].call(b,"isOnline",{hash:{},inverse:q.program(3,g,e),fn:q.program(1,f,e),contexts:[b],types:["ID"],hashContexts:m,hashTypes:l,data:e}),(k||0===k)&&e.buffer.push(k),e.buffer.push("\n        "),e.buffer.push('\n        <span class="contact-name">'),l={},m={},e.buffer.push(p(c._triageMustache.call(b,"displayName",{hash:{},contexts:[b],types:["ID"],hashContexts:m,hashTypes:l,data:e}))),e.buffer.push('</span>\n      </div>\n      <div class="actions">\n        <button '),l={},m={},e.buffer.push(p(c.action.call(b,"closeList",{hash:{},contexts:[b],types:["STRING"],hashContexts:m,hashTypes:l,data:e}))),e.buffer.push(' type="button" class="remove btn btn-danger btn-xs pull-right">\n          <span class="glyphicon glyphicon-remove"></span>\n        </button>\n      </div>\n\n      <div class="action-bar">\n\n      </div>\n\n      '),l={},m={},k=c["if"].call(b,"isListOpen",{hash:{},inverse:q.noop,fn:q.program(5,h,e),contexts:[b],types:["ID"],hashContexts:m,hashTypes:l,data:e}),(k||0===k)&&e.buffer.push(k),e.buffer.push("\n\n    </div>\n  </div>\n</div>"),n}),Ember.TEMPLATES["components/we-messenger-public-box"]=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e,f,g,h="";return b.buffer.push("\n        <span><img "),e={src:a},f={src:"ID"},g={hash:{src:"cdpLoading"},contexts:[],types:[],hashContexts:e,hashTypes:f,data:b},b.buffer.push(m((d=c["bind-attr"]||a["bind-attr"],d?d.call(a,g):l.call(a,"bind-attr",g)))),b.buffer.push("></span>\n      "),h}function g(a,b){var d,e,f,g,h="";return b.buffer.push("\n        "),e={controller:a},f={controller:"STRING"},g={hash:{controller:"Messages"},contexts:[a,a],types:["STRING","ID"],hashContexts:e,hashTypes:f,data:b},b.buffer.push(m((d=c.render||a.render,d?d.call(a,"messages-public-room","messages",g):l.call(a,"render","messages-public-room","messages",g)))),b.buffer.push('\n\n        <div class="footer">\n          <form '),e={on:a},f={on:"STRING"},b.buffer.push(m(c.action.call(a,"sendMessage",{hash:{on:"submit"},contexts:[a],types:["STRING"],hashContexts:e,hashTypes:f,data:b}))),b.buffer.push(' >\n            <div class="input-group">\n\n              '),e={name:a,value:a,type:a,placeholder:a,classNames:a},f={name:"STRING",value:"ID",type:"STRING",placeholder:"ID",classNames:"STRING"},g={hash:{name:"messageNew",value:"messageNew",type:"text",placeholder:"messagePlaceholder",classNames:"input-xs"},contexts:[],types:[],hashContexts:e,hashTypes:f,data:b},b.buffer.push(m((d=c.input||a.input,d?d.call(a,g):l.call(a,"input",g)))),b.buffer.push('\n\n              <span class="input-group-btn">\n                <button  '),f={},e={},b.buffer.push(m(c.action.call(a,"sendMessage",{hash:{},contexts:[a],types:["STRING"],hashContexts:e,hashTypes:f,data:b}))),b.buffer.push(' class="btn btn-xs btn-primary" type="submit">Enviar</button>\n              </span>\n            </div>\n          </form>\n        </div>\n\n      '),h}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var h,i,j,k="",l=c.helperMissing,m=this.escapeExpression,n=this;return e.buffer.push('<div class="public-room-container">\n<div class="messenger-column">\n  <div class="messenger-chat-area">\n    <div class="contact-chat">\n      <div '),i={},j={},e.buffer.push(m(c.action.call(b,"toggleList",{hash:{},contexts:[b],types:["STRING"],hashContexts:j,hashTypes:i,data:e}))),e.buffer.push(' class="header">\n        <span class="contact-name">Público</span>\n      </div>\n      <div class="actions">\n        <button '),i={},j={},e.buffer.push(m(c.action.call(b,"closeList",{hash:{},contexts:[b],types:["STRING"],hashContexts:j,hashTypes:i,data:e}))),e.buffer.push(' type="button" class="remove btn btn-danger btn-xs pull-right">\n          <span class="glyphicon glyphicon-remove"></span>\n        </button>\n      </div>\n\n      '),i={},j={},h=c["if"].call(b,"isLoading",{hash:{},inverse:n.noop,fn:n.program(1,f,e),contexts:[b],types:["ID"],hashContexts:j,hashTypes:i,data:e}),(h||0===h)&&e.buffer.push(h),e.buffer.push("\n\n      "),i={},j={},h=c["if"].call(b,"isListOpen",{hash:{},inverse:n.noop,fn:n.program(3,g,e),contexts:[b],types:["ID"],hashContexts:j,hashTypes:i,data:e}),(h||0===h)&&e.buffer.push(h),e.buffer.push("\n    </div>\n  </div>\n</div>\n</div>"),k}),Ember.TEMPLATES["components/we-messenger"]=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e,f,h,i="";return b.buffer.push('\n        <div class="messenger">\n          <div class="header" '),e={},f={},b.buffer.push(p(c.action.call(a,"closeList",{hash:{},contexts:[a],types:["STRING"],hashContexts:f,hashTypes:e,data:b}))),b.buffer.push('>\n            Messenger\n          <button type="button" class="remove btn btn-default btn-xs pull-right">\n            <span class="glyphicon glyphicon-wrench"></span>\n          </button>\n          </div>\n          <ul class="nav nav-list friendlist contact-list">\n            '),e={},f={},d=c.each.call(a,"filteredContacts",{hash:{},inverse:q.noop,fn:q.program(2,g,b),contexts:[a],types:["ID"],hashContexts:f,hashTypes:e,data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push('\n          </ul>\n          <ul class="nav nav-list rooms-list contact-list">\n            <li class="global-room">\n              <a '),e={},f={},b.buffer.push(p(c.action.call(a,"openPublicBox",{hash:{},contexts:[a],types:["STRING"],hashContexts:f,hashTypes:e,data:b}))),b.buffer.push(' >\n                Sala Pública\n              </a>\n            </li>\n          </ul>\n          <div class="search-area">\n            '),f={type:a,value:a,placeholder:a},e={type:"STRING",value:"ID",placeholder:"STRING"},h={hash:{type:"text",value:"srcCriteria",placeholder:"Procure ..."},contexts:[],types:[],hashContexts:f,hashTypes:e,data:b},b.buffer.push(p((d=c.input||a.input,d?d.call(a,h):o.call(a,"input",h)))),b.buffer.push("\n          </div>\n        </div>\n      "),i}function g(a,b){var d,e,f,g,h="";return b.buffer.push("\n              "),e={},f={},g={hash:{},contexts:[a,a],types:["STRING","ID"],hashContexts:f,hashTypes:e,data:b},b.buffer.push(p((d=c.render||a.render,d?d.call(a,"contact","",g):o.call(a,"render","contact","",g)))),b.buffer.push("\n            "),h}function h(a,b){var d,e,f="";return b.buffer.push('\n        <div class="messenger-off" '),d={},e={},b.buffer.push(p(c.action.call(a,"openList",{hash:{},contexts:[a],types:["STRING"],hashContexts:e,hashTypes:d,data:b}))),b.buffer.push('>\n          <span class="ui-icon ui-icon-person"></span>\n          <span class="text">Messenger</span>\n          <button type="button" class="remove btn btn-default btn-xs pull-right">\n            <span class="glyphicon glyphicon-wrench"></span>\n          </button>\n        </div>\n      '),f}function i(a,b){var d,e,f,g,h="";return b.buffer.push("\n    "),e={},f={},g={hash:{},contexts:[a,a],types:["STRING","ID"],hashContexts:f,hashTypes:e,data:b},b.buffer.push(p((d=c.render||a.render,d?d.call(a,"box","",g):o.call(a,"render","box","",g)))),b.buffer.push("\n  "),h}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var j,k,l,m,n="",o=c.helperMissing,p=this.escapeExpression,q=this;return e.buffer.push('<div class="messenger-area-wrapper">\n  <div class="messenger-column">\n    <div class="messenger-area">\n      '),k={},l={},j=c["if"].call(b,"isListOpen",{hash:{},inverse:q.program(4,h,e),fn:q.program(1,f,e),contexts:[b],types:["ID"],hashContexts:l,hashTypes:k,data:e}),(j||0===j)&&e.buffer.push(j),e.buffer.push("\n    </div>\n  </div>\n\n  "),k={},l={},j=c.each.call(b,"openContacts",{hash:{},inverse:q.noop,fn:q.program(6,i,e),contexts:[b],types:["ID"],hashContexts:l,hashTypes:k,data:e}),(j||0===j)&&e.buffer.push(j),e.buffer.push("\n\n  "),l={store:b},k={store:"ID"},m={hash:{store:"store"},contexts:[],types:[],hashContexts:l,hashTypes:k,data:e},e.buffer.push(p((j=c["we-messenger-public-box"]||b["we-messenger-public-box"],j?j.call(b,m):o.call(b,"we-messenger-public-box",m)))),e.buffer.push("\n\n</div>"),n}),Ember.TEMPLATES.contact=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e,f,g,h="";return b.buffer.push('\n      <span class="contact-status"><img '),e={src:a},f={src:"ID"},g={hash:{src:"cdpOnline"},contexts:[],types:[],hashContexts:e,hashTypes:f,data:b},b.buffer.push(n((d=c["bind-attr"]||a["bind-attr"],d?d.call(a,g):m.call(a,"bind-attr",g)))),b.buffer.push("></span>\n    "),h}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var g,h,i,j,k,l="",m=c.helperMissing,n=this.escapeExpression,o=this;return e.buffer.push("<li "),i={"class":b},j={"class":"ID"},k={hash:{"class":"contactClass"},contexts:[],types:[],hashContexts:i,hashTypes:j,data:e},e.buffer.push(n((g=c["bind-attr"]||b["bind-attr"],g?g.call(b,k):m.call(b,"bind-attr",k)))),e.buffer.push(">\n  <a "),j={},i={},e.buffer.push(n(c.action.call(b,"startTalk","",{hash:{},contexts:[b,b],types:["STRING","ID"],hashContexts:i,hashTypes:j,data:e}))),e.buffer.push(" >\n    "),e.buffer.push('\n    <span class="avatar-small">'),i={user:b},j={user:"ID"},k={hash:{user:""},contexts:[],types:[],hashContexts:i,hashTypes:j,data:e},e.buffer.push(n((g=c["user-avatar"]||b["user-avatar"],g?g.call(b,k):m.call(b,"user-avatar",k)))),e.buffer.push("</span>\n    "),j={},i={},h=c["if"].call(b,"isOnline",{hash:{},inverse:o.noop,fn:o.program(1,f,e),contexts:[b],types:["ID"],hashContexts:i,hashTypes:j,data:e}),(h||0===h)&&e.buffer.push(h),e.buffer.push("\n    "),j={},i={},e.buffer.push(n(c._triageMustache.call(b,"displayName",{hash:{},contexts:[b],types:["ID"],hashContexts:i,hashTypes:j,data:e}))),e.buffer.push("\n  </a>\n</li>"),l}),Ember.TEMPLATES["message-room"]=Ember.Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var f,g,h,i,j="",k=c.helperMissing,l=this.escapeExpression;return e.buffer.push("<div "),g={"class":b},h={"class":"ID"},i={hash:{"class":"messageClass"},contexts:[],types:[],hashContexts:g,hashTypes:h,data:e},e.buffer.push(l((f=c["bind-attr"]||b["bind-attr"],f?f.call(b,i):k.call(b,"bind-attr",i)))),e.buffer.push(" >\n  "),e.buffer.push('\n  <span class="avatar-small">'),g={user:b},h={user:"ID"},i={hash:{user:"fromId"},contexts:[],types:[],hashContexts:g,hashTypes:h,data:e},e.buffer.push(l((f=c["user-avatar"]||b["user-avatar"],f?f.call(b,i):k.call(b,"user-avatar",i)))),e.buffer.push("</span>\n  <small>"),h={},g={},e.buffer.push(l(c._triageMustache.call(b,"fromId.displayName",{hash:{},contexts:[b],types:["ID"],hashContexts:g,hashTypes:h,data:e}))),e.buffer.push('</small>\n  <span class="message">'),h={},g={},e.buffer.push(l(c._triageMustache.call(b,"content.content",{hash:{},contexts:[b],types:["ID"],hashContexts:g,hashTypes:h,data:e}))),e.buffer.push('</span>\n  <div class="message-footer">\n    <span class="createdAt">\n      '),h={},g={},i={hash:{},contexts:[b],types:["ID"],hashContexts:g,hashTypes:h,data:e},e.buffer.push(l((f=c["format-date"]||b["format-date"],f?f.call(b,"createdAt",i):k.call(b,"format-date","createdAt",i)))),e.buffer.push("\n    </span>\n  </div>\n</div>"),j}),Ember.TEMPLATES.message=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){b.buffer.push('\n        <i title="read" class="glyphicon glyphicon-ok-circle text-success"> </i>\n      ')}function g(a,b){b.buffer.push('\n        <i title="unread" class="glyphicon glyphicon-question-sign"> </i>\n      ')}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var h,i,j,k,l,m="",n=c.helperMissing,o=this.escapeExpression,p=this;return e.buffer.push("<div "),j={"class":b},k={"class":"ID"},l={hash:{"class":"messageClass"},contexts:[],types:[],hashContexts:j,hashTypes:k,data:e},e.buffer.push(o((h=c["bind-attr"]||b["bind-attr"],h?h.call(b,l):n.call(b,"bind-attr",l)))),e.buffer.push(" >\n  "),e.buffer.push('\n  <span class="avatar-small">'),j={user:b},k={user:"ID"},l={hash:{user:"fromId"},contexts:[],types:[],hashContexts:j,hashTypes:k,data:e},e.buffer.push(o((h=c["user-avatar"]||b["user-avatar"],h?h.call(b,l):n.call(b,"user-avatar",l)))),e.buffer.push('</span>\n  <span class="message">'),k={},j={},e.buffer.push(o(c._triageMustache.call(b,"content.content",{hash:{},contexts:[b],types:["ID"],hashContexts:j,hashTypes:k,data:e}))),e.buffer.push('</span>\n  <div class="message-footer">\n    <span class="createdAt">\n      '),k={},j={},l={hash:{},contexts:[b],types:["ID"],hashContexts:j,hashTypes:k,data:e},e.buffer.push(o((h=c["format-date"]||b["format-date"],h?h.call(b,"createdAt",l):n.call(b,"format-date","createdAt",l)))),e.buffer.push('\n    </span>\n    <span class="small read-status">\n      '),k={},j={},i=c["if"].call(b,"read",{hash:{},inverse:p.program(3,g,e),fn:p.program(1,f,e),contexts:[b],types:["ID"],hashContexts:j,hashTypes:k,data:e}),(i||0===i)&&e.buffer.push(i),e.buffer.push("\n    </span>\n  </div>\n</div>"),m}),Ember.TEMPLATES["messages-public-room"]=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e,f,g,h="";return b.buffer.push("\n    "),e={controller:a},f={controller:"STRING"},g={hash:{controller:"Message"},contexts:[a,a],types:["STRING","ID"],hashContexts:e,hashTypes:f,data:b},b.buffer.push(l((d=c.render||a.render,d?d.call(a,"message-room","",g):k.call(a,"render","message-room","",g)))),b.buffer.push("\n  "),h}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var g,h,i,j="",k=c.helperMissing,l=this.escapeExpression,m=this;return e.buffer.push('<div scrollto="bottom" id="messengerBox-public" class="messages">\n  '),h={},i={},g=c.each.call(b,{hash:{},inverse:m.noop,fn:m.program(1,f,e),contexts:[],types:[],hashContexts:i,hashTypes:h,data:e}),(g||0===g)&&e.buffer.push(g),e.buffer.push("\n</div>"),j}),Ember.TEMPLATES["messages-room"]=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e,f,g,h="";return b.buffer.push("\n  "),e={},f={},g={hash:{},contexts:[a,a],types:["STRING","ID"],hashContexts:f,hashTypes:e,data:b},b.buffer.push(k((d=c.render||a.render,d?d.call(a,"message-room","",g):j.call(a,"render","message-room","",g)))),b.buffer.push("\n"),h}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var g,h,i,j=c.helperMissing,k=this.escapeExpression,l=this;h={},i={},g=c.each.call(b,{hash:{},inverse:l.noop,fn:l.program(1,f,e),contexts:[],types:[],hashContexts:i,hashTypes:h,data:e}),e.buffer.push(g||0===g?g:"")}),Ember.TEMPLATES.messages=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e,f,g,h="";return b.buffer.push("\n  "),e={},f={},g={hash:{},contexts:[a,a],types:["STRING","ID"],hashContexts:f,hashTypes:e,data:b},b.buffer.push(k((d=c.render||a.render,d?d.call(a,"message","",g):j.call(a,"render","message","",g)))),b.buffer.push("\n"),h}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var g,h,i,j=c.helperMissing,k=this.escapeExpression,l=this;h={},i={},g=c.each.call(b,{hash:{},inverse:l.noop,fn:l.program(1,f,e),contexts:[],types:[],hashContexts:i,hashTypes:h,data:e}),e.buffer.push(g||0===g?g:"")});