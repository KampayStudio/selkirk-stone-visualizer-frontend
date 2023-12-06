import{d as S,A,r as w,o as m,m as I,w as a,p as e,B as v,J as B,K as z,L as _,k as f,s as c,I as u,M as h,N as L,P,g,F as V,H as R,O as T,C as $,i as k,n as M,Q as E,R as F,q as O,S as U,e as D}from"./index-91a30c6b.js";import{V as x,a as j}from"./VListItemAction-d3329579.js";import{V as H}from"./VMenu-17854580.js";import{V as W}from"./VTooltip-c3e8573e.js";import{V as y}from"./VDivider-bea1aaf1.js";import{V as Y,a as C,b as N,c as q}from"./VList-5bfa1537.js";import"./forwardRefs-9d31fcaa.js";import"./VOverlay-9a5889e3.js";const J=d=>d?d.split(" ").map(s=>s.charAt(0).toUpperCase()).join(""):"",K={key:0},Q={class:"text-xs text-disabled"},G={class:"d-flex flex-column align-center gap-4"},X={style:{width:"28px",height:"28px"}},Z=S({__name:"Notifications",props:{notifications:null,badgeProps:{default:void 0},location:{default:"bottom end"}},emits:["read","unread","remove","click:notification"],setup(d,{emit:l}){const s=d,r=A(()=>s.notifications.some(n=>n.isSeen===!0)),p=()=>{const n=s.notifications.map(o=>o.id);r.value?l("unread",n):l("read",n)};return(n,o)=>{const i=w("IconBtn");return m(),I(x,U({"model-value":!!s.badgeProps},s.badgeProps),{default:a(()=>[e(i,null,{default:a(()=>[e(x,{dot:"","model-value":s.notifications.some(t=>!t.isSeen),color:"error",bordered:"","offset-x":"1","offset-y":"1"},{default:a(()=>[e(v,{size:"22",icon:"bx-bell"})]),_:1},8,["model-value"]),e(H,{activator:"parent",width:"380px",location:s.location,offset:"14px","close-on-content-click":!1},{default:a(()=>[e(B,{class:"d-flex flex-column"},{default:a(()=>[e(z,{class:"notification-section"},{append:a(()=>[_(e(i,{onClick:p},{default:a(()=>[e(v,{icon:f(r)?"bx-envelope":"bx-envelope-open"},null,8,["icon"]),e(W,{activator:"parent",location:"start"},{default:a(()=>[c(u(f(r)?"Mark all as unread":"Mark all as read"),1)]),_:1})]),_:1},512),[[h,s.notifications.length]])]),default:a(()=>[e(L,{class:"text-lg"},{default:a(()=>[c(" Notifications ")]),_:1})]),_:1}),e(y),e(f(P),{options:{wheelPropagation:!1},style:{"max-height":"23.75rem"}},{default:a(()=>[e(Y,{class:"py-0"},{default:a(()=>[(m(!0),g(V,null,R(s.notifications,t=>(m(),g(V,{key:t.title},[e(C,{link:"",lines:"one","min-height":"66px",class:"list-item-hover-class",onClick:b=>n.$emit("click:notification",t)},{prepend:a(()=>[e(j,{start:""},{default:a(()=>[e(T,{color:t.color||"primary",image:t.img||void 0,icon:t.icon||void 0,size:"40",variant:"tonal"},{default:a(()=>[t.text?(m(),g("span",K,u(f(J)(t.text)),1)):$("",!0)]),_:2},1032,["color","image","icon"])]),_:2},1024)]),append:a(()=>[k("div",G,[e(x,{dot:"",color:t.isSeen?"#a8aaae":"primary",class:M(`${t.isSeen?"visible-in-hover":""} ms-1`),onClick:E(b=>n.$emit(t.isSeen?"unread":"read",[t.id]),["stop"])},null,8,["color","class","onClick"]),k("div",X,[e(i,{size:"x-small",class:"visible-in-hover",onClick:b=>n.$emit("remove",t.id)},{default:a(()=>[e(v,{size:"20",icon:"bx-x"})]),_:2},1032,["onClick"])])])]),default:a(()=>[e(N,null,{default:a(()=>[c(u(t.title),1)]),_:2},1024),e(q,null,{default:a(()=>[c(u(t.subtitle),1)]),_:2},1024),k("span",Q,u(t.time),1)]),_:2},1032,["onClick"]),e(y)],64))),128)),_(e(C,{class:"text-center text-medium-emphasis",style:{height:"56px"}},{default:a(()=>[e(N,null,{default:a(()=>[c("No Notification Found!")]),_:1})]),_:1},512),[[h,!s.notifications.length]])]),_:1})]),_:1}),_(e(F,{class:"notification-footer"},{default:a(()=>[e(O,{block:""},{default:a(()=>[c(" VIEW ALL NOTIFICATIONS ")]),_:1})]),_:1},512),[[h,s.notifications.length]])]),_:1})]),_:1},8,["location"])]),_:1})]),_:1},16,["model-value"])}}});const ee="/selkirk-stone-visualizer-frontend/assets/avatar-3-c4f5e15c.png",te="/selkirk-stone-visualizer-frontend/assets/avatar-4-51fa719c.png",ae="/selkirk-stone-visualizer-frontend/assets/avatar-5-1ef2dffe.png",se="/selkirk-stone-visualizer-frontend/assets/paypal-01b645d1.svg",me=S({__name:"NavBarNotifications",setup(d){const l=D([{id:1,img:te,title:"Congratulation Flora! 🎉",subtitle:"Won the monthly best seller badge",time:"Today",isSeen:!0},{id:2,text:"Tom Holland",title:"New user registered.",subtitle:"5 hours ago",time:"Yesterday",isSeen:!1},{id:3,img:ae,title:"New message received 👋🏻",subtitle:"You have 10 unread messages",time:"11 Aug",isSeen:!0},{id:4,img:se,title:"Paypal",subtitle:"Received Payment",time:"25 May",isSeen:!1,color:"error"},{id:5,img:ee,title:"Received Order 📦",subtitle:"New order received from john",time:"19 Mar",isSeen:!0}]),s=o=>{l.value.forEach((i,t)=>{o===i.id&&l.value.splice(t,1)})},r=o=>{l.value.forEach(i=>{o.forEach(t=>{t===i.id&&(i.isSeen=!0)})})},p=o=>{l.value.forEach(i=>{o.forEach(t=>{t===i.id&&(i.isSeen=!1)})})},n=o=>{o.isSeen||r([o.id])};return(o,i)=>{const t=Z;return m(),I(t,{notifications:f(l),onRemove:s,onRead:r,onUnread:p,"onClick:notification":n},null,8,["notifications"])}}});export{me as default};