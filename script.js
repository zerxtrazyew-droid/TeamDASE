(()=>{"use strict";
const C=window.CONTENT,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const img=(src,alt)=>`<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='assets/placeholder.svg'">`;
const root=document.documentElement;Object.keys(C.roles).forEach(k=>root.style.setProperty("--role-"+k,C.roles[k].color));
/* Pure function: scroll progress (0..1) -> scene positions. y0 = rocket start (on the horizon). */
function rocketState(p,h,y0){const q=Math.min(1,Math.max(0,p)),e=q*q*(3-2*q),end=h*.1;return{y:y0+(end-y0)*e,planetY:q*h*.8,starY:-q*150,moonY:-q*h*.3,gasY:q*h*.45}}
window.rocketState=rocketState;
const st=(i,c)=>`style="transition-delay:${Math.min(i,6)*90}ms${c?";"+c:""}"`;
function render(){
 const P=C.project;document.title=P.name+" | Singapore Polytechnic space project";$("#pname").textContent=P.name;$("#school").textContent=P.school;$("#tname").textContent=P.name;$("#tag").textContent=P.headline;$("#intro").textContent=P.intro;
 $("#group").innerHTML=img(C.team.groupPhoto,C.team.groupAlt)+`<figcaption>${esc(P.name)}, Singapore Polytechnic (placeholder photo: replace in content.js)</figcaption>`;$("#tabout").textContent=C.team.about;$("#tcontrib").textContent=C.team.contributionsNote;
 const R=C.roles,keys=Object.keys(R);
 $("#filters").innerHTML=`<button type="button" data-f="all" aria-pressed="true">All (${C.team.members.length})</button>`+keys.map(k=>`<button type="button" data-f="${k}" aria-pressed="false" style="--c:${R[k].color}"><span aria-hidden="true">${esc(R[k].icon)}</span> ${esc(R[k].label)}s (${C.team.members.filter(m=>m.roleKey==k).length})</button>`).join("");
 $("#members").innerHTML=C.team.members.map((m,i)=>{const r=R[m.roleKey]||R.coder;return `<figure class="card member reveal" data-role="${esc(m.roleKey)}" ${st(i,"--role:"+r.color)}>${img(m.photo,m.alt)}<h3>${esc(m.name)}</h3><span class="rolelabel"><span aria-hidden="true">${esc(r.icon)}</span>${esc(r.label)}</span><p>${esc(m.bio)}</p><div class="small">${esc(r.blurb)}</div><ul>${(m.contributions||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ul></figure>`}).join("");
 $("#story").innerHTML=C.why.paragraphs.map(t=>`<p>${esc(t)}</p>`).join("")+`<p class="note">${esc(C.why.placeholder)}</p>`;
 $("#gnote").textContent=C.goalsNote;$("#goalcards").innerHTML=C.goals.map((g,i)=>`<div class="card goal reveal ${i%2?"r":"l"}" ${st(i)}><div class="n">0${i+1}</div><h3>${esc(g.title)}</h3><p>${esc(g.text)}</p></div>`).join("");
 $("#lintro").textContent=C.learn.intro;$("#learncards").innerHTML=C.learn.cards.map((c,i)=>`<article class="card reveal ${i%2?"r":"l"}" ${st(i)}><span class="tag ${/fact/i.test(c.tag)?"fact":""}">${esc(c.tag)}</span><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p><ul>${c.links.map(l=>`<li><a href="${esc(l.url)}" rel="noopener">${esc(l.t)}</a></li>`).join("")}</ul></article>`).join("");
 $("#sintro").textContent=C.science.intro;const S=C.science.stats,num=S.filter(s=>s.status=="sourced"&&typeof s.value=="number"&&/^kPa/.test(s.unit)),mx=Math.max(1,...num.map(s=>s.value));
 $("#chart").innerHTML=`<h3>Pressure comparison (kPa)</h3>`+(num.length?num.map(s=>`<div>${esc(s.label)}: <b>${s.value} kPa</b></div><div class="bar" role="img" aria-label="${esc(s.label)} ${s.value} kPa"><i data-w="${s.value/mx*100}"></i></div>`).join(""):"<p>No verified numeric data yet.</p>")+`<p class="small">Sources are listed under each data card and in References.</p>`;
 $("#stats").innerHTML=S.map((s,i)=>`<div class="card reveal ${i%2?"r":"l"}" ${st(i)}><span class="tag ${s.status=="sourced"?"":"pend"}">${s.status=="sourced"?"Sourced":"Pending"}</span><h3>${esc(s.label)}</h3><div class="big-n">${s.value===""?"--":esc(s.value)} <span class="small">${esc(s.unit)}</span></div><p>${esc(s.meaning)}</p><p class="small">Source: ${s.url?`<a href="${esc(s.url)}" rel="noopener">${esc(s.source)}</a>`:esc(s.source)}${s.date?", "+esc(s.date):""}</p></div>`).join("");
 $("#refs").innerHTML=S.filter(s=>s.url).map(s=>`<li>${esc(s.source)}, ${esc(s.date)}. <a href="${esc(s.url)}" rel="noopener">${esc(s.url)}</a></li>`).join("")+C.learn.cards.flatMap(c=>c.links).map(l=>`<li>${esc(l.t)}. <a href="${esc(l.url)}" rel="noopener">${esc(l.url)}</a></li>`).join("");
 $("#progress").innerHTML=`<p><b>Milestones</b></p><ul>${C.progress.milestones.map(m=>`<li>${esc(m.label)} (${esc(m.status)})</li>`).join("")}</ul><p><b>Updates</b></p><ul>${C.progress.updates.map(u=>`<li>${esc(u.date)}: ${esc(u.text)}</li>`).join("")}</ul>`;
 $("#quote").textContent=C.vision.quote;$("#vtext").textContent=C.vision.text;$("#etitle").textContent=C.enter.title;$("#etext").textContent=C.enter.text;
 $("#disc").textContent=P.disclaimer;$("#credits").textContent=C.imageCredits.length?"Image credits: "+C.imageCredits.join("; "):"Planets on this page are generated procedurally in your browser. They are illustrations, not photographs."}
render();
$("#filters").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;$$("#filters button").forEach(x=>x.setAttribute("aria-pressed",x==b));$$(".member").forEach(m=>{m.hidden=b.dataset.f!="all"&&m.dataset.role!=b.dataset.f})});
const reduce=matchMedia("(prefers-reduced-motion: reduce)"),el={rk:$("#rocketwrap"),pl:$("#planet"),st:$("#stars"),fl:$("#flame"),mo:$("#moon"),gs:$("#gas"),ea:$("#earth")};
let target=0,cur=0,raf=0,motion=false,io,G={},rt=0,lastKey="";
const prog=()=>{const d=root,m=d.scrollHeight-innerHeight;return m>0?scrollY/m:0};
function layout(){const W=innerWidth,h=innerHeight,H=Math.round(h*.6),small=W<700;G={W,h,H,R:1.15*W,capTop:H*.34,sc:small?.7:1,rx:W*(small?.9:.86)};G.cy=G.capTop+G.R;
 const cw=small?560:1100,ch=Math.round(cw*H/W);el.ea.style.width=W+"px";el.ea.style.height=H+"px";
 const key=cw+"x"+ch;if(key!==lastKey){lastKey=key;if(el.ea._stop)el.ea._stop();el.ea.classList.remove("ready");el.ea.width=cw;el.ea.height=ch;
  if(C.images.heroEarth){el.ea.style.background=`url("${C.images.heroEarth}") center top/cover`;el.ea.classList.add("ready")}else{const s=cw/W;Space.earthCap(el.ea,{R:G.R*s,cx:cw/2,cy:G.cy*s})}}
 const dx=G.rx-W/2,sy=h-H+G.cy-Math.sqrt(Math.max(0,G.R*G.R-dx*dx));G.y0=sy-70*G.sc+3;el.rk.style.left=(G.rx-20*G.sc)+"px"}
function apply(p,v){const s=rocketState(p,G.h,G.y0);el.rk.style.transform=`translate3d(0,${s.y}px,0)`;el.pl.style.transform=`translate3d(0,${s.planetY}px,0)`;el.st.style.transform=`translate3d(0,${s.starY}px,0)`;el.mo.style.transform=`translate3d(0,${s.moonY}px,0)`;el.gs.style.transform=`translate3d(0,${s.gasY}px,0)`;el.fl.style.transform=`scaleY(${motion?Math.min(1,Math.abs(v)*90):0})`;el.rk.classList.toggle("fly",motion&&Math.abs(v)>.0004)}
function tick(){const prev=cur;cur+=(target-cur)*.09;apply(cur,cur-prev);raf=Math.abs(target-cur)>.0004?requestAnimationFrame(tick):0;if(!raf)apply(cur,0)}
const onScroll=()=>{target=prog();if(!raf)raf=requestAnimationFrame(tick)};
const onResize=()=>{clearTimeout(rt);rt=setTimeout(()=>{drawStars();layout();apply(cur,0)},200)};
function drawStars(){const c=el.st,w=c.width=innerWidth,h=c.height=Math.round(innerHeight*1.4),x=c.getContext("2d");x.clearRect(0,0,w,h);x.fillStyle="#dfe9ff";let s=7;const r=()=>(s=(s*16807)%2147483647)/2147483647;for(let i=0;i<Math.round(w*h/9000);i++){x.globalAlpha=.25+r()*.7;x.beginPath();x.arc(r()*w,r()*h,r()*1.3+.2,0,7);x.fill()}}
function setup(){removeEventListener("scroll",onScroll);cancelAnimationFrame(raf);raf=0;motion=!reduce.matches;drawStars();layout();
 if(motion){cur=target=prog();apply(cur,0);addEventListener("scroll",onScroll,{passive:true})}else{cur=target=0;apply(0,0)}
 if(io)io.disconnect();const R=$$(".reveal"),B=$$(".bar i");
 if(!motion||!("IntersectionObserver" in window)){R.forEach(e=>e.classList.add("in"));B.forEach(b=>b.style.width=b.dataset.w+"%")}
 else{io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");if(e.target.dataset.w)e.target.style.width=e.target.dataset.w+"%";io.unobserve(e.target)}}),{threshold:.12});R.concat(B).forEach(e=>io.observe(e))}}
const navio=("IntersectionObserver" in window)?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$("nav a").forEach(a=>a.classList.toggle("on",a.getAttribute("href")=="#"+e.target.id))}),{rootMargin:"-40% 0px -55% 0px"}):null;
if(navio)$$("main section").forEach(s=>navio.observe(s));
addEventListener("resize",onResize);reduce.addEventListener("change",setup);setup();
/* secondary planets: rendered once, in idle time slices */
const sw=innerWidth<700?110:170;if(C.images.moon){[$("#moon"),$("#moonvis")].forEach(c=>{c.style.background=`url("${C.images.moon}") center/cover`;c.style.borderRadius="50%";c.classList.add("ready")})}else{Space.moon($("#moon"),()=>{});Space.moon($("#moonvis"),()=>{});}
Space.banded($("#gas"));
addEventListener("pagehide",()=>{removeEventListener("scroll",onScroll);removeEventListener("resize",onResize);reduce.removeEventListener("change",setup);cancelAnimationFrame(raf);clearTimeout(rt);if(io)io.disconnect();if(navio)navio.disconnect();$$("canvas").forEach(c=>c._stop&&c._stop())});
window.__geom=()=>G;window.__ready=true})();
