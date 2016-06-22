"use strict";define("ember-gym/app",["exports","ember","ember-gym/resolver","ember-load-initializers","ember-gym/config/environment"],function(e,t,a,n,r){var l=void 0;t["default"].MODEL_FACTORY_INJECTIONS=!0,l=t["default"].Application.extend({modulePrefix:r["default"].modulePrefix,podModulePrefix:r["default"].podModulePrefix,Resolver:a["default"]}),(0,n["default"])(l,r["default"].modulePrefix),e["default"]=l}),define("ember-gym/components/app-version",["exports","ember-cli-app-version/components/app-version","ember-gym/config/environment"],function(e,t,a){var n=a["default"].APP.name,r=a["default"].APP.version;e["default"]=t["default"].extend({version:r,name:n})}),define("ember-gym/components/radio-button",["exports","ember-radio-buttons/components/radio-button"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t["default"]}})}),define("ember-gym/controllers/index",["exports","ember"],function(e,t){var a=[51,193,255],n=[15,8,130],r=[52,255,40],l=[13,109,7],i=[250,71,71],d=[255,255,255];e["default"]=t["default"].Controller.extend({ajax:t["default"].inject.service(),actions:{sendRequest:function(){var e=parseInt(this.get("age")),t=parseInt(this.get("weight")),a=parseInt(this.get("height")),n=parseInt(this.get("benchMax")),r=parseInt(this.get("squatMax")),l=parseInt(this.get("deadMax")),i=n+r+l,d=this.get("sex");return d=d===!0?"Male":"Female",this.get("ajax").request("/lifts",{method:"POST",data:{age:e,weight:t,height:a,sex:d,bench:n,squat:r,deadlift:l,total:i}})},calculateLifts:function(){function e(){N.drawImage(T,0,0),console.log("image drawn");for(var e=N.getImageData(0,0,g.width,g.height),t=e.data,a=void 0,n=void 0,r=void 0,l=void 0,i=0;i<t.length;i+=4)a=t[i+0],n=t[i+1],r=t[i+2],l=t[i+3],a>200&&100>n&&100>r?(t[i]=f[0],t[i+1]=f[1],t[i+2]=f[2]):100>a&&50>n&&r>200?(t[i]=C[0],t[i+1]=C[1],t[i+2]=C[2]):100>a&&n>200&&100>r&&(t[i]=v[0],t[i+1]=v[1],t[i+2]=v[2]);N.putImageData(e,0,0)}this.set("isCalculated",!0);var t=parseInt(this.get("benchMax")),o=parseInt(this.get("squatMax")),p=parseInt(this.get("deadMax"));this.set("liftTotal",t+o+p);var c=this.get("sex");c=c===!0?"Male":"Female",this.set("sexResult",c);var m=parseInt(this.get("weight")),u=void 0,s=void 0,h=void 0,f=void 0,v=void 0,C=void 0;.75*m>t?(u="Untrained",f=a):t>=.75*m&&m>t?(u="Novice",f=n):t>=m&&1.25*m>t?(u="Intermediate",f=r):t>=1.25*m&&2*m>t?(u="Advanced",f=l):t>=2*m?(u="Elite",f=i):(u="Unknown",f=d),this.set("benchClass",u),m>o?(s="Untrained",v=a):o>=m&&1.5*m>o?(s="Novice",v=n):o>=1.5*m&&2*m>o?(s="Intermediate",v=r):o>=2*m&&2.5*m>o?(s="Advanced",v=l):o>=2.5*m?(s="Elite",v=i):(s="Unknown",v=d),this.set("squatClass",s),m>p?(h="Untrained",C=a):p>=m&&1.5*m>p?(h="Novice",C=n):p>=1.5*m&&2*m>p?(h="Intermediate",C=r):p>=2*m&&2.5*m>p?(h="Advanced",C=l):p>=2.5*m?(h="Elite",C=i):(h="Unknown",C=d),this.set("deadClass",h);var b=m/2.2,x=(t+o+p)/(-216.0475144+16.2606339*b+b*b*-.002388645+b*b*b*-.00113732+b*b*b*b*701863e-11+b*b*b*b*b*-1.291e-8);this.set("wilks",x);var g=document.getElementById("canvas"),N=g.getContext("2d"),T=new Image;T.crossOrigin="anonymous",T.onload=e,T.src="muscleMale-bbbe9a07da70629260268b60320b3bef.png",this.send("sendRequest")}}})}),define("ember-gym/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){e["default"]=t["default"]}),define("ember-gym/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){e["default"]=t["default"]}),define("ember-gym/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","ember-gym/config/environment"],function(e,t,a){e["default"]={name:"App Version",initialize:(0,t["default"])(a["default"].APP.name,a["default"].APP.version)}}),define("ember-gym/initializers/container-debug-adapter",["exports","ember-resolver/container-debug-adapter"],function(e,t){e["default"]={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0];e.register("container-debug-adapter:main",t["default"]),e.inject("container-debug-adapter:main","namespace","application:main")}}}),define("ember-gym/initializers/data-adapter",["exports","ember"],function(e,t){e["default"]={name:"data-adapter",before:"store",initialize:t["default"].K}}),define("ember-gym/initializers/ember-data",["exports","ember-data/setup-container","ember-data/-private/core"],function(e,t,a){e["default"]={name:"ember-data",initialize:t["default"]}}),define("ember-gym/initializers/export-application-global",["exports","ember","ember-gym/config/environment"],function(e,t,a){function n(){var e=arguments[1]||arguments[0];if(a["default"].exportApplicationGlobal!==!1){var n,r=a["default"].exportApplicationGlobal;n="string"==typeof r?r:t["default"].String.classify(a["default"].modulePrefix),window[n]||(window[n]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete window[n]}}))}}e.initialize=n,e["default"]={name:"export-application-global",initialize:n}}),define("ember-gym/initializers/injectStore",["exports","ember"],function(e,t){e["default"]={name:"injectStore",before:"store",initialize:t["default"].K}}),define("ember-gym/initializers/store",["exports","ember"],function(e,t){e["default"]={name:"store",after:"ember-data",initialize:t["default"].K}}),define("ember-gym/initializers/transforms",["exports","ember"],function(e,t){e["default"]={name:"transforms",before:"store",initialize:t["default"].K}}),define("ember-gym/instance-initializers/ember-data",["exports","ember-data/-private/instance-initializers/initialize-store-service"],function(e,t){e["default"]={name:"ember-data",initialize:t["default"]}}),define("ember-gym/models/lift",["exports","ember-data/model","ember-data/attr"],function(e,t,a){e["default"]=t["default"].extend({age:(0,a["default"])("number"),weight:(0,a["default"])("number"),height:(0,a["default"])("number"),sex:(0,a["default"])("string"),bench:(0,a["default"])("number"),squat:(0,a["default"])("number"),deadlift:(0,a["default"])("number"),total:(0,a["default"])("number")})}),define("ember-gym/resolver",["exports","ember-resolver"],function(e,t){e["default"]=t["default"]}),define("ember-gym/router",["exports","ember","ember-gym/config/environment"],function(e,t,a){var n=t["default"].Router.extend({location:a["default"].locationType});n.map(function(){this.route("lift")}),e["default"]=n}),define("ember-gym/routes/lift",["exports","ember"],function(e,t){e["default"]=t["default"].Route.extend({model:function(){return this.store.findAll("lift")}})}),define("ember-gym/serializers/application",["exports","ember-data"],function(e,t){e["default"]=t["default"].RESTSerializer.extend({primaryKey:"_id"})}),define("ember-gym/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t["default"]}})}),define("ember-gym/templates/index",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{meta:{fragmentReason:!1,revision:"Ember@2.6.0",loc:{source:null,start:{line:33,column:0},end:{line:44,column:0}},moduleName:"ember-gym/templates/index.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode(" ");e.appendChild(t,a);var a=e.createElement("h3"),n=e.createTextNode(" Results ");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n ");e.appendChild(t,a);var a=e.createElement("ul"),n=e.createTextNode("\n   ");e.appendChild(a,n);var n=e.createElement("li"),r=e.createTextNode(" Estimated total: ");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r);var r=e.createTextNode(" ");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n   ");e.appendChild(a,n);var n=e.createElement("li"),r=e.createTextNode(" ");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r);var r=e.createTextNode(" in Bench Press ");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n   ");e.appendChild(a,n);var n=e.createElement("li"),r=e.createTextNode(" ");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r);var r=e.createTextNode(" in Squats ");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n   ");e.appendChild(a,n);var n=e.createElement("li"),r=e.createTextNode(" ");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r);var r=e.createTextNode(" in Deadlifts ");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n   ");e.appendChild(a,n);var n=e.createElement("li"),r=e.createTextNode(" Your Wilks score is: ");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r);var r=e.createTextNode(" ");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n   ");e.appendChild(a,n);var n=e.createElement("li"),r=e.createTextNode(" Sex is: ");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r);var r=e.createTextNode(" ");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n ");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n\n");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var n=e.childAt(t,[3]),r=new Array(6);return r[0]=e.createMorphAt(e.childAt(n,[1]),1,1),r[1]=e.createMorphAt(e.childAt(n,[3]),1,1),r[2]=e.createMorphAt(e.childAt(n,[5]),1,1),r[3]=e.createMorphAt(e.childAt(n,[7]),1,1),r[4]=e.createMorphAt(e.childAt(n,[9]),1,1),r[5]=e.createMorphAt(e.childAt(n,[11]),1,1),r},statements:[["content","liftTotal",["loc",[null,[36,25],[36,38]]]],["content","benchClass",["loc",[null,[37,8],[37,22]]]],["content","squatClass",["loc",[null,[38,8],[38,22]]]],["content","deadClass",["loc",[null,[39,8],[39,21]]]],["content","wilks",["loc",[null,[40,29],[40,38]]]],["content","sexResult",["loc",[null,[41,16],[41,29]]]]],locals:[],templates:[]}}();return{meta:{fragmentReason:{name:"missing-wrapper",problems:["multiple-nodes","wrong-type"]},revision:"Ember@2.6.0",loc:{source:null,start:{line:1,column:0},end:{line:50,column:0}},moduleName:"ember-gym/templates/index.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createElement("head"),n=e.createTextNode("\n  ");e.appendChild(a,n);var n=e.createElement("link");e.setAttribute(n,"rel","icon"),e.setAttribute(n,"href","ember-gymicon-cdb36bf6a69971b22d74b8ab913d19be.png"),e.setAttribute(n,"type","image/png"),e.appendChild(a,n);var n=e.createTextNode("\n\n");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("h2"),n=e.createTextNode(" Ember Gym App ");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createElement("a");e.setAttribute(a,"href","/lift");var n=e.createTextNode(" Lift Records ");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode(" ");e.appendChild(t,a);var a=e.createElement("br");e.appendChild(t,a);var a=e.createTextNode("\nAge: ");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createElement("br");e.appendChild(t,a);var a=e.createTextNode("\nWeight: ");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createElement("br");e.appendChild(t,a);var a=e.createTextNode("\nHeight(in): ");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createElement("br");e.appendChild(t,a);var a=e.createTextNode("\nSex:\n");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode(" Male\n");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode(" Female\n\n\n");e.appendChild(t,a);var a=e.createElement("h3"),n=e.createTextNode(" Lifts ");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n\nBench Press: ");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\nSquat: ");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\nDeadlift: ");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("br");e.appendChild(t,a);var a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createElement("br");e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("button"),n=e.createTextNode(" Calculate ");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createElement("br");e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("br");e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createElement("canvas");e.setAttribute(a,"id","canvas"),e.setAttribute(a,"width","500"),e.setAttribute(a,"height","500");var n=e.createTextNode("\n  Your browser does not support HTML canvas! Can't display body graph!\n");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var n=e.childAt(t,[36]),r=new Array(11);return r[0]=e.createMorphAt(t,8,8,a),r[1]=e.createMorphAt(t,12,12,a),r[2]=e.createMorphAt(t,16,16,a),r[3]=e.createMorphAt(t,20,20,a),r[4]=e.createMorphAt(t,22,22,a),r[5]=e.createMorphAt(t,26,26,a),r[6]=e.createMorphAt(t,28,28,a),r[7]=e.createMorphAt(t,30,30,a),r[8]=e.createElementMorph(n),r[9]=e.createMorphAt(t,42,42,a),r[10]=e.createMorphAt(t,45,45,a),r},statements:[["inline","input",[],["value",["subexpr","@mut",[["get","age",["loc",[null,[8,19],[8,22]]]]],[],[]]],["loc",[null,[8,5],[8,24]]]],["inline","input",[],["value",["subexpr","@mut",[["get","weight",["loc",[null,[10,22],[10,28]]]]],[],[]]],["loc",[null,[10,8],[10,30]]]],["inline","input",[],["value",["subexpr","@mut",[["get","height",["loc",[null,[12,26],[12,32]]]]],[],[]]],["loc",[null,[12,12],[12,34]]]],["inline","radio-button",[],["value",!0,"checked",["subexpr","@mut",[["get","sex",["loc",[null,[15,34],[15,37]]]]],[],[]]],["loc",[null,[15,0],[15,39]]]],["inline","radio-button",[],["value",!1,"checked",["subexpr","@mut",[["get","sex",["loc",[null,[16,35],[16,38]]]]],[],[]]],["loc",[null,[16,0],[16,40]]]],["inline","input",[],["value",["subexpr","@mut",[["get","benchMax",["loc",[null,[21,27],[21,35]]]]],[],[]],"enter","calculateLifts"],["loc",[null,[21,13],[21,60]]]],["inline","input",[],["value",["subexpr","@mut",[["get","squatMax",["loc",[null,[22,21],[22,29]]]]],[],[]],"enter","calculateLifts"],["loc",[null,[22,7],[22,54]]]],["inline","input",[],["value",["subexpr","@mut",[["get","deadMax",["loc",[null,[23,24],[23,31]]]]],[],[]],"enter","calculateLifts"],["loc",[null,[23,10],[23,56]]]],["element","action",["calculateLifts"],[],["loc",[null,[28,8],[28,35]]]],["block","if",[["get","isCalculated",["loc",[null,[33,6],[33,18]]]]],[],0,null,["loc",[null,[33,0],[44,7]]]],["content","outlet",["loc",[null,[49,0],[49,10]]]]],locals:[],templates:[e]}}())}),define("ember-gym/templates/lift",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{meta:{fragmentReason:!1,revision:"Ember@2.6.0",loc:{source:null,start:{line:4,column:0},end:{line:14,column:0}},moduleName:"ember-gym/templates/lift.hbs"},isEmpty:!1,arity:1,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("  ");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"class","liftRecord");var n=e.createTextNode("\n    Age: ");e.appendChild(a,n);var n=e.createComment("");e.appendChild(a,n);var n=e.createTextNode(" ");e.appendChild(a,n);var n=e.createElement("br");e.appendChild(a,n);var n=e.createTextNode("\n    Sex: ");e.appendChild(a,n);var n=e.createComment("");e.appendChild(a,n);var n=e.createTextNode(" ");e.appendChild(a,n);var n=e.createElement("br");e.appendChild(a,n);var n=e.createTextNode("\n    Weight: ");e.appendChild(a,n);var n=e.createComment("");e.appendChild(a,n);var n=e.createTextNode(" ");e.appendChild(a,n);var n=e.createElement("br");e.appendChild(a,n);var n=e.createTextNode("\n    Bench Press: ");e.appendChild(a,n);var n=e.createComment("");e.appendChild(a,n);var n=e.createTextNode(" ");e.appendChild(a,n);var n=e.createElement("br");e.appendChild(a,n);var n=e.createTextNode("\n    Squat: ");e.appendChild(a,n);var n=e.createComment("");e.appendChild(a,n);var n=e.createTextNode(" ");e.appendChild(a,n);var n=e.createElement("br");e.appendChild(a,n);var n=e.createTextNode("\n    Deadlift: ");e.appendChild(a,n);var n=e.createComment("");e.appendChild(a,n);var n=e.createTextNode(" ");e.appendChild(a,n);var n=e.createElement("br");e.appendChild(a,n);var n=e.createTextNode("\n    ");e.appendChild(a,n);var n=e.createElement("strong"),r=e.createTextNode(" Total: ");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n  ");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var n=e.childAt(t,[1]),r=new Array(7);return r[0]=e.createMorphAt(n,1,1),r[1]=e.createMorphAt(n,5,5),r[2]=e.createMorphAt(n,9,9),r[3]=e.createMorphAt(n,13,13),r[4]=e.createMorphAt(n,17,17),r[5]=e.createMorphAt(n,21,21),r[6]=e.createMorphAt(e.childAt(n,[25]),1,1),r},statements:[["content","lift.age",["loc",[null,[6,9],[6,21]]]],["content","lift.sex",["loc",[null,[7,9],[7,21]]]],["content","lift.weight",["loc",[null,[8,12],[8,27]]]],["content","lift.bench",["loc",[null,[9,17],[9,31]]]],["content","lift.squat",["loc",[null,[10,11],[10,25]]]],["content","lift.deadlift",["loc",[null,[11,14],[11,31]]]],["content","lift.total",["loc",[null,[12,20],[12,34]]]]],locals:["lift"],templates:[]}}();return{meta:{fragmentReason:{name:"missing-wrapper",problems:["wrong-type","multiple-nodes"]},revision:"Ember@2.6.0",loc:{source:null,start:{line:1,column:0},end:{line:15,column:0}},moduleName:"ember-gym/templates/lift.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("Lifts!");e.appendChild(t,a);var a=e.createElement("br");e.appendChild(t,a);var a=e.createTextNode("\n\n\n");e.appendChild(t,a);var a=e.createComment("");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var n=new Array(1);return n[0]=e.createMorphAt(t,3,3,a),e.insertBoundary(t,null),n},statements:[["block","each",[["get","model",["loc",[null,[4,8],[4,13]]]]],[],0,null,["loc",[null,[4,0],[14,9]]]]],locals:[],templates:[e]}}())}),define("ember-gym/config/environment",["ember"],function(e){var t="ember-gym";try{var a=t+"/config/environment",n=e["default"].$('meta[name="'+a+'"]').attr("content"),r=JSON.parse(unescape(n));return{"default":r}}catch(l){throw new Error('Could not read config from meta tag with name "'+a+'".')}}),runningTests||require("ember-gym/app")["default"].create({name:"ember-gym",version:"0.0.0+a6abc891"});