import{n as v,o as n,q as m,u as c,A as u,z as t,B as b,C as g,E as x,F as _,G as p,_ as w,y as S}from"./index-jm_w3ouH.js";import{A as C}from"./config-DaGrT2J7.js";const I={key:0,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"},T={class:"bg-white p-6 rounded-lg shadow-lg w-96"},V={key:0,class:"text-red-500 mt-4"},h=v({__name:"CardVerifier",props:{requiredType:{type:String,required:!0}},setup(l){const a=l,s=n(""),o=n(""),i=n(!1),d=n("");async function f(){try{const e=await(await fetch(`${C}/cards/verify`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:s.value,type:a.requiredType})})).json();e.success?(i.value=!0,d.value=e.card.type,localStorage.setItem("cardInfo",JSON.stringify({type:e.card.type,validUntil:e.card.validUntil}))):o.value=e.message}catch(r){console.error("Error verifying card:",r),o.value="验证失败，请重试"}}return m(()=>{const r=localStorage.getItem("cardInfo");if(r){const e=JSON.parse(r);new Date(e.validUntil)>new Date?(i.value=!0,d.value=e.type):localStorage.removeItem("cardInfo")}}),(r,e)=>!i.value||d.value!==l.requiredType?(c(),u("div",I,[t("div",T,[e[3]||(e[3]=t("h2",{class:"text-xl mb-4"},"需要验证卡密",-1)),t("form",{onSubmit:b(f,["prevent"]),class:"space-y-4"},[t("div",null,[e[1]||(e[1]=t("label",{class:"block mb-2"},"输入卡密",-1)),g(t("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=y=>s.value=y),class:"w-full p-2 border rounded"},null,512),[[x,s.value]])]),e[2]||(e[2]=t("button",{type:"submit",class:"bg-blue-500 text-white px-4 py-2 rounded w-full"}," 验证卡密 ",-1))],32),o.value?(c(),u("p",V,_(o.value),1)):p("",!0)])])):p("",!0)}}),k={};function q(l,a){const s=h;return c(),u("div",null,[S(s,{"required-type":"type3"}),a[0]||(a[0]=t("div",null,[t("h1",{class:"text-2xl mb-4"},"受保护的内容"),t("p",null,"这是需要 type3 卡密才能访问的内容")],-1))])}const U=w(k,[["render",q]]);export{U as default};
