import{d as i,l as d,a1 as x,y as f,r as T,o as p,m as l,w as c,p as m,B as v,k as r,i as w,I as B}from"./index-f608e199.js";import{V as C}from"./VTooltip-4b43bac0.js";const N={class:"text-capitalize"},V=i({__name:"ThemeSwitcher",props:{themes:null},setup(s){const e=s,{theme:t}=d(),{state:a,next:o,index:h}=x(e.themes.map(n=>n.name),{initialValue:t.value}),_=()=>{t.value=o()};return f(t,n=>{a.value=n}),(n,g)=>{const u=T("IconBtn");return p(),l(u,{onClick:_},{default:c(()=>[m(v,{size:"22",icon:e.themes[r(h)].icon},null,8,["icon"]),m(C,{activator:"parent","open-delay":"1000"},{default:c(()=>[w("span",N,B(r(a)),1)]),_:1})]),_:1})}}}),I=i({__name:"NavbarThemeSwitcher",setup(s){const e=[{name:"system",icon:"mdi-laptop"},{name:"light",icon:"bx-sun"},{name:"dark",icon:"bx-moon"}];return(t,a)=>{const o=V;return p(),l(o,{themes:e})}}});export{I as _};
