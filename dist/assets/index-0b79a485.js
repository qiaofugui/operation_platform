import{a as q,bc as G,r as y,a2 as H,bd as K,O as W,b1 as X,f as V,s as B,y as e,w as t,h as g,j as h,k as m,Q as i,g as P,F as Y,ag as Z,t as S,v as C,an as D,be as ee,b5 as f,bf as te,bg as ae,bh as le,R as ne,S as se,U as oe,b0 as re}from"./index-36d7dce8.js";import{a as ie,E as ce,b as ue,v as de}from"./el-badge-8a30333f.js";/* empty css                   */import{E as me}from"./el-button-03af9eda.js";import{_ as pe}from"./plus-48305768.js";const _e=["onClick"],Ce=q({__name:"index",setup(fe){const p=G(),v=y(!1),N=y([]);H(()=>p.c3Id,()=>{if(!p.c3Id)return N.value=[];L()});const L=async()=>{v.value=!0;const{c1Id:a,c2Id:s,c3Id:b}=p,u=await K(a,s,b);u.code===200&&(N.value=u.data),v.value=!1};let n=W({attrName:"",attrValueList:[],categoryId:"",categoryLevel:3});const c=y(0),F=()=>{Object.assign(n,{attrName:"",attrValueList:[],categoryId:p.c3Id,categoryLevel:3}),c.value=1},O=a=>{c.value=1,Object.assign(n,JSON.parse(JSON.stringify(a)))},k=()=>{c.value=0},U=()=>{n.attrValueList.push({valueName:"",flag:!0}),D(()=>{E.value[n.attrValueList.length-1].focus()})},$=async()=>{const a=await ee(n);a.code===200?(L(),c.value=0,f.success(a.message)):f.error(a.message)},T=(a,s)=>{if(a.valueName.trim()==="")return n.attrValueList.splice(s,1),f.warning("属性值不能为空");if(n.attrValueList.find(u=>u!==a&&u.valueName===a.valueName))return n.attrValueList.splice(s,1),f.warning("属性值不能重复");a.flag=!1},z=(a,s)=>{a.flag=!0,D(()=>{E.value[s].focus()})},E=y([]),j=async a=>{const s=await te(a.id);s.code===200?(L(),f.success(s.message)):f.error(s.message)};return X(()=>{p.$reset()}),(a,s)=>{const b=ae,u=pe,r=me,d=ie,w=le,x=ce,I=ue,A=ne,J=se,M=oe,Q=re,R=de;return V(),B("div",null,[e(b,{scene:c.value},null,8,["scene"]),e(Q,{style:{margin:"10px 0"}},{default:t(()=>[g(h("div",null,[e(r,{type:"primary",disabled:!m(p).c3Id,onClick:F},{default:t(()=>[e(u),i(" 添加属性 ")]),_:1},8,["disabled"]),g((V(),P(I,{"element-loading-text":"数据正在加载中",border:"",style:{margin:"10px 0"},data:N.value},{default:t(()=>[e(d,{prop:"id",label:"序号",width:"80px",align:"center",type:"index"}),e(d,{prop:"attrName",label:"属性名称",width:"120px"}),e(d,{prop:"attrValueList",label:"属性名称值"},{default:t(({row:l})=>[(V(!0),B(Y,null,Z(l.attrValueList,o=>(V(),P(w,{key:o.id,style:{margin:"3px"}},{default:t(()=>[i(S(o.valueName),1)]),_:2},1024))),128))]),_:1}),e(d,{prop:"address",label:"操作",width:"165px"},{default:t(({row:l})=>[e(r,{type:"primary",size:"small",icon:"Edit",onClick:o=>O(l)},{default:t(()=>[i("编辑")]),_:2},1032,["onClick"]),e(x,{title:`确定要删除 ${l.attrName} 吗?`,icon:"DeleteFilled","icon-color":"#f56c6c",onConfirm:o=>j(l)},{reference:t(()=>[e(r,{type:"danger",size:"small",icon:"Delete"},{default:t(()=>[i("删除")]),_:1})]),_:2},1032,["title","onConfirm"])]),_:1})]),_:1},8,["data"])),[[R,v.value]])],512),[[C,c.value===0]]),g(h("div",null,[e(M,{inline:!0},{default:t(()=>[e(J,{label:"属性名称"},{default:t(()=>[e(A,{placeholder:"请输入属性名",modelValue:m(n).attrName,"onUpdate:modelValue":s[0]||(s[0]=l=>m(n).attrName=l),"prefix-icon":"EditPen"},null,8,["modelValue"])]),_:1})]),_:1}),e(r,{type:"primary",icon:"Plus",disabled:!(m(n).attrName.trim().length>=0),onClick:U},{default:t(()=>[i("添加属性值")]),_:1},8,["disabled"]),e(r,{icon:"CloseBold",onClick:k},{default:t(()=>[i("取消")]),_:1}),e(I,{border:"",style:{margin:"20px 0"},data:m(n).attrValueList},{default:t(()=>[e(d,{width:"80px",type:"index",align:"center",label:"序号"}),e(d,{label:"属性值"},{default:t(({row:l,$index:o})=>[g(e(A,{placeholder:"请输入属性值",size:"small",modelValue:l.valueName,"onUpdate:modelValue":_=>l.valueName=_,onBlur:_=>T(l,o),ref:_=>E.value[o]=_},null,8,["modelValue","onUpdate:modelValue","onBlur"]),[[C,l.flag]]),g(h("div",{onClick:_=>z(l,o)},S(l.valueName),9,_e),[[C,!l.flag]])]),_:1}),e(d,{label:"操作"},{default:t(({row:l,$index:o})=>[e(x,{title:`确定要删除 ${l.valueName} 吗?`,icon:"DeleteFilled","icon-color":"#f56c6c",onConfirm:_=>m(n).attrValueList.splice(o,1)},{reference:t(()=>[e(r,{type:"danger",size:"small",icon:"Delete"})]),_:2},1032,["title","onConfirm"])]),_:1})]),_:1},8,["data"]),e(r,{type:"primary",icon:"Select",onClick:$,disabled:!(m(n).attrValueList.length>0)},{default:t(()=>[i("保存")]),_:1},8,["disabled"]),e(r,{icon:"CloseBold",onClick:k},{default:t(()=>[i("取消")]),_:1})],512),[[C,c.value===1]])]),_:1})])}}});export{Ce as default};
