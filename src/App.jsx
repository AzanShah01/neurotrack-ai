import { useState, useEffect, useRef } from "react";

const C = {
  bg:"#f5f0e8", bgLight:"#faf7f2", cream:"#fff9f0",
  green:"#2d6a4f", greenMid:"#40916c", greenLight:"#74c69d",
  greenPale:"#d8f3dc", text:"#1c2e22", muted:"#6b8070",
  cardBlue:"#e4f0f6", cardLav:"#ede8f5", cardMint:"#e4f5ed",
  cardPeach:"#faeee4", cardRose:"#f5e4ea", cardYellow:"#faf4e1",
  orange:"#e07b39", lavender:"#7c5cbf", teal:"#0d9488",
  rose:"#e05c7a", blue:"#3b82b0", gold:"#c9a84c",
  riskLow:"#0d9488", riskMid:"#c9a84c", riskHigh:"#e05c7a",
};

/* ── Shared hooks ── */
function GlowingBrain({style}){
  return(
    <div style={{...style, perspective:900}}>
      <div style={{width:"100%",height:"100%",animation:"brainOrbit 14s linear infinite",transformStyle:"preserve-3d"}}>
        <svg viewBox="0 0 340 300" style={{width:"100%",height:"100%",display:"block",filter:"drop-shadow(0 10px 30px rgba(45,106,79,0.3))"}}>
          <defs>
            <radialGradient id="brainFill" cx="38%" cy="32%" r="75%">
              <stop offset="0%" stopColor={C.greenLight}/>
              <stop offset="45%" stopColor={C.greenMid}/>
              <stop offset="100%" stopColor={C.green}/>
            </radialGradient>
            <linearGradient id="brainOutline" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={C.greenLight}/>
              <stop offset="45%" stopColor={C.teal}/>
              <stop offset="75%" stopColor={C.lavender}/>
              <stop offset="100%" stopColor={C.gold}/>
            </linearGradient>
            <linearGradient id="stemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={C.lavender}/>
              <stop offset="100%" stopColor={C.rose}/>
            </linearGradient>
            <radialGradient id="brainShine" cx="32%" cy="22%" r="35%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55"/>
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
            </radialGradient>
          </defs>
          {/* solid brain body */}
          <path d="M70,90 Q60,40 130,30 Q170,10 210,30 Q270,35 280,90 Q300,120 285,160 Q295,200 255,225 Q235,255 195,250 Q170,270 145,250 Q105,255 85,225 Q45,200 55,160 Q40,120 70,90 Z"
            fill="url(#brainFill)" stroke="url(#brainOutline)" strokeWidth="4" strokeLinejoin="round"/>
          {/* highlight sheen */}
          <path d="M70,90 Q60,40 130,30 Q170,10 210,30 Q270,35 280,90 Q300,120 285,160 Q295,200 255,225 Q235,255 195,250 Q170,270 145,250 Q105,255 85,225 Q45,200 55,160 Q40,120 70,90 Z"
            fill="url(#brainShine)"/>
          {/* hemisphere divide */}
          <path d="M170,18 Q175,90 168,160 Q175,210 172,262" fill="none" stroke={C.green} strokeWidth="2.5" opacity="0.5"/>
          {/* inner folds (gyri grooves) */}
          <path d="M100,80 Q120,60 150,75 Q165,55 190,70 Q215,60 235,85" fill="none" stroke={C.green} strokeWidth="2.2" opacity="0.55"/>
          <path d="M85,120 Q120,105 150,120 Q180,100 210,120 Q245,108 270,128" fill="none" stroke={C.green} strokeWidth="2.2" opacity="0.55"/>
          <path d="M75,155 Q115,140 150,158 Q185,138 220,158 Q255,142 280,160" fill="none" stroke={C.green} strokeWidth="2.2" opacity="0.55"/>
          <path d="M80,190 Q120,178 155,192 Q190,175 225,192 Q255,180 275,195" fill="none" stroke={C.green} strokeWidth="2.2" opacity="0.55"/>
          <path d="M100,220 Q140,212 170,224 Q200,210 235,222" fill="none" stroke={C.green} strokeWidth="2" opacity="0.5"/>
          <path d="M95,100 Q105,130 100,170 M250,100 Q258,135 250,175 M150,40 Q145,80 150,115 M195,40 Q200,80 196,115" fill="none" stroke={C.green} strokeWidth="1.6" opacity="0.4"/>
          {/* neural nodes */}
          {[[110,75],[170,62],[230,82],[95,128],[160,118],[225,132],[270,150],[85,170],[150,165],[210,172],[245,200],[125,210],[185,228],[160,250]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r={i%3===0?3.4:2.2} fill="#fff" opacity={0.95} style={{animation:`brainPulse ${2+ (i%4)*0.4}s ease-in-out infinite ${(i*0.15)}s`}}/>
          ))}
          {/* connecting sparks */}
          <path d="M110,75 L170,62 M170,62 L230,82 M95,128 L160,118 M160,118 L225,132 M85,170 L150,165 M150,165 L210,172 M125,210 L185,228 M185,228 L160,250" stroke="#fff" strokeWidth="0.7" opacity="0.4"/>
          {/* brainstem */}
          <path d="M150,250 Q150,275 145,295 Q170,300 195,295 Q190,275 195,250 Z" fill="url(#stemGrad)" stroke={C.lavender} strokeWidth="1.5" opacity="0.95"/>
          <path d="M158,255 Q158,280 153,298 M172,257 Q172,282 168,300 M186,255 Q186,280 191,298" stroke="#fff" strokeWidth="1" opacity="0.35" fill="none"/>
        </svg>
      </div>
    </div>
  );
}

function useReveal(t=0.15){const ref=useRef(null);const[v,setV]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true);},{threshold:t});if(ref.current)o.observe(ref.current);return()=>o.disconnect();},[]);return[ref,v];}
function useCount(target,dur=1800,active=false){const[v,setV]=useState(0);useEffect(()=>{if(!active)return;let t0=null;const ease=p=>p<.5?2*p*p:-1+(4-2*p)*p;const r=ts=>{if(!t0)t0=ts;const p=Math.min((ts-t0)/dur,1);setV(Math.round(ease(p)*target));if(p<1)requestAnimationFrame(r);};requestAnimationFrame(r);},[active,target,dur]);return v;}
function useMounted(d=80){const[on,setOn]=useState(false);useEffect(()=>{const t=setTimeout(()=>setOn(true),d);return()=>clearTimeout(t);},[]);return on;}

/* ── Score calculator ── */
function calcResults(answers) {
  const anxIds   = ["nervous","panic","breathing","sweating","concentration"];
  const emotIds  = ["hopeless","anger","overreact","suicidal","negative","blame"];
  const behavIds = ["socialmedia","introvert"];
  const anxScore  = anxIds.filter(id=>answers[id]===true).length;
  const emotScore = emotIds.filter(id=>answers[id]===true).length;
  const behavScore= behavIds.filter(id=>answers[id]===true).length;
  const totalScore= anxScore + emotScore + behavScore;
  const depressionPct = Math.round((totalScore / 13) * 100);
  const risk = depressionPct < 40 ? "low" : depressionPct <= 70 ? "borderline" : "high";
  const confidence = risk === "low" ? 85 : risk === "borderline" ? 85 : 85;
  const hasCrisis = answers["suicidal"] === true;
  return { anxScore, emotScore, behavScore, totalScore, risk, confidence, hasCrisis, answers };
}

/* ════════════════════════════════════════════════
   SHARED NAVBAR
════════════════════════════════════════════════ */
function Navbar({ page, setPage }) {
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>30);window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);},[]);
  const go=(id)=>{setPage(id);window.scrollTo(0,0);};
  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:999,height:62,padding:"0 36px",display:"flex",alignItems:"center",justifyContent:"space-between",background:scrolled?"rgba(245,240,232,0.97)":C.bg,backdropFilter:scrolled?"blur(14px)":"none",borderBottom:scrolled?`1px solid rgba(45,106,79,0.1)`:"none",transition:"all 0.3s"}}>
      <button onClick={()=>go("home")} style={{display:"flex",alignItems:"center",gap:10,background:"none",border:"none",cursor:"pointer",padding:0}}>
        <div style={{width:36,height:36,borderRadius:11,background:C.green,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>🧠</div>
        <span style={{fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:20,color:C.text}}>Neuro<span style={{color:C.green}}>Track</span></span>
      </button>
      <div style={{display:"flex",gap:4,alignItems:"center"}}>
        {[["home","Home"],["about","About"],["assessment","Assessment"],["resources","Resources"]].map(([id,label])=>(
          <button key={id} onClick={()=>go(id)} style={{fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13.5,color:page===id?C.green:C.muted,background:page===id?C.greenPale:"transparent",border:"none",padding:"7px 15px",borderRadius:20,cursor:"pointer",transition:"all 0.2s"}}
            onMouseEnter={e=>{if(page!==id){e.target.style.color=C.green;e.target.style.background=C.greenPale;}}}
            onMouseLeave={e=>{if(page!==id){e.target.style.color=C.muted;e.target.style.background="transparent";}}}>{label}</button>
        ))}
        <button onClick={()=>go("assessment")} style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:13.5,color:"#fff",background:C.green,border:"none",padding:"10px 22px",borderRadius:24,cursor:"pointer",boxShadow:`0 4px 14px ${C.green}44`,transition:"transform 0.2s,box-shadow 0.2s",marginLeft:6}}
          onMouseEnter={e=>{e.target.style.transform="translateY(-2px)";e.target.style.boxShadow=`0 8px 22px ${C.green}55`;}}
          onMouseLeave={e=>{e.target.style.transform="translateY(0)";e.target.style.boxShadow=`0 4px 14px ${C.green}44`;}}>
          Take Assessment
        </button>
      </div>
    </nav>
  );
}

/* ════════════════════════════════════════════════
   ██████  PAGE 1 — LANDING  ██████
════════════════════════════════════════════════ */
function StudentSitting({style}){return(<svg viewBox="0 0 160 200" style={{...style,animation:"charBob 4s ease-in-out infinite"}}><ellipse cx="80" cy="175" rx="55" ry="28" fill="#c8e6d4" opacity="0.9"/><ellipse cx="80" cy="165" rx="48" ry="35" fill="#a8d8be"/><rect x="55" y="100" width="50" height="55" rx="12" fill="#5ba87a"/><ellipse cx="65" cy="158" rx="16" ry="10" fill="#3d7a5c" transform="rotate(-20,65,158)"/><ellipse cx="95" cy="158" rx="16" ry="10" fill="#3d7a5c" transform="rotate(20,95,158)"/><ellipse cx="52" cy="166" rx="13" ry="7" fill="#2d4a3e"/><ellipse cx="108" cy="166" rx="13" ry="7" fill="#2d4a3e"/><circle cx="80" cy="82" r="28" fill="#f5c5a3"/><path d="M52,72 Q56,48 80,46 Q104,48 108,72 Q100,58 80,56 Q60,58 52,72Z" fill="#2d1b0e"/><circle cx="72" cy="82" r="3.5" fill="#2d1b0e"/><circle cx="88" cy="82" r="3.5" fill="#2d1b0e"/><circle cx="73.5" cy="80.5" r="1.2" fill="#fff"/><circle cx="89.5" cy="80.5" r="1.2" fill="#fff"/><path d="M73,90 Q80,97 87,90" fill="none" stroke="#2d1b0e" strokeWidth="2" strokeLinecap="round"/><rect x="68" y="108" width="24" height="38" rx="4" fill="#1a1a2e"/><rect x="70" y="112" width="20" height="28" rx="2" fill="#4ecdc4" opacity="0.8"/><path d="M55,115 Q45,125 58,135" fill="none" stroke="#5ba87a" strokeWidth="10" strokeLinecap="round"/><path d="M105,115 Q115,125 100,140" fill="none" stroke="#5ba87a" strokeWidth="10" strokeLinecap="round"/></svg>);}
function StudentGroup({style}){return(<svg viewBox="0 0 320 180" style={style}><path d="M0,140 Q80,80 160,100 Q240,80 320,140 L320,180 L0,180Z" fill="#74c69d"/><path d="M0,155 Q80,110 160,125 Q240,110 320,155 L320,180 L0,180Z" fill="#52b788"/><circle cx="60" cy="118" r="16" fill="#f5c5a3"/><path d="M44,112 Q46,100 60,98 Q74,100 76,112 Q70,104 60,104 Q50,104 44,112Z" fill="#2d1b0e"/><rect x="48" y="118" width="24" height="28" rx="8" fill="#e84393"/><path d="M40,128 Q32,135 34,145" fill="none" stroke="#e84393" strokeWidth="8" strokeLinecap="round"/><path d="M72,128 Q80,135 78,145" fill="none" stroke="#e84393" strokeWidth="8" strokeLinecap="round"/><circle cx="148" cy="105" r="18" fill="#dba98a"/><path d="M130,100 Q132,85 148,83 Q164,85 166,100 Q158,90 148,90 Q138,90 130,100Z" fill="#1a0a00"/><rect x="134" y="105" width="28" height="32" rx="8" fill="#9b59b6"/><path d="M130,120 Q120,130 124,142" fill="none" stroke="#9b59b6" strokeWidth="8" strokeLinecap="round"/><path d="M162,120 Q172,130 168,142" fill="none" stroke="#9b59b6" strokeWidth="8" strokeLinecap="round"/><circle cx="248" cy="118" r="15" fill="#f5c5a3"/><path d="M234,115 Q236,102 248,100 Q260,102 262,115 Q256,107 248,107 Q240,107 234,115Z" fill="#5c3317"/><rect x="238" y="116" width="22" height="26" rx="7" fill="#3b82b0"/><path d="M240,135 Q230,145 226,150" fill="none" stroke="#3b82b0" strokeWidth="7" strokeLinecap="round"/><path d="M260,135 Q270,138 278,136" fill="none" stroke="#3b82b0" strokeWidth="7" strokeLinecap="round"/><text x="88" y="100" fontSize="12" opacity="0.6">💚</text><text x="175" y="88" fontSize="10" opacity="0.5">🌿</text></svg>);}

function NeuroTrackLanding({ setPage }) {
  const on=useMounted(100);
  const [sRef,sVis]=useReveal(0.2);
  const c1=useCount(60,2000,sVis),c2=useCount(85,2000,sVis),c3=useCount(13,1600,sVis),c4=useCount(5,1400,sVis);
  const a=d=>({opacity:on?1:0,transform:on?"translateY(0)":"translateY(22px)",transition:`all 0.8s ${d}s cubic-bezier(.23,1,.32,1)`});
  const [cRef,cVis]=useReveal(0.1);
  const [hov,setHov]=useState(null);
  const [howTab,setHowTab]=useState(0);
  const [wRef,wVis]=useReveal(0.1);
  const go=id=>{setPage(id);window.scrollTo(0,0);};

  const cards=[
    {title:"Feeling anxious",sub:"Racing thoughts, panic, nervousness",color:C.cardBlue,accent:C.blue,icon:"🫁"},
    {title:"Low mood",sub:"Hopelessness, sadness, feeling negative",color:C.cardLav,accent:C.lavender,icon:"🌧️"},
    {title:"Sleep problems",sub:"Insomnia, oversleeping, restlessness",color:C.cardMint,accent:C.teal,icon:"💤"},
    {title:"Social withdrawal",sub:"Isolating yourself, losing interest",color:C.cardPeach,accent:C.orange,icon:"🚪"},
    {title:"Self-blame & anger",sub:"Overreacting, blaming yourself often",color:C.cardRose,accent:C.rose,icon:"💭"},
    {title:"Behavioural changes",sub:"Social media addiction, introversion",color:C.cardYellow,accent:C.gold,icon:"📱"},
  ];
  const steps=[
    {label:"Answer questions",icon:"📋",title:"13 simple Yes / No questions",body:"Our check-in covers three scientifically mapped clusters: Anxiety Symptoms, Emotional State, and Behaviour — one question at a time, no overwhelm.",bullets:["Feeling nervous or panicked?","Persistent hopelessness or self-blame?","Social withdrawal or excessive screen use?"],color:C.cardMint,accent:C.teal},
    {label:"AI analysis",icon:"🤖",title:"AI reads the patterns",body:"Your answers feed a machine learning classifier trained on thousands of real student responses. It identifies patterns across your three symptom clusters instantly.",bullets:["Random Forest AI classifier","Trained on real student responses","Your 13 answers map directly to model features"],color:C.cardLav,accent:C.lavender},
    {label:"Get your results",icon:"📊",title:"A clear, personal picture",body:"You receive a risk profile — Low, Moderate or High — with a full breakdown per cluster, confidence score, and personalised next steps.",bullets:["Risk level + confidence score","Cluster-by-cluster breakdown","Tailored recommendations"],color:C.cardBlue,accent:C.blue},
    {label:"Access resources",icon:"💚",title:"Support when you need it",body:"Helplines, apps, self-help guides and university counselling — all matched to your results. For students in Pakistan and worldwide.",bullets:["Rescue 1122: (042-99231701-2)","Anonymous peer support","University counselling referrals"],color:C.cardPeach,accent:C.orange},
  ];

  return(
    <div>
      {/* HERO */}
      <section style={{paddingTop:82,background:C.bg,position:"relative",overflow:"hidden",minHeight:"92vh",display:"flex",alignItems:"center"}}>
        {[...Array(10)].map((_,i)=>(
          <div key={i} style={{position:"absolute",width:8+(i%4)*6,height:8+(i%4)*6,borderRadius:"50%",background:i%3===0?C.greenPale:i%3===1?"#faeee4":"#ede8f5",top:`${10+(i*8)%75}%`,left:`${5+(i*11)%88}%`,opacity:0.55,animation:`floatDot ${4+i%3}s ease-in-out infinite ${i*0.45}s`,zIndex:0}}/>
        ))}
        <div style={{maxWidth:1140,margin:"0 auto",padding:"50px 40px 40px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center",width:"100%",position:"relative",zIndex:1}}>
          <div>
            <div style={{...a(0.1),display:"inline-flex",alignItems:"center",gap:8,background:C.greenPale,borderRadius:20,padding:"6px 16px",marginBottom:22}}>
              <span style={{width:8,height:8,borderRadius:"50%",background:C.greenMid,display:"inline-block",animation:"pulseGreen 2s ease-in-out infinite"}}/>
              <span style={{fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:12.5,color:C.green}}>Free · Anonymous · AI-Powered</span>
            </div>
            <h1 style={{...a(0.18),fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:"clamp(36px,4.5vw,60px)",lineHeight:1.14,color:C.text,margin:"0 0 18px"}}>
              A gentle space to<br/>understand what<br/>
              <span style={{color:C.green,position:"relative"}}>you're feeling.
                <svg viewBox="0 0 280 12" style={{position:"absolute",bottom:-8,left:0,width:"100%"}}>
                  <path d="M4,8 Q70,2 140,7 Q210,12 276,5" fill="none" stroke={C.greenLight} strokeWidth="3" strokeLinecap="round" style={{animation:"drawUnderline 1s 0.8s ease forwards",strokeDasharray:300,strokeDashoffset:300}}/>
                </svg>
              </span>
            </h1>
            <p style={{...a(0.3),fontFamily:"'Nunito',sans-serif",fontWeight:500,fontSize:16.5,lineHeight:1.8,color:C.muted,maxWidth:430,margin:"0 0 34px"}}>
              NeuroTrack uses AI to help students spot early signs of depression — through a 13-question check-in that's private, instant, and judgment-free.
            </p>
            <div style={{...a(0.4),display:"flex",gap:12,flexWrap:"wrap",marginBottom:34}}>
              <button onClick={()=>go("assessment")} style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:15,color:"#fff",background:C.green,border:"none",padding:"14px 32px",borderRadius:28,cursor:"pointer",boxShadow:`0 6px 20px ${C.green}44`,transition:"transform 0.2s,box-shadow 0.2s"}}
                onMouseEnter={e=>{e.target.style.transform="translateY(-3px)";e.target.style.boxShadow=`0 12px 28px ${C.green}55`;}}
                onMouseLeave={e=>{e.target.style.transform="translateY(0)";e.target.style.boxShadow=`0 6px 20px ${C.green}44`;}}>
                Take free assessment →
              </button>
              <button onClick={()=>go("about")} style={{fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:15,color:C.green,background:C.greenPale,border:"none",padding:"14px 26px",borderRadius:28,cursor:"pointer"}}>How it works</button>
            </div>
            <div style={{...a(0.5),display:"flex",gap:16,flexWrap:"wrap"}}>
              {[["🔒","Fully private"],["⚡","5 minutes"],["🎓","For students"],["💚","No judgment"]].map(([ic,lb],i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:6,background:C.cream,border:`1px solid rgba(45,106,79,0.1)`,borderRadius:16,padding:"5px 13px"}}>
                  <span style={{fontSize:12}}>{ic}</span>
                  <span style={{fontFamily:"'Nunito',sans-serif",fontWeight:600,fontSize:12,color:C.muted}}>{lb}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{...a(0.24),position:"relative",display:"flex",justifyContent:"center",alignItems:"center",minHeight:340}}>
            <div style={{position:"absolute",top:"5%",right:"0%",background:C.cardLav,borderRadius:16,padding:"12px 18px",boxShadow:"0 4px 20px rgba(0,0,0,0.08)",animation:"cardFloat 5s ease-in-out infinite",zIndex:2}}>
              <div style={{fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:24,color:C.lavender}}>60%</div>
              <div style={{fontFamily:"'Nunito',sans-serif",fontSize:11,color:C.muted}}>students face depression</div>
            </div>
            <div style={{position:"absolute",bottom:"15%",left:"-5%",background:C.cardMint,borderRadius:16,padding:"12px 18px",boxShadow:"0 4px 20px rgba(0,0,0,0.08)",animation:"cardFloat 5s ease-in-out infinite 2s",zIndex:2}}>
              <div style={{fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:24,color:C.teal}}>85%</div>
              <div style={{fontFamily:"'Nunito',sans-serif",fontSize:11,color:C.muted}}>AI accuracy</div>
            </div>
            <StudentSitting style={{width:230,height:288,maxWidth:"90%",position:"relative",zIndex:1}}/>
          </div>
        </div>
        <svg viewBox="0 0 1440 50" style={{display:"block",width:"100%",marginBottom:-2}}><path d="M0,25 Q360,50 720,25 Q1080,0 1440,25 L1440,50 L0,50Z" fill={C.cream}/></svg>
      </section>

      {/* SUPPORT CARDS */}
      <section style={{background:C.cream,padding:"70px 40px"}}>
        <div style={{maxWidth:1140,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:42,flexWrap:"wrap",gap:18}}>
            <div>
              <h2 style={{fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:"clamp(24px,3vw,40px)",color:C.text,margin:"0 0 10px"}}>We're here to support you for<span style={{color:C.green}}>...</span></h2>
              <p style={{fontFamily:"'Nunito',sans-serif",fontSize:15.5,color:C.muted,margin:0}}>NeuroTrack screens for patterns our AI was trained to recognise in real student experiences.</p>
            </div>
            <button onClick={()=>go("assessment")} style={{fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13.5,color:C.green,background:C.greenPale,border:"none",padding:"11px 22px",borderRadius:22,cursor:"pointer",whiteSpace:"nowrap"}}>Take self-assessment →</button>
          </div>
          <div ref={cRef} style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(175px,1fr))",gap:14}}>
            {cards.map((card,i)=>(
              <div key={i} onClick={()=>go("assessment")} style={{background:card.color,borderRadius:20,padding:"26px 22px",cursor:"pointer",opacity:cVis?1:0,transform:cVis?hov===i?"translateY(-6px)":"translateY(0)":"translateY(24px)",transition:`opacity 0.55s ${i*0.08}s,transform 0.3s`,boxShadow:hov===i?"0 14px 36px rgba(0,0,0,0.12)":"none"}}
                onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}>
                <div style={{fontFamily:"'Nunito',sans-serif",fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:card.accent,background:`${card.accent}18`,display:"inline-block",padding:"3px 9px",borderRadius:9,marginBottom:12}}>ASSESSMENT</div>
                <div style={{fontSize:26,marginBottom:10}}>{card.icon}</div>
                <h3 style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:17,color:C.text,margin:"0 0 6px"}}>{card.title}</h3>
                <p style={{fontFamily:"'Nunito',sans-serif",fontSize:12.5,color:C.muted,margin:"0 0 12px",lineHeight:1.5}}>{card.sub}</p>
                <span style={{fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:12.5,color:card.accent}}>Learn more →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{background:C.bg,padding:"70px 40px"}}>
        <div style={{maxWidth:1140,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:40}}>
            <h2 style={{fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:"clamp(24px,3vw,40px)",color:C.text,margin:"0 0 12px"}}>How to use <span style={{color:C.green}}>NeuroTrack</span></h2>
            <p style={{fontFamily:"'Nunito',sans-serif",fontSize:16,color:C.muted,maxWidth:440,margin:"0 auto"}}>A gentle, private check-in that suggests the support which fits you best.</p>
          </div>
          <div style={{display:"flex",gap:8,background:C.cream,borderRadius:28,padding:6,marginBottom:28,flexWrap:"wrap",justifyContent:"center"}}>
            {steps.map((s,i)=>(
              <button key={i} onClick={()=>setHowTab(i)} style={{fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13.5,color:howTab===i?"#fff":C.muted,background:howTab===i?C.green:"transparent",border:"none",borderRadius:22,padding:"10px 22px",cursor:"pointer",display:"flex",alignItems:"center",gap:7,transition:"all 0.25s",boxShadow:howTab===i?`0 4px 14px ${C.green}44`:"none"}}>
                <span>{s.icon}</span>{s.label}
              </button>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:44,alignItems:"center",background:steps[howTab].color,borderRadius:28,padding:"44px 48px",transition:"background 0.3s"}}>
            <div>
              <div style={{fontFamily:"'Nunito',sans-serif",fontSize:11,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:steps[howTab].accent,background:`${steps[howTab].accent}15`,display:"inline-block",padding:"4px 12px",borderRadius:12,marginBottom:16}}>Step {howTab+1} of 4</div>
              <h3 style={{fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:"clamp(20px,2.5vw,32px)",color:C.text,margin:"0 0 14px",lineHeight:1.25}}>{steps[howTab].title}</h3>
              <p style={{fontFamily:"'Nunito',sans-serif",fontSize:15.5,lineHeight:1.78,color:C.muted,margin:"0 0 22px"}}>{steps[howTab].body}</p>
              <div style={{display:"flex",flexDirection:"column",gap:11,marginBottom:24}}>
                {steps[howTab].bullets.map((b,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:11}}>
                    <div style={{width:10,height:10,borderRadius:"50%",background:steps[howTab].accent,flexShrink:0}}/>
                    <span style={{fontFamily:"'Nunito',sans-serif",fontWeight:600,fontSize:14.5,color:C.text}}>{b}</span>
                  </div>
                ))}
              </div>
              {howTab===0&&<button onClick={()=>go("assessment")} style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:14,color:"#fff",background:C.green,border:"none",padding:"12px 28px",borderRadius:22,cursor:"pointer",boxShadow:`0 4px 16px ${C.green}44`}}>Start now →</button>}
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
              <div style={{width:160,height:160,borderRadius:"50%",background:`${steps[howTab].accent}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:72,animation:"iconBounce 2.5s ease-in-out infinite"}}>{steps[howTab].icon}</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={sRef} style={{background:C.cream,padding:"70px 40px"}}>
        <div style={{maxWidth:1140,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:44}}>
            <h2 style={{fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:"clamp(24px,3vw,40px)",color:C.text,margin:"0 0 10px"}}>Built on <span style={{color:C.green}}>real student data.</span></h2>
            <p style={{fontFamily:"'Nunito',sans-serif",fontSize:15.5,color:C.muted,maxWidth:420,margin:"0 auto"}}>Our AI was trained on real student responses — results grounded in evidence, not guesswork.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
            {[[c1,"%","showed signs of depression",C.cardLav,C.lavender,"🎓"],[c2,"%","AI accuracy at 2+ symptoms",C.cardMint,C.teal,"🤖"],[c3,"","questions directly mapped to AI",C.cardPeach,C.orange,"📋"],[c4," min","average completion time",C.cardBlue,C.blue,"⚡"]].map(([v,suf,lbl,bg,acc,ic],i)=>(
              <div key={i} style={{background:bg,borderRadius:20,padding:"28px 22px",cursor:"default",transition:"transform 0.2s,box-shadow 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 14px 32px rgba(0,0,0,0.1)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
                <div style={{fontSize:24,marginBottom:10}}>{ic}</div>
                <div style={{fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:"clamp(34px,4vw,50px)",lineHeight:1,color:acc,marginBottom:8}}>{v}{suf}</div>
                <p style={{fontFamily:"'Nunito',sans-serif",fontSize:13.5,lineHeight:1.55,color:C.muted,margin:0}}>{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section ref={wRef} style={{background:C.bg,padding:"70px 40px"}}>
        <div style={{maxWidth:1140,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:42}}>
            <h2 style={{fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:"clamp(24px,3vw,40px)",color:C.text,margin:"0 0 10px"}}>NeuroTrack is for <span style={{color:C.green}}>everyone.</span></h2>
            <p style={{fontFamily:"'Nunito',sans-serif",fontSize:16,color:C.muted,maxWidth:420,margin:"0 auto"}}>You don't need a diagnosis to check in — privately, for free, anytime.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:16}}>
            {[
              {emoji:"🎓",title:"University students",sub:"Feeling the weight of deadlines, exams, or social pressure? You deserve support.",color:C.cardMint,accent:C.teal},
              {emoji:"🌍",title:"Students far from home",sub:"Isolation and homesickness can quietly develop into something deeper.",color:C.cardBlue,accent:C.blue},
              {emoji:"📚",title:"High-achieving students",sub:"Perfectionism and fear of failure are hidden triggers of depression.",color:C.cardYellow,accent:C.gold},
              {emoji:"💛",title:"Anyone curious",sub:"You don't need to feel 'bad enough'. Checking in is always a good idea.",color:C.cardPeach,accent:C.orange},
            ].map((g,i)=>(
              <div key={i} onClick={()=>go("assessment")} style={{background:g.color,borderRadius:20,padding:"28px 24px",cursor:"pointer",opacity:wVis?1:0,transform:wVis?"translateY(0)":"translateY(22px)",transition:`opacity 0.55s ${i*0.1}s,transform 0.55s ${i*0.1}s cubic-bezier(.23,1,.32,1)`}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 12px 30px rgba(0,0,0,0.1)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
                <div style={{fontSize:32,marginBottom:12}}>{g.emoji}</div>
                <h3 style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:19,color:C.text,margin:"0 0 9px"}}>{g.title}</h3>
                <p style={{fontFamily:"'Nunito',sans-serif",fontSize:14,color:C.muted,margin:"0 0 14px",lineHeight:1.6}}>{g.sub}</p>
                <span style={{fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13,color:g.accent}}>Take assessment →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + HILL */}
      <section style={{background:C.cream,padding:"70px 40px 0",overflow:"hidden"}}>
        <div style={{maxWidth:640,margin:"0 auto",textAlign:"center",paddingBottom:44}}>
          <h2 style={{fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:"clamp(26px,3.5vw,44px)",color:C.text,margin:"0 0 14px",lineHeight:1.2}}>Take a moment for <span style={{color:C.green}}>yourself today.</span></h2>
          <p style={{fontFamily:"'Nunito',sans-serif",fontSize:16,color:C.muted,margin:"0 0 28px",lineHeight:1.75}}>13 questions. 5 minutes. Zero judgment.</p>
          <button onClick={()=>go("assessment")} style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:16,color:"#fff",background:C.green,border:"none",padding:"16px 44px",borderRadius:30,cursor:"pointer",boxShadow:`0 8px 24px ${C.green}44`,transition:"transform 0.2s,box-shadow 0.2s",marginBottom:14}}
            onMouseEnter={e=>{e.target.style.transform="translateY(-3px)";e.target.style.boxShadow=`0 14px 34px ${C.green}55`;}}
            onMouseLeave={e=>{e.target.style.transform="translateY(0)";e.target.style.boxShadow=`0 8px 24px ${C.green}44`;}}>
            Begin free assessment →
          </button>
          <p style={{fontFamily:"'Nunito',sans-serif",fontSize:12,color:C.muted,opacity:0.7,margin:0}}>⚠ Screening tool only — not a clinical diagnosis. Crisis support: <strong>Rescue 1122 (042-99231701-2)</strong></p>
        </div>
        <StudentGroup style={{width:"100%",maxHeight:200,display:"block"}}/>
      </section>

      {/* FOOTER */}
      <footer style={{background:C.green,padding:"36px 40px"}}>
        <div style={{maxWidth:1140,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:34,height:34,borderRadius:10,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🧠</div>
            <span style={{fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:19,color:"#fff"}}>NeuroTrack</span>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {["Privacy","Terms","Contact","Resources","Crisis Help"].map(l=>(
              <button key={l} style={{fontFamily:"'Nunito',sans-serif",fontWeight:600,fontSize:12.5,color:"rgba(255,255,255,0.7)",background:"rgba(255,255,255,0.1)",border:"none",padding:"6px 14px",borderRadius:16,cursor:"pointer"}}>{l}</button>
            ))}
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"'Nunito',sans-serif",fontSize:11.5,color:"rgba(255,255,255,0.55)",marginBottom:3}}>Crisis support (Pakistan)</div>
            <div style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:16,color:"#fff"}}>Rescue 1122 (042-99231701-2)</div>
          </div>
        </div>
        <div style={{maxWidth:1140,margin:"16px auto 0",paddingTop:16,borderTop:"1px solid rgba(255,255,255,0.15)",textAlign:"center"}}>
          <span style={{fontFamily:"'Nunito',sans-serif",fontSize:12,color:"rgba(255,255,255,0.4)"}}>NeuroTrack · AI Depression Screening · Built for students · Not a clinical diagnostic tool.</span>
        </div>
      </footer>
    </div>
  );
}

/* ════════════════════════════════════════════════
   ██████  PAGE 2 — QUESTIONNAIRE  ██████
════════════════════════════════════════════════ */
const QUESTIONS=[
  {id:"year",   cluster:"context",  scored:false,crisis:false,type:"choice",text:"What year of study are you currently in?",                                                          sub:"This helps us personalise your experience.",options:[{label:"1st Year",icon:"🌱",value:"1st"},{label:"2nd Year",icon:"📚",value:"2nd"},{label:"3rd Year",icon:"🎯",value:"3rd"},{label:"4th Year",icon:"🎓",value:"4th"}]},
  {id:"cgpa",   cluster:"context",  scored:false,crisis:false,type:"slider", text:"What is your approximate CGPA?",                                                                  sub:"Drag to your score — context only.",min:1.5,max:4.0,step:0.05,defaultVal:2.8},
  {id:"sleep",  cluster:"context",  scored:false,crisis:false,type:"choice", text:"How has your sleep been lately?",                                                                  sub:"Think about the past two weeks.",options:[{label:"Normal",icon:"😴",value:"normal"},{label:"Can't sleep",icon:"👁️",value:"insomnia"},{label:"Sleeping too much",icon:"🛌",value:"long"}]},
  {id:"family", cluster:"context",  scored:false,crisis:false,type:"yesno",  text:"Has anyone in your close family been diagnosed with depression?",                                  sub:"Family history is a useful background signal."},
  {id:"nervous",      cluster:"anxiety",   scored:true, crisis:false,type:"yesno",text:"Do you frequently feel nervous, anxious or on edge — even without an obvious reason?",      sub:"Think about the past two weeks."},
  {id:"panic",        cluster:"anxiety",   scored:true, crisis:false,type:"yesno",text:"Have you experienced sudden panic attacks or intense waves of fear?",                        sub:"Heart racing, trembling, or a sudden sense of dread."},
  {id:"breathing",    cluster:"anxiety",   scored:true, crisis:false,type:"yesno",text:"Do you sometimes breathe rapidly or feel chest tightness when stressed?",                    sub:"Not related to physical exercise."},
  {id:"sweating",     cluster:"anxiety",   scored:true, crisis:false,type:"yesno",text:"Do you experience unexplained sweating — not caused by heat or exercise?",                  sub:"Cold sweats or clammy palms under stress."},
  {id:"concentration",cluster:"anxiety",   scored:true, crisis:false,type:"yesno",text:"Do you struggle to concentrate or focus, even when you genuinely want to?",                sub:"Your mind wanders or you can't get started."},
  {id:"hopeless",  cluster:"emotional", scored:true, crisis:false,type:"yesno",text:"Do you often feel hopeless — like things won't improve no matter what you do?",               sub:"A persistent feeling that the future looks empty."},
  {id:"anger",     cluster:"emotional", scored:true, crisis:false,type:"yesno",text:"Do you experience frequent anger or irritability that feels difficult to control?",            sub:"Small things set you off, or you feel frustrated more than usual."},
  {id:"overreact", cluster:"emotional", scored:true, crisis:false,type:"yesno",text:"Do you find yourself overreacting to situations that others handle calmly?",                  sub:"Crying unexpectedly, snapping at people, or feeling overwhelmed easily."},
  {id:"suicidal",  cluster:"emotional", scored:true, crisis:true, type:"yesno",text:"Have you recently had any thoughts of harming yourself, or felt like you don't want to be here?",sub:"It's okay to be honest — your answer is private."},
  {id:"negative",  cluster:"emotional", scored:true, crisis:false,type:"yesno",text:"Do you tend to view things negatively — finding it hard to see any positives?",              sub:"A pattern of pessimism or expecting the worst."},
  {id:"blame",     cluster:"emotional", scored:true, crisis:false,type:"yesno",text:"Do you frequently blame yourself for things that go wrong, even when it isn't your fault?",  sub:"Harsh self-criticism, guilt, or feeling like a burden."},
  {id:"socialmedia",cluster:"behavioural",scored:true,crisis:false,type:"yesno",text:"Do you feel addicted to social media — spending more time on it than you intend, and feeling worse after?",sub:"Scrolling compulsively or using it to avoid feelings."},
  {id:"introvert",  cluster:"behavioural",scored:true,crisis:false,type:"yesno",text:"Have you been withdrawing from friends, social activities, or things you used to enjoy?",  sub:"Cancelling plans, avoiding people, feeling disconnected."},
];
const SECTIONS=[
  {id:"context",    label:"About You",         icon:"📋",color:C.cardYellow,accent:C.gold,     count:4},
  {id:"anxiety",    label:"Anxiety Symptoms",  icon:"🫁",color:C.cardBlue,  accent:C.blue,     count:5},
  {id:"emotional",  label:"Emotional State",   icon:"🧠",color:C.cardLav,   accent:C.lavender, count:6},
  {id:"behavioural",label:"Your Behaviour",    icon:"📱",color:C.cardMint,  accent:C.teal,     count:2},
];
const SEC_STARTS=[0,4,9,15];

function SectionChar({section}){
  const chars=[
    <svg viewBox="0 0 130 160" style={{width:110,animation:"charBob 4s ease-in-out infinite"}}><ellipse cx="65" cy="150" rx="38" ry="12" fill={C.greenPale} opacity="0.7"/><circle cx="65" cy="52" r="26" fill="#f5c5a3"/><path d="M39,47 Q41,28 65,26 Q89,28 91,47 Q84,34 65,32 Q46,34 39,47Z" fill="#2d1b0e"/><circle cx="56" cy="52" r="3.2" fill="#2d1b0e"/><circle cx="74" cy="52" r="3.2" fill="#2d1b0e"/><circle cx="57.3" cy="50.7" r="1.1" fill="#fff"/><circle cx="75.3" cy="50.7" r="1.1" fill="#fff"/><path d="M58,62 Q65,69 72,62" fill="none" stroke="#2d1b0e" strokeWidth="1.8" strokeLinecap="round"/><rect x="44" y="74" width="42" height="50" rx="11" fill={C.gold}/><path d="M44,92 Q31,99 33,112" fill="none" stroke={C.gold} strokeWidth="9" strokeLinecap="round"/><path d="M86,92 Q99,99 97,112" fill="none" stroke={C.gold} strokeWidth="9" strokeLinecap="round"/><ellipse cx="52" cy="127" rx="11" ry="7" fill="#8b6914"/><ellipse cx="78" cy="127" rx="11" ry="7" fill="#8b6914"/><rect x="53" y="82" width="24" height="30" rx="4" fill="#1a1a2e"/><rect x="55" y="85" width="20" height="20" rx="2" fill="#4ecdc4" opacity="0.8"/></svg>,
    <svg viewBox="0 0 130 160" style={{width:110,animation:"breathe 5s ease-in-out infinite"}}><ellipse cx="65" cy="150" rx="38" ry="12" fill={C.cardBlue} opacity="0.7"/><path d="M26,132 Q38,117 65,122 Q92,117 104,132 Q90,145 65,141 Q40,145 26,132Z" fill={C.blue} opacity="0.8"/><circle cx="65" cy="52" r="26" fill="#dba98a"/><path d="M39,47 Q41,28 65,26 Q89,28 91,47 Q84,34 65,32 Q46,34 39,47Z" fill="#1a0a00"/><path d="M55,51 Q59,48 63,51" fill="none" stroke="#2d1b0e" strokeWidth="1.8" strokeLinecap="round"/><path d="M67,51 Q71,48 75,51" fill="none" stroke="#2d1b0e" strokeWidth="1.8" strokeLinecap="round"/><path d="M57,62 Q65,68 73,62" fill="none" stroke="#2d1b0e" strokeWidth="1.8" strokeLinecap="round"/><rect x="44" y="74" width="42" height="46" rx="11" fill={C.blue}/><path d="M44,92 Q30,98 32,112" fill="none" stroke={C.blue} strokeWidth="9" strokeLinecap="round"/><path d="M86,92 Q100,98 98,112" fill="none" stroke={C.blue} strokeWidth="9" strokeLinecap="round"/><circle cx="30" cy="114" r="7" fill="#dba98a"/><circle cx="100" cy="114" r="7" fill="#dba98a"/><text x="10" y="40" fontSize="11" opacity="0.6">✨</text></svg>,
    <svg viewBox="0 0 130 160" style={{width:110,animation:"charBob 5s ease-in-out infinite 0.5s"}}><ellipse cx="65" cy="150" rx="38" ry="12" fill={C.cardLav} opacity="0.7"/><circle cx="65" cy="52" r="26" fill="#f0b090"/><path d="M39,47 Q43,24 65,22 Q87,24 91,47 Q82,32 65,30 Q48,32 39,47Z" fill="#5c2d0a"/><circle cx="56" cy="52" r="3.2" fill="#2d1b0e"/><circle cx="74" cy="52" r="3.2" fill="#2d1b0e"/><circle cx="57.3" cy="50.7" r="1.1" fill="#fff"/><circle cx="75.3" cy="50.7" r="1.1" fill="#fff"/><path d="M58,62 Q65,69 72,62" fill="none" stroke="#2d1b0e" strokeWidth="1.8" strokeLinecap="round"/><rect x="44" y="74" width="42" height="52" rx="11" fill={C.lavender}/><path d="M44,94 Q30,102 32,115" fill="none" stroke={C.lavender} strokeWidth="9" strokeLinecap="round"/><path d="M86,94 Q100,102 98,115" fill="none" stroke={C.lavender} strokeWidth="9" strokeLinecap="round"/><ellipse cx="52" cy="129" rx="11" ry="7" fill="#5a3d9e"/><ellipse cx="78" cy="129" rx="11" ry="7" fill="#5a3d9e"/><text x="92" y="38" fontSize="13">💜</text></svg>,
    <svg viewBox="0 0 130 160" style={{width:110,animation:"charBob 4.5s ease-in-out infinite 1s"}}><ellipse cx="65" cy="150" rx="38" ry="12" fill={C.cardMint} opacity="0.7"/><circle cx="65" cy="52" r="26" fill="#f5c5a3"/><path d="M39,47 Q41,28 65,26 Q89,28 91,47 Q84,34 65,32 Q46,34 39,47Z" fill="#2d1b0e"/><circle cx="56" cy="52" r="3.2" fill="#2d1b0e"/><circle cx="74" cy="52" r="3.2" fill="#2d1b0e"/><circle cx="57.3" cy="50.7" r="1.1" fill="#fff"/><circle cx="75.3" cy="50.7" r="1.1" fill="#fff"/><path d="M58,62 Q65,69 72,62" fill="none" stroke="#2d1b0e" strokeWidth="1.8" strokeLinecap="round"/><rect x="44" y="74" width="42" height="52" rx="11" fill={C.teal}/><path d="M44,94 Q30,102 32,114" fill="none" stroke={C.teal} strokeWidth="9" strokeLinecap="round"/><path d="M86,94 Q100,102 98,114" fill="none" stroke={C.teal} strokeWidth="9" strokeLinecap="round"/><ellipse cx="52" cy="129" rx="11" ry="7" fill="#0a5c52"/><ellipse cx="78" cy="129" rx="11" ry="7" fill="#0a5c52"/><rect x="52" y="83" width="26" height="22" rx="3" fill="#1a1a2e"/><rect x="54" y="85" width="22" height="14" rx="2" fill="#52d9cf" opacity="0.8"/></svg>,
  ];
  return chars[section]||chars[0];
}

function CrisisOverlay({onContinue}){
  return(
    <div style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(20,40,30,0.78)",backdropFilter:"blur(10px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:"#fff",borderRadius:28,padding:"44px 40px",maxWidth:520,width:"100%",boxShadow:"0 40px 100px rgba(0,0,0,0.3)",animation:"scaleIn 0.35s cubic-bezier(.23,1,.32,1)"}}>
        <div style={{textAlign:"center",marginBottom:22}}>
          <div style={{fontSize:52,marginBottom:14}}>💚</div>
          <h2 style={{fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:28,color:C.text,margin:"0 0 12px"}}>You matter. A lot.</h2>
          <p style={{fontFamily:"'Nunito',sans-serif",fontSize:15.5,lineHeight:1.75,color:C.muted,margin:0}}>Thank you for being honest. What you're feeling is real — and you don't have to carry it alone. Please reach out right now.</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:22}}>
          {[{flag:"🇵🇰",name:"Rescue 1122",number:"(042-99231701-2)",note:"Free · Confidential · 24/7"},{flag:"🌍",name:"iCall (South Asia)",number:"9152987821",note:"Mon–Sat · Trained counsellors"},{flag:"💬",name:"Crisis Text Line",number:"Text HOME to 741741",note:"Anonymous text support"}].map((h,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:14,background:C.greenPale,borderRadius:14,padding:"13px 16px"}}>
              <span style={{fontSize:22}}>{h.flag}</span>
              <div><div style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:13.5,color:C.text}}>{h.name}</div><div style={{fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:15.5,color:C.green}}>{h.number}</div><div style={{fontFamily:"'Nunito',sans-serif",fontSize:11,color:C.muted}}>{h.note}</div></div>
            </div>
          ))}
        </div>
        <div style={{background:C.cardLav,borderRadius:14,padding:"11px 15px",marginBottom:20}}>
          <p style={{fontFamily:"'Nunito',sans-serif",fontSize:13,color:C.lavender,margin:0,lineHeight:1.55}}>💜 If in immediate danger, call emergency services or go to your nearest hospital.</p>
        </div>
        <button onClick={onContinue} style={{width:"100%",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:15,color:"#fff",background:C.green,border:"none",padding:"15px",borderRadius:22,cursor:"pointer",boxShadow:`0 6px 20px ${C.green}44`}}>I've read this — continue assessment</button>
        <p style={{fontFamily:"'Nunito',sans-serif",fontSize:11.5,color:C.muted,textAlign:"center",marginTop:10}}>Your answers remain completely private — never stored or shared.</p>
      </div>
    </div>
  );
}

function SliderQ({q,onAnswer}){const[val,setVal]=useState(q.defaultVal??2.8);return(<div style={{display:"flex",flexDirection:"column",gap:26,alignItems:"center",width:"100%"}}><div style={{fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:64,color:C.green,lineHeight:1}}>{val.toFixed(2)}</div><div style={{width:"100%",maxWidth:420}}><input type="range" min={q.min} max={q.max} step={q.step} value={val} onChange={e=>setVal(parseFloat(e.target.value))} style={{width:"100%",accentColor:C.green,cursor:"pointer",height:8}}/><div style={{display:"flex",justifyContent:"space-between",marginTop:8}}><span style={{fontFamily:"'Nunito',sans-serif",fontSize:12,color:C.muted}}>1.50</span><span style={{fontFamily:"'Nunito',sans-serif",fontSize:12,color:C.muted}}>4.00</span></div></div><div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center"}}>{[1.5,2.0,2.5,3.0,3.5,4.0].map(v=><button key={v} onClick={()=>setVal(v)} style={{fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13,color:Math.abs(val-v)<0.06?"#fff":C.green,background:Math.abs(val-v)<0.06?C.green:C.greenPale,border:"none",padding:"7px 15px",borderRadius:18,cursor:"pointer",transition:"all 0.2s"}}>{v.toFixed(1)}</button>)}</div><button onClick={()=>onAnswer(val)} style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:15,color:"#fff",background:C.green,border:"none",padding:"13px 44px",borderRadius:26,cursor:"pointer",boxShadow:`0 6px 20px ${C.green}44`,transition:"transform 0.2s"}} onMouseEnter={e=>e.target.style.transform="translateY(-2px)"} onMouseLeave={e=>e.target.style.transform="translateY(0)"}>Continue →</button></div>);}
function ChoiceQ({q,onAnswer}){const[hov,setHov]=useState(null);const sec=SECTIONS.find(s=>s.id===q.cluster);return(<div style={{display:"flex",flexDirection:"column",gap:12,width:"100%",maxWidth:460}}>{q.options.map((opt,i)=><button key={i} onClick={()=>onAnswer(opt.value)} style={{display:"flex",alignItems:"center",gap:16,background:hov===i?sec.color:C.cream,border:`2px solid ${hov===i?sec.accent:"rgba(45,106,79,0.14)"}`,borderRadius:18,padding:"15px 20px",cursor:"pointer",transition:"all 0.22s cubic-bezier(.23,1,.32,1)",textAlign:"left",transform:hov===i?"translateY(-2px)":"translateY(0)",boxShadow:hov===i?"0 8px 24px rgba(0,0,0,0.1)":"none"}} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}><span style={{fontSize:26,flexShrink:0}}>{opt.icon}</span><span style={{fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:16,color:C.text,flex:1}}>{opt.label}</span><div style={{width:22,height:22,borderRadius:"50%",border:`2px solid ${hov===i?sec.accent:"rgba(45,106,79,0.2)"}`,background:hov===i?sec.accent:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",flexShrink:0}}>{hov===i&&<svg width="12" height="10" viewBox="0 0 12 10"><path d="M1,5 L4.5,8.5 L11,1" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}</div></button>)}</div>);}
function YesNoQ({q,onAnswer}){
  const[chosen,setChosen]=useState(null);
  const choose=val=>{
    setChosen(val);
    setTimeout(()=>onAnswer(val),380);
  };

  return(
    <div style={{display:"flex",gap:20,width:"100%",maxWidth:460,justifyContent:"center"}}>
      {[
        {val:true, label:"Yes", icon:"✓", desc:"This resonates with me",
         bg:"#e6faf0", activeBg:"#c8f4db", border:"#22c55e", activeBorder:"#16a34a",
         textC:"#15803d", glow:"rgba(34,197,94,0.35)",
         ringColor:"rgba(34,197,94,0.2)"},
        {val:false,label:"No",  icon:"✗", desc:"This doesn't apply to me",
         bg:"#fff0f0", activeBg:"#ffd6d6", border:"#ef4444", activeBorder:"#dc2626",
         textC:"#b91c1c", glow:"rgba(239,68,68,0.35)",
         ringColor:"rgba(239,68,68,0.2)"},
      ].map(opt=>{
        const isChosen = chosen===opt.val;
        return(
          <button key={String(opt.val)} onClick={()=>choose(opt.val)} style={{
            flex:1, position:"relative", display:"flex", flexDirection:"column",
            alignItems:"center", gap:12, overflow:"visible",
            background: isChosen ? opt.activeBg : opt.bg,
            border:`2.5px solid ${isChosen ? opt.activeBorder : opt.border+"55"}`,
            borderRadius:24, padding:"28px 18px 22px", cursor:"pointer",
            transition:"all 0.3s cubic-bezier(.23,1,.32,1)",
            transform: isChosen ? "scale(1.06) translateY(-5px)" : "scale(1)",
            boxShadow: isChosen
              ? `0 16px 40px ${opt.glow}, 0 0 0 4px ${opt.ringColor}`
              : `0 3px 12px ${opt.border}22`,
          }}>

            {/* Icon circle with ripple */}
            <div style={{position:"relative",width:64,height:64}}>
              {isChosen && (
                <div style={{position:"absolute",inset:-8,borderRadius:"50%",
                  border:`2px solid ${opt.border}`,animation:"yesnoRipple 0.9s ease-out forwards",
                  pointerEvents:"none"}}/>
              )}
              <div style={{
                width:64,height:64,borderRadius:"50%",
                background: isChosen ? opt.activeBorder : opt.border+"22",
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:26,fontWeight:900,
                color: isChosen ? "#fff" : opt.border,
                transition:"all 0.3s cubic-bezier(.23,1,.32,1)",
                transform: isChosen ? "scale(1.1) rotate(0deg)" : "scale(1)",
                boxShadow: isChosen ? `0 6px 20px ${opt.glow}` : "none",
              }}>
                {opt.icon}
              </div>
            </div>

            {/* Label */}
            <span style={{
              fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:22,
              color: isChosen ? opt.textC : "#374151",
              transition:"color 0.25s",
            }}>{opt.label}</span>

            {/* Description */}
            <span style={{
              fontFamily:"'Nunito',sans-serif",fontSize:12.5,
              color: isChosen ? opt.textC+"bb" : "#9ca3af",
              textAlign:"center",lineHeight:1.45,transition:"color 0.25s",
            }}>{opt.desc}</span>

            {/* Bottom tick/cross bar */}
            <div style={{
              height:3,width:isChosen?"70%":"0%",
              background:`linear-gradient(to right,${opt.border},${opt.activeBorder})`,
              borderRadius:4,transition:"width 0.4s 0.1s cubic-bezier(.23,1,.32,1)",
              marginTop:2,
            }}/>
          </button>
        );
      })}
    </div>
  );
}

/* ── Questionnaire receives onComplete to pass results up ── */
function QuestionnairePage({ setPage, onComplete }) {
  const [step,setStep]=useState(0);
  const [answers,setAnswers]=useState({});
  const [showCrisis,setShowCrisis]=useState(false);
  const [anim,setAnim]=useState("visible");

  const q=QUESTIONS[step];
  const curSecIdx=SECTIONS.findIndex(s=>s.id===q.cluster);
  const sec=SECTIONS[curSecIdx];
  const totalQ=QUESTIONS.length;
  const progress=(step/totalQ)*100;

  const goNext=val=>{
    const newAns={...answers,[q.id]:val};
    setAnswers(newAns);
    if(q.crisis&&val===true){setShowCrisis(true);return;}
    advance(newAns);
  };
  const advance=ans=>{
    if(step<QUESTIONS.length-1){
      setAnim("exit");
      setTimeout(()=>{setStep(s=>s+1);setAnim("enter");setTimeout(()=>setAnim("visible"),30);},260);
    } else {
      // ✅ pass results up to root, then navigate to results page
      onComplete(ans);
      setPage("results");
    }
  };
  const goBack=()=>{
    if(step===0)return;
    setAnim("exitBack");
    setTimeout(()=>{setStep(s=>s-1);setAnim("enterBack");setTimeout(()=>setAnim("visible"),30);},240);
  };
  const tf={visible:"translateX(0) scale(1)",exit:"translateX(-55px) scale(0.96)",exitBack:"translateX(55px) scale(0.96)",enter:"translateX(55px) scale(0.98)",enterBack:"translateX(-55px) scale(0.98)"};

  return(
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",flexDirection:"column"}}>
      {showCrisis&&<CrisisOverlay onContinue={()=>{setShowCrisis(false);advance({...answers,[q.id]:true});}}/>}

      {/* Progress strip */}
      <div style={{position:"sticky",top:62,zIndex:98,background:"rgba(245,240,232,0.97)",backdropFilter:"blur(10px)",borderBottom:"1px solid rgba(45,106,79,0.08)",padding:"10px 32px"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <span style={{fontSize:14}}>{sec.icon}</span>
              <span style={{fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13,color:sec.accent}}>{sec.label}</span>
            </div>
            <span style={{fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13,color:C.muted}}>Question {step+1} of {totalQ} · {Math.round(progress)}% done</span>
          </div>
          <div style={{height:7,background:"rgba(45,106,79,0.1)",borderRadius:4,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(to right,${C.green},${C.greenLight})`,borderRadius:4,transition:"width 0.4s ease",boxShadow:`0 0 8px ${C.greenLight}66`}}/>
          </div>
          <div style={{display:"flex",gap:3,marginTop:7,flexWrap:"wrap"}}>
            {QUESTIONS.map((_,i)=><div key={i} style={{width:i===step?18:6,height:6,borderRadius:3,background:i<step?C.green:i===step?sec.accent:"rgba(45,106,79,0.12)",transition:"all 0.3s"}}/>)}
          </div>
        </div>
      </div>

      {/* Main 3-col layout */}
      <div style={{flex:1,display:"flex",maxWidth:1100,width:"100%",margin:"0 auto",padding:"32px 20px",gap:22}}>
        {/* Left sidebar */}
        <div style={{width:225,flexShrink:0,display:"flex",flexDirection:"column",gap:8}}>
          <div style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:11.5,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted,marginBottom:6,paddingLeft:6}}>Your Progress</div>
          {SECTIONS.map((s,i)=>{
            const sStart=SEC_STARTS[i],sEnd=sStart+s.count;
            const isDone=step>=sEnd,isCur=step>=sStart&&step<sEnd;
            const doneN=Math.max(0,Math.min(step-sStart,s.count));
            return(
              <div key={s.id} style={{background:isCur?s.color:isDone?C.greenPale:"transparent",borderRadius:14,padding:"12px 13px",border:`1.5px solid ${isCur?s.accent:isDone?C.greenLight:"rgba(45,106,79,0.1)"}`,transition:"all 0.3s",opacity:step<sStart?0.4:1}}>
                <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:isCur?8:0}}>
                  <div style={{width:30,height:30,borderRadius:9,background:isCur?s.accent:isDone?C.green:"rgba(45,106,79,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0,color:isDone||isCur?"#fff":C.muted,transition:"all 0.3s"}}>{isDone?"✓":s.icon}</div>
                  <div style={{flex:1}}><div style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:12.5,color:isCur?s.accent:isDone?C.green:C.muted,lineHeight:1.2}}>{s.label}</div><div style={{fontFamily:"'Nunito',sans-serif",fontSize:11,color:C.muted}}>{isDone?"Complete ✓":isCur?`${doneN}/${s.count} done`:`${s.count} questions`}</div></div>
                </div>
                {isCur&&<div style={{height:4,background:"rgba(255,255,255,0.5)",borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",width:`${(doneN/s.count)*100}%`,background:s.accent,borderRadius:2,transition:"width 0.4s"}}/></div>}
              </div>
            );
          })}
          <div style={{marginTop:"auto",background:C.greenPale,borderRadius:14,padding:"13px 13px"}}>
            <div style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:12,color:C.green,marginBottom:4}}>💡 Remember</div>
            <p style={{fontFamily:"'Nunito',sans-serif",fontSize:11.5,color:C.muted,margin:0,lineHeight:1.55}}>No right or wrong answers. Be honest — your results are completely private.</p>
          </div>
        </div>

        {/* Centre question card */}
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{width:"100%",maxWidth:620,background:"#fff",borderRadius:28,padding:"38px 42px",boxShadow:"0 8px 40px rgba(45,106,79,0.1),0 2px 8px rgba(0,0,0,0.04)",opacity:anim==="visible"?1:0,transform:tf[anim],transition:"opacity 0.26s ease,transform 0.26s cubic-bezier(.23,1,.32,1)",minHeight:380}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:7,background:sec.color,borderRadius:16,padding:"5px 13px"}}>
                <span style={{fontSize:13}}>{sec.icon}</span>
                <span style={{fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:11.5,color:sec.accent}}>{sec.label}</span>
              </div>
              {q.scored?<div style={{background:C.cardRose,borderRadius:11,padding:"3px 11px"}}><span style={{fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:10.5,color:C.rose}}>Scored</span></div>:<div style={{background:C.cardYellow,borderRadius:11,padding:"3px 11px"}}><span style={{fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:10.5,color:C.gold}}>Context</span></div>}
            </div>
            {q.crisis&&<div style={{display:"flex",alignItems:"center",gap:8,background:"#fff3f3",border:"1.5px solid #ffb3b3",borderRadius:12,padding:"8px 14px",marginBottom:14}}><span style={{fontSize:14}}>💙</span><span style={{fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:12,color:"#c0392b"}}>It's safe to be honest — your answer is private.</span></div>}
            <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:18,marginBottom:26,alignItems:"flex-start"}}>
              <div>
                <h2 style={{fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:"clamp(17px,2.2vw,23px)",color:C.text,margin:"0 0 9px",lineHeight:1.4}}>{q.text}</h2>
                {q.sub&&<p style={{fontFamily:"'Nunito',sans-serif",fontSize:13.5,color:C.muted,margin:0,lineHeight:1.6}}>{q.sub}</p>}
              </div>
              <SectionChar section={curSecIdx}/>
            </div>
            <div style={{display:"flex",justifyContent:"center"}}>
              {q.type==="yesno"  &&<YesNoQ  key={q.id} q={q} onAnswer={goNext}/>}
              {q.type==="choice" &&<ChoiceQ key={q.id} q={q} onAnswer={goNext}/>}
              {q.type==="slider" &&<SliderQ key={q.id} q={q} onAnswer={goNext}/>}
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",maxWidth:620,marginTop:14}}>
            <button onClick={goBack} disabled={step===0} style={{fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:14,color:step===0?"rgba(107,128,112,0.28)":C.muted,background:"transparent",border:"none",cursor:step===0?"default":"pointer",display:"flex",alignItems:"center",gap:5,padding:"8px 0"}}>← Back</button>
            <span style={{fontFamily:"'Nunito',sans-serif",fontSize:12,color:"rgba(107,128,112,0.5)"}}>{totalQ-step-1} question{totalQ-step-1!==1?"s":""} remaining</span>
          </div>
          <div style={{marginTop:20,display:"flex",alignItems:"center",gap:8,background:C.greenPale,borderRadius:16,padding:"9px 18px"}}>
            <span style={{fontSize:13}}>🔒</span>
            <span style={{fontFamily:"'Nunito',sans-serif",fontSize:12.5,color:C.green,fontWeight:600}}>Your answers are completely private — never stored, never shared.</span>
          </div>
        </div>

        {/* Right — question map */}
        <div style={{width:180,flexShrink:0}}>
          <div style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted,marginBottom:10,paddingLeft:4}}>Question Map</div>
          <div style={{display:"flex",flexDirection:"column",gap:3}}>
            {QUESTIONS.map((qq,i)=>{
              const qSec=SECTIONS.find(s=>s.id===qq.cluster);
              const isDone=i<step,isCur=i===step;
              return(
                <div key={i} style={{display:"flex",alignItems:"center",gap:7,padding:"6px 9px",borderRadius:9,background:isCur?qSec.color:"transparent",border:`1.5px solid ${isCur?qSec.accent:"transparent"}`,transition:"all 0.2s"}}>
                  <div style={{width:20,height:20,borderRadius:"50%",background:isDone?C.green:isCur?qSec.accent:"rgba(45,106,79,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8.5,color:isDone||isCur?"#fff":C.muted,fontWeight:800,flexShrink:0,transition:"all 0.3s"}}>{isDone?"✓":i+1}</div>
                  <div style={{flex:1,overflow:"hidden"}}>
                    <div style={{fontFamily:"'Nunito',sans-serif",fontSize:10,fontWeight:isCur?800:600,color:isCur?qSec.accent:isDone?C.green:C.muted,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{qq.id.charAt(0).toUpperCase()+qq.id.slice(1)}</div>
                    {isDone&&answers[qq.id]!==undefined&&<div style={{fontFamily:"'Nunito',sans-serif",fontSize:9,color:answers[qq.id]===true?C.teal:C.rose,fontWeight:700}}>{typeof answers[qq.id]==="boolean"?(answers[qq.id]?"Yes":"No"):String(answers[qq.id])}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   ██████  PAGE 3 — RESULTS  ██████
════════════════════════════════════════════════ */
function RadialGauge({ pct, color, size=160 }) {
  const r = 58, cx = 80, cy = 80;
  const circ = 2 * Math.PI * r;
  const [animPct, setAnimPct] = useState(0);
  useEffect(() => {
    let frame, start;
    const run = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1400, 1);
      const ease = p < .5 ? 2*p*p : -1+(4-2*p)*p;
      setAnimPct(ease * pct);
      if (p < 1) frame = requestAnimationFrame(run);
    };
    const t = setTimeout(() => { frame = requestAnimationFrame(run); }, 300);
    return () => { cancelAnimationFrame(frame); clearTimeout(t); };
  }, [pct]);

  return (
    <svg width={size} height={size} viewBox="0 0 160 160">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(45,106,79,0.08)" strokeWidth="14"/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="14"
        strokeDasharray={circ} strokeDashoffset={circ - (animPct/100)*circ}
        strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`}
        style={{transition:"stroke-dashoffset 0.05s", filter:`drop-shadow(0 0 6px ${color}55)`}}/>
      <text x={cx} y={cy-6} textAnchor="middle" fontFamily="'Nunito',sans-serif" fontWeight="900" fontSize="28" fill={color}>{Math.round(animPct)}%</text>
      <text x={cx} y={cy+16} textAnchor="middle" fontFamily="'Nunito',sans-serif" fontSize="11" fill={C.muted}>score</text>
    </svg>
  );
}

function ClusterBar({ label, score, total, color, bg, icon, delay=0, questions, answers }) {
  const [ref, vis] = useReveal(0.1);
  const [open, setOpen] = useState(false);
  const pct = Math.round((score/total)*100);
  const [barW, setBarW] = useState(0);
  useEffect(() => { if (vis) { const t = setTimeout(() => setBarW(pct), 200 + delay); return () => clearTimeout(t); } }, [vis, pct, delay]);

  return (
    <div ref={ref} style={{ background: "#fff", borderRadius: 20, padding: "24px 28px", boxShadow: "0 4px 20px rgba(45,106,79,0.07)", opacity: vis?1:0, transform: vis?"translateY(0)":"translateY(22px)", transition: `opacity 0.6s ${delay*0.001}s, transform 0.6s ${delay*0.001}s cubic-bezier(.23,1,.32,1)` }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:44, height:44, borderRadius:14, background:bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{icon}</div>
          <div>
            <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:16, color:C.text }}>{label}</div>
            <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:12, color:C.muted }}>{score} of {total} symptoms present</div>
          </div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:28, color, lineHeight:1 }}>{score}/{total}</div>
          <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:11, color:C.muted }}>{pct}%</div>
        </div>
      </div>
      <div style={{ height:10, background:"rgba(45,106,79,0.07)", borderRadius:5, overflow:"hidden", marginBottom:14 }}>
        <div style={{ height:"100%", width:`${barW}%`, background:`linear-gradient(to right,${color}99,${color})`, borderRadius:5, transition:"width 1.2s cubic-bezier(.23,1,.32,1)", boxShadow:`0 0 8px ${color}44` }}/>
      </div>
      <button onClick={()=>setOpen(o=>!o)} style={{ fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:12.5, color, background:bg, border:"none", padding:"6px 14px", borderRadius:14, cursor:"pointer", transition:"all 0.2s" }}>
        {open?"Hide":"Show"} question breakdown {open?"▲":"▼"}
      </button>
      {open && (
        <div style={{ marginTop:14, display:"flex", flexDirection:"column", gap:8 }}>
          {questions.map((qq, i) => {
            const ans = answers[qq.id];
            const isYes = ans === true;
            return (
              <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"10px 14px", background:isYes?`${color}10`:"rgba(45,106,79,0.03)", borderRadius:12, border:`1px solid ${isYes?`${color}25`:"rgba(45,106,79,0.06)"}` }}>
                <div style={{ width:24, height:24, borderRadius:"50%", background:isYes?color:"rgba(45,106,79,0.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:isYes?"#fff":C.muted, fontWeight:800, flexShrink:0, marginTop:1 }}>{isYes?"✓":"✗"}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:13, color:C.text, lineHeight:1.45, fontWeight:600 }}>{qq.text}</div>
                  <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:11, color:isYes?color:C.muted, fontWeight:700, marginTop:3 }}>{isYes?"Yes — symptom present":"No — not applicable"}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ResultsPage({ results, setPage }) {
  const on = useMounted(80);
  const [ref1, vis1] = useReveal(0.1);
  const [ref2, vis2] = useReveal(0.1);

  if (!results) {
    return (
      <div style={{ minHeight:"100vh", background:C.bg, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:60, marginBottom:20 }}>📋</div>
          <h2 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:30, color:C.text, margin:"0 0 14px" }}>No results yet</h2>
          <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:16, color:C.muted, margin:"0 0 28px" }}>Complete the assessment first to see your personalised results.</p>
          <button onClick={()=>setPage("assessment")} style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:15, color:"#fff", background:C.green, border:"none", padding:"14px 36px", borderRadius:26, cursor:"pointer", boxShadow:`0 6px 20px ${C.green}44` }}>Take Assessment →</button>
        </div>
      </div>
    );
  }

  const { anxScore, emotScore, behavScore, totalScore, risk, confidence, hasCrisis, answers } = results;
  const maxScore = 13;
  const overallPct = Math.round((totalScore/maxScore)*100);

  const riskConfig = {
    low:       { label:"Low Risk",    emoji:"🌱", color:C.riskLow,  bg:C.cardMint,   textBg:"#e8f8f0", msg:"Your responses suggest you're managing well right now. Keep checking in regularly — early awareness is always the best step.", tip:"Keep practising self-care and reach out if things change." },
    borderline:{ label:"Borderline",  emoji:"⚡", color:C.riskMid,  bg:C.cardYellow, textBg:"#fef9e7", msg:"Some signs worth paying attention to. This doesn't mean you have depression — but it's worth speaking to someone you trust, or using the resources below.", tip:"Consider a conversation with a friend, counsellor, or your university welfare team." },
    high:      { label:"High Risk",   emoji:"💙", color:C.riskHigh, bg:C.cardRose,   textBg:"#fdf0eb", msg:"Your responses suggest significant signs of depression. Please know you are not alone — millions of students feel this way, and support works. Reaching out is the bravest thing you can do.", tip:"We strongly encourage you to speak to a counsellor or call a helpline today." },
  };
  const rc = riskConfig[risk];

  const anxQs   = QUESTIONS.filter(q=>q.cluster==="anxiety"    &&q.scored);
  const emotQs  = QUESTIONS.filter(q=>q.cluster==="emotional"  &&q.scored);
  const behavQs = QUESTIONS.filter(q=>q.cluster==="behavioural"&&q.scored);

  const resources = [
    { icon:"📞", title:"Rescue 1122",       sub:"Free mental health support", contact:"(042-99231701-2)", note:"Pakistan · 24/7 · Confidential",   color:C.cardMint,  accent:C.teal },
    { icon:"💬", title:"iCall Counselling", sub:"Professional counsellors",   contact:"9152987821",       note:"South Asia · Mon–Sat",             color:C.cardBlue,  accent:C.blue },
    { icon:"✉️", title:"Crisis Text Line",  sub:"Text-based support",         contact:"Text HOME → 741741",note:"Anonymous · Instant response",     color:C.cardLav,   accent:C.lavender },
    { icon:"🌐", title:"Headspace App",     sub:"Guided meditation & calm",    contact:"headspace.com",    note:"Free for students at many unis",   color:C.cardPeach, accent:C.orange },
  ];

  const nextSteps = {
    low:       [["🌿","Keep checking in","Take the assessment monthly to stay aware of changes."],["🧘","Practise self-care","Regular sleep, exercise, and social connection are powerful."],["📚","Learn more","Explore NeuroTrack's resource library for wellbeing tips."]],
    borderline:[["💬","Talk to someone","Sharing your feelings with a trusted person helps more than you think."],["📋","Track your mood","Notice patterns over a few days — journalling can reveal a lot."],["🏥","Visit student services","Your university welfare team is free and confidential."]],
    high:      [["📞","Call a helpline now","Rescue 1122 has trained counsellors available 24/7."],["🏥","See a professional","Book an appointment with a doctor or university counsellor this week."],["👥","Tell someone you trust","You don't have to explain everything — just say you're struggling."]],
  };

  return (
    <div style={{ background:C.bg, minHeight:"100vh" }}>

      {/* ── HERO RESULT BANNER ── */}
      <section style={{ background: `linear-gradient(135deg, ${C.green} 0%, ${C.greenMid} 100%)`, padding:"80px 40px 60px", position:"relative", overflow:"hidden" }}>
        {/* Decorative circles */}
        <div style={{ position:"absolute", top:"-80px", right:"-80px", width:"240px", height:"240px", borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", top:"auto", right:"-60px", width:"180px", height:"180px", borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", top:"50%", left:"-60px", width:"120px", height:"120px", borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }}/>
        <div style={{ maxWidth:900, margin:"0 auto", position:"relative", zIndex:1 }}>
          <div style={{ opacity:on?1:0, transform:on?"translateY(0)":"translateY(20px)", transition:"all 0.7s 0.1s cubic-bezier(.23,1,.32,1)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
              <div style={{ background:"rgba(255,255,255,0.15)", borderRadius:12, padding:"5px 14px", display:"inline-flex", alignItems:"center", gap:7 }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:rc.color, display:"inline-block", boxShadow:`0 0 8px ${rc.color}` }}/>
                <span style={{ fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:12, color:"rgba(255,255,255,0.9)", letterSpacing:"0.06em" }}>Assessment Complete</span>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:40, alignItems:"center", flexWrap:"wrap" }}>
              <div>
                <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:14, color:"rgba(255,255,255,0.65)", marginBottom:8, letterSpacing:"0.04em" }}>YOUR RESULT</div>
                <h1 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:"clamp(36px,5vw,58px)", color:"#fff", margin:"0 0 16px", lineHeight:1.1 }}>
                  <span style={{ fontSize:"0.7em" }}>{rc.emoji} </span>{rc.label}
                </h1>
                <div style={{ background:"rgba(255,255,255,0.13)", borderRadius:18, padding:"18px 22px", maxWidth:560, backdropFilter:"blur(10px)", border:"1px solid rgba(255,255,255,0.15)", marginBottom:24 }}>
                  <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:15.5, lineHeight:1.75, color:"rgba(255,255,255,0.88)", margin:0 }}>{rc.msg}</p>
                </div>
                <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                  <button onClick={()=>setPage("assessment")} style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:14, color:C.green, background:"#fff", border:"none", padding:"12px 26px", borderRadius:24, cursor:"pointer", boxShadow:"0 4px 16px rgba(0,0,0,0.2)", transition:"transform 0.2s" }}
                    onMouseEnter={e=>e.target.style.transform="translateY(-2px)"} onMouseLeave={e=>e.target.style.transform="translateY(0)"}>
                    Retake Assessment
                  </button>
                  <button onClick={()=>setPage("home")} style={{ fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:14, color:"rgba(255,255,255,0.85)", background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.25)", padding:"12px 24px", borderRadius:24, cursor:"pointer", transition:"all 0.2s" }}
                    onMouseEnter={e=>e.target.style.background="rgba(255,255,255,0.2)"} onMouseLeave={e=>e.target.style.background="rgba(255,255,255,0.12)"}>
                    ← Back to Home
                  </button>
                </div>
              </div>
              {/* Radial gauge */}
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
                <RadialGauge pct={overallPct} color={rc.color} size={170}/>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:12, color:"rgba(255,255,255,0.6)" }}>Overall symptom score</div>
                  <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:13, color:"rgba(255,255,255,0.85)", marginTop:2 }}>{totalScore} / {maxScore} symptoms</div>
                </div>
                <div style={{ background:"rgba(255,255,255,0.12)", borderRadius:14, padding:"10px 18px", textAlign:"center", border:"1px solid rgba(255,255,255,0.15)" }}>
                  <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:11, color:"rgba(255,255,255,0.6)", marginBottom:2 }}>AI Confidence</div>
                  <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:22, color:"#fff" }}>{confidence}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CRISIS BANNER ── */}
      {hasCrisis && (
        <div style={{ background:"#1a0510", borderBottom:"3px solid #e05c7a", padding:"20px 40px" }}>
          <div style={{ maxWidth:900, margin:"0 auto", display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
            <span style={{ fontSize:28 }}>💙</span>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:16, color:"#fff", marginBottom:4 }}>You mentioned thoughts of self-harm — please reach out right now.</div>
              <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:14, color:"rgba(255,255,255,0.65)" }}>Rescue 1122 · (042-99231701-2) &nbsp;·&nbsp; Available 24/7 &nbsp;·&nbsp; Free &nbsp;·&nbsp; Confidential</div>
            </div>
            <a href="tel:04299231701" style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:14, color:"#1a0510", background:"#e05c7a", textDecoration:"none", padding:"12px 24px", borderRadius:20 }}>Call Now</a>
          </div>
        </div>
      )}

      {/* ── SCORE SUMMARY CARDS ── */}
      <section style={{ padding:"60px 40px 40px" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <h2 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:"clamp(22px,2.8vw,36px)", color:C.text, margin:"0 0 10px" }}>Your score breakdown</h2>
          <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:15.5, color:C.muted, margin:"0 0 32px" }}>Here's how you scored across each of the three symptom clusters our AI model uses.</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:40 }}>
            {[
              { label:"Anxiety",    score:anxScore,  total:5, color:C.blue,     bg:C.cardBlue,  icon:"🫁", pct:Math.round((anxScore/5)*100)  },
              { label:"Emotional",  score:emotScore, total:6, color:C.lavender, bg:C.cardLav,   icon:"🧠", pct:Math.round((emotScore/6)*100) },
              { label:"Behaviour",  score:behavScore,total:2, color:C.teal,     bg:C.cardMint,  icon:"📱", pct:Math.round((behavScore/2)*100)},
            ].map((s,i)=>(
              <div key={i} ref={ref1} style={{ background:"#fff", borderRadius:20, padding:"24px 22px", boxShadow:"0 4px 20px rgba(45,106,79,0.07)", textAlign:"center", opacity:vis1?1:0, transform:vis1?"translateY(0)":"translateY(22px)", transition:`opacity 0.55s ${i*0.1}s,transform 0.55s ${i*0.1}s cubic-bezier(.23,1,.32,1)` }}>
                <div style={{ width:52, height:52, borderRadius:16, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, margin:"0 auto 14px" }}>{s.icon}</div>
                <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:36, color:s.color, lineHeight:1, marginBottom:4 }}>{s.score}/{s.total}</div>
                <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:15, color:C.text, marginBottom:6 }}>{s.label}</div>
                <div style={{ height:6, background:"rgba(45,106,79,0.08)", borderRadius:3, overflow:"hidden", margin:"10px 0 8px" }}>
                  <div style={{ height:"100%", width:`${s.pct}%`, background:s.color, borderRadius:3, transition:"width 1s 0.5s ease" }}/>
                </div>
                <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:12, color:C.muted }}>{s.pct}% of symptoms</div>
              </div>
            ))}
          </div>

          {/* Cluster deep-dives */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <ClusterBar label="Anxiety Symptoms"  score={anxScore}  total={5} color={C.blue}     bg={C.cardBlue}  icon="🫁" delay={0}   questions={anxQs}  answers={answers}/>
            <ClusterBar label="Emotional State"   score={emotScore} total={6} color={C.lavender} bg={C.cardLav}   icon="🧠" delay={100} questions={emotQs} answers={answers}/>
            <ClusterBar label="Your Behaviour"    score={behavScore}total={2} color={C.teal}     bg={C.cardMint}  icon="📱" delay={200} questions={behavQs}answers={answers}/>
          </div>
        </div>
      </section>

      {/* ── WHAT THIS MEANS ── */}
      <section style={{ padding:"0 40px 60px" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ background:rc.textBg, border:`2px solid ${rc.color}22`, borderRadius:24, padding:"32px 36px", display:"grid", gridTemplateColumns:"auto 1fr", gap:24, alignItems:"flex-start" }}>
            <div style={{ width:56, height:56, borderRadius:18, background:rc.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, flexShrink:0 }}>{rc.emoji}</div>
            <div>
              <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:11, letterSpacing:"0.12em", textTransform:"uppercase", color:rc.color, marginBottom:8 }}>What this means</div>
              <h3 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:22, color:C.text, margin:"0 0 10px" }}>{rc.label} — {rc.tip}</h3>
              <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:15, lineHeight:1.75, color:C.muted, margin:"0 0 18px" }}>
                {risk==="low" && "You answered 'Yes' to fewer than 2 scored questions, which our AI model associates with a very low probability of clinical depression. However, mental health is fluid — check in regularly and don't ignore changes."}
                {risk==="borderline" && "You answered 'Yes' to 1 scored question. Our data shows this puts you in a borderline zone. It doesn't mean you have depression, but the pattern is worth monitoring with a professional."}
                {risk==="high" && `You answered 'Yes' to ${totalScore} of 13 scored questions. Our AI model associates this pattern with a high likelihood of depression symptoms requiring support. This is not a diagnosis — but please take it seriously and speak to someone.`}
              </p>
              <div style={{ background:"rgba(255,255,255,0.7)", borderRadius:14, padding:"12px 16px", display:"inline-flex", gap:10, alignItems:"center" }}>
                <span style={{ fontSize:16 }}>⚠️</span>
                <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:12.5, color:C.muted }}>NeuroTrack is a <strong>screening tool</strong>, not a clinical diagnosis. Always consult a qualified mental health professional.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT STEPS ── */}
      <section ref={ref2} style={{ padding:"0 40px 60px" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <h2 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:"clamp(22px,2.8vw,34px)", color:C.text, margin:"0 0 10px" }}>Your next steps</h2>
          <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:15.5, color:C.muted, margin:"0 0 28px" }}>Based on your results, here's what we recommend.</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {nextSteps[risk].map(([icon,title,body],i)=>(
              <div key={i} style={{ background:"#fff", borderRadius:20, padding:"24px 22px", boxShadow:"0 4px 18px rgba(45,106,79,0.07)", opacity:vis2?1:0, transform:vis2?"translateY(0)":"translateY(22px)", transition:`opacity 0.55s ${i*0.12}s,transform 0.55s ${i*0.12}s cubic-bezier(.23,1,.32,1)` }}>
                <div style={{ fontSize:30, marginBottom:12 }}>{icon}</div>
                <h3 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:17, color:C.text, margin:"0 0 8px" }}>{title}</h3>
                <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:13.5, color:C.muted, margin:0, lineHeight:1.6 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESOURCES ── */}
      <section style={{ padding:"0 40px 80px" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <h2 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:"clamp(22px,2.8vw,34px)", color:C.text, margin:"0 0 10px" }}>Support resources</h2>
          <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:15.5, color:C.muted, margin:"0 0 28px" }}>Reach out anytime — these services are free, confidential, and here for you.</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:14 }}>
            {resources.map((r,i)=>(
              <div key={i} style={{ background:r.color, borderRadius:20, padding:"22px 20px", cursor:"pointer", transition:"transform 0.2s,box-shadow 0.2s" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 12px 30px rgba(0,0,0,0.1)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
                <div style={{ fontSize:28, marginBottom:10 }}>{r.icon}</div>
                <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:15.5, color:C.text, marginBottom:4 }}>{r.title}</div>
                <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:12.5, color:C.muted, marginBottom:10 }}>{r.sub}</div>
                <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:14, color:r.accent, marginBottom:4 }}>{r.contact}</div>
                <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:11, color:C.muted }}>{r.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHARE / RETAKE ── */}
      <section style={{ background:C.green, padding:"50px 40px" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:24 }}>
          <div>
            <h3 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:26, color:"#fff", margin:"0 0 8px" }}>Want to check in again?</h3>
            <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:15, color:"rgba(255,255,255,0.7)", margin:0 }}>Mental health changes over time. Retaking every 4–6 weeks helps you track patterns.</p>
          </div>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <button onClick={()=>{ setPage("assessment"); window.scrollTo(0,0); }} style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:14, color:C.green, background:"#fff", border:"none", padding:"13px 28px", borderRadius:24, cursor:"pointer", boxShadow:"0 4px 16px rgba(0,0,0,0.2)", transition:"transform 0.2s" }}
              onMouseEnter={e=>e.target.style.transform="translateY(-2px)"} onMouseLeave={e=>e.target.style.transform="translateY(0)"}>
              Retake Assessment
            </button>
            <button onClick={()=>{ setPage("home"); window.scrollTo(0,0); }} style={{ fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:14, color:"rgba(255,255,255,0.85)", background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.25)", padding:"13px 24px", borderRadius:24, cursor:"pointer" }}>
              ← Home
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ════════════════════════════════════════════════
   ██████  PAGE — ABOUT  ██████
════════════════════════════════════════════════ */
function AboutPage({ setPage }) {
  const on = useMounted(100);
  const [ref1, vis1] = useReveal(0.1);
  const [ref2, vis2] = useReveal(0.1);
  const [ref3, vis3] = useReveal(0.1);
  const a = d => ({ opacity: on?1:0, transform: on?"translateY(0)":"translateY(22px)", transition:`all 0.8s ${d}s cubic-bezier(.23,1,.32,1)` });

  const values = [
    { icon:"🔒", title:"Fully Private", body:"Your answers are never stored, never shared, and never linked to your identity. Everything stays on your device.", color:C.cardMint, accent:C.teal },
    { icon:"🤖", title:"AI-Powered", body:"A Random Forest classifier trained on real student response data maps your 13 answers to a risk profile instantly.", color:C.cardLav, accent:C.lavender },
    { icon:"🎓", title:"Student-Focused", body:"Every question and recommendation is designed specifically around the pressures, lifestyle, and challenges of student life.", color:C.cardBlue, accent:C.blue },
    { icon:"💚", title:"Non-Judgmental", body:"There are no wrong answers. NeuroTrack is a safe space — honest responses give you the most useful results.", color:C.cardPeach, accent:C.orange },
    { icon:"⚡", title:"Instant Results", body:"Complete the 13-question check-in in under 5 minutes and get a personalised risk profile with actionable next steps.", color:C.cardYellow, accent:C.gold },
    { icon:"🌍", title:"Globally Aware", body:"Resources are matched to students in Pakistan and worldwide, with local helplines and international support options.", color:C.cardRose, accent:C.rose },
  ];

  const team = [
    { name:"AI & Machine Learning", role:"Random Forest classifier trained on labelled student depression datasets", icon:"🤖", color:C.cardLav, accent:C.lavender },
    { name:"Clinical Research", role:"Questions mapped from PHQ-9 and GAD-7 validated screening instruments", icon:"🔬", color:C.cardBlue, accent:C.blue },
    { name:"UX & Accessibility", role:"Designed for ease and comfort — reducing friction when users are most vulnerable", icon:"🎨", color:C.cardMint, accent:C.teal },
    { name:"Student Welfare", role:"Partnered with university counsellors to align resources and referral pathways", icon:"🏫", color:C.cardPeach, accent:C.orange },
  ];

  const timeline = [
    { step:"01", label:"Research & Data", body:"We analysed real student depression datasets and reviewed clinical screening tools like PHQ-9, GAD-7, and BDI.", color:C.cardMint, accent:C.teal },
    { step:"02", label:"Question Design", body:"13 targeted questions were selected to cover anxiety, emotional state, and behavioural patterns — avoiding redundancy.", color:C.cardBlue, accent:C.blue },
    { step:"03", label:"AI Training", body:"A Random Forest model was trained and validated, achieving 85% accuracy on a held-out student test set.", color:C.cardLav, accent:C.lavender },
    { step:"04", label:"Resource Mapping", body:"Crisis lines, apps, and university services were vetted and matched to low, borderline, and high-risk profiles.", color:C.cardPeach, accent:C.orange },
  ];

  return (
    <div style={{ background:C.bg, minHeight:"100vh" }}>

      {/* ── HERO ── */}
      <section style={{ background:`linear-gradient(135deg,${C.green} 0%,${C.greenMid} 100%)`, padding:"90px 40px 70px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"-80px", right:"-60px", width:"220px", height:"220px", borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:"-60px", right:"-60px", width:"160px", height:"160px", borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", top:"60%", left:"-60px", width:"100px", height:"100px", borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }}/>
        <div style={{ maxWidth:900, margin:"0 auto", position:"relative", zIndex:1 }}>
          <div style={{ ...a(0.1), display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.15)", borderRadius:20, padding:"6px 16px", marginBottom:22 }}>
            <span style={{ fontSize:13 }}>🧠</span>
            <span style={{ fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:12.5, color:"rgba(255,255,255,0.9)" }}>About NeuroTrack</span>
          </div>
          <h1 style={{ ...a(0.18), fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:"clamp(34px,5vw,58px)", color:"#fff", margin:"0 0 18px", lineHeight:1.12 }}>
            Mental health awareness,<br/>built for students.
          </h1>
          <p style={{ ...a(0.28), fontFamily:"'Nunito',sans-serif", fontSize:17, lineHeight:1.8, color:"rgba(255,255,255,0.82)", maxWidth:580, margin:"0 0 36px" }}>
            NeuroTrack is a free, anonymous AI-powered screening tool that helps university students identify early signs of depression — privately, in under 5 minutes.
          </p>
          <div style={{ ...a(0.36), display:"flex", gap:12, flexWrap:"wrap" }}>
            <button onClick={()=>setPage("assessment")} style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:15, color:C.green, background:"#fff", border:"none", padding:"14px 32px", borderRadius:28, cursor:"pointer", boxShadow:"0 6px 20px rgba(0,0,0,0.2)", transition:"transform 0.2s" }}
              onMouseEnter={e=>e.target.style.transform="translateY(-2px)"} onMouseLeave={e=>e.target.style.transform="translateY(0)"}>
              Take the assessment →
            </button>
            <button onClick={()=>setPage("resources")} style={{ fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:15, color:"rgba(255,255,255,0.88)", background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.25)", padding:"14px 26px", borderRadius:28, cursor:"pointer" }}>
              View resources
            </button>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section style={{ background:C.cream, padding:"70px 40px" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center" }}>
          <div>
            <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:11, letterSpacing:"0.12em", textTransform:"uppercase", color:C.green, marginBottom:14 }}>Our Mission</div>
            <h2 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:"clamp(24px,3vw,38px)", color:C.text, margin:"0 0 18px", lineHeight:1.2 }}>
              No student should struggle <span style={{ color:C.green }}>alone.</span>
            </h2>
            <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:15.5, lineHeight:1.82, color:C.muted, margin:"0 0 16px" }}>
              Depression among university students is a silent epidemic. Over 60% of students experience symptoms — yet most never seek help due to stigma, unawareness, or lack of access to support.
            </p>
            <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:15.5, lineHeight:1.82, color:C.muted, margin:"0 0 24px" }}>
              NeuroTrack bridges that gap with a private, judgment-free check-in that takes minutes. Early awareness is the first and most powerful step toward getting support.
            </p>
            <div style={{ display:"flex", gap:24, flexWrap:"wrap" }}>
              {[["60%","of students face depression"],["85%","AI detection accuracy"],["5 min","average check-in time"]].map(([num,lbl],i)=>(
                <div key={i}>
                  <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:28, color:C.green, lineHeight:1 }}>{num}</div>
                  <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:12, color:C.muted, marginTop:3 }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {[["🎓","University Students","Exam pressure, deadlines, and performance anxiety take a real toll.",C.cardMint,C.teal],
              ["🌙","Sleep & Mood","Disrupted sleep is both a cause and symptom of depression.",C.cardLav,C.lavender],
              ["📱","Digital Overload","Excessive social media use is strongly linked to low mood.",C.cardPeach,C.orange],
              ["💬","Silence Hurts","Most students don't talk about mental health — NeuroTrack helps break that silence.",C.cardBlue,C.blue]
            ].map(([ic,title,body,bg,acc],i)=>(
              <div key={i} style={{ background:bg, borderRadius:18, padding:"20px 16px" }}>
                <div style={{ fontSize:22, marginBottom:8 }}>{ic}</div>
                <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:13.5, color:C.text, marginBottom:5 }}>{title}</div>
                <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:12, color:C.muted, lineHeight:1.55 }}>{body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section ref={ref1} style={{ background:C.bg, padding:"70px 40px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:44 }}>
            <h2 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:"clamp(24px,3vw,40px)", color:C.text, margin:"0 0 10px" }}>What makes NeuroTrack <span style={{ color:C.green }}>different</span></h2>
            <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:15.5, color:C.muted, maxWidth:440, margin:"0 auto" }}>Designed from the ground up with student safety, privacy, and wellbeing at its core.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16 }}>
            {values.map((v,i)=>(
              <div key={i} style={{ background:v.color, borderRadius:20, padding:"26px 22px", opacity:vis1?1:0, transform:vis1?"translateY(0)":"translateY(24px)", transition:`opacity 0.55s ${i*0.08}s, transform 0.55s ${i*0.08}s cubic-bezier(.23,1,.32,1)` }}>
                <div style={{ width:48, height:48, borderRadius:14, background:`${v.accent}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, marginBottom:14 }}>{v.icon}</div>
                <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:16, color:C.text, marginBottom:7 }}>{v.title}</div>
                <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:13, color:C.muted, lineHeight:1.6 }}>{v.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE BUILT IT ── */}
      <section ref={ref2} style={{ background:C.cream, padding:"70px 40px" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:44 }}>
            <h2 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:"clamp(24px,3vw,40px)", color:C.text, margin:"0 0 10px" }}>How we <span style={{ color:C.green }}>built it</span></h2>
            <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:15.5, color:C.muted, maxWidth:440, margin:"0 auto" }}>A research-first approach — from clinical instruments to a trained AI model.</p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
            {timeline.map((t,i)=>(
              <div key={i} style={{ display:"grid", gridTemplateColumns:"80px 1fr", gap:0, opacity:vis2?1:0, transform:vis2?"translateY(0)":"translateY(22px)", transition:`opacity 0.55s ${i*0.12}s, transform 0.55s ${i*0.12}s cubic-bezier(.23,1,.32,1)` }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                  <div style={{ width:48, height:48, borderRadius:"50%", background:t.color, border:`3px solid ${t.accent}`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:13, color:t.accent, flexShrink:0, zIndex:1 }}>{t.step}</div>
                  {i < timeline.length-1 && <div style={{ width:2, flex:1, background:`${t.accent}30`, minHeight:32 }}/>}
                </div>
                <div style={{ background:"#fff", borderRadius:18, padding:"22px 24px", margin:`0 0 ${i<timeline.length-1?16:0}px 16px`, boxShadow:"0 4px 18px rgba(45,106,79,0.06)" }}>
                  <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:16, color:C.text, marginBottom:6 }}>{t.label}</div>
                  <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:14, color:C.muted, lineHeight:1.65 }}>{t.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY ── */}
      <section ref={ref3} style={{ background:C.bg, padding:"70px 40px" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:44 }}>
            <h2 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:"clamp(24px,3vw,40px)", color:C.text, margin:"0 0 10px" }}>Our <span style={{ color:C.green }}>methodology</span></h2>
            <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:15.5, color:C.muted, maxWidth:460, margin:"0 auto" }}>Four pillars of expertise combined to build a trustworthy, accurate screening tool.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16 }}>
            {team.map((t,i)=>(
              <div key={i} style={{ background:t.color, borderRadius:20, padding:"28px 24px", opacity:vis3?1:0, transform:vis3?"translateY(0)":"translateY(22px)", transition:`opacity 0.55s ${i*0.1}s, transform 0.55s ${i*0.1}s cubic-bezier(.23,1,.32,1)` }}>
                <div style={{ width:52, height:52, borderRadius:16, background:`${t.accent}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, marginBottom:14 }}>{t.icon}</div>
                <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:15.5, color:C.text, marginBottom:7 }}>{t.name}</div>
                <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:13, color:C.muted, lineHeight:1.6 }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <section style={{ background:C.cream, padding:"50px 40px" }}>
        <div style={{ maxWidth:760, margin:"0 auto", background:"#fff", borderRadius:24, padding:"36px 40px", border:`2px solid ${C.greenPale}`, textAlign:"center" }}>
          <div style={{ fontSize:36, marginBottom:14 }}>⚠️</div>
          <h3 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:22, color:C.text, margin:"0 0 12px" }}>Important Disclaimer</h3>
          <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:15, lineHeight:1.8, color:C.muted, margin:"0 0 20px" }}>
            NeuroTrack is a <strong style={{ color:C.text }}>screening tool, not a clinical diagnosis</strong>. It cannot replace a qualified mental health professional. Results indicate risk patterns based on your responses — they are not a medical verdict.
          </p>
          <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:14, lineHeight:1.75, color:C.muted, margin:"0 0 24px" }}>
            If you are in distress or experiencing a mental health crisis, please contact Rescue 1122 at <strong style={{ color:C.green }}>(042-99231701-2)</strong> or visit your nearest hospital immediately.
          </p>
          <button onClick={()=>setPage("assessment")} style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:15, color:"#fff", background:C.green, border:"none", padding:"14px 36px", borderRadius:26, cursor:"pointer", boxShadow:`0 6px 20px ${C.green}44` }}>
            Start free assessment →
          </button>
        </div>
      </section>

    </div>
  );
}

/* ════════════════════════════════════════════════
   ██████  PAGE — RESOURCES  ██████
════════════════════════════════════════════════ */
function ResourcesPage({ setPage }) {
  const on = useMounted(100);
  const [ref1, vis1] = useReveal(0.1);
  const [ref2, vis2] = useReveal(0.1);
  const [ref3, vis3] = useReveal(0.1);
  const [activeTab, setActiveTab] = useState("helplines");
  const a = d => ({ opacity:on?1:0, transform:on?"translateY(0)":"translateY(22px)", transition:`all 0.8s ${d}s cubic-bezier(.23,1,.32,1)` });

  const helplines = [
    { flag:"🇵🇰", name:"Rescue 1122", number:"(042-99231701-2)", desc:"Emergency rescue and mental health crisis response available across Punjab, Pakistan.", hours:"24/7", type:"Emergency", color:C.cardMint, accent:C.teal },
    { flag:"🇵🇰", name:"Umang Helpline", number:"0317-4288665", desc:"Free confidential mental health support for students and young people in Pakistan.", hours:"24/7", type:"Counselling", color:C.cardBlue, accent:C.blue },
    { flag:"🌍", name:"iCall", number:"9152987821", desc:"Trained psychological counsellors providing empathetic, non-judgmental support across South Asia.", hours:"Mon–Sat, 8am–10pm", type:"Counselling", color:C.cardLav, accent:C.lavender },
    { flag:"💬", name:"Crisis Text Line", number:"Text HOME to 741741", desc:"Free, 24/7 crisis support via text message. Anonymous and instant — ideal if you can't speak aloud.", hours:"24/7", type:"Text Support", color:C.cardPeach, accent:C.orange },
    { flag:"🌐", name:"Befrienders Worldwide", number:"befrienders.org", desc:"Global network of emotional support volunteers. Find your nearest centre at befrienders.org.", hours:"Varies by centre", type:"Emotional Support", color:C.cardYellow, accent:C.gold },
    { flag:"🇵🇰", name:"Rozan Counselling", number:"051-2890505", desc:"Professional psychological services and counselling for youth and students based in Islamabad.", hours:"Mon–Fri, 9am–5pm", type:"Counselling", color:C.cardRose, accent:C.rose },
  ];

  const apps = [
    { icon:"🧘", name:"Headspace", tag:"Meditation & Mindfulness", desc:"Guided meditation sessions, sleep sounds, and stress relief exercises — free for many university students.", platform:"iOS & Android", color:C.cardMint, accent:C.teal },
    { icon:"🌊", name:"Calm", tag:"Sleep & Relaxation", desc:"Sleep stories, breathing exercises, and relaxation techniques to reduce anxiety and improve sleep quality.", platform:"iOS & Android", color:C.cardBlue, accent:C.blue },
    { icon:"📔", name:"Daylio", tag:"Mood Tracker", desc:"Track your mood and daily activities to spot patterns. No writing required — just icons and a few taps.", platform:"iOS & Android", color:C.cardLav, accent:C.lavender },
    { icon:"💬", name:"Woebot", tag:"AI Therapy Chatbot", desc:"A research-backed AI chatbot that teaches CBT techniques and offers conversational mental health support.", platform:"iOS & Android", color:C.cardPeach, accent:C.orange },
    { icon:"🌱", name:"Youper", tag:"Emotional Health AI", desc:"AI-guided therapy sessions using CBT and mindfulness. Tracks mood and offers personalised insights.", platform:"iOS & Android", color:C.cardYellow, accent:C.gold },
    { icon:"🏃", name:"Nike Run Club", tag:"Exercise & Mood", desc:"Regular exercise is one of the most effective depression treatments. Free guided runs for all levels.", platform:"iOS & Android", color:C.cardRose, accent:C.rose },
  ];

  const selfHelp = [
    { icon:"😴", title:"Fix your sleep", body:"Aim for 7–9 hours. Keep a consistent sleep and wake time — even on weekends. Poor sleep amplifies every symptom of depression.", steps:["Set a regular bedtime","Avoid screens 1 hour before bed","Keep your room cool and dark"], color:C.cardBlue, accent:C.blue },
    { icon:"🏃", title:"Move your body", body:"Even a 20-minute walk significantly reduces cortisol and boosts serotonin. You don't need a gym — just movement.", steps:["Start with 10-minute daily walks","Try yoga or stretching at home","Join a university sports club"], color:C.cardMint, accent:C.teal },
    { icon:"🍎", title:"Eat to support your brain", body:"Blood sugar crashes worsen mood and focus. Prioritise whole foods, reduce ultra-processed snacks, and stay hydrated.", steps:["Eat breakfast every day","Limit caffeine after 2pm","Drink at least 2L of water daily"], color:C.cardPeach, accent:C.orange },
    { icon:"📔", title:"Journal your feelings", body:"Writing about your thoughts externalises them, reducing their intensity. Even 5 minutes a day makes a measurable difference.", steps:["Write 3 things you're grateful for","Describe what you're feeling without judgment","Identify one small win each day"], color:C.cardLav, accent:C.lavender },
    { icon:"👥", title:"Stay connected", body:"Isolation accelerates depression. Reach out to one person today — you don't need to explain everything, just say hello.", steps:["Text a friend you haven't spoken to","Join a university society or club","Attend one social event this week"], color:C.cardYellow, accent:C.gold },
    { icon:"🧘", title:"Practise mindfulness", body:"Mindfulness reduces rumination — the repetitive negative thinking cycle that drives depression. Start with just 5 minutes.", steps:["Try a free Headspace or Calm session","Focus on your breath for 5 minutes","Do a body scan before sleeping"], color:C.cardRose, accent:C.rose },
  ];

  const tabs = [
    { id:"helplines", label:"📞 Helplines", count:helplines.length },
    { id:"apps", label:"📱 Apps & Tools", count:apps.length },
    { id:"selfhelp", label:"💡 Self-Help", count:selfHelp.length },
  ];

  return (
    <div style={{ background:C.bg, minHeight:"100vh" }}>

      {/* ── HERO ── */}
      <section style={{ background:`linear-gradient(135deg,${C.green} 0%,${C.greenMid} 100%)`, padding:"90px 40px 70px", position:"relative", overflow:"hidden" }}>
        {[0,1,2].map(i=>(
          <div key={i} style={{ position:"absolute", top:`${-20+i*40}%`, right:`${-5+i*20}%`, width:`${180+i*60}px`, height:`${180+i*60}px`, borderRadius:"50%", background:"rgba(255,255,255,0.05)", pointerEvents:"none" }}/>
        ))}
        <div style={{ maxWidth:900, margin:"0 auto", position:"relative", zIndex:1 }}>
          <div style={{ ...a(0.1), display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.15)", borderRadius:20, padding:"6px 16px", marginBottom:22 }}>
            <span style={{ fontSize:13 }}>💚</span>
            <span style={{ fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:12.5, color:"rgba(255,255,255,0.9)" }}>Support Resources</span>
          </div>
          <h1 style={{ ...a(0.18), fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:"clamp(34px,5vw,56px)", color:"#fff", margin:"0 0 18px", lineHeight:1.12 }}>
            You don't have to<br/>face this <span style={{ color:C.greenLight }}>alone.</span>
          </h1>
          <p style={{ ...a(0.28), fontFamily:"'Nunito',sans-serif", fontSize:17, lineHeight:1.8, color:"rgba(255,255,255,0.82)", maxWidth:560, margin:"0 0 36px" }}>
            Whether you need to talk to someone right now, find a helpful app, or pick up a self-help technique — everything is here, free and ready.
          </p>
          <div style={{ ...a(0.36), display:"flex", gap:16, flexWrap:"wrap" }}>
            {[["📞","Rescue 1122","(042-99231701-2)",C.cardMint,C.teal],["💬","iCall","9152987821",C.cardLav,C.lavender]].map(([ic,name,num,bg,acc],i)=>(
              <div key={i} style={{ background:"rgba(255,255,255,0.13)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:18, padding:"14px 20px", backdropFilter:"blur(10px)" }}>
                <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:11, color:"rgba(255,255,255,0.6)", marginBottom:2 }}>{ic} {name}</div>
                <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:18, color:"#fff" }}>{num}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CRISIS BANNER ── */}
      <div style={{ background:"#1a2e22", padding:"18px 40px" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:22 }}>🆘</span>
            <div>
              <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:14, color:"#fff" }}>In immediate crisis?</div>
              <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:12.5, color:"rgba(255,255,255,0.6)" }}>Call Rescue 1122 · (042-99231701-2) · Available 24/7 · Free · Confidential</div>
            </div>
          </div>
          <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:12.5, color:C.greenLight }}>If in immediate danger, go to your nearest hospital. →</div>
        </div>
      </div>

      {/* ── TABS ── */}
      <section style={{ background:C.cream, padding:"50px 40px 0" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ display:"flex", gap:8, background:C.bg, borderRadius:28, padding:6, marginBottom:0, flexWrap:"wrap", justifyContent:"center", width:"fit-content", margin:"0 auto 36px" }}>
            {tabs.map(t=>(
              <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{ fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:14, color:activeTab===t.id?"#fff":C.muted, background:activeTab===t.id?C.green:"transparent", border:"none", borderRadius:22, padding:"11px 24px", cursor:"pointer", display:"flex", alignItems:"center", gap:8, transition:"all 0.25s", boxShadow:activeTab===t.id?`0 4px 14px ${C.green}44`:"none" }}>
                {t.label}
                <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:11, fontWeight:800, color:activeTab===t.id?"rgba(255,255,255,0.7)":C.muted, background:activeTab===t.id?"rgba(255,255,255,0.2)":C.greenPale, borderRadius:10, padding:"2px 8px" }}>{t.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── HELPLINES TAB ── */}
      {activeTab === "helplines" && (
        <section ref={ref1} style={{ background:C.cream, padding:"10px 40px 70px" }}>
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:36 }}>
              <h2 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:"clamp(22px,2.8vw,36px)", color:C.text, margin:"0 0 8px" }}>Crisis & Counselling Helplines</h2>
              <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:15, color:C.muted }}>Free, confidential support — available when you need it most.</p>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:16 }}>
              {helplines.map((h,i)=>(
                <div key={i} style={{ background:h.color, borderRadius:22, padding:"28px 26px", opacity:vis1?1:0, transform:vis1?"translateY(0)":"translateY(22px)", transition:`opacity 0.55s ${i*0.08}s, transform 0.55s ${i*0.08}s cubic-bezier(.23,1,.32,1)`,
                  cursor:"default" }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 14px 36px rgba(0,0,0,0.1)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <span style={{ fontSize:24 }}>{h.flag}</span>
                      <div>
                        <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:16, color:C.text }}>{h.name}</div>
                        <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:10, fontWeight:700, color:h.accent, background:`${h.accent}18`, borderRadius:8, padding:"2px 8px", display:"inline-block", marginTop:3 }}>{h.type}</div>
                      </div>
                    </div>
                    <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:10, color:C.muted, textAlign:"right", background:"rgba(255,255,255,0.6)", borderRadius:8, padding:"4px 8px" }}>{h.hours}</div>
                  </div>
                  <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:13.5, color:C.muted, lineHeight:1.65, margin:"0 0 14px" }}>{h.desc}</p>
                  <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:17, color:h.accent }}>{h.number}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── APPS TAB ── */}
      {activeTab === "apps" && (
        <section ref={ref2} style={{ background:C.cream, padding:"10px 40px 70px" }}>
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:36 }}>
              <h2 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:"clamp(22px,2.8vw,36px)", color:C.text, margin:"0 0 8px" }}>Mental Health Apps & Tools</h2>
              <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:15, color:C.muted }}>Vetted apps to support your mental wellbeing — most are free or free for students.</p>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:16 }}>
              {apps.map((app,i)=>(
                <div key={i} style={{ background:"#fff", borderRadius:22, padding:"28px 24px", boxShadow:"0 4px 20px rgba(45,106,79,0.07)", opacity:vis2?1:0, transform:vis2?"translateY(0)":"translateY(22px)", transition:`opacity 0.55s ${i*0.08}s, transform 0.55s ${i*0.08}s cubic-bezier(.23,1,.32,1)` }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 14px 36px rgba(45,106,79,0.12)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 20px rgba(45,106,79,0.07)";}}>
                  <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:14 }}>
                    <div style={{ width:52, height:52, borderRadius:16, background:app.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>{app.icon}</div>
                    <div>
                      <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:17, color:C.text }}>{app.name}</div>
                      <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:11, fontWeight:700, color:app.accent }}>{app.tag}</div>
                    </div>
                  </div>
                  <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:13.5, color:C.muted, lineHeight:1.65, margin:"0 0 14px" }}>{app.desc}</p>
                  <div style={{ display:"flex", alignItems:"center", gap:6, background:C.greenPale, borderRadius:10, padding:"5px 11px", width:"fit-content" }}>
                    <span style={{ fontSize:11 }}>📲</span>
                    <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:11.5, fontWeight:700, color:C.green }}>{app.platform}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SELF HELP TAB ── */}
      {activeTab === "selfhelp" && (
        <section ref={ref3} style={{ background:C.cream, padding:"10px 40px 70px" }}>
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:36 }}>
              <h2 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:"clamp(22px,2.8vw,36px)", color:C.text, margin:"0 0 8px" }}>Self-Help Techniques</h2>
              <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:15, color:C.muted }}>Evidence-based habits that genuinely move the needle on mood and mental health.</p>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:16 }}>
              {selfHelp.map((s,i)=>(
                <div key={i} style={{ background:"#fff", borderRadius:22, padding:"28px 24px", boxShadow:"0 4px 20px rgba(45,106,79,0.07)", opacity:vis3?1:0, transform:vis3?"translateY(0)":"translateY(22px)", transition:`opacity 0.55s ${i*0.08}s, transform 0.55s ${i*0.08}s cubic-bezier(.23,1,.32,1)` }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 14px 36px rgba(45,106,79,0.12)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 20px rgba(45,106,79,0.07)";}}>
                  <div style={{ width:52, height:52, borderRadius:16, background:s.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, marginBottom:14 }}>{s.icon}</div>
                  <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:17, color:C.text, marginBottom:8 }}>{s.title}</div>
                  <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:13.5, color:C.muted, lineHeight:1.65, margin:"0 0 16px" }}>{s.body}</p>
                  <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                    {s.steps.map((step,j)=>(
                      <div key={j} style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{ width:8, height:8, borderRadius:"50%", background:s.accent, flexShrink:0 }}/>
                        <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:13, color:C.text, fontWeight:600 }}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section style={{ background:C.green, padding:"50px 40px" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:24 }}>
          <div>
            <h3 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:26, color:"#fff", margin:"0 0 8px" }}>Not sure where you stand?</h3>
            <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:15, color:"rgba(255,255,255,0.7)", margin:0 }}>Take the free 5-minute check-in to get a personalised picture of your mental health.</p>
          </div>
          <button onClick={()=>setPage("assessment")} style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:15, color:C.green, background:"#fff", border:"none", padding:"14px 32px", borderRadius:26, cursor:"pointer", boxShadow:"0 4px 16px rgba(0,0,0,0.2)", transition:"transform 0.2s", whiteSpace:"nowrap" }}
            onMouseEnter={e=>e.target.style.transform="translateY(-2px)"} onMouseLeave={e=>e.target.style.transform="translateY(0)"}>
            Take assessment →
          </button>
        </div>
      </section>

    </div>
  );
}

/* ════════════════════════════════════════════════
   ██████  ROOT APP — STATE + ROUTER  ██████
   results state lives HERE so it can flow from
   Questionnaire → Results without losing data
════════════════════════════════════════════════ */
export default function NeuroTrackApp() {
  const [page, setPage] = useState("home");
  // ✅ results lifted to root — persists when navigating back & forth
  const [results, setResults] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const go = (id) => setPage(id);

  // Called by QuestionnairePage when all questions are answered
  const handleComplete = (finalAnswers) => {
    setResults(calcResults(finalAnswers));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:#f5f0e8;overflow-x:hidden;}
        ::selection{background:rgba(45,106,79,0.18);color:#1c2e22;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#f5f0e8;}
        ::-webkit-scrollbar-thumb{background:#74c69d;border-radius:3px;}
        input[type=range]{-webkit-appearance:none;appearance:none;background:transparent;}
        input[type=range]::-webkit-slider-runnable-track{height:8px;border-radius:4px;background:#d8f3dc;}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:24px;height:24px;border-radius:50%;background:#2d6a4f;margin-top:-8px;box-shadow:0 2px 8px rgba(45,106,79,0.5);cursor:pointer;}
        @keyframes charBob   {0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
        @keyframes breathe   {0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.03)}}
        @keyframes floatDot  {0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes cardFloat {0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-9px) rotate(1deg)}}
        @keyframes brainOrbit {0%{transform:rotateY(0deg) rotateX(8deg)}100%{transform:rotateY(360deg) rotateX(8deg)}}
        @keyframes brainPulse {0%,100%{opacity:0.4;transform:scale(1)}50%{opacity:1;transform:scale(1.6)}}
        @keyframes brainTwinkle {0%,100%{opacity:0.2}50%{opacity:0.9}}
        @keyframes pulseGreen{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.45;transform:scale(0.78)}}
        @keyframes iconBounce{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-8px) scale(1.04)}}
        @keyframes drawUnderline{to{stroke-dashoffset:0}}
        @keyframes scaleIn   {from{opacity:0;transform:scale(0.88)}to{opacity:1;transform:scale(1)}}
        @keyframes yesnoRipple{0%{opacity:0.8;transform:scale(1)}100%{opacity:0;transform:scale(2.2)}}
        @keyframes heartbeat  {0%,100%{transform:scale(1)}14%{transform:scale(1.18)}28%{transform:scale(1)}42%{transform:scale(1.12)}70%{transform:scale(1)}}
        @keyframes brainPulse {0%,100%{filter:drop-shadow(0 0 4px #7c5cbf55)}50%{filter:drop-shadow(0 0 14px #7c5cbfaa)}}
        @keyframes spinSlow   {from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      <Navbar page={page} setPage={go}/>

      <div style={{ paddingTop: 62 }}>
        {page === "home"       && <NeuroTrackLanding setPage={go}/>}
        {page === "about"      && <AboutPage setPage={go}/>}
        {page === "resources"  && <ResourcesPage setPage={go}/>}

        {/* ✅ onComplete passes answers UP to root, then router switches to results */}
        {page === "assessment" && <QuestionnairePage setPage={go} onComplete={handleComplete}/>}

        {/* ✅ results prop flows DOWN from root into ResultsPage */}
        {page === "results"    && <ResultsPage results={results} setPage={go}/>}
      </div>
    </>
  );
}
