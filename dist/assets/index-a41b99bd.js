import{b3 as k,a as X,N as Y,r as s,o as Z,P as ee,f as b,s as ae,y as a,w as o,k as le,g as T,Q as f,p as oe,j as te,h as C,an as re,b5 as m,b0 as se,R as ne,S as de,E as ie,U as ue,V as ce}from"./index-36d7dce8.js";import{E as me}from"./el-dialog-b4ef18f6.js";import"./el-overlay-7dffd50a.js";import{E as pe}from"./el-progress-67b6776c.js";/* empty css                */import{E as _e}from"./el-pagination-78a7e002.js";import{a as ve,E as fe,b as ge,v as be}from"./el-badge-8a30333f.js";/* empty css                   */import{E as ke}from"./el-button-03af9eda.js";import{E as Ee}from"./el-image-viewer-3b73d4a4.js";import{_ as Ue}from"./plus-48305768.js";import"./refs-baa03458.js";import"./vnode-612af2fe.js";import"./position-b0add26c.js";const ye=(n,E)=>k({url:`/admin/product/baseTrademark/${n}/${E}`,method:"GET"}),Te=n=>n.id?k({url:"/admin/product/baseTrademark/update",method:"PUT",data:n}):k({url:"/admin/product/baseTrademark/save",method:"POST",data:n}),xe=n=>k({url:`/admin/product/baseTrademark/remove/${n}`,method:"DELETE"}),Ne={class:"dialog-footer"},Pe=X({__name:"index",setup(n){const E=Y(),d=s(1),U=s(3),x=s(0),y=s([]),N=s([]),p=async(l=1)=>{d.value=l;const e=await ye(d.value,U.value);e.code===200&&(x.value=e.data.total,y.value=e.data.records,N.value=e.data.records.map(c=>c.logoUrl))};Z(()=>{p()});const V=l=>{p(l)},I=()=>{p()},i=s(!1),r=s({id:void 0,tmName:"",logoUrl:""});let _=s(null);const L=s({tmName:[{required:!0,message:"请输入品牌名",trigger:"blur"}],logoUrl:[{required:!0,trigger:"change",validator:(l,e,c)=>{e?c():c(new Error("请上传品牌LOGO"))}}]}),z=()=>{i.value=!0,r.value={id:void 0,tmName:"",logoUrl:""},re(()=>{_.value.clearValidate()})},S=l=>{_.value.clearValidate(),i.value=!0,r.value={id:l.id,tmName:l.tmName,logoUrl:l.logoUrl}},F=()=>{i.value=!1},O=async()=>{await _.value.validate();const l=await Te(r.value);l.code===200?(i.value=!1,m.success(l.message),p(d.value)):(m.error(l.message),i.value=!1)},$=async l=>{const e=await xe(l.id);e.code===200?(m.success(e.message),p(y.value.length>1?d.value:d.value-1)):m.error(e.message)},u=s(!1),B=l=>{if(u.value=!0,["image/jpg","image/jpeg","image/png","image/gif"].includes(l.type)){if(l.size/1024/1024>4)return m.error("图片大小不能超过4MB!"),u.value=!1,!1}else return m.error("图片必须是JPG|PNG|GIF格式!"),u.value=!1,!1;return!0},G=(l,e)=>{u.value=!1,r.value.logoUrl=l.data,_.value.clearValidate("logoUrl")};return(l,e)=>{const c=Ue,v=ke,g=ve,P=Ee,A=fe,D=ge,j=_e,q=se,M=ne,h=de,R=ee("Plus"),J=ie,Q=pe,H=ue,K=me,w=be;return b(),ae("div",null,[a(q,null,{default:o(()=>[le(E).buttons.includes("btn.Trademark.add")?(b(),T(v,{key:0,type:"primary",onClick:z},{default:o(()=>[a(c),f(" 添加品牌 ")]),_:1})):oe("",!0),a(D,{data:y.value,border:"",style:{margin:"10px 0"}},{default:o(()=>[a(g,{prop:"id",label:"序号",width:"80px",align:"center",type:"index"}),a(g,{prop:"tmName",label:"品牌名称"}),a(g,{prop:"logoUrl",label:"品牌LOGO"},{default:o(({row:t})=>[a(P,{style:{width:"60px",height:"60px"},fit:"scale-down",src:t.logoUrl,"preview-src-list":N.value,"preview-teleported":!0},null,8,["src","preview-src-list"])]),_:1}),a(g,{prop:"address",label:"品牌操作",width:"165px"},{default:o(({row:t})=>[a(v,{type:"primary",size:"small",icon:"Edit",onClick:W=>S(t)},{default:o(()=>[f("编辑")]),_:2},1032,["onClick"]),a(A,{title:`确定要删除 ${t.tmName} 吗?`,icon:"DeleteFilled","icon-color":"#f56c6c",onConfirm:W=>$(t)},{reference:o(()=>[a(v,{type:"danger",size:"small",icon:"Delete"},{default:o(()=>[f("删除")]),_:1})]),_:2},1032,["title","onConfirm"])]),_:1})]),_:1},8,["data"]),a(j,{"current-page":d.value,"onUpdate:currentPage":e[0]||(e[0]=t=>d.value=t),"page-size":U.value,"onUpdate:pageSize":e[1]||(e[1]=t=>U.value=t),"page-sizes":[3,5,10,30],background:!0,layout:"prev, pager, next, jumper, ->, sizes, total",total:x.value,onSizeChange:I,onCurrentChange:V},null,8,["current-page","page-size","total"])]),_:1}),a(K,{modelValue:i.value,"onUpdate:modelValue":e[3]||(e[3]=t=>i.value=t),title:r.value.id?"修改品牌":"添加品牌",width:"40%"},{footer:o(()=>[te("span",Ne,[a(v,{icon:"CloseBold",onClick:F},{default:o(()=>[f("取消")]),_:1}),a(v,{type:"primary",icon:"Select",onClick:O},{default:o(()=>[f("确认")]),_:1})])]),default:o(()=>[a(H,{"label-width":"100px",model:r.value,rules:L.value,ref_key:"trademarkFormRef",ref:_},{default:o(()=>[a(h,{label:"品牌名称",prop:"tmName"},{default:o(()=>[a(M,{placeholder:"请输入品牌名称",modelValue:r.value.tmName,"onUpdate:modelValue":e[2]||(e[2]=t=>r.value.tmName=t),"prefix-icon":"EditPen"},null,8,["modelValue"])]),_:1}),a(h,{label:"品牌LOGO",disabled:!0,prop:"logoUrl"},{default:o(()=>[a(Q,{class:"avatar-uploader",action:"/api/admin/product/fileUpload","show-file-list":!1,"on-success":G,"before-upload":B,disabled:u.value},{default:o(()=>[r.value.logoUrl?C((b(),T(P,{key:0,src:r.value.logoUrl,class:"avatar",fit:"scale-down"},null,8,["src"])),[[w,u.value]]):C((b(),T(J,{key:1,class:"avatar-uploader-icon"},{default:o(()=>[a(R)]),_:1})),[[w,u.value]])]),_:1},8,["disabled"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["modelValue","title"])])}}});const je=ce(Pe,[["__scopeId","data-v-dfac4aa5"]]);export{je as default};
