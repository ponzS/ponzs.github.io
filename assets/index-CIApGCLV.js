import{r as S,a as se,R as re}from"./react-wGySg1uH.js";import{W as le,S as ce,a as de,F as ue,P as fe,G as D,b as pe,V as m,c as x,M as me,d as Z,e as K,A as q,C as he,B as we,f as L,g as Q,h as ve,i as ge,j as ye,N as xe,D as be,k as Se,l as ee}from"./three-Cic6lgBK.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function o(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(n){if(n.ep)return;n.ep=!0;const i=o(n);fetch(n.href,i)}})();var ie={exports:{}},Y={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Me=S,Pe=Symbol.for("react.element"),Te=Symbol.for("react.fragment"),ze=Object.prototype.hasOwnProperty,Ne=Me.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Ce={key:!0,ref:!0,__self:!0,__source:!0};function ne(r,a,o){var t,n={},i=null,l=null;o!==void 0&&(i=""+o),a.key!==void 0&&(i=""+a.key),a.ref!==void 0&&(l=a.ref);for(t in a)ze.call(a,t)&&!Ce.hasOwnProperty(t)&&(n[t]=a[t]);if(r&&r.defaultProps)for(t in a=r.defaultProps,a)n[t]===void 0&&(n[t]=a[t]);return{$$typeof:Pe,type:r,key:i,ref:l,props:n,_owner:Ne.current}}Y.Fragment=Te;Y.jsx=ne;Y.jsxs=ne;ie.exports=Y;var c=ie.exports,H={},te=se;H.createRoot=te.createRoot,H.hydrateRoot=te.hydrateRoot;const ke="/assets/avatar-CJClhSYb.png",Le=`
varying vec2 vUv;
varying vec3 vWorldPosition;

void main() {
  vUv = uv;
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPosition.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`,Ee=`
precision highp float;

uniform float uTime;
uniform float uProgress;
uniform float uOpacity;
uniform float uSeed;
uniform vec3 uTint;
uniform vec3 uShadowTint;
uniform vec3 uGlowTint;
uniform vec3 uLight;
uniform float uPulse;

varying vec2 vUv;
varying vec3 vWorldPosition;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.56;
  float frequency = 1.0;

  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p * frequency);
    frequency *= 2.04;
    amplitude *= 0.52;
    p = mat2(1.6, 1.2, -1.2, 1.6) * p;
  }

  return value;
}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  vec2 stretchUv = vec2(uv.x * 0.88, uv.y * 1.18);
  float radial = 1.0 - smoothstep(0.28, 1.12, length(stretchUv));

  vec2 wind = vec2(0.08, -0.03) * uTime + vec2(uSeed * 6.13, uSeed * 3.71);
  float angle = atan(stretchUv.y, stretchUv.x);
  float radius = length(stretchUv);
  vec2 curlFlow = vec2(
    cos(angle * 3.1 + uTime * 0.26 + uSeed * 13.0),
    sin(angle * 2.4 - uTime * 0.21 + uSeed * 11.0)
  ) * (0.06 + radius * 0.1);
  vec2 microFlow = vec2(
    sin(stretchUv.y * 6.4 + uTime * 0.55 + uSeed * 8.0),
    cos(stretchUv.x * 5.6 - uTime * 0.48 + uSeed * 10.0)
  ) * 0.032;
  vec2 worldFlow = vWorldPosition.xy * 0.12 + vec2(vWorldPosition.z * 0.05, -vWorldPosition.z * 0.03);

  float volume = 0.0;
  float totalWeight = 0.0;

  for (int i = 0; i < 4; i++) {
    float depth = float(i) / 3.0;
    vec2 sampleUv = stretchUv * (1.15 + depth * 0.42);
    sampleUv += wind * (0.65 + depth * 0.3);
    sampleUv += curlFlow * (0.9 - depth * 0.14);
    sampleUv += microFlow * (1.0 + depth * 0.7);
    sampleUv += worldFlow * (0.95 - depth * 0.18);
    sampleUv += uLight.xy * depth * 0.24;

    float sampleNoise = fbm(sampleUv * 2.1 + depth * 4.7 + uSeed * 9.1 + uPulse * 0.18);
    float layer = smoothstep(0.32 - depth * 0.05, 0.93 - depth * 0.08, sampleNoise);
    float weight = 1.15 - depth * 0.23;

    volume += layer * weight;
    totalWeight += weight;
  }

  volume /= max(totalWeight, 0.0001);

  float breakup = fbm(stretchUv * 3.4 + wind * 1.4 + curlFlow * 1.8 + uSeed * 14.0);
  float eddy = fbm(stretchUv * 5.4 - curlFlow * 2.3 + microFlow * 6.0 + uSeed * 18.0);
  float density = volume * radial;
  density *= 0.72 + breakup * 0.34 + eddy * 0.18;
  density *= 0.92 + uPulse * 0.08;
  density *= 1.0 - uProgress * 0.18;
  density = smoothstep(0.24, 0.94, density);

  float innerGlow = smoothstep(0.48, 0.98, volume) * radial;
  vec3 fakeNormal = normalize(vec3(stretchUv * vec2(0.92, 1.24), 1.05 - volume * 0.75));
  float lightMask = clamp(dot(fakeNormal, normalize(uLight)), 0.0, 1.0);
  float lightSweep = smoothstep(
    -0.14,
    0.58,
    dot(stretchUv, normalize(vec2(0.86, -0.38))) + sin(uTime * 0.31 + uSeed * 19.0) * 0.28
  );
  lightMask = clamp(lightMask * 0.78 + lightSweep * 0.32, 0.0, 1.0);

  float shadowNoise = fbm(stretchUv * 2.6 - wind * 0.9 - curlFlow * 1.1 + uSeed * 5.3);
  float shadowMask = smoothstep(0.22, 0.84, shadowNoise) * (1.0 - lightMask);
  float beamCoord = dot(stretchUv + curlFlow * 0.32, normalize(vec2(0.94, -0.34)));
  float beamNoise = fbm(vec2(beamCoord * 4.8, stretchUv.y * 2.3) + wind * 1.8 + uSeed * 11.0);
  float beamA = smoothstep(0.3, 0.02, abs(beamCoord + 0.34 + sin(uTime * 0.17 + uSeed * 6.0) * 0.07));
  float beamB = smoothstep(0.24, 0.015, abs(beamCoord - 0.02 + sin(uTime * 0.22 + uSeed * 9.0) * 0.05));
  float beamC = smoothstep(0.28, 0.018, abs(beamCoord - 0.42 + sin(uTime * 0.15 + uSeed * 12.0) * 0.06));
  float beamSlices = clamp(beamA * 0.8 + beamB + beamC * 0.72, 0.0, 1.0);
  beamSlices *= smoothstep(0.28, 0.86, beamNoise) * radial * (0.36 + lightMask * 0.9);

  float occlusionCoord = dot(stretchUv - curlFlow * 0.26, normalize(vec2(0.76, 0.64)));
  float occlusionNoise = fbm(stretchUv * 4.6 - wind * 0.5 + microFlow * 5.0 + uSeed * 17.0);
  float dustLane = 1.0 - smoothstep(
    0.06,
    0.26,
    abs(occlusionCoord + (occlusionNoise - 0.5) * 0.34 + sin(uTime * 0.13 + uSeed * 8.0) * 0.08)
  );
  float dustEdge = smoothstep(
    0.28,
    0.1,
    abs(occlusionCoord + (occlusionNoise - 0.5) * 0.22)
  ) * (1.0 - dustLane);
  float occlusionMask = dustLane * smoothstep(0.3, 0.88, occlusionNoise) * (0.5 + radius * 0.34);

  vec3 color = mix(uShadowTint, uTint, lightMask * 0.82 + 0.18);
  color = mix(color, uGlowTint, innerGlow * 0.68);
  color = mix(color, uShadowTint * 0.72, shadowMask * 0.42);
  color = mix(color, mix(uGlowTint, vec3(1.0), 0.18), beamSlices * 0.34);
  color = mix(color, uShadowTint * 0.46, occlusionMask * 0.74);
  color = mix(color, uGlowTint, dustEdge * 0.16 * lightMask);

  float alpha = density * uOpacity;
  alpha *= 0.58 + lightMask * 0.46 + innerGlow * 0.32;
  alpha *= 1.0 + beamSlices * 0.12;
  alpha *= 1.0 - occlusionMask * 0.32;
  alpha *= 1.0 - smoothstep(0.84, 1.12, length(vec2(uv.x * 0.96, uv.y * 1.18)));

  if (alpha < 0.01) {
    discard;
  }

  gl_FragColor = vec4(color, alpha);
}
`;function Re(){const a=document.createElement("canvas");a.width=192,a.height=192;const o=a.getContext("2d");if(!o)return null;const t=o.createRadialGradient(192/2,192/2,0,192/2,192/2,192/2);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.18,"rgba(224,247,255,0.95)"),t.addColorStop(.42,"rgba(111,220,255,0.5)"),t.addColorStop(1,"rgba(5,10,24,0)"),o.fillStyle=t,o.fillRect(0,0,192,192),new he(a)}function je({count:r,radius:a,thickness:o,size:t,opacity:n}){const i=new we,l=new Float32Array(r*3),v=new Float32Array(r*3),p=new Float32Array(r*3),f=new Float32Array(r),g=new Float32Array(r),M=new L("#f7fbff"),O=new L("#61f8ff"),T=new L("#ff3343"),G=new L("#2c49c6");for(let E=0;E<r;E+=1){const y=E*3,C=Math.random()*Math.PI*2,b=Math.pow(Math.random(),.7)*a,u=Math.cos(C)*b,F=(Math.random()-.5)*a*.9,W=(Math.random()-.5)*o;l[y]=u,l[y+1]=F,l[y+2]=W,p[y]=u,p[y+1]=F,p[y+2]=W,f[E]=.45+Math.random()*1.15,g[E]=Math.random()*Math.PI*2;const A=Math.random(),R=M.clone().lerp(A>.85?T:A>.45?O:G,.08+Math.random()*.26);v[y]=R.r,v[y+1]=R.g,v[y+2]=R.b}i.setAttribute("position",new Q(l,3)),i.setAttribute("color",new Q(v,3));const X=new ve({size:t,transparent:!0,opacity:n,depthWrite:!1,blending:q,vertexColors:!0,sizeAttenuation:!0}),U=new ge(i,X);return{geometry:i,material:X,points:U,basePositions:p,twinkle:f,phase:g,opacity:n,rotationSpeed:(Math.random()-.5)*.035}}function Ue({opacity:r,seed:a,tint:o,shadowTint:t,glowTint:n}){return new ye({transparent:!0,depthWrite:!1,side:be,blending:xe,uniforms:{uTime:{value:0},uProgress:{value:0},uOpacity:{value:r},uSeed:{value:a},uTint:{value:new L(o)},uShadowTint:{value:new L(t)},uGlowTint:{value:new L(n)},uLight:{value:new x(-.28,.2,1).normalize()},uPulse:{value:0}},vertexShader:Le,fragmentShader:Ee})}function Fe({progress:r,reducedMotion:a}){const o=S.useRef(null),t=S.useRef(r),n=S.useRef(a);return t.current=r,n.current=a,S.useEffect(()=>{const i=o.current;if(!i)return;const l=new le({antialias:!0,alpha:!0,powerPreference:"high-performance"});l.setPixelRatio(Math.min(window.devicePixelRatio,window.innerWidth<768?1.4:1.8)),l.setSize(i.clientWidth,i.clientHeight),l.setClearColor("#040611",1),l.outputColorSpace=ce,i.appendChild(l.domElement);const v=new de;v.fog=new ue("#070819",.025);const p=new fe(44,i.clientWidth/Math.max(1,i.clientHeight),.1,140);p.position.set(0,0,17.1);const f=new D,g=new D,M=new D;v.add(f),v.add(g),v.add(M);const O=window.innerWidth<768?1.14:1.24;f.scale.setScalar(O),M.scale.setScalar(O*1.02),g.scale.setScalar(window.innerWidth<768?1.08:1.12);const T=Re(),G=new pe(1,1,1,1),U=(window.innerWidth<768?[{count:220,radius:15.5,thickness:18,size:.08,opacity:.24},{count:90,radius:9.6,thickness:10,size:.14,opacity:.14}]:[{count:380,radius:18.5,thickness:20,size:.06,opacity:.22},{count:150,radius:11,thickness:12,size:.1,opacity:.15}]).map(e=>je(e));for(const e of U)e.material.map=T,e.material.needsUpdate=!0,g.add(e.points);const y=(window.innerWidth<768?[{position:new x(-1.2,1.2,-2.2),scale:new m(13.1,9.8),drift:new m(.28,.12),opacity:.42,seed:.13,spin:.08,timeScale:.82,lift:.24,tint:"#4bcfff",shadowTint:"#071126",glowTint:"#97f5ff"},{position:new x(1.8,-.8,-1.3),scale:new m(11.9,8.6),drift:new m(-.18,.14),opacity:.36,seed:.39,spin:-.05,timeScale:.94,lift:.18,tint:"#ff3343",shadowTint:"#16040a",glowTint:"#ff8a66"},{position:new x(.4,.1,.6),scale:new m(9.8,7.2),drift:new m(.12,-.18),opacity:.28,seed:.68,spin:.04,timeScale:1.08,lift:.14,tint:"#2949d1",shadowTint:"#040914",glowTint:"#5ee8ff"},{position:new x(.1,-1.9,-.4),scale:new m(11.1,8),drift:new m(.14,.08),opacity:.24,seed:.88,spin:-.06,timeScale:.9,lift:.16,tint:"#6ef3ff",shadowTint:"#08172d",glowTint:"#ffffff"}]:[{position:new x(-2.1,1.35,-2.5),scale:new m(15.1,10.9),drift:new m(.36,.13),opacity:.42,seed:.13,spin:.08,timeScale:.82,lift:.28,tint:"#4bcfff",shadowTint:"#071126",glowTint:"#97f5ff"},{position:new x(2.6,-.8,-1.6),scale:new m(13.6,9.4),drift:new m(-.22,.16),opacity:.37,seed:.38,spin:-.05,timeScale:.96,lift:.2,tint:"#ff3343",shadowTint:"#18040b",glowTint:"#ff8a66"},{position:new x(.4,.2,.2),scale:new m(10.5,7.5),drift:new m(.14,-.2),opacity:.28,seed:.66,spin:.05,timeScale:1.1,lift:.16,tint:"#2949d1",shadowTint:"#040914",glowTint:"#5ee8ff"},{position:new x(-.8,-2.35,-.8),scale:new m(12.8,8.8),drift:new m(.18,.1),opacity:.26,seed:.84,spin:-.06,timeScale:.88,lift:.18,tint:"#6ef3ff",shadowTint:"#08172d",glowTint:"#ffffff"},{position:new x(1.25,2,1.1),scale:new m(9.9,6.8),drift:new m(-.12,-.09),opacity:.22,seed:.93,spin:.03,timeScale:1.18,lift:.12,tint:"#ff4051",shadowTint:"#17040a",glowTint:"#ffc2a8"}]).map(e=>{const h=Ue(e),d=new me(G,h);return d.position.copy(e.position),d.scale.set(e.scale.x,e.scale.y,1),f.add(d),{mesh:d,material:h,origin:e.position.clone(),drift:e.drift.clone(),scale:e.scale.clone(),opacity:e.opacity,spin:e.spin,phase:e.seed*Math.PI*2,timeScale:e.timeScale,lift:e.lift}}),C=new Z(new K({map:T,color:"#4fe7ff",opacity:.14,blending:q,depthWrite:!1}));C.scale.set(12.5,11.2,1),M.add(C);const b=new Z(new K({map:T,color:"#ff3343",opacity:.08,blending:q,depthWrite:!1}));b.position.set(2.7,-.8,-1.3),b.scale.set(18.8,12.6,1),M.add(b);const u={x:0,y:0,dragX:0,dragY:0,isDragging:!1,lastX:0,lastY:0},F=e=>{t.current>.45||n.current||(u.isDragging=!0,u.lastX=e.clientX,u.lastY=e.clientY)},W=e=>{const h=e.clientX/window.innerWidth*2-1,d=e.clientY/window.innerHeight*2-1;if(u.isDragging){const s=(e.clientX-u.lastX)/window.innerWidth,w=(e.clientY-u.lastY)/window.innerHeight;u.dragX+=s*1.45,u.dragY+=w*1.05,u.lastX=e.clientX,u.lastY=e.clientY}u.x=h,u.y=d},A=()=>{u.isDragging=!1},R=()=>{o.current&&(p.aspect=o.current.clientWidth/Math.max(1,o.current.clientHeight),p.updateProjectionMatrix(),l.setPixelRatio(Math.min(window.devicePixelRatio,window.innerWidth<768?1.35:1.8)),l.setSize(o.current.clientWidth,o.current.clientHeight))};i.addEventListener("pointerdown",F),window.addEventListener("pointermove",W,{passive:!0}),window.addEventListener("pointerup",A),window.addEventListener("resize",R);const ae=new Se,$=new x;let z=0,N=0,V=0;const J=()=>{V=window.requestAnimationFrame(J);const e=ae.getElapsedTime(),h=t.current,d=n.current?.18:1;z=ee.lerp(z,u.x*.34+u.dragX,.045),N=ee.lerp(N,u.y*.2+u.dragY,.045),u.dragX*=.985,u.dragY*=.985,p.position.x=z*2.3*d,p.position.y=-N*1.3*d,p.position.z=17.1-h*4.2,p.lookAt(0,0,0),f.position.x=z*.9*d,f.position.y=-N*.5*d,f.position.z=-h*2.6,g.position.x=z*1.3*d,g.position.y=-N*.7*d,g.position.z=-h*1.8,M.position.x=z*.6*d,M.position.y=-N*.4*d,M.position.z=-h*2.2,f.rotation.z=Math.sin(e*.06)*.05*d,g.rotation.z=Math.sin(e*.04)*.025*d,$.set(-.28+z*.55,.22-N*.32,1).normalize(),C.material.opacity=.14*(1-h*.74),C.scale.set(13.9+Math.sin(e*.42)*.95,12.6+Math.cos(e*.37)*.82,1),b.material.opacity=.08*(1-h*.72),b.position.x=2.7+Math.sin(e*.18+1.2)*.32,b.position.y=-.8+Math.cos(e*.21+.4)*.22,b.scale.set(18.8+Math.sin(e*.3+1.2)*.9,12.6+Math.cos(e*.34)*.72,1);for(const[s,w]of U.entries()){const _=w.geometry.getAttribute("position"),k=_.array;if(w.points.rotation.y=e*w.rotationSpeed+z*.08*d,w.points.rotation.x=e*w.rotationSpeed*.4-N*.04*d,w.material.opacity=w.opacity*(1-h*(.46+s*.1))*(.92+Math.sin(e*.55+s)*.05),!n.current){for(let P=0;P<w.twinkle.length;P+=1){const j=P*3,I=w.twinkle[P],B=w.phase[P];k[j]=w.basePositions[j]+Math.cos(e*I*.26+B)*.04,k[j+1]=w.basePositions[j+1]+Math.sin(e*I*.22+B)*.06,k[j+2]=w.basePositions[j+2]+Math.sin(e*I*.38+B)*.18}_.needsUpdate=!0}}for(const s of y){const w=Math.sin(e*.14+s.phase)*s.drift.x*d,_=Math.cos(e*.16+s.phase*.8)*s.drift.y*d,k=Math.sin(e*(.11+s.timeScale*.04)+s.phase*1.7)*s.lift*d,P=n.current?0:Math.sin(e*(.22+s.timeScale*.06)+s.phase)*.045;s.mesh.position.set(s.origin.x+w,s.origin.y+_+k,s.origin.z-h*(1.6+s.opacity*.8)),s.mesh.quaternion.copy(p.quaternion),s.mesh.rotateZ(s.spin+Math.sin(e*.08+s.phase)*.06*d),s.mesh.scale.set(s.scale.x*(1+P+h*.08),s.scale.y*(1+P*.75+h*.05+k*.06),1),s.material.uniforms.uTime.value=e*d*s.timeScale+s.phase*.6,s.material.uniforms.uProgress.value=h,s.material.uniforms.uOpacity.value=s.opacity*(1-h*.7),s.material.uniforms.uLight.value.copy($),s.material.uniforms.uPulse.value=1+P*3.8+k*.35}l.render(v,p)};return J(),()=>{window.cancelAnimationFrame(V),i.removeEventListener("pointerdown",F),window.removeEventListener("pointermove",W),window.removeEventListener("pointerup",A),window.removeEventListener("resize",R);for(const e of U)e.geometry.dispose(),e.material.dispose();for(const e of y)e.material.dispose();G.dispose(),C.material.dispose(),b.material.dispose(),T==null||T.dispose(),l.dispose(),i.removeChild(l.domElement)}},[]),c.jsx("div",{"aria-hidden":"true",className:"nebula-canvas",ref:o})}function We(){const[r,a]=S.useState(!1);return S.useEffect(()=>{if(typeof window>"u"||!window.matchMedia)return;const o=window.matchMedia("(prefers-reduced-motion: reduce)"),t=()=>{a(o.matches)};return t(),typeof o.addEventListener=="function"?(o.addEventListener("change",t),()=>o.removeEventListener("change",t)):(o.addListener(t),()=>o.removeListener(t))},[]),r}function Ae(r){return Math.min(1,Math.max(0,r))}function Oe(r){const[a,o]=S.useState(0);return S.useEffect(()=>{let t=0;const n=()=>{t=0;const l=r.current;if(!l)return;const v=l.getBoundingClientRect(),p=Math.max(1,v.height-window.innerHeight),f=Ae(-v.top/p);o(g=>Math.abs(g-f)<.001?g:f)},i=()=>{t===0&&(t=window.requestAnimationFrame(n))};return n(),window.addEventListener("scroll",i,{passive:!0}),window.addEventListener("resize",i),()=>{t!==0&&window.cancelAnimationFrame(t),window.removeEventListener("scroll",i),window.removeEventListener("resize",i)}},[r]),a}function oe(r){return Math.min(1,Math.max(0,r))}const Ge=[{label:"X",value:"@ponzS",href:"https://x.com/guoaiz11355"},{label:"Email",value:"zhangguoai888@gmail.com",href:"mailto:zhangguoai888@gmail.com"},{label:"GitHub",value:"github.com/ponzS",href:"https://github.com/ponzS"}];function _e(){const r=S.useRef(null),a=We(),o=Oe(r),t=oe(1-o*1.5),n=o*72,i=1-o*.07,l=oe((o-.28)/.42),v=(1-l)*70,p=.12+o*.58;return c.jsx("main",{className:a?"app-shell reduced-motion":"app-shell",children:c.jsx("section",{className:"scene-stage",ref:r,children:c.jsxs("div",{className:"scene-sticky",children:[c.jsx(Fe,{progress:o,reducedMotion:a}),c.jsx("div",{className:"ambient ambient-cyan"}),c.jsx("div",{className:"ambient ambient-signal"}),c.jsx("div",{className:"scene-scrim",style:{opacity:p}}),c.jsxs("section",{"aria-label":"Hero scene",className:"hero-layer",style:{opacity:t,transform:`translate3d(0, ${n}px, 0) scale(${i})`},children:[c.jsx("p",{className:"hero-kicker",children:"M78 / 01"}),c.jsx("h1",{className:"hero-title",children:"PONZS"}),c.jsx("p",{className:"hero-copy",children:"A personal relay drifting through electric dust, tuned for interfaces, systems, and synthetic night."}),c.jsx("p",{className:"hero-hint",children:a?"Scroll to reveal the identity layer.":"Drag to tilt the nebula. Scroll to arrive."})]}),c.jsxs("section",{"aria-label":"Identity layer",className:"identity-layer",style:{opacity:l,transform:`translate3d(0, ${v}px, 0)`},children:[c.jsxs("div",{className:"identity-content",children:[c.jsx("div",{className:"avatar-orb",children:c.jsx("img",{alt:"Portrait of Ponzs",className:"avatar-image",src:ke})}),c.jsxs("div",{className:"identity-copy-block",children:[c.jsx("p",{className:"identity-kicker",children:"Identity / relay unlocked"}),c.jsx("h2",{className:"identity-name",children:"Ponzs"}),c.jsx("p",{className:"identity-bio",children:"Creative developer shaping cinematic interfaces and playful systems across the web."})]})]}),c.jsx("nav",{"aria-label":"Contact links",className:"identity-links",children:Ge.map(f=>c.jsxs("a",{className:"signal-link",href:f.href,rel:"noreferrer",target:f.href.startsWith("mailto:")?void 0:"_blank",children:[c.jsx("span",{className:"signal-link-label",children:f.label}),c.jsx("span",{className:"signal-link-value",children:f.value})]},f.label))})]})]})})})}H.createRoot(document.getElementById("root")).render(c.jsx(re.StrictMode,{children:c.jsx(_e,{})}));
