import{bE as he,am as Ie,b as ve,d as re,aR as me,$ as de,a as U,bF as fe,bG as _e,bH as ze,ah as pe,a0 as ge,bI as Le,r as k,bJ as Ee,a9 as Ce,c as f,a2 as ie,an as we,o as be,f as w,g as ue,y as u,w as _,j as g,n as c,k as t,l as ce,x as xe,p as z,E as S,ar as Ne,s as N,F as Q,bC as Oe,aP as Se,bK as Te,bt as $e,m as Re,bL as Ae,bM as Be,ag as Ve,h as Me,v as Pe,q as J,z as Ye,bB as De,_ as ye,B,e as V,bN as Fe,a3 as ke,bO as Xe,bP as He,D as F,t as je,aG as Ke,H as We,I as Ge,bQ as Ze,bR as qe}from"./index-36d7dce8.js";import{i as Je}from"./position-b0add26c.js";var Qe="Expected a function";function oe(d,h,r){var s=!0,b=!0;if(typeof d!="function")throw new TypeError(Qe);return he(r)&&(s="leading"in r?!!r.leading:s,b="trailing"in r?!!r.trailing:b),Ie(d,h,{leading:s,maxWait:h,trailing:b})}const Ue=ve({urlList:{type:re(Array),default:()=>me([])},zIndex:{type:Number},initialIndex:{type:Number,default:0},infinite:{type:Boolean,default:!0},hideOnClickModal:Boolean,teleported:Boolean,closeOnPressEscape:{type:Boolean,default:!0},zoomRate:{type:Number,default:1.2}}),ea={close:()=>!0,switch:d=>de(d)},aa=["src"],ta=U({name:"ElImageViewer"}),na=U({...ta,props:Ue,emits:ea,setup(d,{expose:h,emit:r}){const s=d,b={CONTAIN:{name:"contain",icon:fe(_e)},ORIGINAL:{name:"original",icon:fe(ze)}},{t:L}=pe(),o=ge("image-viewer"),{nextZIndex:ee}=Le(),T=k(),O=k([]),E=Ee(),I=k(!0),v=k(s.initialIndex),m=Ce(b.CONTAIN),i=k({scale:1,deg:0,offsetX:0,offsetY:0,enableTransition:!1}),M=f(()=>{const{urlList:e}=s;return e.length<=1}),R=f(()=>v.value===0),X=f(()=>v.value===s.urlList.length-1),ae=f(()=>s.urlList[v.value]),te=f(()=>[o.e("btn"),o.e("prev"),o.is("disabled",!s.infinite&&R.value)]),P=f(()=>[o.e("btn"),o.e("next"),o.is("disabled",!s.infinite&&X.value)]),ne=f(()=>{const{scale:e,deg:n,offsetX:l,offsetY:p,enableTransition:C}=i.value;let y=l/e,x=p/e;switch(n%360){case 90:case-270:[y,x]=[x,-y];break;case 180:case-180:[y,x]=[-y,-x];break;case 270:case-90:[y,x]=[-x,y];break}const A={transform:`scale(${e}) rotate(${n}deg) translate(${y}px, ${x}px)`,transition:C?"transform .3s":""};return m.value.name===b.CONTAIN.name&&(A.maxWidth=A.maxHeight="100%"),A}),H=f(()=>de(s.zIndex)?s.zIndex:ee());function $(){le(),r("close")}function se(){const e=oe(l=>{switch(l.code){case B.esc:s.closeOnPressEscape&&$();break;case B.space:G();break;case B.left:Z();break;case B.up:a("zoomIn");break;case B.right:q();break;case B.down:a("zoomOut");break}}),n=oe(l=>{const p=l.deltaY||l.deltaX;a(p<0?"zoomIn":"zoomOut",{zoomRate:s.zoomRate,enableTransition:!1})});E.run(()=>{V(document,"keydown",e),V(document,"wheel",n)})}function le(){E.stop()}function j(){I.value=!1}function K(e){I.value=!1,e.target.alt=L("el.image.error")}function W(e){if(I.value||e.button!==0||!T.value)return;i.value.enableTransition=!1;const{offsetX:n,offsetY:l}=i.value,p=e.pageX,C=e.pageY,y=oe(A=>{i.value={...i.value,offsetX:n+A.pageX-p,offsetY:l+A.pageY-C}}),x=V(document,"mousemove",y);V(document,"mouseup",()=>{x()}),e.preventDefault()}function Y(){i.value={scale:1,deg:0,offsetX:0,offsetY:0,enableTransition:!1}}function G(){if(I.value)return;const e=Fe(b),n=Object.values(b),l=m.value.name,C=(n.findIndex(y=>y.name===l)+1)%e.length;m.value=b[e[C]],Y()}function D(e){const n=s.urlList.length;v.value=(e+n)%n}function Z(){R.value&&!s.infinite||D(v.value-1)}function q(){X.value&&!s.infinite||D(v.value+1)}function a(e,n={}){if(I.value)return;const{zoomRate:l,rotateDeg:p,enableTransition:C}={zoomRate:s.zoomRate,rotateDeg:90,enableTransition:!0,...n};switch(e){case"zoomOut":i.value.scale>.2&&(i.value.scale=Number.parseFloat((i.value.scale/l).toFixed(3)));break;case"zoomIn":i.value.scale<7&&(i.value.scale=Number.parseFloat((i.value.scale*l).toFixed(3)));break;case"clockwise":i.value.deg+=p;break;case"anticlockwise":i.value.deg-=p;break}i.value.enableTransition=C}return ie(ae,()=>{we(()=>{const e=O.value[0];e!=null&&e.complete||(I.value=!0)})}),ie(v,e=>{Y(),r("switch",e)}),be(()=>{var e,n;se(),(n=(e=T.value)==null?void 0:e.focus)==null||n.call(e)}),h({setActiveItem:D}),(e,n)=>(w(),ue(De,{to:"body",disabled:!e.teleported},[u(Ye,{name:"viewer-fade",appear:""},{default:_(()=>[g("div",{ref_key:"wrapper",ref:T,tabindex:-1,class:c(t(o).e("wrapper")),style:ce({zIndex:t(H)})},[g("div",{class:c(t(o).e("mask")),onClick:n[0]||(n[0]=xe(l=>e.hideOnClickModal&&$(),["self"]))},null,2),z(" CLOSE "),g("span",{class:c([t(o).e("btn"),t(o).e("close")]),onClick:$},[u(t(S),null,{default:_(()=>[u(t(Ne))]),_:1})],2),z(" ARROW "),t(M)?z("v-if",!0):(w(),N(Q,{key:0},[g("span",{class:c(t(te)),onClick:Z},[u(t(S),null,{default:_(()=>[u(t(Oe))]),_:1})],2),g("span",{class:c(t(P)),onClick:q},[u(t(S),null,{default:_(()=>[u(t(Se))]),_:1})],2)],64)),z(" ACTIONS "),g("div",{class:c([t(o).e("btn"),t(o).e("actions")])},[g("div",{class:c(t(o).e("actions__inner"))},[u(t(S),{onClick:n[1]||(n[1]=l=>a("zoomOut"))},{default:_(()=>[u(t(Te))]),_:1}),u(t(S),{onClick:n[2]||(n[2]=l=>a("zoomIn"))},{default:_(()=>[u(t($e))]),_:1}),g("i",{class:c(t(o).e("actions__divider"))},null,2),u(t(S),{onClick:G},{default:_(()=>[(w(),ue(Re(t(m).icon)))]),_:1}),g("i",{class:c(t(o).e("actions__divider"))},null,2),u(t(S),{onClick:n[3]||(n[3]=l=>a("anticlockwise"))},{default:_(()=>[u(t(Ae))]),_:1}),u(t(S),{onClick:n[4]||(n[4]=l=>a("clockwise"))},{default:_(()=>[u(t(Be))]),_:1})],2)],2),z(" CANVAS "),g("div",{class:c(t(o).e("canvas"))},[(w(!0),N(Q,null,Ve(e.urlList,(l,p)=>Me((w(),N("img",{ref_for:!0,ref:C=>O.value[p]=C,key:l,src:l,style:ce(t(ne)),class:c(t(o).e("img")),onLoad:j,onError:K,onMousedown:W},null,46,aa)),[[Pe,p===v.value]])),128))],2),J(e.$slots,"default")],6)]),_:3})],8,["disabled"]))}});var sa=ye(na,[["__file","/home/runner/work/element-plus/element-plus/packages/components/image-viewer/src/image-viewer.vue"]]);const la=ke(sa),oa=ve({hideOnClickModal:Boolean,src:{type:String,default:""},fit:{type:String,values:["","contain","cover","fill","none","scale-down"],default:""},loading:{type:String,values:["eager","lazy"]},lazy:Boolean,scrollContainer:{type:re([String,Object])},previewSrcList:{type:re(Array),default:()=>me([])},previewTeleported:Boolean,zIndex:{type:Number},initialIndex:{type:Number,default:0},infinite:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},zoomRate:{type:Number,default:1.2}}),ra={load:d=>d instanceof Event,error:d=>d instanceof Event,switch:d=>de(d),close:()=>!0,show:()=>!0},ia=["src","loading"],ua={key:0},ca=U({name:"ElImage",inheritAttrs:!1}),da=U({...ca,props:oa,emits:ra,setup(d,{emit:h}){const r=d;let s="";const{t:b}=pe(),L=ge("image"),o=Xe(),ee=He(),T=k(),O=k(!1),E=k(!0),I=k(!1),v=k(),m=k(),i=F&&"loading"in HTMLImageElement.prototype;let M,R;const X=f(()=>[L.e("inner"),P.value&&L.e("preview"),E.value&&L.is("loading")]),ae=f(()=>o.style),te=f(()=>{const{fit:a}=r;return F&&a?{objectFit:a}:{}}),P=f(()=>{const{previewSrcList:a}=r;return Array.isArray(a)&&a.length>0}),ne=f(()=>{const{previewSrcList:a,initialIndex:e}=r;let n=e;return e>a.length-1&&(n=0),n}),H=f(()=>r.loading==="eager"?!1:!i&&r.loading==="lazy"||r.lazy),$=()=>{F&&(E.value=!0,O.value=!1,T.value=r.src)};function se(a){E.value=!1,O.value=!1,h("load",a)}function le(a){E.value=!1,O.value=!0,h("error",a)}function j(){Je(v.value,m.value)&&($(),Y())}const K=qe(j,200,!0);async function W(){var a;if(!F)return;await we();const{scrollContainer:e}=r;We(e)?m.value=e:Ge(e)&&e!==""?m.value=(a=document.querySelector(e))!=null?a:void 0:v.value&&(m.value=Ze(v.value)),m.value&&(M=V(m,"scroll",K),setTimeout(()=>j(),100))}function Y(){!F||!m.value||!K||(M==null||M(),m.value=void 0)}function G(a){if(a.ctrlKey){if(a.deltaY<0)return a.preventDefault(),!1;if(a.deltaY>0)return a.preventDefault(),!1}}function D(){P.value&&(R=V("wheel",G,{passive:!1}),s=document.body.style.overflow,document.body.style.overflow="hidden",I.value=!0,h("show"))}function Z(){R==null||R(),document.body.style.overflow=s,I.value=!1,h("close")}function q(a){h("switch",a)}return ie(()=>r.src,()=>{H.value?(E.value=!0,O.value=!1,Y(),W()):$()}),be(()=>{H.value?W():$()}),(a,e)=>(w(),N("div",{ref_key:"container",ref:v,class:c([t(L).b(),a.$attrs.class]),style:ce(t(ae))},[O.value?J(a.$slots,"error",{key:0},()=>[g("div",{class:c(t(L).e("error"))},je(t(b)("el.image.error")),3)]):(w(),N(Q,{key:1},[T.value!==void 0?(w(),N("img",Ke({key:0},t(ee),{src:T.value,loading:a.loading,style:t(te),class:t(X),onClick:D,onLoad:se,onError:le}),null,16,ia)):z("v-if",!0),E.value?(w(),N("div",{key:1,class:c(t(L).e("wrapper"))},[J(a.$slots,"placeholder",{},()=>[g("div",{class:c(t(L).e("placeholder"))},null,2)])],2)):z("v-if",!0)],64)),t(P)?(w(),N(Q,{key:2},[I.value?(w(),ue(t(la),{key:0,"z-index":a.zIndex,"initial-index":t(ne),infinite:a.infinite,"zoom-rate":a.zoomRate,"url-list":a.previewSrcList,"hide-on-click-modal":a.hideOnClickModal,teleported:a.previewTeleported,"close-on-press-escape":a.closeOnPressEscape,onClose:Z,onSwitch:q},{default:_(()=>[a.$slots.viewer?(w(),N("div",ua,[J(a.$slots,"viewer")])):z("v-if",!0)]),_:3},8,["z-index","initial-index","infinite","zoom-rate","url-list","hide-on-click-modal","teleported","close-on-press-escape"])):z("v-if",!0)],64)):z("v-if",!0)],6))}});var fa=ye(da,[["__file","/home/runner/work/element-plus/element-plus/packages/components/image/src/image.vue"]]);const pa=ke(fa);export{pa as E,oe as t};
