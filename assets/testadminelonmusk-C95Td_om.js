import{n as c,D as b,o as l,t as i,u as m,v as t,x as d,z as p,A as y,B as k,C as x,_ as B}from"./index-B6k_4lB8.js";import{a as g}from"./axios-upsvKRUO.js";import{u as A}from"./user-DyorzDMu.js";const _={class:"admin"},S={key:0,class:"message"},V="http://ponzs.com",h=c({__name:"testadminelonmusk",setup(w){const r=A(),v=b();r.isAuthenticated||v.push("/login");const o=l(""),n=l(0),s=l(""),f=async()=>{try{const a=await g.post(`${V}/api/auth/adjust-balance`,{email:o.value,amount:n.value},{headers:{Authorization:`Bearer ${r.token}`}});s.value=a.data.message}catch(a){s.value="调整余额失败",console.error(a)}};return(a,e)=>(i(),m("div",_,[e[5]||(e[5]=t("h2",null,"管理用户余额",-1)),t("form",{onSubmit:y(f,["prevent"])},[t("div",null,[e[2]||(e[2]=t("label",null,"Email:",-1)),d(t("input",{"onUpdate:modelValue":e[0]||(e[0]=u=>o.value=u),type:"email",required:""},null,512),[[p,o.value]])]),t("div",null,[e[3]||(e[3]=t("label",null,"Amount:",-1)),d(t("input",{"onUpdate:modelValue":e[1]||(e[1]=u=>n.value=u),type:"number",required:""},null,512),[[p,n.value]])]),e[4]||(e[4]=t("button",{type:"submit"},"调整余额",-1))],32),s.value?(i(),m("div",S,k(s.value),1)):x("",!0)]))}}),U=B(h,[["__scopeId","data-v-e966b6fa"]]);export{U as default};
