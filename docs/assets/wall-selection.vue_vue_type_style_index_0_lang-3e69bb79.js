import{d as L,e as p,ap as N,A as X,o as f,p as Y,w as n,q as i,H as v,G as m,i as d,g as y,F as V,J as R,K as W,k as x,s as A,v as F,aq as O}from"./index-7a81ad94.js";const j={class:"image-container"},z=["src"],D=["onClick","onMouseover","onMouseleave"],G=d("h1",{class:"text-h4"}," Select Wall ",-1),J=d("p",{class:"text-body-2 mt-3"}," Please choose a wall on the image you want to modify with Selkirk Stone. ",-1),K={class:"text-body-2 text-secondary"},U=L({__name:"wall-selection",props:["image"],emits:["proceed","wallSelect"],setup(h,{emit:w}){const $=h,u=p([]),S=p([]),o=p(),B=(e,l,s)=>e.map(t=>({x:t.x*l,y:t.y*s})),q=(e,l,s)=>{const t=e.getContext("2d");let a=1/0,c=1/0,_=-1/0,g=-1/0;l.forEach(r=>{a=Math.min(a,r.x),c=Math.min(c,r.y),_=Math.max(_,r.x),g=Math.max(g,r.y)});const M=_-a,C=g-c;e.width=M,e.height=C,e.style.left=`${a}px`,e.style.top=`${c}px`,s.style.left=`${a}px`,s.style.top=`${c}px`,t.clearRect(0,0,M,C),t.fillStyle="rgba(26, 78, 25, 1)",t.beginPath(),l.forEach((r,H)=>{const b=r.x-a,E=r.y-c;H===0?t.moveTo(b,E):t.lineTo(b,E)}),t.closePath(),t.fill()},k=()=>{const e=document.querySelector(".image-container img");if(!e)return;const l=e.clientWidth/e.naturalWidth,s=e.clientHeight/e.naturalHeight;$.image.wall_shape.shapes.forEach((t,a)=>{const c=B(t,l,s);u.value[a]&&q(u.value[a],c,S.value[a])})};N(()=>{const e=document.querySelector(".image-container img");e.complete?k():e.addEventListener("load",k)});const I=e=>{o.value===e?o.value=-1:o.value=e,w("wallSelect",o.value)};X(o,e=>{u.value.forEach((l,s)=>{l.style.opacity=s===e?"0.7":"0.1"})});const P=e=>{u.value[e].style.opacity=o.value===e?"0.7":"0.1"},T=e=>{u.value[e].style.opacity="0.7"};return(e,l)=>(f(),Y(O,null,{default:n(()=>[i(v,null,{default:n(()=>[i(m,{cols:"6",class:"d-flex justify-center"},{default:n(()=>[d("div",j,[d("img",{src:h.image.image,class:"img-background"},null,8,z),(f(!0),y(V,null,R(h.image.wall_shape.shapes,(s,t)=>(f(),y("canvas",{key:t,ref_for:!0,ref_key:"canvasRefs",ref:u,class:"shape-canvas",onClick:a=>I(t),onMouseover:()=>T(t),onMouseleave:a=>P(t)},null,40,D))),128)),(f(!0),y(V,null,R(h.image.wall_shape.shapes,(s,t)=>(f(),y("div",{key:t,ref_for:!0,ref_key:"labelRefs",ref:S,class:"box-index"},W(t+1),1))),128))])]),_:1}),i(m,{class:"d-flex align-center",cols:"6"},{default:n(()=>[d("div",null,[i(v,null,{default:n(()=>[i(m,null,{default:n(()=>[G,J,d("h3",K," Selected Wall: "+W(x(o)+1?x(o)+1:"N/A"),1)]),_:1})]),_:1}),i(v,null,{default:n(()=>[i(m,{class:"d-flex gap-x-3"},{default:n(()=>[i(A,{disabled:!(x(o)+1),onClick:l[0]||(l[0]=()=>w("proceed","visualize"))},{default:n(()=>[F(" Proceed ")]),_:1},8,["disabled"])]),_:1})]),_:1})])]),_:1})]),_:1})]),_:1}))}});export{U as _};
