import{a2 as g,a8 as x,a9 as m,aa as P,ab as T,ac as b,ad as A,ae as L,af as I,ag as c,ah as R,ai as _,aj as w,A as $,ak as M,a6 as f,al as X,p as o,am as Y,M as j,N as D,W as u,C as W}from"./index-c4d134a5.js";const z=g()({name:"VBadge",inheritAttrs:!1,props:{bordered:Boolean,color:String,content:[Number,String],dot:Boolean,floating:Boolean,icon:x,inline:Boolean,label:{type:String,default:"$vuetify.badge"},max:[Number,String],modelValue:{type:Boolean,default:!0},offsetX:[Number,String],offsetY:[Number,String],textColor:String,...m(),...P({location:"top end"}),...T(),...b(),...A(),...L({transition:"scale-rotate-transition"})},setup(e,t){const{backgroundColorClasses:n,backgroundColorStyles:v}=I(c(e,"color")),{roundedClasses:C}=R(e),{t:y}=_(),{textColorClasses:k,textColorStyles:B}=w(c(e,"textColor")),{themeClasses:S}=$(),{locationStyles:V}=M(e,!0,a=>(e.floating?e.dot?2:4:e.dot?8:12)+(["top","bottom"].includes(a)?+(e.offsetY??0):["left","right"].includes(a)?+(e.offsetX??0):0));return f(()=>{const a=Number(e.content),s=!e.max||isNaN(a)?e.content:a<=+e.max?a:`${e.max}+`,[N,h]=X(t.attrs,["aria-atomic","aria-label","aria-live","role","title"]);return o(e.tag,u({class:["v-badge",{"v-badge--bordered":e.bordered,"v-badge--dot":e.dot,"v-badge--floating":e.floating,"v-badge--inline":e.inline},e.class]},h,{style:e.style}),{default:()=>{var l,i;return[o("div",{class:"v-badge__wrapper"},[(i=(l=t.slots).default)==null?void 0:i.call(l),o(Y,{transition:e.transition},{default:()=>{var r,d;return[j(o("span",u({class:["v-badge__badge",S.value,n.value,C.value,k.value],style:[v.value,B.value,e.inline?{}:V.value],"aria-atomic":"true","aria-label":y(e.label,a),"aria-live":"polite",role:"status"},N),[e.dot?void 0:t.slots.badge?(d=(r=t.slots).badge)==null?void 0:d.call(r):e.icon?o(W,{icon:e.icon},null):s]),[[D,e.modelValue]])]}})])]}})}),{}}}),E=g()({name:"VListItemAction",props:{start:Boolean,end:Boolean,...m(),...b()},setup(e,t){let{slots:n}=t;return f(()=>o(e.tag,{class:["v-list-item-action",{"v-list-item-action--start":e.start,"v-list-item-action--end":e.end},e.class],style:e.style},n)),{}}});export{z as V,E as a};
