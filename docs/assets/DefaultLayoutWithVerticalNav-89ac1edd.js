import{e as l,m,d as T,z as w,l as y,b as B,A as I,B as A,r as i,o as a,p as n,w as t,i as L,k as e,q as o,C as R,x as r,s as S,v as W,T as D,y as H,_ as $}from"./index-3df34c37.js";import{_ as z}from"./UserProfile.vue_vue_type_script_setup_true_lang-e54cd4aa.js";import{V as F}from"./VSpacer-9f950343.js";import"./axios-526f6025.js";import"./VMenu-dda5d050.js";import"./forwardRefs-a29b5f65.js";import"./VOverlay-8de04a1c.js";import"./lazy-09ec8d27.js";import"./easing-9f15041e.js";import"./dialog-transition-cf5a04f4.js";import"./VList-3bed2bd6.js";import"./ssrBoot-e470b718.js";import"./VDivider-ecfa848b.js";import"./VListItemAction-7d259798.js";const q=l(localStorage.getItem("authToken")),O=m(()=>!!q.value),j=[{title:"Home",to:{name:"index"},icon:{icon:"bx-home-alt"}},{title:"Collection",to:{name:"collection"},icon:{icon:"bx-file-blank"},disable:!0}],E=[{title:"Home",to:{name:"index"},icon:{icon:"bx-home-alt"}}],G=O.value?j:E,J={class:"d-flex h-100 align-center"},le=T({__name:"DefaultLayoutWithVerticalNav",setup(K){w(s=>({"1f7023e3":e(g),"77bd8e70":e(_),"6aee8e20":e(h)}));const{appRouteTransition:p,isLessThanOverlayNavBreakpoint:v,isVerticalNavCollapsed:u}=y(),{width:f}=B(),_=l(null);I(u,s=>{_.value=s?"rotate-180":"rotate-back-180"});const h=u.value?"180deg":"0deg",{global:k}=A(),g=m(()=>k.current.value.colors.background),x=l(localStorage.getItem("authToken")),d=m(()=>!x.value);return(s,M)=>{const V=i("IconBtn"),b=i("RouterLink"),C=i("RouterView"),N=i("Footer");return a(),n(e($),{"nav-items":e(G)},{navbar:t(({toggleVerticalOverlayNavActive:c})=>[L("div",J,[e(v)(e(f))?(a(),n(V,{key:0,class:"ms-n3",onClick:P=>c(!0)},{default:t(()=>[o(R,{icon:"bx-menu"})]),_:2},1032,["onClick"])):r("",!0),o(F),e(d)?r("",!0):(a(),n(z,{key:1})),e(d)?(a(),n(b,{key:2,to:"/login"},{default:t(()=>[o(S,{variant:"text"},{default:t(()=>[W(" Login ")]),_:1})]),_:1})):r("",!0)])]),footer:t(()=>[o(N)]),default:t(()=>[o(C,null,{default:t(({Component:c})=>[o(D,{name:e(p),mode:"out-in"},{default:t(()=>[(a(),n(H(c)))]),_:2},1032,["name"])]),_:1})]),_:1},8,["nav-items"])}}});export{le as default};
