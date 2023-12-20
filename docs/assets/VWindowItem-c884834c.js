import{aI as Y,at as W,a9 as w,ac as M,ad as A,a2 as H,aJ as O,av as j,ai as G,ax as F,e as y,m as h,A as z,q as m,s as S,a6 as _,L,aK as D,aL as q,aM as J,aN as K,aO as U,M as N,am as Q,aH as X,aP as Z}from"./index-3df34c37.js";import{m as p,u as ee}from"./lazy-09ec8d27.js";import{u as te}from"./ssrBoot-e470b718.js";const ne=e=>{const{touchstartX:o,touchendX:t,touchstartY:n,touchendY:a}=e,u=.5,s=16;e.offsetX=t-o,e.offsetY=a-n,Math.abs(e.offsetY)<u*Math.abs(e.offsetX)&&(e.left&&t<o-s&&e.left(e),e.right&&t>o+s&&e.right(e)),Math.abs(e.offsetX)<u*Math.abs(e.offsetY)&&(e.up&&a<n-s&&e.up(e),e.down&&a>n+s&&e.down(e))};function oe(e,o){var n;const t=e.changedTouches[0];o.touchstartX=t.clientX,o.touchstartY=t.clientY,(n=o.start)==null||n.call(o,{originalEvent:e,...o})}function se(e,o){var n;const t=e.changedTouches[0];o.touchendX=t.clientX,o.touchendY=t.clientY,(n=o.end)==null||n.call(o,{originalEvent:e,...o}),ne(o)}function ae(e,o){var n;const t=e.changedTouches[0];o.touchmoveX=t.clientX,o.touchmoveY=t.clientY,(n=o.move)==null||n.call(o,{originalEvent:e,...o})}function ie(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const o={touchstartX:0,touchstartY:0,touchendX:0,touchendY:0,touchmoveX:0,touchmoveY:0,offsetX:0,offsetY:0,left:e.left,right:e.right,up:e.up,down:e.down,start:e.start,move:e.move,end:e.end};return{touchstart:t=>oe(t,o),touchend:t=>se(t,o),touchmove:t=>ae(t,o)}}function ue(e,o){var v;const t=o.value,n=t!=null&&t.parent?e.parentElement:e,a=(t==null?void 0:t.options)??{passive:!0},u=(v=o.instance)==null?void 0:v.$.uid;if(!n||!u)return;const s=ie(o.value);n._touchHandlers=n._touchHandlers??Object.create(null),n._touchHandlers[u]=s,Y(s).forEach(r=>{n.addEventListener(r,s[r],a)})}function ce(e,o){var u,s;const t=(u=o.value)!=null&&u.parent?e.parentElement:e,n=(s=o.instance)==null?void 0:s.$.uid;if(!(t!=null&&t._touchHandlers)||!n)return;const a=t._touchHandlers[n];Y(a).forEach(v=>{t.removeEventListener(v,a[v])}),delete t._touchHandlers[n]}const $={mounted:ue,unmounted:ce},le=$,k=Symbol.for("vuetify:v-window"),R=Symbol.for("vuetify:v-window-group"),re=W({continuous:Boolean,nextIcon:{type:[Boolean,String,Function,Object],default:"$next"},prevIcon:{type:[Boolean,String,Function,Object],default:"$prev"},reverse:Boolean,showArrows:{type:[Boolean,String],validator:e=>typeof e=="boolean"||e==="hover"},touch:{type:[Object,Boolean],default:void 0},direction:{type:String,default:"horizontal"},modelValue:null,disabled:Boolean,selectedClass:{type:String,default:"v-window-item--active"},mandatory:{default:"force"},...w(),...M(),...A()},"v-window"),he=H()({name:"VWindow",directives:{Touch:$},props:re(),emits:{"update:modelValue":e=>!0},setup(e,o){let{slots:t}=o;const{themeClasses:n}=O(e),{isRtl:a}=j(),{t:u}=G(),s=F(e,R),v=y(),r=h(()=>a.value?!e.reverse:e.reverse),d=y(!1),T=h(()=>{const i=e.direction==="vertical"?"y":"x",f=(r.value?!d.value:d.value)?"-reverse":"";return`v-window-${i}${f}-transition`}),C=y(0),x=y(void 0),g=h(()=>s.items.value.findIndex(i=>s.selected.value.includes(i.id)));z(g,(i,l)=>{const f=s.items.value.length,I=f-1;f<=2?d.value=i<l:i===I&&l===0?d.value=!0:i===0&&l===I?d.value=!1:d.value=i<l}),q(k,{transition:T,isReversed:d,transitionCount:C,transitionHeight:x,rootRef:v});const c=h(()=>e.continuous||g.value!==0),b=h(()=>e.continuous||g.value!==s.items.value.length-1);function B(){c.value&&s.prev()}function E(){b.value&&s.next()}const P=h(()=>{const i=[],l={icon:a.value?e.nextIcon:e.prevIcon,class:`v-window__${r.value?"right":"left"}`,onClick:s.prev,ariaLabel:u("$vuetify.carousel.prev")};i.push(c.value?t.prev?t.prev({props:l}):m(S,l,null):m("div",null,null));const f={icon:a.value?e.prevIcon:e.nextIcon,class:`v-window__${r.value?"left":"right"}`,onClick:s.next,ariaLabel:u("$vuetify.carousel.next")};return i.push(b.value?t.next?t.next({props:f}):m(S,f,null):m("div",null,null)),i}),V=h(()=>e.touch===!1?e.touch:{...{left:()=>{r.value?B():E()},right:()=>{r.value?E():B()},start:l=>{let{originalEvent:f}=l;f.stopPropagation()}},...e.touch===!0?{}:e.touch});return _(()=>L(m(e.tag,{ref:v,class:["v-window",{"v-window--show-arrows-on-hover":e.showArrows==="hover"},n.value,e.class],style:e.style},{default:()=>{var i,l;return[m("div",{class:"v-window__container",style:{height:x.value}},[(i=t.default)==null?void 0:i.call(t,{group:s}),e.showArrows!==!1&&m("div",{class:"v-window__controls"},[P.value])]),(l=t.additional)==null?void 0:l.call(t,{group:s})]}}),[[D("touch"),V.value]])),{group:s}}}),me=H()({name:"VWindowItem",directives:{Touch:le},props:{reverseTransition:{type:[Boolean,String],default:void 0},transition:{type:[Boolean,String],default:void 0},...w(),...J(),...p()},emits:{"group:selected":e=>!0},setup(e,o){let{slots:t}=o;const n=K(k),a=U(e,R),{isBooted:u}=te();if(!n||!a)throw new Error("[Vuetify] VWindowItem must be used inside VWindow");const s=y(!1),v=h(()=>n.isReversed.value?e.reverseTransition!==!1:e.transition!==!1);function r(){!s.value||!n||(s.value=!1,n.transitionCount.value>0&&(n.transitionCount.value-=1,n.transitionCount.value===0&&(n.transitionHeight.value=void 0)))}function d(){var c;s.value||!n||(s.value=!0,n.transitionCount.value===0&&(n.transitionHeight.value=X((c=n.rootRef.value)==null?void 0:c.clientHeight)),n.transitionCount.value+=1)}function T(){r()}function C(c){s.value&&Z(()=>{!v.value||!s.value||!n||(n.transitionHeight.value=X(c.clientHeight))})}const x=h(()=>{const c=n.isReversed.value?e.reverseTransition:e.transition;return v.value?{name:typeof c!="string"?n.transition.value:c,onBeforeEnter:d,onAfterEnter:r,onEnterCancelled:T,onBeforeLeave:d,onAfterLeave:r,onLeaveCancelled:T,onEnter:C}:!1}),{hasContent:g}=ee(e,a.isSelected);return _(()=>m(Q,{transition:x.value,disabled:!u.value},{default:()=>{var c;return[L(m("div",{class:["v-window-item",a.selectedClass.value,e.class],style:e.style},[g.value&&((c=t.default)==null?void 0:c.call(t))]),[[N,a.isSelected.value]])]}})),{}}});export{he as V,me as a};
