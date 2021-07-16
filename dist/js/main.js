(()=>{var o=class{static get(t){switch(t){case"linear":return this._easeLinear;case"easeOut":return this._easeOutSine;case"easeOutExpo":return this._easeOutExpo;case"easeOutSpring":return this._easeOutSpring;case"easeOutBack":return this._easeOutBack;default:return this._easeLinear}}static _easeLinear(t){return t}static _easeOutSine(t){return Math.sin(t*(Math.PI/2))}static _easeOutExpo(t){return 1-Math.pow(2,-10*t)}static _easeOutSpring(t){let e=1,r=.3,i=r/(Math.PI*2)*(Math.asin(1/e)||0);return e*Math.pow(2,-10*t)*Math.sin((t-i)*(Math.PI*2)/r)+1}static _easeOutBack(t){let e=1.70158;return(t=t-1)*t*((e+1)*t+e)+1}};var c=class{constructor(t,e,r){this.target=t,this.properties=e,this.options=r,this.propertyDeltas=[];for(let i in this.properties)this.propertyDeltas[i]={start:this.target[i],delta:this.properties[i]-this.target[i]}}update(t){for(let e in this.properties)this.target[e]=this.propertyDeltas[e].start+t*this.propertyDeltas[e].delta}};function u(a,t,e){let r=null;Array.isArray(a)?r=a:r=[a];let i=e.duration*1e3,x=o.get(e.ease),p=e.stagger*1e3,y=i+(r.length-1)*p,d=[];r.forEach(h=>{d.push(new c(h,t,e))});function g(h){let m=h-O,A=Math.min(m/y,1);d.forEach((_,D)=>{let f=Math.min((m-p*D)/i,1);if(f>0){let P=x(f);_.update(P)}}),A<1&&requestAnimationFrame(g)}let O=performance.now();requestAnimationFrame(g)}var s=document.getElementById("canvas"),E=devicePixelRatio;s.width=s.clientWidth*E;s.height=s.clientHeight*E;var n=s.getContext("2d"),l=[],F=["#FFE7E5","#FFBDAF","#E65F5C","#761111","#282524","#E8FFEE","#36EFB1","#32D789","#03330A","#242825","#E8F4FF","#6EE4FF","#41C0EC","#031F33","#242528","#72FFF9","#67E6E0","#387D7A","#173332","#242424"];for(var M=0;M<100;M++)l.push({fill:F[Math.floor(Math.random()*F.length)],x:Math.floor(Math.random()*(s.width*2))-s.width/2,y:s.height+32,scale:32});var S=()=>{l.forEach(a=>{n.fillStyle=a.fill,n.beginPath(),n.arc(a.x,a.y,a.scale,0,Math.PI*2),n.fill()})},w=()=>{n.clearRect(0,0,s.width,s.height),S(),requestAnimationFrame(w)};requestAnimationFrame(w);window.addEventListener("click",a=>{u(l,{x:s.width/2,y:0,scale:0},{duration:1,ease:"easeOutSine",stagger:.01})});})();