import{d as m,z as g,k as d,r as f,o as r,b as i,w as t,p as l,C as _,q as L,J as h,c as b,F as v,a as C,I,x as V,t as k}from"./index-c4d134a5.js";import{V as x}from"./VMenu-3adab595.js";import{V as B,a as w,b as y}from"./VList-51d714c5.js";import"./forwardRefs-9d31fcaa.js";import"./VOverlay-be9d63e2.js";import"./VDivider-0cf4e4ee.js";const A=m({__name:"I18n",props:{languages:null,location:{default:"bottom end"}},emits:["change"],setup(u){const o=u,{locale:s}=useI18n({useScope:"global"});g(s,n=>{document.documentElement.setAttribute("lang",n)});const a=d(["en"]);return(n,c)=>{const p=f("IconBtn");return r(),i(p,null,{default:t(()=>[l(_,{size:"22",icon:"mdi-translate"}),l(x,{activator:"parent",location:o.location,offset:"14px"},{default:t(()=>[l(B,{selected:L(a),"onUpdate:selected":c[0]||(c[0]=e=>h(a)?a.value=e:null),"active-color":"primary","min-width":"175px"},{default:t(()=>[(r(!0),b(v,null,C(o.languages,e=>(r(),i(w,{key:e.i18nLang,value:e.i18nLang,onClick:E=>{s.value=e.i18nLang,n.$emit("change",e.i18nLang)}},{default:t(()=>[l(y,null,{default:t(()=>[I(V(e.label),1)]),_:2},1024)]),_:2},1032,["value","onClick"]))),128))]),_:1},8,["selected"])]),_:1},8,["location"])]),_:1})}}}),S=m({__name:"NavBarI18n",setup(u){const{isAppRtl:o}=k(),s=[{label:"English",i18nLang:"en"},{label:"French",i18nLang:"fr"},{label:"Arabic",i18nLang:"ar"}],a=n=>{o.value=n==="ar"};return(n,c)=>(r(),i(A,{languages:s,onChange:a}))}});export{S as default};
