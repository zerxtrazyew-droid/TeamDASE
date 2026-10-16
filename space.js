/* Procedural planet renderer. Generates Earth-like, Moon-like and banded planets in the browser.
   These are NOT photographs. To use real NASA/other images instead, set CONTENT.images in content.js. */
(()=>{"use strict";
const P=new Uint8Array(512);{let s=1337;const r=()=>(s=(s*16807)%2147483647)/2147483647,a=[...Array(256).keys()];for(let i=255;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}for(let i=0;i<512;i++)P[i]=a[i&255]}
const fade=t=>t*t*t*(t*(t*6-15)+10),lp=(a,b,t)=>a+(b-a)*t,cl=(x,a=0,b=1)=>x<a?a:x>b?b:x,ss=(a,b,x)=>{x=cl((x-a)/(b-a));return x*x*(3-2*x)};
const g=(h,x,y,z)=>{h&=15;const u=h<8?x:y,v=h<4?y:(h==12||h==14?x:z);return((h&1)?-u:u)+((h&2)?-v:v)};
function noise(x,y,z){const fx=Math.floor(x),fy=Math.floor(y),fz=Math.floor(z),X=fx&255,Y=fy&255,Z=fz&255;x-=fx;y-=fy;z-=fz;const u=fade(x),v=fade(y),w=fade(z),A=P[X]+Y,AA=P[A]+Z,AB=P[A+1]+Z,B=P[X+1]+Y,BA=P[B]+Z,BB=P[B+1]+Z;
 return lp(lp(lp(g(P[AA],x,y,z),g(P[BA],x-1,y,z),u),lp(g(P[AB],x,y-1,z),g(P[BB],x-1,y-1,z),u),v),lp(lp(g(P[AA+1],x,y,z-1),g(P[BA+1],x-1,y,z-1),u),lp(g(P[AB+1],x,y-1,z-1),g(P[BB+1],x-1,y-1,z-1),u),v),w)}
const fbm=(x,y,z,o)=>{let a=.5,f=1,s=0;for(let i=0;i<o;i++){s+=a*noise(x*f,y*f,z*f);f*=2.03;a*=.5}return s};
const mix=(a,b,t)=>[lp(a[0],b[0],t),lp(a[1],b[1],t),lp(a[2],b[2],t)];
const L=(()=>{const v=[-.55,.5,.67],m=Math.hypot(...v);return v.map(c=>c/m)})();
/* paint rows in small time slices so the page never freezes */
function paint(cv,shade,done){const w=cv.width,h=cv.height,ctx=cv.getContext("2d"),im=ctx.createImageData(w,h),d=im.data;let y=0,dead=false;cv._stop=()=>{dead=true};
 (function step(){if(dead)return;const t=performance.now();while(y<h&&performance.now()-t<7){for(let x=0;x<w;x++){const c=shade(x,y),i=(y*w+x)*4;d[i]=c[0];d[i+1]=c[1];d[i+2]=c[2];d[i+3]=c[3]}y++}ctx.putImageData(im,0,0);if(y<h)requestAnimationFrame(step);else{cv.classList.add("ready");done&&done()}})()}
function earthTex(nx,ny,nz){const e=fbm(nx*3+3,ny*3,nz*3,7),lat=Math.abs(ny);let c,ocean=0;
 if(e<.02){ocean=1;c=mix([34,96,150],[4,20,64],cl((.02-e)*3.2))}
 else{const m=fbm(nx*4+9,ny*4,nz*4,4),dry=cl(m*3.2+.35-lat*.5);c=mix([52,92,42],[168,138,88],dry);c=mix(c,[96,84,70],ss(.16,.34,e));c=mix(c,[236,240,245],ss(.3,.44,e)*.7)}
 const ice=ss(.8,.9,lat+e*.12);c=mix(c,[240,244,250],ice);if(ice>.5)ocean=0;
 const cd=fbm(nx*2.8+11,ny*5.6,nz*2.8,5),cv=ss(.0,.2,cd)*.92;return{c,cv,ocean}}
function earthCap(cv,o,done){const{R,cx,cy}=o,th=1.12,cs=Math.cos(th),sn=Math.sin(th);
 paint(cv,(px,py)=>{const dx=(px-cx)/R,dy=(py-cy)/R,r2=dx*dx+dy*dy;
  if(r2>1){const d=Math.sqrt(r2)-1;if(d>.045)return[0,0,0,0];const a=Math.exp(-d*85);return[80,140,255,Math.round(a*190)]}
  const z=Math.sqrt(1-r2),nx=dx,ny=-dy,diff=Math.max(0,nx*L[0]+ny*L[1]+z*L[2]);
  const rx=nx,ry=ny*cs-z*sn,rz=ny*sn+z*cs,t=earthTex(rx,ry,rz);
  let c=mix(t.c,[255,255,255],t.cv);const lit=.1+.95*Math.pow(diff,.85);
  const hx=L[0],hy=L[1],hz=L[2]+1,hm=Math.hypot(hx,hy,hz),sp=t.ocean*(1-t.cv)*Math.pow(Math.max(0,(nx*hx+ny*hy+z*hz)/hm),70)*.7;
  const rim=Math.pow(1-z,2.6)*(.35+.65*diff);
  let r=c[0]*lit+sp*255+70*rim,gg=c[1]*lit+sp*255+130*rim,b=c[2]*lit+sp*255+255*rim;
  const edge=ss(.992,1,Math.sqrt(r2));return[cl(r,0,255),cl(gg,0,255),cl(b,0,255),Math.round(255*(1-edge*.0))]},done)}
function moon(cv,done){const S=cv.width,cr=[];let s=99;const rn=()=>(s=(s*16807)%2147483647)/2147483647;
 for(let i=0;i<90;i++){const a=rn()*6.283,u=rn()*2-1,q=Math.sqrt(1-u*u);const v=[q*Math.cos(a),u,q*Math.sin(a)];if(v[2]>-.3)cr.push({v,r:.03+Math.pow(rn(),2.2)*.16})}
 paint(cv,(px,py)=>{const dx=(px+.5)/S*2-1,dy=(py+.5)/S*2-1,r2=dx*dx+dy*dy;if(r2>1)return[0,0,0,0];const z=Math.sqrt(1-r2),nx=dx,ny=-dy;
  let a=.52+.3*fbm(nx*3,ny*3,z*3,5)+.1*fbm(nx*16,ny*16,z*16,3);a-=.2*ss(.0,.14,fbm(nx*1.3+5,ny*1.3,z*1.3,3));
  for(const c of cr){const dd=(nx-c.v[0])**2+(ny-c.v[1])**2+(z-c.v[2])**2,rr=c.r*c.r*1.6;if(dd>rr*1.7)continue;const t=Math.sqrt(dd/rr);if(t<1)a-=(1-t*t)*.2;else a+=Math.exp(-Math.pow((t-1)*7,2))*.16}
  const diff=Math.max(0,nx*L[0]+ny*L[1]+z*L[2]),lit=.03+Math.pow(diff,.75),v=cl(a*lit*255*1.25,0,255),edge=ss(.985,1,Math.sqrt(r2));
  return[v,v*.98,v*.94,Math.round(255*(1-edge))]},done)}
function banded(cv,done){const S=cv.width;paint(cv,(px,py)=>{const dx=(px+.5)/S*2-1,dy=(py+.5)/S*2-1,r2=dx*dx+dy*dy;if(r2>1)return[0,0,0,0];const z=Math.sqrt(1-r2),nx=dx,ny=-dy;
 const t=fbm(nx*2,ny*7,z*2,4),b=Math.sin(ny*13+3.5*t)*.5+.5;let c=mix([205,170,128],[132,92,64],b);c=mix(c,[240,224,200],ss(.6,.9,fbm(nx*3,ny*14,z*3,3)+.4)*.25);
 const diff=Math.max(0,nx*L[0]+ny*L[1]+z*L[2]),lit=.04+Math.pow(diff,.8),edge=ss(.985,1,Math.sqrt(r2));return[c[0]*lit,c[1]*lit,c[2]*lit,Math.round(255*(1-edge))]},done)}
window.Space={earthCap,moon,banded};})();
