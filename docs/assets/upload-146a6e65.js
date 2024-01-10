import{a3 as w,a7 as P,q as e,W as b,a4 as F,a9 as x,a6 as U,m as $,a5 as N,ao as O,F as T,d as M,e as g,o as j,g as q,w as l,G as d,H as p,s as E,v as I,i as t,k as z,I as H,S as C,C as K}from"./index-7a81ad94.js";import{m as L,V as k,a as W}from"./VInput-6bf6b22d.js";import{m as J,V as D,a as Q,b as X}from"./VSelectionControl-553768e5.js";const h=w()({name:"VRadio",props:{...J({falseIcon:"$radioOff",trueIcon:"$radioOn"})},setup(a,s){let{slots:o}=s;return P(()=>e(D,b(a,{class:["v-radio",a.class],style:a.style,type:"radio"}),o)),{}}});const Y=w()({name:"VRadioGroup",inheritAttrs:!1,props:{height:{type:[Number,String],default:"auto"},...L(),...F(Q(),["multiple"]),trueIcon:{type:x,default:"$radioOn"},falseIcon:{type:x,default:"$radioOff"},type:{type:String,default:"radio"}},emits:{"update:modelValue":a=>!0},setup(a,s){let{attrs:o,slots:n}=s;const f=U(),c=$(()=>a.id||`radio-group-${f}`),u=N(a,"modelValue");return P(()=>{const[m,r]=O(o),[i,V]=k.filterProps(a),[R,re]=D.filterProps(a),y=n.label?n.label({label:a.label,props:{for:c.value}}):a.label;return e(k,b({class:["v-radio-group",a.class],style:a.style},m,i,{modelValue:u.value,"onUpdate:modelValue":_=>u.value=_,id:c.value}),{...n,default:_=>{let{id:v,messagesId:S,isDisabled:A,isReadonly:G}=_;return e(T,null,[y&&e(W,{id:v.value},{default:()=>[y]}),e(X,b(R,{id:v.value,"aria-describedby":S.value,defaultsTarget:"VRadio",trueIcon:a.trueIcon,falseIcon:a.falseIcon,type:a.type,disabled:A.value,readonly:G.value,"aria-labelledby":y?v.value:void 0,multiple:!1},r,{modelValue:u.value,"onUpdate:modelValue":B=>u.value=B}),n)])}})}),{}}}),Z={class:"max-section-width"},ee=t("h3",{class:"text-h3 text-primary"}," Upload Photo ",-1),ae=t("p",{class:"text-body-2"}," Upload your own project image and our advanced A.I. technology will process it, enabling you to visualize our range of high-quality manufactured stone and brick veneers ",-1),te=t("p",{class:"text-body-2 text-secondary"}," Select the type of your project: ",-1),le=["onDragover","onDrop"],oe=t("span",null,"Drag & Drop or Browse",-1),se=t("p",{class:"text-body-2"}," To achieve optimal outcomes, please adhere to these guidelines for your image: ",-1),ne=t("ol",null,[t("li",{class:"text-body-2"}," -Ensure a minimum width of 1600px and a landscape orientation. "),t("li",{class:"text-body-2"}," -Keep the file size within 16MB. "),t("li",{class:"text-body-2"}," -Capture the subject clearly without any obstructions. "),t("li",{class:"text-body-2"}," -Provide a high-quality image free from any blurriness or distortions. ")],-1),ce=M({__name:"upload",setup(a){const s=g("interior"),o=g([]),n=g(null),f=r=>{},c=r=>{const i=r.dataTransfer.files;i.length>0&&(o.value=[...o.value,...Array.from(i)])},u=r=>{o.value=[...o.value,...Array.from(r.target.files)]},m=()=>{n.value.click()};return(r,i)=>(j(),q("section",Z,[e(p,null,{default:l(()=>[e(d,{cols:"12",md:"6",class:"d-flex flex-column gap-y-2"},{default:l(()=>[ee,ae]),_:1})]),_:1}),e(p,null,{default:l(()=>[e(d,null,{default:l(()=>[e(E,{variant:"outlined",to:{name:"sample-scenes"}},{default:l(()=>[I(" Try Sample Scene ")]),_:1})]),_:1})]),_:1}),e(p,null,{default:l(()=>[e(d,null,{default:l(()=>[t("div",null,[te,e(Y,{modelValue:z(s),"onUpdate:modelValue":i[0]||(i[0]=V=>H(s)?s.value=V:null),inline:""},{default:l(()=>[e(h,{key:"interior",label:"Interior",value:"interior"}),e(h,{key:"exterior",label:"Exterior",value:"exterior"}),e(h,{key:"mantle",label:"Non-Combustible Mantle",value:"mantle"})]),_:1},8,["modelValue"])])]),_:1})]),_:1}),e(p,null,{default:l(()=>[e(d,{cols:"12",md:"6"},{default:l(()=>[t("div",{class:"drag-drop-area",onDragover:C(f,["prevent"]),onDrop:C(c,["prevent"]),onClick:m},[t("input",{ref_key:"fileInput",ref:n,type:"file",class:"d-none",multiple:"",onChange:u},null,544),e(K,{class:"upload-icon"},{default:l(()=>[I(" mdi-cloud-upload ")]),_:1}),oe],40,le)]),_:1}),e(d,{cols:"12",md:"6"},{default:l(()=>[se,ne]),_:1})]),_:1})]))}});export{ce as default};
