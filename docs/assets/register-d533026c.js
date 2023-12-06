import{d as E,aq as U,c as q,e as V,r as P,o as R,m as T,w as t,p as e,a4 as r,N as A,O as B,i,k as l,V as I,t as _,R as L,s as f,I as F,ap as b,W as j,a3 as u,q as z}from"./index-42734473.js";import{V as D,S as g}from"./VCheckbox-125e3b75.js";import{V as O}from"./VForm-8b610487.js";import{V as m,a as M}from"./VTextField-ba0862f1.js";import{b as y}from"./route-block-83d24a4e.js";import"./_commonjsHelpers-725317a4.js";import"./forwardRefs-9d31fcaa.js";const $=i("div",{class:"position-relative w-100"},[i("div",{id:"backdrop",class:"d-flex align-center justify-center",style:{"background-size":"cover","block-size":"100vh"}})],-1),G={class:"d-flex"},W=i("h6",{class:"text-h4 mb-1"}," Get Started ",-1),Y={class:"mb-0"},H=i("span",null,"Already have an account?",-1),J={class:"d-flex align-center mt-2 mb-4"},K={class:"mx-2 text-wrap"},Q=E({__name:"register",setup(X){const c=U(),h=q(),s=V({firstname:"",lastname:"",email:"",password:"",confirm_password:"",contactNo:"",address:"",privacyPolicies:!1}),d=V(!1);function w(){function p(){const{firstname:n,lastname:o,email:x,password:v,confirm_password:C,contactNo:N,address:S,privacyPolicies:k}=s.value;return n.length<=1?(a("Error!","First name must be longer than 1 character"),!1):o.length<=3?(a("Error!","Last name must be longer than 3 characters"),!1):x.length<=3?(a("Error!","Email must be longer than 3 characters"),!1):v.length<=5?(a("Error!","Password must be longer than 5 characters"),!1):C.length<=8?(a("Error!","Confirm password must be longer than 8 characters"),!1):N.length<=10?(a("Error!","Contact number must be longer than 10 characters"),!1):S.length<=5?(a("Error!","Address must be longer than 5 characters"),!1):k?!0:(a("Unable to Sign up!","You must accept the Terms and Condition"),!1)}function a(n,o){g.fire({title:n,text:o,icon:"error",confirmButtonColor:"#1A4E19"})}p()&&g.fire({title:"Successfully Signed Up!",icon:"success",confirmButtonColor:"#1A4E19",confirmButtonText:"Login Now"}).then(n=>{n.isConfirmed&&h.replace(c.query.to?String(c.query.to):"/login")})}return(p,a)=>{const n=P("RouterLink");return R(),T(u,{"no-gutters":"",class:"auth-wrapper"},{default:t(()=>[e(r,{md:"4",class:"d-none d-md-flex"},{default:t(()=>[$]),_:1}),e(r,{cols:"12",md:"8",class:"auth-card-v2 d-flex align-center justify-center",style:{"background-color":"rgb(var(--v-theme-surface))"}},{default:t(()=>[e(A,{flat:"","max-width":900,class:"mt-12 mt-sm-0 pa-6",style:{"inline-size":"800px"}},{default:t(()=>[e(B,{class:"justify-start"},{prepend:t(()=>[e(n,{to:"/"},{default:t(()=>[i("div",G,[e(l(I),{nodes:l(_).app.logo},null,8,["nodes"])])]),_:1})]),default:t(()=>[e(L,{class:"auth-title"},{default:t(()=>[f(F(l(_).app.title),1)]),_:1})]),_:1}),e(b,null,{default:t(()=>[W,i("p",Y,[H,e(n,{class:"text-primary ms-2",to:{name:"login"}},{default:t(()=>[f(" Sign in ")]),_:1})])]),_:1}),e(b,null,{default:t(()=>[e(O,{onSubmit:j(w,["prevent"])},{default:t(()=>[e(u,null,{default:t(()=>[e(r,{cols:"12"},{default:t(()=>[e(u,null,{default:t(()=>[e(r,{cols:"12",md:"6"},{default:t(()=>[e(m,{modelValue:l(s).email,"onUpdate:modelValue":a[0]||(a[0]=o=>l(s).email=o),type:"email",autofocus:"",label:"Email",required:""},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:t(()=>[e(m,{modelValue:l(s).contactNo,"onUpdate:modelValue":a[1]||(a[1]=o=>l(s).contactNo=o),autofocus:"",label:"Contact Number",required:""},null,8,["modelValue"])]),_:1})]),_:1}),e(u,null,{default:t(()=>[e(r,{cols:"12",md:"6"},{default:t(()=>[e(m,{modelValue:l(s).firstname,"onUpdate:modelValue":a[2]||(a[2]=o=>l(s).firstname=o),autofocus:"",label:"First Name",required:""},null,8,["modelValue"])]),_:1}),e(r,{cols:"12",md:"6"},{default:t(()=>[e(m,{modelValue:l(s).lastname,"onUpdate:modelValue":a[3]||(a[3]=o=>l(s).lastname=o),autofocus:"",label:"Last Name",required:""},null,8,["modelValue"])]),_:1})]),_:1}),e(u,null,{default:t(()=>[e(r,{cols:"12"},{default:t(()=>[e(m,{modelValue:l(s).address,"onUpdate:modelValue":a[4]||(a[4]=o=>l(s).address=o),autofocus:"",label:"Address",required:""},null,8,["modelValue"])]),_:1})]),_:1}),e(u,null,{default:t(()=>[e(r,{cols:"12",md:"6"},{default:t(()=>[e(m,{modelValue:l(s).password,"onUpdate:modelValue":a[5]||(a[5]=o=>l(s).password=o),label:"Password",type:l(d)?"text":"password","append-inner-icon":l(d)?"bx-hide":"bx-show","onClick:appendInner":a[6]||(a[6]=o=>d.value=!l(d))},null,8,["modelValue","type","append-inner-icon"])]),_:1}),e(r,{cols:"12",md:"6"},{default:t(()=>[e(m,{modelValue:l(s).confirm_password,"onUpdate:modelValue":a[7]||(a[7]=o=>l(s).confirm_password=o),label:"Confirm Password",type:l(d)?"text":"password","append-inner-icon":l(d)?"bx-hide":"bx-show","onClick:appendInner":a[8]||(a[8]=o=>d.value=!l(d))},null,8,["modelValue","type","append-inner-icon"])]),_:1})]),_:1}),i("div",J,[e(D,{id:"privacy-policy",modelValue:l(s).privacyPolicies,"onUpdate:modelValue":a[9]||(a[9]=o=>l(s).privacyPolicies=o),inline:""},null,8,["modelValue"]),e(M,{for:"privacy-policy",style:{opacity:"1"}},{default:t(()=>[i("span",K,[f("I agree to "),e(n,{class:"text-primary",to:{name:"terms-and-condition"}},{default:t(()=>[f(" TERMS AND CONDITIONS ")]),_:1})])]),_:1})]),e(u,{class:"d-flex justify-content-end"},{default:t(()=>[e(r,{cols:"12",md:"2",class:"ms-auto"},{default:t(()=>[e(z,{type:"submit"},{default:t(()=>[f(" Sign up ")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1})]),_:1})]),_:1})}}});typeof y=="function"&&y(Q);export{Q as default};
