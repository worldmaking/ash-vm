!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(t.AshVM=t.AshVM||{})}(this,function(t){"use strict";function n(t,n){setTimeout(function(){t(n)},0)}function e(t){return Object.keys(t).forEach(function(n){var e=t[n];d(e)&&(t[n]=t[e])}),t}function r(t){return{"@loop":function(n){var e=n.operations,r=n.error,o=e.pop();v(o)?t.fork(null,n,["@forever",o]):r("@loop",O,o)},"@fork":function(n){var e=n.operations,r=n.error,o=e.pop();v(o)?t.fork(null,n,o):r("@fork",O,o)},"@spawn":function(n){var e=n.stack,r=n.operations,o=n.error,i=e.pop(),a=r.pop();d(i)?v(a)?(t.stop(i),t.fork(i,n,["@forever",a])):o("@spawn",O,a):o("@spawn",N,i)},"@stop-all":function(n){return t.stopAll()},"@stop":function(n){var e=n.stack;return t.stop(e.pop())}}}function o(t,n){for(var e=n.length-1;e>=0&&n[e]!==t;)e--;e!==-1&&n.splice(e,1)}function i(t,n){if(0===n.length)n.push(t);else{for(var e=n.length-1,r=n[e];r&&r.time<=t.time;)e--,r=n[e];n.splice(e+1,0,t)}return t}function a(t){var n=t.length;return n?t[n-1].time:1/0}function u(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=p(t,n);return e.instruments=c(V(t)),e.commands=I(e),t.sequencers.push(s(e)),function(t){return e.vms.push(t),t.audio=e,e.commands}}function c(t){return Object.keys(t).forEach(function(n){var e=t[n];if(!e.prepare){var r=e.params||[];e.prepare=function(t,n){r.forEach(function(e){var r=n.get(e);g(r)&&(t[e]=r)})}}}),t}function s(t){var n=t.vms,e=t.bpm2bpa;return{tick:function(){var r=t.vms.length,o=t.bpm*e;if(1===r)n[0].resume(o);else if(r>1)for(var i=0;i<r;i++)n[i].resume(o)}}}function p(t,n){var e=n.bpm,r=void 0===e?100:e;return t.context||t.init(),{Gibberish:t,bpm:r,sampleRate:t.context.sampleRate,bpm2bpa:1/(60*t.context.sampleRate),vms:[]}}function f(t){var n=t||Math.random,e=function(t){return _(n()*t)},r=function(n){var e,r,o;for(o=n.length;o;o--)e=_(t()*o),r=n[o-1],n[o-1]=n[e],n[e]=r};return{"@random":function(t){return t.stack.push(n())},"@rand":"@random","@srandom":function(t){return t.stack.push(2*n()-1)},"@srand":"@srandom","@randi":function(t){var n=t.stack;return n.push(e(n.pop()))},"@pick":function(t){var n=t.operations,r=t.error,o=n.pop();if(v(o)){var i=e(o.length);n.push(o[i])}else n.push(o),r("Can't pick an element if is not an array",o)},"@chance":function(t){var e=t.stack,r=t.operations,o=e.pop(),i=r.pop();n()<o&&(r.pop(),r.push(i))},"@shuffle":function(t){var n=(t.stack,t.operations),e=t.error,o=n.pop();v(o)?n.push(r(o)):e("@shuffle",O,o)}}}function l(t){return t=t||console.log.bind(console),{"@print":function(n){var e=n.stack;t("@print",e.length?b(e):"<Empty Stack>","(id, time)",n.id,n.time)},"@log":function(n){var e=n.stack;t("@log",e.pop(),e.length?b(e):"<Empty Stack>","(id, time)",n.id,n.time)},"@debug":function(n){t("@debug",n.stack,n.id,n.time)}}}function h(){return{"@reverse":function(t){var n=t.operations,e=t.error,r=n.pop();v(r)?n.push(r.slice().reverse()):e("@reverse",O,r)},"@map":"@linear","@pluck":z("pluck"),"@pluck-note":G("pluck","freq","amp"),"@bass":z("bass"),"@bass-note":G("bass","freq","amp"),"@hat":z("hat"),"@hat-note":G("hat","amp"),"@kick":z("kick"),"@kick-note":G("kick","amp"),"@snare":z("snare"),"@snare-note":G("snare","amp"),"@conga":z("conga"),"@conga-note":G("conga","amp"),"@clave":z("clave"),"@clave-note":G("clave","amp"),"@tom":z("tom"),"@tom-note":G("tom","amp")}}function m(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=n.plugins,r=new R({amp:.5,freq:440},n);return r.addCommands(u(t,n)),r.addCommands(f(n)),r.addCommands(l(n)),r.addCommands(h(n)),e&&e.forEach(function(t){return r.addCommands(t)}),r}var v=Array.isArray,d=function(t){return"string"==typeof t},k=function(t){return"function"==typeof t},g=function(t){return void 0!==t},y=function(t){return t[t.length-1]},b=y,w=function(t,n){return(t%n+n)%n},x=function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")},C=function(){function t(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(n,e,r){return e&&t(n.prototype,e),r&&t(n,r),n}}(),q=function(t){return"string"==typeof t&&"@"===t[0]},E=Array.isArray,M=1,j=function(){function t(n,e,r,o){x(this,t),this.id="proc-"+M++,this.stack=[],this.operations=n?[n]:[],this.context=new A(e),this.time="number"==typeof r?r:0,this.rate="number"==typeof o?o:1,this.error=this.error.bind(this)}return C(t,[{key:"wait",value:function(t){this.time+=this.rate*t}},{key:"step",value:function(t){var e=this.operations;if(e.length){var r=e.pop();if(null===r||void 0===r);else if("function"==typeof r)n(r,this.time);else if(E(r))for(var o=r.length-1;o>=0;o--)e.push(r[o]);else if(q(r)){var i=t[r];"function"==typeof i?i(this):this.error("step > ","Instruction not recognized.",r)}else this.stack.push(r)}}},{key:"resume",value:function(t){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1/0,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e4,r=this.operations;--e>0&&this.time<n&&r.length;)this.step(t);if(0===e)throw Error("Limit reached. Probably an infinity loop.");return r.length>0}},{key:"error",value:function(t,n,e){console.error(t,n,e,"id",this.id,"time",this.time)}}]),t}(),A=function(){function t(n){x(this,t),n instanceof t?this.parent=n:n&&(this.local=Object.assign({},n))}return C(t,[{key:"child",value:function(n){var e=new t(this);return e.local=Object.assign({},n),e}},{key:"get",value:function(t){for(var n=this;void 0===n.value(t)&&n.parent;)n=n.parent;return n.value(t)}},{key:"set",value:function(t,n){for(var e=this;void 0===e.value(t)&&e.parent;)e=e.parent;e.let(t,n)}},{key:"value",value:function(t){return this.local?this.local[t]:void 0}},{key:"let",value:function(t,n){this.local||(this.local={}),this.local[t]=n}}]),t}(),O="Expected a pattern, but found:",N="Expected a string, but found:",S=function(t){return function(n){var e=n.stack;e.push(t(e.pop()))}},B=function(t){return function(n){var e=n.stack;e.push(t(e.pop(),e.pop()))}},F={"@+":B(function(t,n){return n+t}),"@add":"@+","@-":B(function(t,n){return n-t}),"@sub":"@-","@*":B(function(t,n){return n*t}),"@mul":"@*","@/":B(function(t,n){return 0===t?0:n/t}),"@div":"@/","@%":B(function(t,n){return 0===t?0:w(n,t)}),"@wrap":"@%","@mod":B(function(t,n){return 0===t?0:n%t}),"@neg":S(function(t){return-t}),"@cond":function(t){var n=t.stack,e=t.operations,r=n.pop(),o=e.pop();r&&(e.pop(),e.push(o))},"@>":B(function(t,n){return n>t}),"@>=":B(function(t,n){return n>=t}),"@<":B(function(t,n){return n<t}),"@<=":B(function(t,n){return n<=t}),"@==":B(function(t,n){return n===t}),"@!=":B(function(t,n){return n!==t}),"@!":S(function(t){return!t}),"@not":"@!","@&&":B(function(t,n){return n&&t}),"@and":"@&&","@||":B(function(t,n){return n||t}),"@or":"@||","@let":function(t){var n=t.stack;return t.context.let(n.pop(),n.pop())},"@set":function(t){var n=t.stack;return t.context.set(n.pop(),n.pop())},"@get":function(t){var n=t.stack,e=t.context;return n.push(e.get(n.pop()))},"@wait":function(t){return t.wait(Math.abs(Number(t.stack.pop())))},"@sync":function(t){return t.wait(Math.floor(t.time)+1-t.time)},"@scale-rate":function(t){var n=parseFloat(t.stack.pop(),10);n>0&&(t.rate*=n)},"@with-rate":function(t){var n=t.stack,e=t.operations,r=t.error,o=parseFloat(n.pop(),10),i=e.pop();v(i)||r("@with-rate",O,i),e.push([o,"@scale-rate",i,1/o,"@scale-rate"])},"@dup":function(t){var n=t.stack;return n.push(y(n))},"@execute":function(t){var n=t.operations,e=t.error,r=n.pop();d(r)?n.push("@instr"):e("@execute",N,r)},"@":"@execute","@repeat":function(t){var n=t.stack,e=t.operations,r=n.pop(),o=y(e);if(!v(o))throw Error("Can't repeat: "+o);for(var i=1;i<r;i++)e.push(o)},"@forever":function(t){var n=t.operations,e=y(n);if(!v(e))throw Error("Can't forover: "+e);e.length&&(n.push("@forever"),n.push(e))},"@iter":function(t){var n=t.operations,e=t.error,r=n.pop();if(v(r)&&r.length){var o=r.splice(0,1);n.push(o),r.push(o)}else e("@iter",O,r)},"@rotate":function(t){var n=t.stack,e=t.operations,r=t.error,o=e.pop(),i=n.pop();if(v(o)&&o.length>0){i%=o.length;var a=o.splice(0);o.push.apply(o,a.slice(i)),o.push.apply(o,a.slice(0,i)),e.push(a)}else r("@rotate",O,o)},"@linear":function(t){var n=t.stack,e=n.pop(),r=n.pop(),o=n.pop(),i=n.pop(),a=n.pop();o===i?n.push(r):n.push(r+(a-i)/(o-i)*(e-r))}},P=Object.assign,R=function(){function t(n){x(this,t),this.context=n,this.procs=[],this.procsByName={},this.time=0,this.commands=r(this),this.addCommands(F)}return C(t,[{key:"run",value:function(t){return(!(arguments.length>1&&void 0!==arguments[1])||arguments[1])&&this.procs.length&&(t=["@sync",t]),this.fork(null,this.context,t)}},{key:"addCommands",value:function(t){k(t)&&(t=t(this)),t&&P(this.commands,e(t))}},{key:"fork",value:function(t,n,e){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,o=arguments[4],a=this.time+r;!o&&n&&(o=n.rate);var u=n?n.context||n:void 0,c=new j(e,u,a,o);return i(c,this.procs),t&&(this.procsByName[t]=c),c}},{key:"resume",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1/0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e4,e=this.procs;if(0===e.length)return!1;for(var r=this.time+t;--n>0&&a(e)<r;){var o=e.pop();o.resume(this.commands,r)&&i(o,this.procs)}return this.time=r,e.length>0}},{key:"stopAll",value:function(){this.procs.length=0}},{key:"stop",value:function(t){if("string"==typeof t){var n=t;t=this.procsByName[n],this.procsByName[n]=null}o(t,this.procs)}}]),t}(),T=function(t){return'Instrument "'+t+'" not found.'},V=function(t){return{kick:{params:["amp","pitch","decay","tone"],init:function(){return new t.Kick({decay:.2}).connect()}},snare:{params:["amp","tune","cutoff","snappy"],init:function(){return new t.Snare({snappy:1.5}).connect()}},hat:{params:["amp","pitch"],init:function(){return new t.Hat({amp:1.5}).connect()}},conga:{params:["amp","pitch"],init:function(){return new t.Conga({amp:.25,freq:400}).connect()}},clave:{params:["amp","pitch"],init:function(){return new t.Clave({amp:1}).connect()}},tom:{params:["amp","pitch"],init:function(){return new t.Tom({amp:.25,freq:400}).connect()}},clap:{params:["amp"],init:function(){return new t.Clap({amp:.5}).connect()}},cowbell:{params:["amp","pitch"],init:function(){return new t.Cowbell({amp:.5}).connect()}},pluck:{params:["freq","amp","blend","damping","velocity"],init:function(){return new t.PolyKarplusStrong({maxVoices:32}).connect()},prepare:function(n,e){var r=e.get("freq");r>0&&(n.freq=r,n.damping=1- -6/Math.log(r/t.sampleRate));var o=e.get("amp");o&&(n.amp=o*o*.5);var i=e.get("blend");i&&(n.blend=i)}},bass:{params:["freq","amp","resonance"],init:function(){return new t.MonoSynth({attack:44,decay:t.Time.beats(.25),filterMult:.25,octave2:0,octave3:0}).connect()}}}},I=function(t){return{"@play":function(n){var e=n.context,r=n.error,o=K(e,t);o&&r("@play",o)},"@play-note":function(n){var e=n.stack,r=n.context,o=n.error,i=e.pop(),a=K(r.child(i),t);a&&o("@play-note",a)},"@set-bpm":function(n){var e=n.stack,r=parseFloat(e.pop(),10);r>0&&(t.bpm=r)},"@scale-tempo":function(n){var e=n.stack,r=parseFloat(e.pop(),10);r&&(t.bpm*=r)}}},K=function(t,n){var e=n.instruments,r=t.get("inst"),o=e[r];if(!o)return T(r);o.instance||(o.instance=o.init());var i=o.instance;o.prepare(i,t),i.freq?i.note(i.freq):i.note()},_=Math.floor,z=function(t){return function(n){n.operations.push([{inst:t},"@play-note"])}},G=function(t,n,e){return function(r){var o=r.stack,i=r.operations,a={inst:t};e&&(a[e]=o.pop()),a[n]=o.pop(),i.push([a,"@play-note"])}};t.init=m,Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=ash-vm.js.map
