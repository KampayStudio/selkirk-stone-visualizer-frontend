import{m as he,V as Q}from"./VTextField-34f7eac4.js";import{f as ye}from"./forwardRefs-a29b5f65.js";import{a3 as J,aY as te,aa as ne,at as ke,ad as se,ae as ce,b3 as ue,aI as ie,aw as be,aF as Ce,ah as R,a7 as oe,q as n,b4 as ge,a9 as $,b5 as Z,b6 as Ve,aD as pe,b7 as Ie,aL as Pe,ac as Fe,b8 as Se,b9 as we,aj as re,ba as xe,bb as De,aE as Be,bc as Le,ai as Ae,bd as Me,a5 as X,aN as Ke,be as Oe,m as B,N as W,aJ as q,bf as Te,bg as _e,C as j,b1 as _,O as Ee,F as Y,R as ee,W as O,as as de,a4 as Re,af as je,e as T,b2 as fe,v as $e,X as Ne,k as ae,aW as ze}from"./index-7a81ad94.js";import{m as Ge,u as Ue,V as He,a as le}from"./VList-29c625f1.js";import{u as We}from"./VInput-6bf6b22d.js";import{V as Xe}from"./dialog-transition-0d402282.js";import{V as Ye}from"./VMenu-0025b6b4.js";import{V as Je}from"./VCheckboxBtn-f64edf0f.js";const ve=Symbol.for("vuetify:v-chip-group");J()({name:"VChipGroup",props:{column:Boolean,filter:Boolean,valueComparator:{type:Function,default:te},...ne(),...ke({selectedClass:"v-chip--selected"}),...se(),...ce(),...ue({variant:"tonal"})},emits:{"update:modelValue":e=>!0},setup(e,m){let{slots:a}=m;const{themeClasses:y}=ie(e),{isSelected:s,select:g,next:h,prev:o,selected:d}=be(e,ve);return Ce({VChip:{color:R(e,"color"),disabled:R(e,"disabled"),filter:R(e,"filter"),variant:R(e,"variant")}}),oe(()=>n(e.tag,{class:["v-chip-group",{"v-chip-group--column":e.column},y.value,e.class],style:e.style},{default:()=>{var f;return[(f=a.default)==null?void 0:f.call(a,{isSelected:s,select:g,next:h,prev:o,selected:d.value})]}})),{}}});const Qe=J()({name:"VChip",directives:{Ripple:ge},props:{activeClass:String,appendAvatar:String,appendIcon:$,closable:Boolean,closeIcon:{type:$,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:{type:Boolean,default:void 0},pill:Boolean,prependAvatar:String,prependIcon:$,ripple:{type:Boolean,default:!0},text:String,modelValue:{type:Boolean,default:!0},onClick:Z(),onClickOnce:Z(),...Ve(),...ne(),...pe(),...Ie(),...Pe(),...Fe(),...Se(),...we(),...se({tag:"span"}),...ce(),...ue({variant:"tonal"})},emits:{"click:close":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0,click:e=>!0},setup(e,m){let{attrs:a,emit:y,slots:s}=m;const{t:g}=re(),{borderClasses:h}=xe(e),{colorClasses:o,colorStyles:d,variantClasses:f}=De(e),{densityClasses:S}=Be(e),{elevationClasses:i}=Le(e),{roundedClasses:r}=Ae(e),{sizeClasses:k}=Me(e),{themeClasses:D}=ie(e),P=X(e,"modelValue"),t=Ke(e,ve,!1),b=Oe(e,a),w=B(()=>e.link!==!1&&b.isLink.value),C=B(()=>!e.disabled&&e.link!==!1&&(!!t||e.link||b.isClickable.value)),N=B(()=>({"aria-label":g(e.closeLabel),onClick(v){P.value=!1,y("click:close",v)}}));function E(v){var L;y("click",v),C.value&&((L=b.navigate)==null||L.call(b,v),t==null||t.toggle())}function z(v){(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),E(v))}return()=>{const v=b.isLink.value?"a":e.tag,L=!!(e.appendIcon||e.appendAvatar),G=!!(L||s.append),U=!!(s.close||e.closable),l=!!(s.filter||e.filter)&&t,c=!!(e.prependIcon||e.prependAvatar),p=!!(c||s.prepend),A=!t||t.isSelected.value;return P.value&&W(n(v,{class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":C.value,"v-chip--filter":l,"v-chip--pill":e.pill},D.value,h.value,A?o.value:void 0,S.value,i.value,r.value,k.value,f.value,t==null?void 0:t.selectedClass.value,e.class],style:[A?d.value:void 0,e.style],disabled:e.disabled||void 0,draggable:e.draggable,href:b.href.value,tabindex:C.value?0:void 0,onClick:E,onKeydown:C.value&&!w.value&&z},{default:()=>{var M;return[Te(C.value,"v-chip"),l&&n(_e,{key:"filter"},{default:()=>[W(n("div",{class:"v-chip__filter"},[s.filter?W(n(_,{key:"filter-defaults",disabled:!e.filterIcon,defaults:{VIcon:{icon:e.filterIcon}}},null),[[q("slot"),s.filter,"default"]]):n(j,{key:"filter-icon",icon:e.filterIcon},null)]),[[Ee,t.isSelected.value]])]}),p&&n("div",{key:"prepend",class:"v-chip__prepend"},[s.prepend?n(_,{key:"prepend-defaults",disabled:!c,defaults:{VAvatar:{image:e.prependAvatar,start:!0},VIcon:{icon:e.prependIcon,start:!0}}},s.prepend):n(Y,null,[e.prependIcon&&n(j,{key:"prepend-icon",icon:e.prependIcon,start:!0},null),e.prependAvatar&&n(ee,{key:"prepend-avatar",image:e.prependAvatar,start:!0},null)])]),((M=s.default)==null?void 0:M.call(s,{isSelected:t==null?void 0:t.isSelected.value,selectedClass:t==null?void 0:t.selectedClass.value,select:t==null?void 0:t.select,toggle:t==null?void 0:t.toggle,value:t==null?void 0:t.value.value,disabled:e.disabled}))??e.text,G&&n("div",{key:"append",class:"v-chip__append"},[s.append?n(_,{key:"append-defaults",disabled:!L,defaults:{VAvatar:{end:!0,image:e.appendAvatar},VIcon:{end:!0,icon:e.appendIcon}}},s.append):n(Y,null,[e.appendIcon&&n(j,{key:"append-icon",end:!0,icon:e.appendIcon},null),e.appendAvatar&&n(ee,{key:"append-avatar",end:!0,image:e.appendAvatar},null)])]),U&&n("div",O({key:"close",class:"v-chip__close"},N.value),[s.close?n(_,{key:"close-defaults",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},s.close):n(j,{key:"close-icon",icon:e.closeIcon,size:"x-small"},null)])]}}),[[q("ripple"),C.value&&e.ripple,null]])}}}),Ze=de({chips:Boolean,closableChips:Boolean,eager:Boolean,hideNoData:Boolean,hideSelected:Boolean,menu:Boolean,menuIcon:{type:$,default:"$dropdown"},menuProps:{type:Object},multiple:Boolean,noDataText:{type:String,default:"$vuetify.noDataText"},openOnClear:Boolean,valueComparator:{type:Function,default:te},...Ge({itemChildren:!1})},"v-select"),oa=J()({name:"VSelect",props:{...Ze(),...Re(he({modelValue:null}),["validationValue","dirty","appendInnerIcon"]),...je({transition:{component:Xe}})},emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,"update:menu":e=>!0},setup(e,m){let{slots:a}=m;const{t:y}=re(),s=T(),g=T(),h=X(e,"menu"),o=B({get:()=>h.value,set:l=>{var c;h.value&&!l&&((c=g.value)!=null&&c.ΨopenChildren)||(h.value=l)}}),{items:d,transformIn:f,transformOut:S}=Ue(e),i=X(e,"modelValue",[],l=>f(fe(l)),l=>{const c=S(l);return e.multiple?c:c[0]??null}),r=We(),k=B(()=>i.value.map(l=>d.value.find(c=>e.valueComparator(c.value,l.value))||l)),D=B(()=>k.value.map(l=>l.props.value)),P=T(!1);let t="",b;const w=B(()=>e.hideSelected?d.value.filter(l=>!k.value.some(c=>c===l)):d.value),C=T();function N(l){e.openOnClear&&(o.value=!0)}function E(){e.hideNoData&&!d.value.length||e.readonly||r!=null&&r.isReadonly.value||(o.value=!o.value)}function z(l){var u,x,K,I;if(e.readonly||r!=null&&r.isReadonly.value)return;["Enter"," ","ArrowDown","ArrowUp","Home","End"].includes(l.key)&&l.preventDefault(),["Enter","ArrowDown"," "].includes(l.key)&&(o.value=!0),["Escape","Tab"].includes(l.key)&&(o.value=!1),l.key==="ArrowDown"?(u=C.value)==null||u.focus("next"):l.key==="ArrowUp"?(x=C.value)==null||x.focus("prev"):l.key==="Home"?(K=C.value)==null||K.focus("first"):l.key==="End"&&((I=C.value)==null||I.focus("last"));const c=1e3;function p(V){const F=V.key.length===1,H=!V.ctrlKey&&!V.metaKey&&!V.altKey;return F&&H}if(e.multiple||!p(l))return;const A=performance.now();A-b>c&&(t=""),t+=l.key.toLowerCase(),b=A;const M=d.value.find(V=>V.title.toLowerCase().startsWith(t));M!==void 0&&(i.value=[M])}function v(l){if(e.multiple){const c=D.value.findIndex(p=>e.valueComparator(p,l.value));if(c===-1)i.value=[...i.value,l];else{const p=[...i.value];p.splice(c,1),i.value=p}}else i.value=[l],o.value=!1}function L(l){var c;(c=C.value)!=null&&c.$el.contains(l.relatedTarget)||(o.value=!1)}function G(l){P.value=!0}function U(l){var c;l.relatedTarget==null&&((c=s.value)==null||c.focus())}return oe(()=>{const l=!!(e.chips||a.chip),c=!!(!e.hideNoData||w.value.length||a.prepend||a.append||a["no-data"]),p=i.value.length>0,[A]=Q.filterProps(e),M=p||!P.value&&e.label&&!e.persistentPlaceholder?void 0:e.placeholder;return n(Q,O({ref:s},A,{modelValue:i.value.map(u=>u.props.value).join(", "),"onUpdate:modelValue":u=>{u==null&&(i.value=[])},focused:P.value,"onUpdate:focused":u=>P.value=u,validationValue:i.externalValue,dirty:p,class:["v-select",{"v-select--active-menu":o.value,"v-select--chips":!!e.chips,[`v-select--${e.multiple?"multiple":"single"}`]:!0,"v-select--selected":i.value.length},e.class],style:e.style,appendInnerIcon:e.menuIcon,readonly:!0,placeholder:M,"onClick:clear":N,"onMousedown:control":E,onBlur:L,onKeydown:z}),{...a,default:()=>n(Y,null,[n(Ye,O({ref:g,modelValue:o.value,"onUpdate:modelValue":u=>o.value=u,activator:"parent",contentClass:"v-select__content",eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition},e.menuProps),{default:()=>[c&&n(He,{ref:C,selected:D.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:u=>u.preventDefault(),onFocusin:G,onFocusout:U},{default:()=>{var u,x,K;return[!w.value.length&&!e.hideNoData&&(((u=a["no-data"])==null?void 0:u.call(a))??n(le,{title:y(e.noDataText)},null)),(x=a["prepend-item"])==null?void 0:x.call(a),w.value.map((I,V)=>{var F;return a.item?(F=a.item)==null?void 0:F.call(a,{item:I,index:V,props:O(I.props,{onClick:()=>v(I)})}):n(le,O({key:V},I.props,{onClick:()=>v(I)}),{prepend:H=>{let{isSelected:me}=H;return e.multiple&&!e.hideSelected?n(Je,{modelValue:me,ripple:!1,tabindex:"-1"},null):void 0}})}),(K=a["append-item"])==null?void 0:K.call(a)]}})]}),k.value.map((u,x)=>{var V;function K(F){F.stopPropagation(),F.preventDefault(),v(u)}const I={"onClick:close":K,modelValue:!0,"onUpdate:modelValue":void 0};return n("div",{key:u.value,class:"v-select__selection"},[l?a.chip?n(_,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:u.title}}},{default:()=>{var F;return[(F=a.chip)==null?void 0:F.call(a,{item:u,index:x,props:I})]}}):n(Qe,O({key:"chip",closable:e.closableChips,size:"small",text:u.title},I),null):((V=a.selection)==null?void 0:V.call(a,{item:u,index:x}))??n("span",{class:"v-select__selection-text"},[u.title,e.multiple&&x<k.value.length-1&&n("span",{class:"v-select__selection-comma"},[$e(",")])])])})])})}),ye({isFocused:P,menu:o,select:v},s)}}),qe=(e,m,a)=>e==null||m==null?-1:e.toString().toLocaleLowerCase().indexOf(m.toString().toLocaleLowerCase()),ra=de({customFilter:Function,customKeyFilter:Object,filterKeys:[Array,String],filterMode:{type:String,default:"intersection"},noFilter:Boolean},"filter");function ea(e,m,a){var o;const y=[],s=(a==null?void 0:a.default)??qe,g=a!=null&&a.filterKeys?fe(a.filterKeys):!1,h=Object.keys((a==null?void 0:a.customKeyFilter)??{}).length;if(!(e!=null&&e.length))return y;e:for(let d=0;d<e.length;d++){const f=e[d],S={},i={};let r=-1;if(m&&!(a!=null&&a.noFilter)){if(typeof f=="object"){const P=g||Object.keys(f);for(const t of P){const b=ze(f,t,f),w=(o=a==null?void 0:a.customKeyFilter)==null?void 0:o[t];if(r=w?w(b,m,f):s(b,m,f),r!==-1&&r!==!1)w?S[t]=r:i[t]=r;else if((a==null?void 0:a.filterMode)==="every")continue e}}else r=s(f,m,f),r!==-1&&r!==!1&&(i.title=r);const k=Object.keys(i).length,D=Object.keys(S).length;if(!k&&!D||(a==null?void 0:a.filterMode)==="union"&&D!==h&&!k||(a==null?void 0:a.filterMode)==="intersection"&&(D!==h||!k))continue}y.push({index:d,matches:{...i,...S}})}return y}function da(e,m,a,y){const s=B(()=>typeof(a==null?void 0:a.value)!="string"&&typeof(a==null?void 0:a.value)!="number"?"":String(a.value)),g=T([]),h=T(new Map);Ne(()=>{g.value=[],h.value=new Map;const d=ae(m);ea(d,s.value,{customKeyFilter:e.customKeyFilter,default:e.customFilter,filterKeys:ae(y==null?void 0:y.filterKeys)??e.filterKeys,filterMode:e.filterMode,noFilter:e.noFilter}).forEach(S=>{let{index:i,matches:r}=S;const k=d[i];g.value.push(k),h.value.set(k.value,r)})});function o(d){return h.value.get(d.value)}return{filteredItems:g,filteredMatches:h,getMatches:o}}export{oa as V,Ze as a,Qe as b,ra as m,da as u};
