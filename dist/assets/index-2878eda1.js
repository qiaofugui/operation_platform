import{b3 as f,a as j,r as d,o as q,f as x,g as P,w as t,h as z,y as l,Q as m,t as F,k as i,a$ as k,j as L,b5 as c,R as N,S,U as w,b0 as Q}from"./index-e08de63f.js";import{E as G}from"./el-dialog-50992940.js";import"./el-overlay-67364692.js";import{a as H,E as J,b as K,v as W}from"./el-badge-4c3e83dc.js";/* empty css                   */import{E as X}from"./el-button-d2944afa.js";import"./refs-f5beb1cc.js";import"./vnode-deac4662.js";function Y(){return f({url:"/admin/acl/permission",method:"get"})}function Z(r){return r.id?f({url:"/admin/acl/permission/update",method:"put",data:r}):f({url:"/admin/acl/permission/save",method:"post",data:r})}function ee(r){return f({url:"/admin/acl/permission/remove/"+r,method:"delete"})}const le={class:"dialog-footer"},ue=j({__name:"index",setup(r){const g=d([]),_=d(!1),v=async()=>{_.value=!0;const a=await Y();if(a.code!==200)return c.error(a.message);g.value=a.data,_.value=!1};q(()=>{v()});let n=d(!1),b=d(null),h=d({name:[{required:!0,message:"请输入名",trigger:"blur"},{min:2,max:10,message:"长度在 2 到 10 个字符",trigger:"blur"}],code:[{required:!0,message:"请输入值",trigger:"blur"},{min:2,max:10,message:"长度在 2 到 10 个字符",trigger:"blur"}]}),o=d({id:0,code:"",pid:0,name:"",level:0});const M=a=>{Object.assign(o.value,{id:0,code:"",pid:0,name:"",level:0}),n.value=!0,o.value.level=a.level+1,o.value.pid=a.pid},U=a=>{Object.assign(o.value,a),n.value=!0},B=()=>{o.value.id,E()},E=async()=>{await b.value.validate();const a=await Z(o.value);if(a.code!==200)return c.error(a.message);c.success(a.message),n.value=!1,v()},D=async a=>{const s=await ee(a.id);if(s.code!==200)return c.error(s.message);c.success(s.message),n.value=!1,v()};return(a,s)=>{const p=H,u=X,I=J,$=K,y=N,C=S,A=w,O=G,R=Q,T=W;return x(),P(R,null,{default:t(()=>[z((x(),P($,{border:"",data:g.value,"row-key":"id","default-expand-all":""},{default:t(()=>[l(p,{label:"名称",prop:"name"}),l(p,{label:"权限值",prop:"code"}),l(p,{label:"修改时间",prop:"updateTime"}),l(p,{label:"操作",width:"265px"},{default:t(({row:e})=>[l(u,{type:e.level===3?"info":"success",size:"small",icon:"Plus",disabled:e.level===4,onClick:V=>M(e)},{default:t(()=>[m(F(e.level===3?"添加功能":"添加菜单"),1)]),_:2},1032,["type","disabled","onClick"]),l(u,{type:"primary",size:"small",icon:"Edit",disabled:e.level===1,onClick:V=>U(e)},{default:t(()=>[m("编辑")]),_:2},1032,["disabled","onClick"]),l(I,{title:`确定要删除 ${e.name} 吗?`,icon:"DeleteFilled","icon-color":"#f56c6c",onConfirm:V=>D(e)},{reference:t(()=>[l(u,{type:"danger",size:"small",icon:"Delete",disabled:e.level===1},{default:t(()=>[m("删除")]),_:2},1032,["disabled"])]),_:2},1032,["title","onConfirm"])]),_:1})]),_:1},8,["data"])),[[T,_.value]]),l(O,{modelValue:i(n),"onUpdate:modelValue":s[3]||(s[3]=e=>k(n)?n.value=e:n=e),title:i(o).id?"编辑菜单":"添加菜单",width:"25%"},{footer:t(()=>[L("span",le,[l(u,{icon:"CloseBold",onClick:s[2]||(s[2]=e=>k(n)?n.value=!1:n=!1)},{default:t(()=>[m("取消")]),_:1}),l(u,{type:"primary",icon:"Select",onClick:B},{default:t(()=>[m("确认")]),_:1})])]),default:t(()=>[l(A,{"label-width":"60px",model:i(o),rules:i(h),ref_key:"formRef",ref:b},{default:t(()=>[l(C,{label:"名",prop:"name"},{default:t(()=>[l(y,{"prefix-icon":"EditPen",placeholder:"请输入名",modelValue:i(o).name,"onUpdate:modelValue":s[0]||(s[0]=e=>i(o).name=e)},null,8,["modelValue"])]),_:1}),l(C,{label:"值",prop:"code"},{default:t(()=>[l(y,{"prefix-icon":"EditPen",placeholder:"请输入值",modelValue:i(o).code,"onUpdate:modelValue":s[1]||(s[1]=e=>i(o).code=e)},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["modelValue","title"])]),_:1})}}});export{ue as default};