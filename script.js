(()=>{"use strict";
const C=window.CONTENT,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const img=(src,alt)=>`<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='assets/placeholder.svg'">`;
/* Pure function: scroll progress (0..1) -> scene positions. Exposed for testing. */
function rocketState(p,h){const q=Math.min(1,Math.max(0,p)),e=q*q*(3-2*q);return{y:h*.7-h*.62*e,planetY:q*h*.8,starY:-q*150}}
window.rocketState=rocketState;
function render(){
 document.title=C.project.name+" | Our Mission";$("#pname").textContent=C.project.name;$("#tag").textContent=C.project.tagline;$("#intro").textContent=C.project.intro;$("#draft").textContent=C.project.draftNote;
 $("#group").innerHTML=img(C.team.groupPhoto,C.team.groupAlt)+`<figcaption>Group photo (replace in content.js)</figcaption>`;$("#tabout").textContent=C.team.about;
 $("#members").innerHTML=C.team.members.map(m=>`<figure class="card member reveal">${img(m.photo,m.alt)}<h3>${esc(m.name)}</h3><div class="small">${esc(m.role)}</div><p>${esc(m.bio)}</p></figure>`).join("");
 $("#story").innerHTML=C.why.paragraphs.map(t=>`<p>${esc(t)}</p>`).join("")+`<p class="note">${esc(C.why.placeholder)}</p>`;
 $("#gnote").textContent=C.goalsNote;$("#goalcards").innerHTML=C.goals.map((g,i)=>`<div class="card goal reveal" style="transition-delay:${i*90}ms"><div class="n">0${i+1}</div><h3>${esc(g.title)}</h3><p>${esc(g.text)}</p></div>`).join("");
 $("#sintro").textContent=C.science.intro;const S=C.science.stats,num=S.filter(s=>s.status=="sourced"&&typeof s.value=="number"&&/^kPa/.test(s.unit)),mx=Math.max(1,...num.map(s=>s.value));
 $("#chart").innerHTML=`<h3>Pressure comparison (kPa)</h3>`+(num.length?num.map(s=>`<div>${esc(s.label)}: <b>${s.value} kPa</b></div><div class="bar" role="img" aria-label="${esc(s.label)} ${s.value} kPa"><i data-w="${s.value/mx*100}"></i></div>`).join(""):"<p>No verified numeric data yet.</p>");
 $("#stats").innerHTML=S.map(s=>`<div class="card reveal"><span class="tag ${s.status=="sourced"?"":"pend"}">${s.status=="sourced"?"Sourced":"Pending"}</span><h3>${esc(s.label)}</h3><div class="big-n">${s.value===""?"--":esc(s.value)} <span class="small">${esc(s.unit)}</span></div><p>${esc(s.meaning)}</p><p class="small">Source: ${esc(s.source)}${s.date?", "+esc(s.date):""}</p></div>`).join("");
 $("#refs").innerHTML=S.filter(s=>s.url).map(s=>`<li>${esc(s.source)}, ${esc(s.date)}. <a href="${esc(s.url)}" rel="noopener">${esc(s.url)}</a></li>`).join("")||"<li>Source to be confirmed.</li>";
 $("#progress").innerHTML=`<p><b>Milestones</b></p><ul>${C.progress.milestones.map(m=>`<li>${esc(m.label)} (${esc(m.status)})</li>`).join("")}</ul><p><b>Updates</b></p><ul>${C.progress.updates.map(u=>`<li>${esc(u.date)}: ${esc(u.text)}</li>`).join("")}</ul>`;
 $("#quote").textContent=C.vision.quote;$("#vtext").textContent=C.vision.text;$("#etitle").textContent=C.enter.title;$("#etext").textContent=C.enter.text}
render();
const reduce=matchMedia("(prefers-reduced-motion: reduce)"),el={rk:$("#rocketwrap"),pl:$("#planet"),st:$("#stars"),fl:$("#flame"),sun:$("#sun")};
let target=0,cur=0,raf=0,motion=false,io;
const prog=()=>{const d=document.documentElement,m=d.scrollHeight-innerHeight;return m>0?scrollY/m:0};
function apply(p,v){const s=rocketState(p,innerHeight);el.rk.style.transform=`translate3d(0,${s.y}px,0)`;el.pl.style.transform=`translate3d(-50%,${s.planetY}px,0)`;el.st.style.transform=`translate3d(0,${s.starY}px,0)`;el.sun.style.opacity=Math.max(0,1-p*2.2);el.fl.style.transform=`scaleY(${motion?Math.min(1,Math.abs(v)*90):0})`;el.rk.classList.toggle("fly",motion&&Math.abs(v)>.0004)}
function tick(){const prev=cur;cur+=(target-cur)*.09;apply(cur,cur-prev);raf=Math.abs(target-cur)>.0004?requestAnimationFrame(tick):0;if(!raf)apply(cur,0)}
const onScroll=()=>{target=prog();if(!raf)raf=requestAnimationFrame(tick)},onResize=()=>{drawStars();apply(cur,0)};
function drawStars(){const c=el.st,w=c.width=innerWidth,h=c.height=Math.round(innerHeight*1.4),x=c.getContext("2d");x.clearRect(0,0,w,h);x.fillStyle="#dfe9ff";let s=7;const r=()=>(s=(s*16807)%2147483647)/2147483647;for(let i=0;i<Math.round(w*h/9000);i++){x.globalAlpha=.25+r()*.7;x.beginPath();x.arc(r()*w,r()*h,r()*1.3+.2,0,7);x.fill()}}
function setup(){removeEventListener("scroll",onScroll);cancelAnimationFrame(raf);raf=0;motion=!reduce.matches;drawStars();
 if(motion){cur=target=prog();apply(cur,0);addEventListener("scroll",onScroll,{passive:true})}else{cur=target=0;apply(0,0)}
 if(io)io.disconnect();const R=$$(".reveal"),B=$$(".bar i");
 if(!motion||!("IntersectionObserver" in window)){R.forEach(e=>e.classList.add("in"));B.forEach(b=>b.style.width=b.dataset.w+"%")}
 else{io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");if(e.target.dataset.w)e.target.style.width=e.target.dataset.w+"%";io.unobserve(e.target)}}),{threshold:.15});R.concat(B).forEach(e=>io.observe(e))}}
const navio=("IntersectionObserver" in window)?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$("nav a").forEach(a=>a.classList.toggle("on",a.getAttribute("href")=="#"+e.target.id))}),{rootMargin:"-40% 0px -55% 0px"}):null;
if(navio)$$("main section").forEach(s=>navio.observe(s));
addEventListener("resize",onResize);reduce.addEventListener("change",setup);setup();
addEventListener("pagehide",()=>{removeEventListener("scroll",onScroll);removeEventListener("resize",onResize);reduce.removeEventListener("change",setup);cancelAnimationFrame(raf);if(io)io.disconnect();if(navio)navio.disconnect()});
window.__ready=true})();
