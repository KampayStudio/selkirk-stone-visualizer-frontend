import{d as v,ar as y,c as h,e as c,r as k,o as C,m as S,w as t,p as e,a0 as r,J as R,K as I,i as n,k as s,V as j,t as f,N as q,s as i,I as B,aq as p,Q as N,$ as u,q as _,a7 as T}from"./index-91a30c6b.js";import{V as z,S as E}from"./VCheckbox-3d3ff698.js";import{V as F}from"./VForm-9ccb6d67.js";import{V as b}from"./VTextField-610e7e27.js";import{b as g}from"./route-block-83d24a4e.js";import"./_commonjsHelpers-725317a4.js";import"./forwardRefs-9d31fcaa.js";const L="/selkirk-stone-visualizer-frontend/assets/login-background-e8b133f8.png",P={class:"d-flex"},U=n("h6",{class:"text-h4 mb-1"}," Welcome ",-1),$=n("p",{class:"mb-0"}," Sign in your account ",-1),A={class:"d-flex align-center flex-wrap justify-space-between mt-2 mb-4"},D={class:"position-relative w-100"},J={class:"d-flex align-center justify-center w-100",style:{"max-block-size":"100vh","object-fit":"cover"}},K=v({__name:"login",setup(M){const m=y(),V=h(),o=c({userid:"",password:"",remember:!1});function x(){o.value.password.length>8&&o.value.userid.length>8?V.replace(m.query.to?String(m.query.to):"/"):(localStorage.setItem("loggedIn","1"),E.fire({title:"Error!",text:"Complete the login form",icon:"error",confirmButtonColor:"#1A4E19"}))}const d=c(!1);return(Q,a)=>{const w=k("RouterLink");return C(),S(u,{class:"auth-wrapper",style:{"max-inline-size":"300rem"}},{default:t(()=>[e(r,{cols:"12",md:"4",class:"auth-card-v2 d-flex align-center justify-center",style:{"background-color":"rgb(var(--v-theme-surface))"}},{default:t(()=>[e(R,{flat:"","max-width":800,class:"mt-12 mt-sm-0 pa-6"},{default:t(()=>[e(I,{class:"justify-start"},{prepend:t(()=>[n("div",P,[e(s(j),{nodes:s(f).app.logo},null,8,["nodes"])])]),default:t(()=>[e(q,{class:"auth-title"},{default:t(()=>[i(B(s(f).app.title),1)]),_:1})]),_:1}),e(p,null,{default:t(()=>[U,$]),_:1}),e(p,null,{default:t(()=>[e(F,{onSubmit:N(x,["prevent"])},{default:t(()=>[e(u,null,{default:t(()=>[e(r,{cols:"12"},{default:t(()=>[e(b,{modelValue:s(o).userid,"onUpdate:modelValue":a[0]||(a[0]=l=>s(o).userid=l),autofocus:"",label:"Email",type:"text"},null,8,["modelValue"])]),_:1}),e(r,{cols:"12"},{default:t(()=>[e(b,{modelValue:s(o).password,"onUpdate:modelValue":a[1]||(a[1]=l=>s(o).password=l),label:"Password",type:s(d)?"text":"password","append-inner-icon":s(d)?"bx-hide":"bx-show",required:"","onClick:appendInner":a[2]||(a[2]=l=>d.value=!s(d))},null,8,["modelValue","type","append-inner-icon"]),n("div",A,[e(z,{modelValue:s(o).remember,"onUpdate:modelValue":a[3]||(a[3]=l=>s(o).remember=l),label:"Remember me"},null,8,["modelValue"]),e(w,{class:"text-primary ms-2",to:{name:"forgot-password"}},{default:t(()=>[i(" Forgot Password? ")]),_:1})]),e(u,null,{default:t(()=>[e(r,{cols:"12",md:"4"},{default:t(()=>[e(_,{block:"",type:"submit"},{default:t(()=>[i(" Login ")]),_:1})]),_:1}),e(r,{cols:"12",md:"4"},{default:t(()=>[e(_,{block:"",class:"mb-1",variant:"outlined",to:{name:"register"}},{default:t(()=>[i(" Signup ")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1})]),_:1}),e(r,{md:"8",class:"d-none d-md-flex"},{default:t(()=>[n("div",D,[n("div",J,[e(T,{src:s(L)},null,8,["src"])])])]),_:1})]),_:1})}}});typeof g=="function"&&g(K);export{K as default};