import{n as g,o as l,q as x,u as d,A as u,z as t,B as b,C as w,E as S,F as C,G as p,_ as h,t as f,v as k,x as y,y as m}from"./index-DXLoBayg.js";import{A as I}from"./config-DaGrT2J7.js";const T={key:0,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"},V={class:"bg-white p-6 rounded-lg shadow-lg w-96"},q={key:0,class:"text-red-500 mt-4"},B=g({__name:"CardVerifier",props:{requiredType:{type:String,required:!0}},setup(i){const a=i,s=l(""),o=l(""),n=l(!1),c=l("");async function v(){try{const e=await(await fetch(`${I}/cards/verify`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:s.value,type:a.requiredType})})).json();e.success?(n.value=!0,c.value=e.card.type,localStorage.setItem("cardInfo",JSON.stringify({type:e.card.type,validUntil:e.card.validUntil}))):o.value=e.message}catch(r){console.error("Error verifying card:",r),o.value="验证失败，请重试"}}return x(()=>{const r=localStorage.getItem("cardInfo");if(r){const e=JSON.parse(r);new Date(e.validUntil)>new Date?(n.value=!0,c.value=e.type):localStorage.removeItem("cardInfo")}}),(r,e)=>!n.value||c.value!==i.requiredType?(d(),u("div",T,[t("div",V,[e[3]||(e[3]=t("h2",{class:"text-xl mb-4"},"需要验证卡密",-1)),t("form",{onSubmit:b(v,["prevent"]),class:"space-y-4"},[t("div",null,[e[1]||(e[1]=t("label",{class:"block mb-2"},"输入卡密",-1)),w(t("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=_=>s.value=_),class:"w-full p-2 border rounded"},null,512),[[S,s.value]])]),e[2]||(e[2]=t("button",{type:"submit",class:"bg-blue-500 text-white px-4 py-2 rounded w-full"}," 验证卡密 ",-1))],32),o.value?(d(),u("p",q,C(o.value),1)):p("",!0)])])):p("",!0)}}),N={};function U(i,a){const s=B,o=f("ion-content"),n=f("ion-page");return d(),k(n,null,{default:y(()=>[m(o,null,{default:y(()=>[t("div",null,[m(s,{"required-type":"type3"}),a[0]||(a[0]=t("div",null,[t("h1",{class:"text-2xl mb-4"},"受保护的内容"),t("p",null,"这是需要 type3 卡密才能访问的内容")],-1))])]),_:1})]),_:1})}const E=h(N,[["render",U]]);export{E as default};
