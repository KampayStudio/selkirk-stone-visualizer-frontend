import{as as ze,a9 as fe,aa as Ve,ad as _e,at as we,a3 as oe,au as Te,av as Pe,aw as Re,e as b,m as k,ax as ve,ay as Me,A as $e,a7 as ie,q as t,az as me,C as ge,aA as Be,aB as Ae,a4 as Ie,aC as Ee,ak as Oe,s as se,W as ne,aD as Fe,a5 as qe,aE as He,ag as je,ah as M,aF as Ge,aG as Ne,d as De,a8 as Le,c as Ue,r as We,o as x,g as $,w as s,G as V,H as w,v as B,L as Xe,aq as Ye,k as R,I as ye,p as j,F as G,J as N,i as p,x as ee,K as te}from"./index-5c38423f.js";import{a as Ke,s as Je}from"./easing-9f15041e.js";import{V as Qe,a as le}from"./VWindowItem-33f20069.js";import{a as D}from"./VInput-098737cb.js";import{V as ae}from"./VCheckbox-34da30ff.js";import"./lazy-f5cb3e7a.js";import"./ssrBoot-f91ee004.js";import"./VCheckboxBtn-8aee069e.js";import"./VSelectionControl-7d260e9f.js";function he(e){const i=Math.abs(e);return Math.sign(e)*(i/((1/.501-2)*(1-i)+1))}function xe(e){let{selectedElement:u,containerSize:i,contentSize:m,isRtl:y,currentScrollOffset:n,isHorizontal:r}=e;const l=r?u.clientWidth:u.clientHeight,v=r?u.offsetLeft:u.offsetTop,c=y&&r?m-v-l:v,f=i+n,o=l+c,h=l*.4;return c<=n?n=Math.max(c-h,0):f<=o&&(n=Math.min(n-(f-o-h),m-i)),n}function Ze(e){let{selectedElement:u,containerSize:i,contentSize:m,isRtl:y,isHorizontal:n}=e;const r=n?u.clientWidth:u.clientHeight,l=n?u.offsetLeft:u.offsetTop,v=y&&n?m-l-r/2-i/2:l+r/2-i/2;return Math.min(m-i,Math.max(0,v))}const et=Symbol.for("vuetify:v-slide-group"),Se=ze({centerActive:Boolean,direction:{type:String,default:"horizontal"},symbol:{type:null,default:et},nextIcon:{type:fe,default:"$next"},prevIcon:{type:fe,default:"$prev"},showArrows:{type:[Boolean,String],validator:e=>typeof e=="boolean"||["always","desktop","mobile"].includes(e)},...Ve(),..._e(),...we({selectedClass:"v-slide-group-item--active"})},"v-slide-group"),be=oe()({name:"VSlideGroup",props:Se(),emits:{"update:modelValue":e=>!0},setup(e,u){let{slots:i}=u;const{isRtl:m}=Te(),{mobile:y}=Pe(),n=Re(e,e.symbol),r=b(!1),l=b(0),v=b(0),c=b(0),f=k(()=>e.direction==="horizontal"),{resizeRef:o,contentRect:h}=ve(),{resizeRef:g,contentRect:A}=ve(),I=k(()=>n.selected.value.length?n.items.value.findIndex(a=>a.id===n.selected.value[0]):-1),L=k(()=>n.selected.value.length?n.items.value.findIndex(a=>a.id===n.selected.value[n.selected.value.length-1]):-1);if(Me){let a=-1;$e(()=>[n.selected.value,h.value,A.value,f.value],()=>{cancelAnimationFrame(a),a=requestAnimationFrame(()=>{if(h.value&&A.value){const d=f.value?"width":"height";v.value=h.value[d],c.value=A.value[d],r.value=v.value+1<c.value}if(I.value>=0&&g.value){const d=g.value.children[L.value];I.value===0||!r.value?l.value=0:e.centerActive?l.value=Ze({selectedElement:d,containerSize:v.value,contentSize:c.value,isRtl:m.value,isHorizontal:f.value}):r.value&&(l.value=xe({selectedElement:d,containerSize:v.value,contentSize:c.value,isRtl:m.value,currentScrollOffset:l.value,isHorizontal:f.value}))}})})}const E=b(!1);let C=0,z=0;function O(a){const d=f.value?"clientX":"clientY";z=(m.value&&f.value?-1:1)*l.value,C=a.touches[0][d],E.value=!0}function F(a){if(!r.value)return;const d=f.value?"clientX":"clientY",S=m.value&&f.value?-1:1;l.value=S*(z+C-a.touches[0][d])}function W(a){const d=c.value-v.value;l.value<0||!r.value?l.value=0:l.value>=d&&(l.value=d),E.value=!1}function T(){o.value&&(o.value[f.value?"scrollLeft":"scrollTop"]=0)}const q=b(!1);function K(a){if(q.value=!0,!(!r.value||!g.value)){for(const d of a.composedPath())for(const S of g.value.children)if(S===d){l.value=xe({selectedElement:S,containerSize:v.value,contentSize:c.value,isRtl:m.value,currentScrollOffset:l.value,isHorizontal:f.value});return}}}function P(a){q.value=!1}function J(a){var d;!q.value&&!(a.relatedTarget&&((d=g.value)!=null&&d.contains(a.relatedTarget)))&&_()}function re(a){g.value&&(f.value?a.key==="ArrowRight"?_(m.value?"prev":"next"):a.key==="ArrowLeft"&&_(m.value?"next":"prev"):a.key==="ArrowDown"?_("next"):a.key==="ArrowUp"&&_("prev"),a.key==="Home"?_("first"):a.key==="End"&&_("last"))}function _(a){var d,S,ue,ce,de;if(g.value)if(!a)(d=Be(g.value)[0])==null||d.focus();else if(a==="next"){const H=(S=g.value.querySelector(":focus"))==null?void 0:S.nextElementSibling;H?H.focus():_("first")}else if(a==="prev"){const H=(ue=g.value.querySelector(":focus"))==null?void 0:ue.previousElementSibling;H?H.focus():_("last")}else a==="first"?(ce=g.value.firstElementChild)==null||ce.focus():a==="last"&&((de=g.value.lastElementChild)==null||de.focus())}function U(a){const d=l.value+(a==="prev"?-1:1)*v.value;l.value=Ae(d,0,c.value-v.value)}const X=k(()=>{let a=l.value>c.value-v.value?-(c.value-v.value)+he(c.value-v.value-l.value):-l.value;l.value<=0&&(a=he(-l.value));const d=m.value&&f.value?-1:1;return{transform:`translate${f.value?"X":"Y"}(${d*a}px)`,transition:E.value?"none":"",willChange:E.value?"transform":""}}),Q=k(()=>({next:n.next,prev:n.prev,select:n.select,isSelected:n.isSelected})),Z=k(()=>{switch(e.showArrows){case"always":return!0;case"desktop":return!y.value;case!0:return r.value||Math.abs(l.value)>0;case"mobile":return y.value||r.value||Math.abs(l.value)>0;default:return!y.value&&(r.value||Math.abs(l.value)>0)}}),ke=k(()=>Math.abs(l.value)>0),Ce=k(()=>c.value>Math.abs(l.value)+v.value);return ie(()=>t(e.tag,{class:["v-slide-group",{"v-slide-group--vertical":!f.value,"v-slide-group--has-affixes":Z.value,"v-slide-group--is-overflowing":r.value},e.class],style:e.style,tabindex:q.value||n.selected.value.length?-1:0,onFocus:J},{default:()=>{var a,d,S;return[Z.value&&t("div",{key:"prev",class:["v-slide-group__prev",{"v-slide-group__prev--disabled":!ke.value}],onClick:()=>U("prev")},[((a=i.prev)==null?void 0:a.call(i,Q.value))??t(me,null,{default:()=>[t(ge,{icon:m.value?e.nextIcon:e.prevIcon},null)]})]),t("div",{key:"container",ref:o,class:"v-slide-group__container",onScroll:T},[t("div",{ref:g,class:"v-slide-group__content",style:X.value,onTouchstartPassive:O,onTouchmovePassive:F,onTouchendPassive:W,onFocusin:K,onFocusout:P,onKeydown:re},[(d=i.default)==null?void 0:d.call(i,Q.value)])]),Z.value&&t("div",{key:"next",class:["v-slide-group__next",{"v-slide-group__next--disabled":!Ce.value}],onClick:()=>U("next")},[((S=i.next)==null?void 0:S.call(i,Q.value))??t(me,null,{default:()=>[t(ge,{icon:m.value?e.prevIcon:e.nextIcon},null)]})])]}})),{selected:n.selected,scrollTo:U,scrollOffset:l,focus:_}}});const pe=Symbol.for("vuetify:v-tabs"),Y=oe()({name:"VTab",props:{fixed:Boolean,sliderColor:String,hideSlider:Boolean,direction:{type:String,default:"horizontal"},...Ie(Ee({selectedClass:"v-tab--selected",variant:"text"}),["active","block","flat","location","position","symbol"])},setup(e,u){let{slots:i,attrs:m}=u;const{textColorClasses:y,textColorStyles:n}=Oe(e,"sliderColor"),r=k(()=>e.direction==="horizontal"),l=b(!1),v=b(),c=b();function f(o){var g,A;let{value:h}=o;if(l.value=h,h){const I=(A=(g=v.value)==null?void 0:g.$el.parentElement)==null?void 0:A.querySelector(".v-tab--selected .v-tab__slider"),L=c.value;if(!I||!L)return;const E=getComputedStyle(I).color,C=I.getBoundingClientRect(),z=L.getBoundingClientRect(),O=r.value?"x":"y",F=r.value?"X":"Y",W=r.value?"right":"bottom",T=r.value?"width":"height",q=C[O],K=z[O],P=q>K?C[W]-z[W]:C[O]-z[O],J=Math.sign(P)>0?r.value?"right":"bottom":Math.sign(P)<0?r.value?"left":"top":"center",_=(Math.abs(P)+(Math.sign(P)<0?C[T]:z[T]))/Math.max(C[T],z[T]),U=C[T]/z[T],X=1.5;Ke(L,{backgroundColor:[E,""],transform:[`translate${F}(${P}px) scale${F}(${U})`,`translate${F}(${P/X}px) scale${F}(${(_-1)/X+1})`,""],transformOrigin:Array(3).fill(J)},{duration:225,easing:Je})}}return ie(()=>{const[o]=se.filterProps(e);return t(se,ne({symbol:pe,ref:v,class:["v-tab",e.class],style:e.style,tabindex:l.value?0:-1,role:"tab","aria-selected":String(l.value),active:!1,block:e.fixed,maxWidth:e.fixed?300:void 0,rounded:0},o,m,{"onGroup:selected":f}),{default:()=>{var h;return[((h=i.default)==null?void 0:h.call(i))??e.text,!e.hideSlider&&t("div",{ref:c,class:["v-tab__slider",y.value],style:n.value},null)]}})}),{}}});function tt(e){return e?e.map(u=>typeof u=="string"?{title:u,value:u}:u):[]}const lt=oe()({name:"VTabs",props:{alignTabs:{type:String,default:"start"},color:String,fixedTabs:Boolean,items:{type:Array,default:()=>[]},stacked:Boolean,bgColor:String,grow:Boolean,height:{type:[Number,String],default:void 0},hideSlider:Boolean,sliderColor:String,...Se({mandatory:"force"}),...Fe(),..._e()},emits:{"update:modelValue":e=>!0},setup(e,u){let{slots:i}=u;const m=qe(e,"modelValue"),y=k(()=>tt(e.items)),{densityClasses:n}=He(e),{backgroundColorClasses:r,backgroundColorStyles:l}=je(M(e,"bgColor"));return Ge({VTab:{color:M(e,"color"),direction:M(e,"direction"),stacked:M(e,"stacked"),fixed:M(e,"fixedTabs"),sliderColor:M(e,"sliderColor"),hideSlider:M(e,"hideSlider")}}),ie(()=>{const[v]=be.filterProps(e);return t(be,ne(v,{modelValue:m.value,"onUpdate:modelValue":c=>m.value=c,class:["v-tabs",`v-tabs--${e.direction}`,`v-tabs--align-tabs-${e.alignTabs}`,{"v-tabs--fixed-tabs":e.fixedTabs,"v-tabs--grow":e.grow,"v-tabs--stacked":e.stacked},n.value,r.value,e.class],style:[{"--v-tabs-height":Ne(e.height)},l.value,e.style],role:"tablist",symbol:pe}),{default:()=>[i.default?i.default():y.value.map(c=>t(Y,ne(c,{key:c.title}),null))]})}),{}}}),at={class:"max-section-width"},st=p("h3",{class:"text-h3 text-primary"}," Try Sample Scenes ",-1),nt=p("p",{class:"text-body-2"}," Selecting from our sample scenes below to start visualize our range of high-quality manufactured stone and brick veneers. ",-1),ot={class:"image-mask image-container"},it={class:"image-mask image-container"},rt=["src","onClick"],ut={class:"image-mask image-container"},ct={class:"image-mask image-container"},dt=["src","onClick"],ft={class:"image-mask image-container"},vt={class:"image-mask image-container"},mt=["src"],Ct=De({__name:"index",setup(e){const u=b(),i=Le(),m=Ue(),y=b([]),n=b([]),r=b([]),l=v=>{localStorage.setItem("visualizeImage",JSON.stringify(v)),m.replace(i.query.to?String(i.query.to):"/visualizer")};return(v,c)=>{const f=We("PuSkeleton");return x(),$("section",at,[t(w,null,{default:s(()=>[t(V,{cols:"12",md:"6",class:"d-flex flex-column gap-y-2"},{default:s(()=>[st,nt]),_:1})]),_:1}),t(w,null,{default:s(()=>[t(V,null,{default:s(()=>[t(se,{variant:"outlined",to:{name:"visualizer-upload"}},{default:s(()=>[B(" Upload Photo ")]),_:1})]),_:1})]),_:1}),t(w,null,{default:s(()=>[t(V,null,{default:s(()=>[t(Xe,null,{default:s(()=>[t(Ye,null,{default:s(()=>[t(lt,{modelValue:R(u),"onUpdate:modelValue":c[0]||(c[0]=o=>ye(u)?u.value=o:null)},{default:s(()=>[t(Y,{value:"interior"},{default:s(()=>[B(" Interior ")]),_:1}),t(Y,{value:"exterior"},{default:s(()=>[B(" Exterior ")]),_:1}),t(Y,{value:"mantle"},{default:s(()=>[B(" Non-Combustible Mantle ")]),_:1})]),_:1},8,["modelValue"]),t(Qe,{modelValue:R(u),"onUpdate:modelValue":c[1]||(c[1]=o=>ye(u)?u.value=o:null)},{default:s(()=>[t(le,{value:"interior",style:{padding:"1rem"}},{default:s(()=>[R(y).length===0?(x(),j(w,{key:0,class:"d-flex",style:{"justify-content":"center"}},{default:s(()=>[(x(),$(G,null,N(7,o=>t(V,{key:o,class:"text-center d-flex justify-center flex-column",cols:"12",sm:"6",md:"3",lg:"2",style:{"align-items":"center"}},{default:s(()=>[p("div",ot,[t(f,{width:"200px",height:"8rem"})]),t(D,{class:"text-body-2",style:{"font-size":".9rem"}},{default:s(()=>[t(f,{width:"5rem"})]),_:1})]),_:2},1024)),64))]),_:1})):ee("",!0),t(w,{class:"d-flex",style:{"justify-content":"center"}},{default:s(()=>[(x(!0),$(G,null,N(R(y),o=>(x(),j(V,{key:o.image,class:"text-center d-flex justify-center flex-column",cols:"12",sm:"6",md:"3",lg:"2",style:{"align-items":"center"}},{default:s(()=>[p("div",it,[p("img",{src:o.image,onClick:h=>l(o)},null,8,rt),t(ae,{class:"checkbox"})]),t(D,{class:"text-body-2",style:{"font-size":".9rem"}},{default:s(()=>[B(te(`Total Area: ${Math.ceil(Math.random()*1e3)}sqm.`),1)]),_:1})]),_:2},1024))),128))]),_:1})]),_:1}),t(le,{value:"exterior",style:{padding:"1rem"}},{default:s(()=>[R(n).length===0?(x(),j(w,{key:0,class:"d-flex",style:{"justify-content":"center"}},{default:s(()=>[(x(),$(G,null,N(7,o=>t(V,{key:o,class:"text-center d-flex justify-center flex-column",cols:"12",sm:"6",md:"3",lg:"2",style:{"align-items":"center"}},{default:s(()=>[p("div",ut,[t(f,{width:"200px",height:"8rem"})]),t(D,{class:"text-body-2",style:{"font-size":".9rem"}},{default:s(()=>[t(f,{width:"5rem"})]),_:1})]),_:2},1024)),64))]),_:1})):ee("",!0),t(w,{class:"d-flex",style:{"justify-content":"center"}},{default:s(()=>[(x(!0),$(G,null,N(R(n),o=>(x(),j(V,{key:o.image,class:"text-center",cols:"12",sm:"6",md:"3",lg:"2"},{default:s(()=>[p("div",ct,[p("img",{src:o.image,onClick:h=>l(o)},null,8,dt),t(ae,{class:"checkbox"})]),t(D,{class:"text-p",style:{"font-size":".9rem","margin-block-start":".4rem"}},{default:s(()=>[B(te(`Total Area: ${Math.ceil(Math.random()*1e3)}sqm.`),1)]),_:1})]),_:2},1024))),128))]),_:1})]),_:1}),t(le,{value:"mantle",style:{padding:"1rem"}},{default:s(()=>[R(r).length===0?(x(),j(w,{key:0,class:"d-flex",style:{"justify-content":"center"}},{default:s(()=>[(x(),$(G,null,N(7,o=>t(V,{key:o,class:"text-center d-flex justify-center flex-column",cols:"12",sm:"6",md:"3",lg:"2",style:{"align-items":"center"}},{default:s(()=>[p("div",ft,[t(f,{width:"200px",height:"8rem"})]),t(D,{class:"text-body-2",style:{"font-size":".9rem"}},{default:s(()=>[t(f,{width:"5rem"})]),_:1})]),_:2},1024)),64))]),_:1})):ee("",!0),t(w,{class:"d-flex",style:{"justify-content":"center"}},{default:s(()=>[(x(!0),$(G,null,N(R(r),o=>(x(),j(V,{key:o.image,class:"text-center",cols:"12",sm:"6",md:"3",lg:"2"},{default:s(()=>[p("div",vt,[p("img",{src:o.image},null,8,mt),t(ae,{class:"checkbox"})]),t(D,{class:"text-p",style:{"font-size":".9rem","margin-block-start":".4rem"}},{default:s(()=>[B(te(`Total Area: ${Math.ceil(Math.random()*1e3)}sqm.`),1)]),_:1})]),_:2},1024))),128))]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1})])}}});export{Ct as default};