import{n as C,H as S,o as r,q as z,t as f,u as b,v as D,x as d,y as l,z as t,B as w,F as u,I as k,A as y,G as _,_ as E}from"./index-DXLoBayg.js";import{a as g}from"./axios-upsvKRUO.js";import{u as M}from"./user-C3lRn0zg.js";const N={style:{"background-color":"#000",width:"100vw",height:"100vh"}},h={class:"profile"},q={class:"info-item"},R={class:"info-item"},T={class:"info-item"},F={class:"info-item balance"},G={key:0,class:"message"},H={key:1,class:"modal"},L={class:"modal-content"},P={class:"info-item"},j={class:"info-item"},J={key:0,class:"message"},B="http://ponzs.com",K=C({__name:"useradmin",setup(O){const m=M(),$=S();m.isAuthenticated||$.push("/login");const o=r({email:"",steamId:"",nickname:"",balance:0}),s=r(""),p=r(!1),a=r({toEmail:"",amount:0}),v=r("");z(async()=>{try{const n=await g.get(`${B}/api/auth/profile`,{headers:{Authorization:`Bearer ${m.token}`}});o.value=n.data}catch{s.value="获取个人信息失败"}});const x=async()=>{try{const n=await g.put(`${B}/api/auth/update-profile`,{nickname:o.value.nickname},{headers:{Authorization:`Bearer ${m.token}`}});s.value="个人信息更新成功"}catch(n){n.response&&n.response.status===409?s.value="昵称已存在，请更换昵称":s.value="更新个人信息失败"}},I=async()=>{try{const n=await g.post(`${B}/api/auth/transfer`,a.value,{headers:{Authorization:`Bearer ${m.token}`}});v.value="转账成功",o.value.balance-=a.value.amount,p.value=!1}catch{v.value="转账失败"}};return(n,e)=>{const c=f("UButton"),V=f("UInput"),U=f("ion-content"),A=f("ion-page");return b(),D(A,null,{default:d(()=>[l(U,null,{default:d(()=>[t("div",N,[e[15]||(e[15]=t("br",null,null,-1)),e[16]||(e[16]=t("br",null,null,-1)),e[17]||(e[17]=t("br",null,null,-1)),t("div",h,[e[14]||(e[14]=t("h2",null,"个人信息",-1)),t("form",{onSubmit:w(x,["prevent"])},[t("div",q,[e[4]||(e[4]=t("label",null,"邮箱:",-1)),t("span",null,u(o.value.email),1)]),t("div",R,[e[5]||(e[5]=t("label",null,"Steam ID:",-1)),t("span",null,u(o.value.steamId),1)]),t("div",T,[e[6]||(e[6]=t("label",null,"昵称:",-1)),t("span",null,u(o.value.nickname),1)]),t("div",F,[e[7]||(e[7]=t("label",null,"美金余额:",-1)),t("span",null,u(o.value.balance),1)]),l(c,{type:"submit"},{default:d(()=>e[8]||(e[8]=[k("刷新")])),_:1})],32),s.value?(b(),y("div",G,u(s.value),1)):_("",!0),l(c,{onClick:e[0]||(e[0]=i=>p.value=!0)},{default:d(()=>e[9]||(e[9]=[k("转账")])),_:1}),p.value?(b(),y("div",H,[t("div",L,[t("span",{class:"close",onClick:e[1]||(e[1]=i=>p.value=!1)},"×"),e[13]||(e[13]=t("h2",null,"转账",-1)),t("form",{onSubmit:w(I,["prevent"])},[t("div",P,[e[10]||(e[10]=t("label",null,"对方的账户邮箱:",-1)),l(V,{modelValue:a.value.toEmail,"onUpdate:modelValue":e[2]||(e[2]=i=>a.value.toEmail=i),type:"email",required:""},null,8,["modelValue"])]),t("div",j,[e[11]||(e[11]=t("label",null,"转账金额:",-1)),l(V,{modelValue:a.value.amount,"onUpdate:modelValue":e[3]||(e[3]=i=>a.value.amount=i),type:"number",required:""},null,8,["modelValue"])]),l(c,{type:"submit"},{default:d(()=>e[12]||(e[12]=[k("转账")])),_:1})],32),v.value?(b(),y("div",J,u(v.value),1)):_("",!0)])])):_("",!0)])])]),_:1})]),_:1})}}}),Y=E(K,[["__scopeId","data-v-fad0696e"]]);export{Y as default};
