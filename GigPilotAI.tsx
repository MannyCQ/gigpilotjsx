import { useState, useEffect, useCallback, useRef } from "react";

/* ============================================================
   GIGPILOT AI — Full SaaS Platform
   Stack: React TSX (single file), Anthropic API for AI features
   Auth: Email/Password + Google + Microsoft (UI flows)
   Features: Landing, Auth, Onboarding, Dashboard, Discover,
             Outreach Tracker, Venue DB, Account, Pricing
   ============================================================ */

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const G = `
@import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#07080f;--surface:#0e0f1a;--card:#141526;--card2:#1a1b2e;
  --border:#252640;--border2:#2f3055;
  --amber:#f5a623;--amber2:#ffc55a;--amberDim:rgba(245,166,35,.12);
  --teal:#00d4aa;--tealDim:rgba(0,212,170,.12);
  --rose:#ff5f7e;--roseDim:rgba(255,95,126,.12);
  --sky:#4da6ff;--skyDim:rgba(77,166,255,.12);
  --text:#eeeef5;--text2:#a0a0c0;--text3:#606080;
  --font-d:'Cabinet Grotesk',sans-serif;
  --font-b:'Instrument Sans',sans-serif;
  --r:12px;--r2:18px;
}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:var(--font-b);font-size:14px;line-height:1.6;overflow-x:hidden}
h1,h2,h3,h4,h5,h6{font-family:var(--font-d);line-height:1.1}
a{color:inherit;text-decoration:none}
button{cursor:pointer;font-family:var(--font-b)}
input,textarea,select{font-family:var(--font-b)}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--border2);border-radius:3px}

/* Buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:10px 20px;border-radius:var(--r);font-family:var(--font-d);font-size:14px;font-weight:700;border:none;transition:all .18s;white-space:nowrap}
.btn-amber{background:var(--amber);color:#07080f}
.btn-amber:hover{background:var(--amber2);transform:translateY(-1px);box-shadow:0 8px 28px rgba(245,166,35,.35)}
.btn-outline{background:transparent;color:var(--text);border:1px solid var(--border2)}
.btn-outline:hover{border-color:var(--amber);color:var(--amber)}
.btn-ghost{background:transparent;color:var(--text2);padding:8px 14px}
.btn-ghost:hover{color:var(--text);background:rgba(255,255,255,.05)}
.btn-teal{background:var(--teal);color:#07080f}
.btn-teal:hover{filter:brightness(1.1);transform:translateY(-1px)}
.btn-danger{background:var(--roseDim);color:var(--rose);border:1px solid rgba(255,95,126,.25)}
.btn-danger:hover{background:rgba(255,95,126,.2)}
.btn-sm{padding:7px 14px;font-size:13px}
.btn-lg{padding:14px 32px;font-size:16px}
.btn-block{width:100%}
.btn:disabled{opacity:.4;cursor:not-allowed;transform:none!important}

/* Inputs */
.field{display:flex;flex-direction:column;gap:6px}
.label{font-size:12px;font-weight:600;color:var(--text2);text-transform:uppercase;letter-spacing:.07em;font-family:var(--font-d)}
.inp{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:11px 14px;color:var(--text);font-size:14px;outline:none;transition:border-color .18s;width:100%}
.inp:focus{border-color:var(--amber)}
.inp::placeholder{color:var(--text3)}
textarea.inp{resize:vertical;min-height:88px}
select.inp{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23606080' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center}

/* Cards */
.card{background:var(--card);border:1px solid var(--border);border-radius:var(--r2);padding:24px}
.card2{background:var(--card2);border:1px solid var(--border);border-radius:var(--r);padding:18px}

/* Badges */
.badge{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:99px;font-size:11px;font-weight:700;font-family:var(--font-d);letter-spacing:.05em;text-transform:uppercase}
.b-amber{background:var(--amberDim);color:var(--amber)}
.b-teal{background:var(--tealDim);color:var(--teal)}
.b-rose{background:var(--roseDim);color:var(--rose)}
.b-sky{background:var(--skyDim);color:var(--sky)}
.b-dim{background:rgba(255,255,255,.06);color:var(--text2)}
.tag{display:inline-block;background:rgba(255,255,255,.06);color:var(--text2);border-radius:6px;padding:2px 9px;font-size:12px;margin:2px}

/* Layout */
.app-shell{display:flex;min-height:100vh}
.sidebar{width:228px;flex-shrink:0;background:var(--surface);border-right:1px solid var(--border);display:flex;flex-direction:column;padding:0;position:sticky;top:0;height:100vh;overflow-y:auto}
.main{flex:1;overflow-y:auto;min-height:100vh}
.page{padding:36px 40px;max-width:1100px}

/* Nav */
.nav-logo{padding:24px 20px 20px;font-family:var(--font-d);font-size:21px;font-weight:900;letter-spacing:-.03em}
.nav-logo em{color:var(--amber);font-style:normal}
.nav-logo small{display:block;font-size:11px;font-weight:500;color:var(--text3);letter-spacing:.04em;margin-top:2px;font-family:var(--font-b)}
.nav-section{padding:8px 12px 4px;font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;font-family:var(--font-d)}
.nav-item{display:flex;align-items:center;gap:10px;padding:10px 16px;color:var(--text2);border-radius:var(--r);margin:1px 8px;font-size:14px;font-weight:500;border:none;background:none;width:calc(100% - 16px);text-align:left;transition:all .15s;font-family:var(--font-b)}
.nav-item:hover{color:var(--text);background:rgba(255,255,255,.05)}
.nav-item.active{color:var(--amber);background:var(--amberDim);font-weight:600}
.nav-item .ni{font-size:16px;width:22px;text-align:center;flex-shrink:0}
.nav-divider{border:none;border-top:1px solid var(--border);margin:10px 16px}

/* Page headers */
.ph{margin-bottom:28px}
.ph h1{font-size:28px;font-weight:900;letter-spacing:-.02em;margin-bottom:4px}
.ph p{color:var(--text2);font-size:14px}

/* Grid */
.g2{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}

/* Stat cards */
.stat{background:var(--card);border:1px solid var(--border);border-radius:var(--r2);padding:20px 22px}
.stat-n{font-family:var(--font-d);font-size:34px;font-weight:900;line-height:1}
.stat-l{color:var(--text2);font-size:13px;margin-top:5px}
.stat-d{font-size:12px;margin-top:8px;color:var(--text3)}

/* Venue cards */
.vcard{background:var(--card);border:1px solid var(--border);border-radius:var(--r2);padding:20px;display:flex;gap:16px;align-items:flex-start;transition:border-color .18s,transform .15s}
.vcard:hover{border-color:rgba(245,166,35,.4);transform:translateY(-2px)}
.score-ring{width:54px;height:54px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-d);font-weight:900;font-size:16px;flex-shrink:0}

/* Modals */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px}
.modal{background:var(--card);border:1px solid var(--border2);border-radius:var(--r2);width:100%;max-width:520px;max-height:92vh;overflow-y:auto;padding:32px;position:relative}
.modal-x{position:absolute;top:16px;right:16px;background:var(--border);border:none;color:var(--text2);border-radius:8px;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-size:17px;cursor:pointer}
.modal-x:hover{color:var(--text)}

/* Toast */
.toast{position:fixed;bottom:28px;right:28px;background:var(--card2);border:1px solid var(--teal);border-radius:12px;padding:14px 20px;font-size:14px;z-index:2000;display:flex;align-items:center;gap:10px;box-shadow:0 12px 40px rgba(0,0,0,.5);animation:toastIn .3s ease}
@keyframes toastIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.toast-err{border-color:var(--rose)}

/* Animations */
.fade{animation:fade .35s ease}
@keyframes fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.shimmer{background:linear-gradient(90deg,var(--card) 25%,var(--border) 50%,var(--card) 75%);background-size:200% 100%;animation:shim 1.5s infinite;border-radius:8px}
@keyframes shim{0%{background-position:200% 0}100%{background-position:-200% 0}}

/* Progress */
.pbar{height:5px;background:var(--border);border-radius:3px;overflow:hidden}
.pfill{height:100%;background:var(--amber);border-radius:3px;transition:width .4s ease}

/* Steps */
.step-dots{display:flex;gap:6px;margin-bottom:32px}
.step-dot{height:4px;border-radius:2px;background:var(--border);transition:all .3s}
.step-dot.done{background:var(--teal)}
.step-dot.active{background:var(--amber);flex:2}

/* Table */
.tbl{width:100%;border-collapse:collapse}
.tbl th{padding:12px 18px;text-align:left;color:var(--text3);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;font-family:var(--font-d);border-bottom:1px solid var(--border)}
.tbl td{padding:14px 18px;border-bottom:1px solid var(--border);font-size:14px}
.tbl tr:last-child td{border-bottom:none}
.tbl tr:hover td{background:rgba(255,255,255,.02)}

/* Divider */
hr.div{border:none;border-top:1px solid var(--border);margin:20px 0}

/* Upgrade banner */
.up-banner{background:linear-gradient(135deg,rgba(245,166,35,.1),rgba(0,212,170,.07));border:1px solid rgba(245,166,35,.28);border-radius:var(--r2);padding:18px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:26px}

/* Social auth buttons */
.social-btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:11px;border-radius:var(--r);border:1px solid var(--border2);background:var(--surface);color:var(--text);font-size:14px;font-weight:500;cursor:pointer;transition:all .15s;font-family:var(--font-b)}
.social-btn:hover{border-color:var(--border2);background:var(--card2)}

/* Landing specific */
.lnoise{position:fixed;inset:0;pointer-events:none;opacity:.03;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:200px}
.lgrid{position:absolute;inset:0;background-image:linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px);background-size:64px 64px;opacity:.25;mask-image:radial-gradient(ellipse 90% 70% at 50% 0%,black 30%,transparent 100%)}
.lglow{position:absolute;width:900px;height:600px;background:radial-gradient(ellipse,rgba(245,166,35,.1) 0%,transparent 65%);left:50%;top:-200px;transform:translateX(-50%);pointer-events:none}
.lglow2{position:absolute;width:500px;height:500px;background:radial-gradient(ellipse,rgba(0,212,170,.06) 0%,transparent 70%);right:-100px;top:30%;pointer-events:none}

@media(max-width:768px){
  .sidebar{display:none}
  .page{padding:20px 16px}
  .g2,.g3,.g4{grid-template-columns:1fr}
  .ph h1{font-size:22px}
}
`;

// ─── MOCK DATA ─────────────────────────────────────────────────────────────────
const VENUES_DB = [
  // Los Angeles
  {id:1,name:"The Troubadour",city:"Los Angeles",state:"CA",capacity:400,genres:["indie","folk","singer-songwriter","acoustic","alternative"],website:"troubadour.com",email:"booking@troubadour.com"},
  {id:2,name:"Hotel Cafe",city:"Los Angeles",state:"CA",capacity:200,genres:["acoustic","indie","alternative","folk","pop"],website:"hotelcafe.com",email:"info@hotelcafe.com"},
  {id:3,name:"The Mint",city:"Los Angeles",state:"CA",capacity:150,genres:["blues","indie","roots","folk","jazz"],website:"themintla.com",email:"booking@themintla.com"},
  {id:4,name:"Silverlake Lounge",city:"Los Angeles",state:"CA",capacity:120,genres:["indie","alternative","experimental","post-rock"],website:"silverlakelounge.com",email:"book@silverlakelounge.com"},
  {id:5,name:"The Echo",city:"Los Angeles",state:"CA",capacity:350,genres:["indie rock","alternative","electronic","post-punk"],website:"theecho.com",email:"talent@theecho.com"},
  {id:6,name:"Teragram Ballroom",city:"Los Angeles",state:"CA",capacity:600,genres:["indie","alternative","electronic","hip-hop"],website:"teragramballroom.com",email:"talent@teragramballroom.com"},
  {id:7,name:"Zebulon",city:"Los Angeles",state:"CA",capacity:200,genres:["jazz","experimental","electronic","world","indie"],website:"zebulonla.com",email:"book@zebulonla.com"},
  {id:8,name:"The Roxy",city:"Los Angeles",state:"CA",capacity:500,genres:["rock","indie","pop","alternative"],website:"theroxy.com",email:"booking@theroxy.com"},
  // San Francisco
  {id:9,name:"Bottom of the Hill",city:"San Francisco",state:"CA",capacity:350,genres:["indie","punk","folk","alternative","garage rock"],website:"bottomofthehill.com",email:"booking@bottomofthehill.com"},
  {id:10,name:"The Independent",city:"San Francisco",state:"CA",capacity:500,genres:["indie","alternative","folk rock","electronic"],website:"theindependentsf.com",email:"info@theindependentsf.com"},
  {id:11,name:"Cafe Du Nord",city:"San Francisco",state:"CA",capacity:300,genres:["indie","folk","americana","singer-songwriter"],website:"cafedunord.com",email:"bookings@cafedunord.com"},
  {id:12,name:"The Chapel",city:"San Francisco",state:"CA",capacity:500,genres:["indie","rock","folk","americana","alternative"],website:"thechapelsf.com",email:"events@thechapelsf.com"},
  // New York
  {id:13,name:"Bowery Ballroom",city:"New York",state:"NY",capacity:575,genres:["indie","rock","alternative","pop","folk"],website:"boweryballroom.com",email:"booking@boweryballroom.com"},
  {id:14,name:"Mercury Lounge",city:"New York",state:"NY",capacity:250,genres:["indie","alternative","rock","folk","pop"],website:"mercuryloungenyc.com",email:"booking@mercuryloungenyc.com"},
  {id:15,name:"Baby's All Right",city:"New York",state:"NY",capacity:300,genres:["indie","electronic","r&b","pop","experimental"],website:"babysallright.com",email:"bookings@babysallright.com"},
  {id:16,name:"Rough Trade NYC",city:"New York",state:"NY",capacity:250,genres:["indie","rock","electronic","experimental","folk"],website:"roughtradenyc.com",email:"events@roughtradenyc.com"},
  {id:17,name:"Joe's Pub",city:"New York",state:"NY",capacity:185,genres:["cabaret","jazz","indie","folk","singer-songwriter","world"],website:"publictheater.org",email:"joespub@publictheater.org"},
  // Chicago
  {id:18,name:"Schubas Tavern",city:"Chicago",state:"IL",capacity:200,genres:["indie","folk","americana","alt-country","singer-songwriter"],website:"schubas.com",email:"booking@schubas.com"},
  {id:19,name:"Empty Bottle",city:"Chicago",state:"IL",capacity:400,genres:["indie","rock","experimental","punk","electronic"],website:"emptybottle.com",email:"booking@emptybottle.com"},
  {id:20,name:"Lincoln Hall",city:"Chicago",state:"IL",capacity:500,genres:["indie","alternative","folk","rock","pop"],website:"lincolnhallchicago.com",email:"info@lincolnhallchicago.com"},
  // Nashville
  {id:21,name:"The Bluebird Cafe",city:"Nashville",state:"TN",capacity:90,genres:["country","folk","americana","singer-songwriter","acoustic"],website:"bluebirdcafe.com",email:"booking@bluebirdcafe.com"},
  {id:22,name:"The Basement",city:"Nashville",state:"TN",capacity:150,genres:["indie","folk","americana","rock","alternative"],website:"thebasementnashville.com",email:"booking@thebasementnashville.com"},
  {id:23,name:"3rd & Lindsley",city:"Nashville",state:"TN",capacity:300,genres:["blues","americana","rock","country","roots"],website:"3rdandlindsley.com",email:"info@3rdandlindsley.com"},
  // Austin
  {id:24,name:"Stubb's Waller Creek",city:"Austin",state:"TX",capacity:2500,genres:["rock","indie","country","blues","folk"],website:"stubbsaustin.com",email:"booking@stubbsaustin.com"},
  {id:25,name:"Continental Club",city:"Austin",state:"TX",capacity:200,genres:["blues","americana","roots","country","swing"],website:"continentalclub.com",email:"booking@continentalclub.com"},
  {id:26,name:"Hole in the Wall",city:"Austin",state:"TX",capacity:150,genres:["indie","country","folk","alternative","punk"],website:"holeinthewallaustin.com",email:"book@holeinthewallaustin.com"},
  // Seattle
  {id:27,name:"Tractor Tavern",city:"Seattle",state:"WA",capacity:300,genres:["folk","americana","country","indie","roots"],website:"tractortavern.com",email:"booking@tractortavern.com"},
  {id:28,name:"Neumos",city:"Seattle",state:"WA",capacity:650,genres:["indie","rock","electronic","alternative","pop"],website:"neumos.com",email:"booking@neumos.com"},
  // Portland
  {id:29,name:"Doug Fir Lounge",city:"Portland",state:"OR",capacity:300,genres:["indie","folk","alternative","singer-songwriter","experimental"],website:"dougfirlounge.com",email:"booking@dougfirlounge.com"},
  {id:30,name:"Mississippi Studios",city:"Portland",state:"OR",capacity:250,genres:["indie","folk","americana","roots","rock"],website:"mississippistudios.com",email:"booking@mississippistudios.com"},
];

const SAMPLE_OUTREACH = [
  {id:1,venueId:1,venue:"The Troubadour",city:"Los Angeles",date:"2024-03-15",status:"replied",subject:"Booking inquiry – Alex Rivera (Indie Folk, LA)",notes:"They have a slot in April. Following up."},
  {id:2,venueId:2,venue:"Hotel Cafe",city:"Los Angeles",date:"2024-03-12",status:"sent",subject:"Booking inquiry – Alex Rivera",notes:""},
  {id:3,venueId:3,venue:"The Mint",city:"Los Angeles",date:"2024-03-10",status:"sent",subject:"Performance inquiry from Alex Rivera",notes:""},
  {id:4,venueId:9,venue:"Bottom of the Hill",city:"San Francisco",date:"2024-03-08",status:"no_response",subject:"Booking inquiry – Alex Rivera (LA-based Indie Folk)",notes:"Follow up after 2 weeks"},
  {id:5,venueId:4,venue:"Silverlake Lounge",city:"Los Angeles",date:"2024-03-05",status:"replied",subject:"Show inquiry – Alex Rivera",notes:"Booked for March 28!"},
];

// ─── HELPERS ───────────────────────────────────────────────────────────────────
const scoreColor = s => s>=85?{bg:"rgba(0,212,170,.18)",c:"#00d4aa"}:s>=70?{bg:"rgba(245,166,35,.18)",c:"#f5a623"}:{bg:"rgba(255,95,126,.18)",c:"#ff5f7e"};
const fmtDate = d => new Date(d).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
const StatusBadge = ({s}) => s==="replied"?<span className="badge b-teal">✓ Replied</span>:s==="sent"?<span className="badge b-sky">→ Sent</span>:<span className="badge b-dim">— No response</span>;

// Smart venue matching
function matchVenues(profile, allVenues) {
  const city = (profile.city||"").toLowerCase();
  const genre = (profile.genre||"").toLowerCase();
  const similar = (profile.similarArtists||"").toLowerCase();

  return allVenues.map(v => {
    let score = 0;
    const vCity = v.city.toLowerCase();
    const vGenres = v.genres.map(g=>g.toLowerCase());

    // Location scoring
    if (vCity === city || city.includes(vCity) || vCity.includes(city.split(",")[0])) score += 40;
    else if (v.state && city.includes(v.state.toLowerCase())) score += 20;
    else score += 5;

    // Genre scoring
    const genreWords = genre.split(/[\s,]+/);
    let genreHits = 0;
    genreWords.forEach(gw => { if(vGenres.some(vg=>vg.includes(gw)||gw.includes(vg))) genreHits++; });
    score += Math.min(40, genreHits * 15);

    // Similar artists genre inference bonus
    const simWords = similar.split(/[\s,]+/);
    simWords.forEach(sw => { if(vGenres.some(vg=>vg.includes(sw.slice(0,4)))) score += 5; });

    // Capacity bonus for emerging artists
    if (v.capacity && v.capacity <= 300) score += 8;
    else if (v.capacity && v.capacity <= 600) score += 4;

    score = Math.min(99, Math.max(20, score + Math.floor(Math.random()*8)));

    const locMatch = vCity===city||city.includes(vCity)?"same city":v.state&&city.includes(v.state.toLowerCase())?"same state":"different region";
    const genreMatch = genreHits>=2?"high":genreHits>=1?"medium":"low";
    const reason = genreMatch==="high"&&locMatch==="same city"
      ? `Strong genre alignment and local venue — ideal first booking target.`
      : genreMatch==="high"
      ? `Great genre fit for your sound, worth targeting even outside your city.`
      : locMatch==="same city"
      ? `Local venue that books a range of genres — your sound could fit their roster.`
      : `Broader reach opportunity — good for expanding beyond your home city.`;

    return {...v, score, locMatch, genreMatch, reason};
  }).sort((a,b) => b.score - a.score);
}

// ─── ANTHROPIC API CALL ────────────────────────────────────────────────────────
async function callAI(system, user) {
  const KEY = "REPLACE_WITH_YOUR_ANTHROPIC_API_KEY";
  if (KEY.startsWith("REPLACE")) { await new Promise(r=>setTimeout(r,1600)); return null; }
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages",{
      method:"POST",
      headers:{"Content-Type":"application/json","x-api-key":KEY,"anthropic-version":"2023-06-01"},
      body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system,messages:[{role:"user",content:user}]})
    });
    const d = await r.json();
    return d.content?.[0]?.text||null;
  } catch { return null; }
}

// ─── TOAST ─────────────────────────────────────────────────────────────────────
function Toast({msg,type,onClose}) {
  useEffect(()=>{const t=setTimeout(onClose,3800);return()=>clearTimeout(t)},[]);
  return <div className={`toast ${type==="err"?"toast-err":""}`}><span style={{color:type==="err"?"var(--rose)":"var(--teal)"}}>●</span>{msg}</div>;
}

// ─── LANDING ───────────────────────────────────────────────────────────────────
function Landing({onSignup,onLogin}) {
  const [typed,setTyped]=useState("");
  useEffect(()=>{
    const phrases=["find more gigs.","book the right venues.","automate outreach.","grow your fanbase.","spend less time emailing."];
    let ci=0,li=0,del=false;
    const tick=()=>{
      const p=phrases[ci];
      if(!del){setTyped(p.slice(0,li+1));li++;if(li===p.length){del=true;setTimeout(tick,1800);return;}}
      else{setTyped(p.slice(0,li-1));li--;if(li===0){del=false;ci=(ci+1)%phrases.length;}}
      setTimeout(tick,del?38:75);
    };
    const t=setTimeout(tick,600);return()=>clearTimeout(t);
  },[]);

  return (
    <div style={{minHeight:"100vh",background:"var(--bg)",position:"relative",overflowX:"hidden"}}>
      <div className="lnoise"/>
      <div className="lgrid"/>
      <div className="lglow"/>
      <div className="lglow2"/>

      {/* NAV */}
      <nav style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px 40px",position:"relative",zIndex:10,borderBottom:"1px solid var(--border)"}}>
        <div className="nav-logo" style={{padding:0}}>Gig<em>Pilot</em> <span style={{color:"var(--text2)",fontSize:16,fontWeight:500}}>AI</span></div>
        <div style={{display:"flex",gap:10}}>
          <button className="btn btn-ghost" onClick={onLogin}>Log in</button>
          <button className="btn btn-amber" onClick={onSignup}>Get started free</button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{minHeight:"88vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"60px 24px 40px",position:"relative",zIndex:10}}>
        <div className="badge b-amber" style={{marginBottom:22,fontSize:12}}>🎵 AI-powered booking assistant for musicians</div>
        <h1 style={{fontSize:"clamp(40px,7vw,82px)",fontWeight:900,letterSpacing:"-.04em",maxWidth:860,marginBottom:20,lineHeight:1.05}}>
          Let AI help you<br/>
          <span style={{color:"var(--amber)"}}>{typed}</span>
          <span style={{color:"var(--amber)",animation:"blink 1s infinite",display:"inline-block",marginLeft:2}}>|</span>
        </h1>
        <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
        <p style={{color:"var(--text2)",fontSize:"clamp(16px,2vw,20px)",maxWidth:560,marginBottom:44,lineHeight:1.7}}>
          GigPilot AI matches you with the right venues, generates personalized booking emails, and tracks every conversation — so you can focus on the music.
        </p>
        <div style={{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center",marginBottom:16}}>
          <button className="btn btn-amber btn-lg" onClick={onSignup}>Start for free →</button>
          <button className="btn btn-outline btn-lg" onClick={onLogin}>Sign in</button>
        </div>
        <p style={{color:"var(--text3)",fontSize:13}}>No credit card required · Free plan available · 2 min setup</p>

        {/* Feature pills */}
        <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center",marginTop:48}}>
          {["🎯 AI venue matching","✉️ Auto-written emails","📊 Outreach tracking","🔒 Free & paid tiers","🗺️ 30+ city venue database"].map(f=>(
            <div key={f} style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:99,padding:"8px 18px",fontSize:13,color:"var(--text2)"}}>{f}</div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section style={{padding:"80px 40px",borderTop:"1px solid var(--border)",position:"relative",zIndex:10}}>
        <h2 style={{textAlign:"center",fontSize:"clamp(28px,4vw,42px)",fontWeight:900,marginBottom:10,letterSpacing:"-.02em"}}>From profile to booked — in minutes</h2>
        <p style={{textAlign:"center",color:"var(--text2)",marginBottom:52,fontSize:16}}>Three steps is all it takes</p>
        <div className="g3" style={{maxWidth:960,margin:"0 auto",gap:24}}>
          {[
            {n:"01",icon:"🎸",t:"Create your artist profile",d:"Tell GigPilot your genre, location, influences, and music links. Takes 2 minutes."},
            {n:"02",icon:"🎯",t:"Discover matched venues",d:"Our AI scores every venue in your city and nearby areas against your sound and style."},
            {n:"03",icon:"✉️",t:"Send AI-written emails",d:"One click generates a personalized booking email. Review, edit, and send from the dashboard."},
          ].map(s=>(
            <div key={s.n} className="card" style={{position:"relative",overflow:"hidden"}}>
              <div style={{fontSize:11,fontFamily:"var(--font-d)",fontWeight:900,color:"var(--amber)",letterSpacing:".1em",marginBottom:14}}>{s.n}</div>
              <div style={{fontSize:32,marginBottom:14}}>{s.icon}</div>
              <h3 style={{fontSize:18,fontWeight:800,marginBottom:8}}>{s.t}</h3>
              <p style={{color:"var(--text2)",fontSize:14,lineHeight:1.6}}>{s.d}</p>
              <div style={{position:"absolute",bottom:-20,right:-20,fontSize:80,opacity:.04,lineHeight:1}}>{s.icon}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{padding:"80px 40px",borderTop:"1px solid var(--border)",position:"relative",zIndex:10}}>
        <h2 style={{textAlign:"center",fontSize:"clamp(28px,4vw,42px)",fontWeight:900,marginBottom:10,letterSpacing:"-.02em"}}>Simple, honest pricing</h2>
        <p style={{textAlign:"center",color:"var(--text2)",marginBottom:52,fontSize:16}}>Start free. Upgrade when you're ready to grow.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:20,maxWidth:860,margin:"0 auto"}}>
          {[
            {name:"Free",price:"$0",sub:"Forever free",perks:["5 venue matches / month","3 outreach emails / month","Artist profile","Basic dashboard"],cta:"Get started",pri:false,plan:"free"},
            {name:"Artist",price:"$19",sub:"per month",perks:["Unlimited venue matches","50 outreach emails / month","Full outreach tracking","AI email generation","Priority support"],cta:"Start Artist plan",pri:true,plan:"artist"},
            {name:"Pro",price:"$49",sub:"per month",perks:["Everything in Artist","Unlimited outreach emails","Advanced analytics","Multi-city targeting","Early access features"],cta:"Go Pro",pri:false,plan:"pro"},
          ].map(p=>(
            <div key={p.name} className="card" style={{border:p.pri?"1px solid var(--amber)":"",position:"relative"}}>
              {p.pri&&<div className="badge b-amber" style={{position:"absolute",top:-13,left:"50%",transform:"translateX(-50%)",whiteSpace:"nowrap"}}>Most popular</div>}
              <div style={{fontFamily:"var(--font-d)",fontWeight:800,fontSize:19,marginBottom:4}}>{p.name}</div>
              <div style={{display:"flex",alignItems:"baseline",gap:4,marginBottom:4}}>
                <span style={{fontFamily:"var(--font-d)",fontSize:38,fontWeight:900,color:p.pri?"var(--amber)":"var(--text)"}}>{p.price}</span>
                <span style={{color:"var(--text3)",fontSize:13}}>{p.sub}</span>
              </div>
              <hr className="div"/>
              <ul style={{listStyle:"none",marginBottom:24,display:"flex",flexDirection:"column",gap:8}}>
                {p.perks.map(k=><li key={k} style={{display:"flex",gap:8,color:"var(--text2)",fontSize:13}}><span style={{color:"var(--teal)",flexShrink:0}}>✓</span>{k}</li>)}
              </ul>
              <button className={`btn btn-block ${p.pri?"btn-amber":"btn-outline"}`} onClick={onSignup}>{p.cta}</button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:"1px solid var(--border)",padding:"32px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",color:"var(--text3)",fontSize:13,position:"relative",zIndex:10,flexWrap:"wrap",gap:12}}>
        <div className="nav-logo" style={{padding:0,fontSize:16}}>Gig<em>Pilot</em> AI</div>
        <div>© 2024 GigPilot AI. Built for independent musicians.</div>
      </footer>
    </div>
  );
}

// ─── AUTH ──────────────────────────────────────────────────────────────────────
function Auth({initMode,onClose,onAuth}) {
  const [mode,setMode]=useState(initMode||"signup");
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [name,setName]=useState("");
  const [err,setErr]=useState("");

  const submit=()=>{
    if(!email){setErr("Email is required");return;}
    if(!pass||pass.length<6){setErr("Password must be at least 6 characters");return;}
    if(mode==="signup"&&!name){setErr("Please enter your name");return;}
    onAuth({email,name:name||email.split("@")[0],provider:"email"});
  };

  const socialAuth=(provider)=>{
    onAuth({email:`user@${provider}.com`,name:provider==="google"?"Google User":"Microsoft User",provider});
  };

  return (
    <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal fade" style={{maxWidth:440}}>
        <button className="modal-x" onClick={onClose}>×</button>
        <div style={{fontFamily:"var(--font-d)",fontSize:24,fontWeight:900,marginBottom:4}}>
          {mode==="signup"?"Create your account":"Welcome back"}
        </div>
        <p style={{color:"var(--text2)",fontSize:14,marginBottom:28}}>
          {mode==="signup"?"Start booking gigs with AI — free forever":"Sign in to your GigPilot dashboard"}
        </p>

        {/* Social auth */}
        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
          <button className="social-btn" onClick={()=>socialAuth("google")}>
            <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/></svg>
            Continue with Google
          </button>
          <button className="social-btn" onClick={()=>socialAuth("microsoft")}>
            <svg width="18" height="18" viewBox="0 0 18 18"><rect x="0" y="0" width="8.5" height="8.5" fill="#f25022"/><rect x="9.5" y="0" width="8.5" height="8.5" fill="#7fba00"/><rect x="0" y="9.5" width="8.5" height="8.5" fill="#00a4ef"/><rect x="9.5" y="9.5" width="8.5" height="8.5" fill="#ffb900"/></svg>
            Continue with Microsoft
          </button>
        </div>

        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
          <hr className="div" style={{flex:1,margin:0}}/><span style={{color:"var(--text3)",fontSize:12,whiteSpace:"nowrap"}}>or continue with email</span><hr className="div" style={{flex:1,margin:0}}/>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {mode==="signup"&&<div className="field"><label className="label">Full name</label><input className="inp" placeholder="Alex Rivera" value={name} onChange={e=>{setName(e.target.value);setErr("")}}/></div>}
          <div className="field"><label className="label">Email address</label><input className="inp" type="email" placeholder="alex@example.com" value={email} onChange={e=>{setEmail(e.target.value);setErr("")}}/></div>
          <div className="field"><label className="label">Password</label><input className="inp" type="password" placeholder="••••••••" value={pass} onChange={e=>{setPass(e.target.value);setErr("")}} onKeyDown={e=>e.key==="Enter"&&submit()}/></div>
          {err&&<div style={{background:"var(--roseDim)",border:"1px solid rgba(255,95,126,.3)",borderRadius:8,padding:"10px 14px",color:"var(--rose)",fontSize:13}}>{err}</div>}
          <button className="btn btn-amber btn-block" style={{padding:13,fontSize:15}} onClick={submit}>
            {mode==="signup"?"Create free account →":"Sign in →"}
          </button>
        </div>

        <hr className="div"/>
        <p style={{textAlign:"center",color:"var(--text2)",fontSize:13}}>
          {mode==="signup"?"Already have an account? ":"Don't have an account? "}
          <span style={{color:"var(--amber)",cursor:"pointer",fontWeight:600}} onClick={()=>{setMode(mode==="signup"?"login":"signup");setErr("")}}>
            {mode==="signup"?"Sign in":"Sign up free"}
          </span>
        </p>
      </div>
    </div>
  );
}

// ─── ONBOARDING ────────────────────────────────────────────────────────────────
function Onboarding({user,onComplete}) {
  const [step,setStep]=useState(0);
  const [p,setP]=useState({artistName:user.name||"",city:"",genre:"",spotify:"",soundcloud:"",instagram:"",twitter:"",bio:"",similarArtists:""});
  const up=(k,v)=>setP(x=>({...x,[k]:v}));

  const steps=[
    {title:"What's your artist name?",sub:"This is how you'll appear to venues in outreach emails.",
      body:<div style={{display:"flex",flexDirection:"column",gap:16}}>
        <div className="field"><label className="label">Artist / Band name *</label><input className="inp" placeholder="e.g. Alex Rivera" value={p.artistName} onChange={e=>up("artistName",e.target.value)}/></div>
        <div className="field"><label className="label">Your city *</label><input className="inp" placeholder="e.g. Los Angeles, CA" value={p.city} onChange={e=>up("city",e.target.value)}/></div>
      </div>,
      ok:()=>p.artistName&&p.city},

    {title:"What's your genre & sound?",sub:"Help the AI understand your music so it can find the best venue matches.",
      body:<div style={{display:"flex",flexDirection:"column",gap:16}}>
        <div className="field"><label className="label">Primary genre *</label><input className="inp" placeholder="e.g. Indie Folk, Alternative R&B, Jazz..." value={p.genre} onChange={e=>up("genre",e.target.value)}/></div>
        <div className="field"><label className="label">Similar artists <span style={{color:"var(--text3)",fontWeight:400,textTransform:"none",letterSpacing:0}}>(helps AI positioning)</span></label><input className="inp" placeholder="e.g. Phoebe Bridgers, Bon Iver, Iron & Wine" value={p.similarArtists} onChange={e=>up("similarArtists",e.target.value)}/></div>
        <div className="field"><label className="label">Short bio</label><textarea className="inp" placeholder="Describe your music and vibe in a sentence or two..." value={p.bio} onChange={e=>up("bio",e.target.value)}/></div>
      </div>,
      ok:()=>p.genre},

    {title:"Add your music links",sub:"These will be included in your outreach emails automatically.",
      body:<div style={{display:"flex",flexDirection:"column",gap:16}}>
        <div className="field"><label className="label">Spotify</label><input className="inp" placeholder="https://open.spotify.com/artist/..." value={p.spotify} onChange={e=>up("spotify",e.target.value)}/></div>
        <div className="field"><label className="label">SoundCloud</label><input className="inp" placeholder="https://soundcloud.com/..." value={p.soundcloud} onChange={e=>up("soundcloud",e.target.value)}/></div>
        <div className="field"><label className="label">Instagram</label><input className="inp" placeholder="https://instagram.com/..." value={p.instagram} onChange={e=>up("instagram",e.target.value)}/></div>
        <div className="field"><label className="label">Twitter / X</label><input className="inp" placeholder="https://twitter.com/..." value={p.twitter} onChange={e=>up("twitter",e.target.value)}/></div>
      </div>,
      ok:()=>true},
  ];

  const cur=steps[step];
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{width:"100%",maxWidth:560}} className="fade">
        <div style={{fontFamily:"var(--font-d)",fontSize:12,color:"var(--amber)",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",marginBottom:10}}>
          Step {step+1} of {steps.length}
        </div>
        <h1 style={{fontSize:28,fontWeight:900,marginBottom:6,letterSpacing:"-.02em"}}>{cur.title}</h1>
        <p style={{color:"var(--text2)",marginBottom:28,fontSize:14}}>{cur.sub}</p>
        <div className="step-dots">
          {steps.map((_,i)=><div key={i} className={`step-dot ${i<step?"done":i===step?"active":""}`} style={{flex:i===step?2:1}}/>)}
        </div>
        {cur.body}
        <div style={{display:"flex",justifyContent:"space-between",marginTop:28}}>
          {step>0?<button className="btn btn-outline" onClick={()=>setStep(s=>s-1)}>← Back</button>:<div/>}
          <button className="btn btn-amber" style={{opacity:cur.ok()?1:.4,cursor:cur.ok()?"pointer":"not-allowed"}}
            onClick={()=>{if(!cur.ok())return;step<steps.length-1?setStep(s=>s+1):onComplete(p);}}>
            {step<steps.length-1?"Continue →":"Finish setup 🎵"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard({profile,outreach,matchedVenues,onGoDiscover}) {
  const replied=outreach.filter(o=>o.status==="replied").length;
  const sent=outreach.length;
  const top3=matchedVenues.slice(0,3);

  return (
    <div className="page fade">
      <div className="ph">
        <h1>Welcome back, {profile.artistName} 👋</h1>
        <p>Here's your booking activity and top venue recommendations.</p>
      </div>

      {/* Stats */}
      <div className="g4" style={{marginBottom:26}}>
        {[
          {n:sent,l:"Emails sent",d:"Total outreach",c:"var(--text)"},
          {n:replied,l:"Replies received",d:`${sent?Math.round(replied/sent*100):0}% reply rate`,c:"var(--teal)"},
          {n:matchedVenues.length,l:"Venue matches",d:`In & near ${profile.city?.split(",")[0]||"your city"}`,c:"var(--amber)"},
          {n:"Artist",l:"Current plan",d:"Upgrade for more →",c:"var(--sky)"},
        ].map(s=>(
          <div className="stat" key={s.l}>
            <div className="stat-n" style={{color:s.c}}>{s.n}</div>
            <div className="stat-l">{s.l}</div>
            <div className="stat-d">{s.d}</div>
          </div>
        ))}
      </div>

      <div className="g2" style={{gap:24,alignItems:"start"}}>
        {/* Top venues */}
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <h3 style={{fontSize:16,fontWeight:800}}>Top venue matches</h3>
            <button className="btn btn-ghost btn-sm" onClick={onGoDiscover}>See all →</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {top3.map(v=>{
              const sc=scoreColor(v.score);
              return(
                <div className="card2" key={v.id} style={{display:"flex",gap:12,alignItems:"center"}}>
                  <div className="score-ring" style={{background:sc.bg,color:sc.c,width:44,height:44,fontSize:14}}>{v.score}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:14}}>{v.name}</div>
                    <div style={{color:"var(--text2)",fontSize:12}}>{v.city} · <span style={{color:sc.c}}>{v.genreMatch} genre fit</span></div>
                  </div>
                  <span className={`badge ${v.locMatch==="same city"?"b-teal":"b-sky"}`}>{v.locMatch}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent outreach */}
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <h3 style={{fontSize:16,fontWeight:800}}>Recent outreach</h3>
            <span style={{color:"var(--text3)",fontSize:12}}>Last 30 days</span>
          </div>
          <div className="card" style={{padding:0}}>
            {outreach.slice(0,5).map((o,i)=>(
              <div key={o.id} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 18px",borderBottom:i<4?"1px solid var(--border)":""}}>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:14}}>{o.venue}</div>
                  <div style={{color:"var(--text3)",fontSize:12}}>{fmtDate(o.date)}</div>
                </div>
                <StatusBadge s={o.status}/>
              </div>
            ))}
            {outreach.length===0&&<div style={{padding:24,textAlign:"center",color:"var(--text3)"}}>No outreach yet — discover venues and send your first email!</div>}
          </div>
        </div>
      </div>

      {/* Profile snapshot */}
      <div className="card" style={{marginTop:24}}>
        <h3 style={{fontSize:16,fontWeight:800,marginBottom:16}}>Your artist profile</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14}}>
          {[
            {l:"Artist name",v:profile.artistName},
            {l:"City",v:profile.city},
            {l:"Genre",v:profile.genre},
            {l:"Similar artists",v:profile.similarArtists||"—"},
          ].map(r=>(
            <div key={r.l} style={{background:"var(--surface)",borderRadius:"var(--r)",padding:"12px 14px"}}>
              <div style={{color:"var(--text3)",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",marginBottom:4,fontFamily:"var(--font-d)"}}>{r.l}</div>
              <div style={{fontWeight:500,fontSize:14}}>{r.v}</div>
            </div>
          ))}
        </div>
        {(profile.spotify||profile.soundcloud)&&(
          <div style={{display:"flex",gap:10,marginTop:14,flexWrap:"wrap"}}>
            {profile.spotify&&<a href={profile.spotify} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">🎵 Spotify</a>}
            {profile.soundcloud&&<a href={profile.soundcloud} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">☁️ SoundCloud</a>}
            {profile.instagram&&<a href={profile.instagram} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">📸 Instagram</a>}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── DISCOVER VENUES ───────────────────────────────────────────────────────────
function Discover({profile,plan,matchedVenues,outreach,onSendEmail,onUpgrade}) {
  const [search,setSearch]=useState("");
  const [cityFilter,setCityFilter]=useState("all");
  const [genreFilter,setGenreFilter]=useState("all");
  const isFree=plan==="free";
  const cities=[...new Set(matchedVenues.map(v=>v.city))];
  const allGenres=[...new Set(matchedVenues.flatMap(v=>v.genres))].sort();
  const contactedIds=new Set(outreach.map(o=>o.venueId));

  let filtered=matchedVenues.filter(v=>{
    if(search&&!v.name.toLowerCase().includes(search.toLowerCase())&&!v.city.toLowerCase().includes(search.toLowerCase())) return false;
    if(cityFilter!=="all"&&v.city!==cityFilter) return false;
    if(genreFilter!=="all"&&!v.genres.includes(genreFilter)) return false;
    return true;
  });

  return (
    <div className="page fade">
      <div className="ph">
        <h1>Venue Matches</h1>
        <p>AI-matched venues ranked by how well they fit your sound and location.</p>
      </div>

      {isFree&&(
        <div className="up-banner">
          <div>
            <div style={{fontFamily:"var(--font-d)",fontWeight:800,marginBottom:4}}>You're on the Free plan</div>
            <div style={{color:"var(--text2)",fontSize:13}}>Showing 5 of {matchedVenues.length} matches. Upgrade to see all venues and send unlimited emails.</div>
          </div>
          <button className="btn btn-amber btn-sm" onClick={onUpgrade}>Upgrade to Artist →</button>
        </div>
      )}

      {/* Filters */}
      <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"}}>
        <input className="inp" placeholder="🔍 Search venues or cities..." value={search} onChange={e=>setSearch(e.target.value)} style={{maxWidth:280}}/>
        <select className="inp" value={cityFilter} onChange={e=>setCityFilter(e.target.value)} style={{maxWidth:180}}>
          <option value="all">All cities</option>
          {cities.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
        <select className="inp" value={genreFilter} onChange={e=>setGenreFilter(e.target.value)} style={{maxWidth:180}}>
          <option value="all">All genres</option>
          {allGenres.slice(0,20).map(g=><option key={g} value={g}>{g}</option>)}
        </select>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",color:"var(--text3)",fontSize:13}}>
          {filtered.length} venues
        </div>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        {filtered.map((v,idx)=>{
          const locked=isFree&&idx>=5;
          const sc=scoreColor(v.score);
          const contacted=contactedIds.has(v.id);
          return (
            <div key={v.id} className="vcard" style={{opacity:locked?.5:1,filter:locked?"blur(3px)":"",pointerEvents:locked?"none":"auto"}}>
              <div className="score-ring" style={{background:sc.bg,color:sc.c}}>{v.score}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap",marginBottom:5}}>
                  <span style={{fontFamily:"var(--font-d)",fontWeight:800,fontSize:17}}>{v.name}</span>
                  <span style={{color:"var(--text3)",fontSize:13}}>· {v.city}, {v.state}</span>
                  {v.capacity&&<span className="badge b-dim">Cap. {v.capacity.toLocaleString()}</span>}
                  {contacted&&<span className="badge b-amber">✓ Contacted</span>}
                </div>
                <p style={{color:"var(--text2)",fontSize:13,marginBottom:10,lineHeight:1.5}}>{v.reason}</p>
                <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
                  {v.genres.slice(0,4).map(g=><span key={g} className="tag">{g}</span>)}
                  <span className={`badge ${v.locMatch==="same city"?"b-teal":v.locMatch==="same state"?"b-sky":"b-dim"}`}>{v.locMatch}</span>
                  <span className={`badge ${v.genreMatch==="high"?"b-teal":v.genreMatch==="medium"?"b-amber":"b-rose"}`}>{v.genreMatch} genre fit</span>
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:8,flexShrink:0,minWidth:120}}>
                <button className="btn btn-amber btn-sm" onClick={()=>onSendEmail(v)}>✉ Write email</button>
                {v.website&&<a href={`https://${v.website}`} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm" style={{justifyContent:"center"}}>↗ Website</a>}
                {v.email&&<div style={{fontSize:11,color:"var(--text3)",textAlign:"center",wordBreak:"break-all"}}>{v.email}</div>}
              </div>
            </div>
          );
        })}
        {filtered.length===0&&(
          <div style={{textAlign:"center",padding:60,color:"var(--text3)"}}>
            <div style={{fontSize:40,marginBottom:12}}>🔍</div>
            No venues match your filters. Try adjusting your search.
          </div>
        )}
      </div>
    </div>
  );
}

// ─── EMAIL MODAL ────────────────────────────────────────────────────────────────
function EmailModal({venue,profile,onClose,onSend}) {
  const [subj,setSubj]=useState("");
  const [body,setBody]=useState("");
  const [loading,setLoading]=useState(true);
  const [sending,setSending]=useState(false);

  useEffect(()=>{gen()},[]);

  const mockEmail=()=>{
    setSubj(`Booking inquiry – ${profile.artistName} (${profile.genre})`);
    setBody(`Hi ${venue.name} team,\n\nMy name is ${profile.artistName}, a ${profile.genre} artist based in ${profile.city}${profile.similarArtists?`, with influences from ${profile.similarArtists.split(",").slice(0,2).map(s=>s.trim()).join(" and ")}`:""}.\n\n${profile.bio||"I've been building a dedicated following in my local scene and am actively expanding my live performance schedule."}\n\nI'd love to discuss the possibility of performing at ${venue.name}. Your focus on ${venue.genres.slice(0,2).join(" and ")} feels like a natural fit for my sound.\n\n${profile.spotify?`You can hear my music here: ${profile.spotify}\n\n`:""}Would you have any availability in the coming weeks or months? I'm flexible on dates and happy to discuss any format that works for you.\n\nThank you for your time,\n${profile.artistName}${profile.instagram?`\n${profile.instagram}`:""}`);
  };

  const gen=async()=>{
    setLoading(true);
    const res=await callAI(
      "You are an expert music industry publicist. Write warm, professional, concise booking inquiry emails under 180 words. No generic openers like 'I hope this email finds you well'. Be direct and personal. Return ONLY valid JSON with keys subject and body.",
      `Write a booking inquiry email.\nArtist: ${profile.artistName}, Genre: ${profile.genre}, City: ${profile.city}, Similar artists: ${profile.similarArtists||"N/A"}, Bio: ${profile.bio||"N/A"}, Spotify: ${profile.spotify||"N/A"}, Instagram: ${profile.instagram||"N/A"}\nVenue: ${venue.name}, City: ${venue.city}, Genres: ${venue.genres.join(", ")}\nReturn ONLY: {"subject":"...","body":"..."}`
    );
    if(res){
      try{const d=JSON.parse(res.replace(/```json|```/g,"").trim());setSubj(d.subject||"");setBody(d.body||"");}
      catch{mockEmail();}
    } else { mockEmail(); }
    setLoading(false);
  };

  const send=async()=>{
    setSending(true);
    await new Promise(r=>setTimeout(r,1000));
    onSend({venue,subject:subj,body});
    setSending(false);
    onClose();
  };

  return (
    <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal fade" style={{maxWidth:620}}>
        <button className="modal-x" onClick={onClose}>×</button>
        <div style={{fontFamily:"var(--font-d)",fontSize:21,fontWeight:900,marginBottom:2}}>Email to {venue.name}</div>
        <div style={{color:"var(--text3)",fontSize:13,marginBottom:22}}>📧 {venue.email||"booking contact"} · {venue.city}</div>

        {loading?(
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <div className="shimmer" style={{height:44}}/>
            <div className="shimmer" style={{height:220}}/>
            <p style={{textAlign:"center",color:"var(--text2)",fontSize:13,padding:"8px 0"}}>✨ AI is crafting your personalized email...</p>
          </div>
        ):(
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div className="field"><label className="label">Subject line</label><input className="inp" value={subj} onChange={e=>setSubj(e.target.value)}/></div>
            <div className="field"><label className="label">Email body</label><textarea className="inp" style={{minHeight:260}} value={body} onChange={e=>setBody(e.target.value)}/></div>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end",flexWrap:"wrap"}}>
              <button className="btn btn-ghost" onClick={gen}>↺ Regenerate</button>
              <button className="btn btn-outline" onClick={onClose}>Cancel</button>
              <button className="btn btn-amber" onClick={send} disabled={sending}>{sending?"Sending...":"Send email →"}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── OUTREACH TRACKER ──────────────────────────────────────────────────────────
function Outreach({outreach,setOutreach,plan,onUpgrade}) {
  const [filter,setFilter]=useState("all");
  const [noteId,setNoteId]=useState(null);
  const [noteTxt,setNoteTxt]=useState("");

  if(plan==="free") return(
    <div className="page fade" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:400,textAlign:"center"}}>
      <div style={{fontSize:56,marginBottom:20}}>📊</div>
      <h2 style={{fontSize:26,fontWeight:900,marginBottom:8}}>Outreach tracking is a paid feature</h2>
      <p style={{color:"var(--text2)",maxWidth:400,marginBottom:28,lineHeight:1.6}}>Upgrade to Artist or Pro to track every email, see reply status, and manage follow-ups from your dashboard.</p>
      <button className="btn btn-amber btn-lg" onClick={onUpgrade}>Upgrade to Artist — $19/mo</button>
    </div>
  );

  const counts={all:outreach.length,replied:outreach.filter(o=>o.status==="replied").length,sent:outreach.filter(o=>o.status==="sent").length,no_response:outreach.filter(o=>o.status==="no_response").length};
  const shown=filter==="all"?outreach:outreach.filter(o=>o.status===filter);

  const updateStatus=(id,status)=>setOutreach(prev=>prev.map(o=>o.id===id?{...o,status}:o));
  const saveNote=(id)=>{setOutreach(prev=>prev.map(o=>o.id===id?{...o,notes:noteTxt}:o));setNoteId(null);};

  return(
    <div className="page fade">
      <div className="ph"><h1>Outreach Tracker</h1><p>Track every email, reply, and follow-up in one place.</p></div>

      {/* Summary */}
      <div className="g4" style={{marginBottom:24}}>
        {[
          {n:counts.all,l:"Total sent",c:"var(--text)"},
          {n:counts.replied,l:"Replies",c:"var(--teal)"},
          {n:counts.sent,l:"Awaiting reply",c:"var(--sky)"},
          {n:counts.no_response,l:"No response",c:"var(--text3)"},
        ].map(s=><div className="stat" key={s.l}><div className="stat-n" style={{color:s.c}}>{s.n}</div><div className="stat-l">{s.l}</div></div>)}
      </div>

      {/* Filter tabs */}
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {[["all","All"],["replied","Replied"],["sent","Sent"],["no_response","No response"]].map(([k,l])=>(
          <button key={k} className={`btn btn-sm ${filter===k?"btn-amber":"btn-outline"}`} onClick={()=>setFilter(k)}>
            {l} <span style={{background:"rgba(255,255,255,.1)",borderRadius:99,padding:"1px 7px",fontSize:11,marginLeft:4}}>{counts[k]}</span>
          </button>
        ))}
      </div>

      <div className="card" style={{padding:0,overflowX:"auto"}}>
        <table className="tbl">
          <thead><tr>
            <th>Venue</th><th>City</th><th>Date</th><th>Status</th><th>Notes</th><th>Actions</th>
          </tr></thead>
          <tbody>
            {shown.map(o=>(
              <tr key={o.id}>
                <td style={{fontWeight:700}}>{o.venue}</td>
                <td style={{color:"var(--text2)"}}>{o.city}</td>
                <td style={{color:"var(--text2)"}}>{fmtDate(o.date)}</td>
                <td><StatusBadge s={o.status}/></td>
                <td style={{maxWidth:180}}>
                  {noteId===o.id?(
                    <div style={{display:"flex",gap:6}}>
                      <input className="inp" style={{padding:"5px 9px",fontSize:12}} value={noteTxt} onChange={e=>setNoteTxt(e.target.value)} autoFocus/>
                      <button className="btn btn-teal btn-sm" style={{padding:"5px 10px"}} onClick={()=>saveNote(o.id)}>✓</button>
                    </div>
                  ):(
                    <span style={{color:"var(--text3)",fontSize:13,cursor:"pointer"}} onClick={()=>{setNoteId(o.id);setNoteTxt(o.notes||"");}}>
                      {o.notes||<span style={{color:"var(--border2)"}}>+ Add note</span>}
                    </span>
                  )}
                </td>
                <td>
                  <div style={{display:"flex",gap:6"}}>
                    {o.status!=="replied"&&<button className="btn btn-sm b-teal" style={{background:"var(--tealDim)",color:"var(--teal)",border:"1px solid rgba(0,212,170,.2)",borderRadius:8,padding:"4px 10px",fontSize:12}} onClick={()=>updateStatus(o.id,"replied")}>Mark replied</button>}
                    {o.status==="sent"&&<button className="btn btn-sm" style={{background:"rgba(255,255,255,.04)",color:"var(--text3)",border:"1px solid var(--border)",borderRadius:8,padding:"4px 10px",fontSize:12}} onClick={()=>updateStatus(o.id,"no_response")}>No response</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {shown.length===0&&<div style={{padding:40,textAlign:"center",color:"var(--text3)"}}>No outreach records for this filter.</div>}
      </div>
    </div>
  );
}

// ─── VENUE DATABASE (Admin view) ───────────────────────────────────────────────
function VenueDB({venues,setVenues,showToast}) {
  const [search,setSearch]=useState("");
  const [adding,setAdding]=useState(false);
  const [form,setForm]=useState({name:"",city:"",state:"",capacity:"",genres:"",website:"",email:""});
  const up=(k,v)=>setForm(x=>({...x,[k]:v}));

  const filtered=venues.filter(v=>!search||v.name.toLowerCase().includes(search.toLowerCase())||v.city.toLowerCase().includes(search.toLowerCase()));

  const addVenue=()=>{
    if(!form.name||!form.city){return;}
    const nv={id:Date.now(),name:form.name,city:form.city,state:form.state,capacity:form.capacity?parseInt(form.capacity):null,genres:form.genres.split(",").map(g=>g.trim()).filter(Boolean),website:form.website,email:form.email};
    setVenues(prev=>[...prev,nv]);
    setForm({name:"",city:"",state:"",capacity:"",genres:"",website:"",email:""});
    setAdding(false);
    showToast("Venue added to database!");
  };

  return(
    <div className="page fade">
      <div className="ph"><h1>Venue Database</h1><p>Browse and manage all venues in the GigPilot database.</p></div>

      <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"}}>
        <input className="inp" placeholder="🔍 Search venues..." value={search} onChange={e=>setSearch(e.target.value)} style={{maxWidth:300}}/>
        <div style={{marginLeft:"auto"}}><button className="btn btn-amber btn-sm" onClick={()=>setAdding(true)}>+ Add venue</button></div>
      </div>

      {adding&&(
        <div className="card" style={{marginBottom:20,borderColor:"rgba(245,166,35,.3)"}}>
          <h3 style={{fontFamily:"var(--font-d)",fontWeight:800,marginBottom:18}}>Add new venue</h3>
          <div className="g2" style={{gap:14,marginBottom:14}}>
            <div className="field"><label className="label">Venue name *</label><input className="inp" placeholder="The Troubadour" value={form.name} onChange={e=>up("name",e.target.value)}/></div>
            <div className="field"><label className="label">City *</label><input className="inp" placeholder="Los Angeles" value={form.city} onChange={e=>up("city",e.target.value)}/></div>
            <div className="field"><label className="label">State</label><input className="inp" placeholder="CA" value={form.state} onChange={e=>up("state",e.target.value)}/></div>
            <div className="field"><label className="label">Capacity</label><input className="inp" type="number" placeholder="400" value={form.capacity} onChange={e=>up("capacity",e.target.value)}/></div>
            <div className="field"><label className="label">Genres (comma separated)</label><input className="inp" placeholder="indie, folk, alternative" value={form.genres} onChange={e=>up("genres",e.target.value)}/></div>
            <div className="field"><label className="label">Website</label><input className="inp" placeholder="venue.com" value={form.website} onChange={e=>up("website",e.target.value)}/></div>
            <div className="field"><label className="label">Booking email</label><input className="inp" placeholder="booking@venue.com" value={form.email} onChange={e=>up("email",e.target.value)}/></div>
          </div>
          <div style={{display:"flex",gap:10}}>
            <button className="btn btn-amber" onClick={addVenue}>Add venue</button>
            <button className="btn btn-outline" onClick={()=>setAdding(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{color:"var(--text3)",fontSize:13,marginBottom:14}}>{filtered.length} venues in database</div>

      <div className="card" style={{padding:0,overflowX:"auto"}}>
        <table className="tbl">
          <thead><tr><th>Venue</th><th>City</th><th>Capacity</th><th>Genres</th><th>Contact</th></tr></thead>
          <tbody>
            {filtered.map(v=>(
              <tr key={v.id}>
                <td style={{fontWeight:700}}>{v.name}</td>
                <td style={{color:"var(--text2)"}}>{v.city}{v.state?`, ${v.state}`:""}</td>
                <td style={{color:"var(--text2)"}}>{v.capacity?.toLocaleString()||"—"}</td>
                <td><div style={{display:"flex",flexWrap:"wrap",gap:2,maxWidth:220}}>{v.genres.slice(0,3).map(g=><span key={g} className="tag">{g}</span>)}{v.genres.length>3&&<span className="tag">+{v.genres.length-3}</span>}</div></td>
                <td style={{color:"var(--text3)",fontSize:12}}>{v.email||"—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── ACCOUNT ───────────────────────────────────────────────────────────────────
function Account({user,profile,plan,onUpgrade,onLogout}) {
  return(
    <div className="page fade">
      <div className="ph"><h1>Account</h1><p>Manage your profile, subscription, and settings.</p></div>
      <div className="g2" style={{gap:24,alignItems:"start"}}>
        {/* Profile */}
        <div className="card">
          <h3 style={{fontFamily:"var(--font-d)",fontWeight:800,fontSize:17,marginBottom:20}}>Artist profile</h3>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {[
              {l:"Artist name",v:profile.artistName},
              {l:"City",v:profile.city},
              {l:"Genre",v:profile.genre},
              {l:"Similar artists",v:profile.similarArtists||"—"},
              {l:"Bio",v:profile.bio||"—"},
            ].map(r=>(
              <div key={r.l}>
                <div className="label" style={{marginBottom:3}}>{r.l}</div>
                <div style={{fontSize:14,color:"var(--text)"}}>{r.v}</div>
                <hr className="div" style={{margin:"10px 0 0"}}/>
              </div>
            ))}
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:4}}>
              {profile.spotify&&<a href={profile.spotify} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">🎵 Spotify</a>}
              {profile.soundcloud&&<a href={profile.soundcloud} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">☁️ SoundCloud</a>}
              {profile.instagram&&<a href={profile.instagram} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">📸 Instagram</a>}
            </div>
          </div>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:20}}>
          {/* Subscription */}
          <div className="card">
            <h3 style={{fontFamily:"var(--font-d)",fontWeight:800,fontSize:17,marginBottom:16}}>Subscription</h3>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
              <div>
                <div style={{fontWeight:600,marginBottom:2}}>{plan==="free"?"Free plan":plan==="artist"?"Artist plan — $19/mo":"Pro plan — $49/mo"}</div>
                <div style={{color:"var(--text3)",fontSize:13}}>{plan==="free"?"5 matches · 3 emails/month":plan==="artist"?"Unlimited matches · 50 emails/month":"Unlimited everything"}</div>
              </div>
              <span className={`badge ${plan==="pro"?"b-amber":plan==="artist"?"b-teal":"b-dim"}`}>{plan.charAt(0).toUpperCase()+plan.slice(1)}</span>
            </div>
            {plan==="free"&&(
              <div style={{marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"var(--text3)",marginBottom:5}}>
                  <span>Monthly usage</span><span>3 / 5 matches</span>
                </div>
                <div className="pbar"><div className="pfill" style={{width:"60%"}}/></div>
              </div>
            )}
            {plan!=="pro"&&<button className="btn btn-amber btn-block" onClick={onUpgrade}>{plan==="free"?"Upgrade to Artist — $19/mo":"Upgrade to Pro — $49/mo"}</button>}
          </div>

          {/* Account info */}
          <div className="card">
            <h3 style={{fontFamily:"var(--font-d)",fontWeight:800,fontSize:17,marginBottom:14}}>Account info</h3>
            <div style={{marginBottom:4,color:"var(--text3)",fontSize:12,textTransform:"uppercase",letterSpacing:".07em",fontFamily:"var(--font-d)"}}>Signed in as</div>
            <div style={{fontWeight:500,marginBottom:4}}>{user.name}</div>
            <div style={{color:"var(--text3)",fontSize:13,marginBottom:18}}>{user.email}</div>
            {user.provider&&user.provider!=="email"&&<div className="badge b-dim" style={{marginBottom:16}}>Via {user.provider}</div>}
            <button className="btn btn-danger btn-sm" onClick={onLogout}>Sign out</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── UPGRADE MODAL ─────────────────────────────────────────────────────────────
function UpgradeModal({onClose,onUpgrade}) {
  return(
    <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal fade" style={{maxWidth:500}}>
        <button className="modal-x" onClick={onClose}>×</button>
        <div style={{fontFamily:"var(--font-d)",fontSize:24,fontWeight:900,marginBottom:6}}>Unlock the full platform</div>
        <p style={{color:"var(--text2)",fontSize:14,marginBottom:28}}>Add your Stripe keys to enable real payments. For now, select a plan to simulate upgrading.</p>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {[
            {name:"Artist",price:"$19/mo",perks:"Unlimited matches · 50 emails/mo · Full tracking",plan:"artist"},
            {name:"Pro",price:"$49/mo",perks:"Unlimited everything · Priority venues · Analytics",plan:"pro"},
          ].map(p=>(
            <div key={p.name} className="card2" style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{flex:1}}>
                <div style={{fontFamily:"var(--font-d)",fontWeight:800,fontSize:16}}>{p.name} — {p.price}</div>
                <div style={{color:"var(--text2)",fontSize:12,marginTop:3}}>{p.perks}</div>
              </div>
              <button className="btn btn-amber btn-sm" onClick={()=>{onUpgrade(p.plan);onClose();}}>Select</button>
            </div>
          ))}
        </div>
        <div style={{background:"var(--surface)",borderRadius:10,padding:"14px 16px",marginTop:20,fontSize:12,color:"var(--text3)"}}>
          🔑 To enable real payments, replace <code style={{color:"var(--amber)"}}>STRIPE_KEY</code> in the code with your Stripe publishable key and set up a backend webhook.
        </div>
      </div>
    </div>
  );
}

// ─── MOBILE NAV ────────────────────────────────────────────────────────────────
function MobileNav({page,setPage}) {
  const items=[["dashboard","⚡","Home"],["discover","🎯","Discover"],["outreach","📬","Outreach"],["account","👤","Account"]];
  return(
    <div style={{position:"fixed",bottom:0,left:0,right:0,background:"var(--surface)",borderTop:"1px solid var(--border)",display:"flex",zIndex:100}}>
      {items.map(([id,icon,label])=>(
        <button key={id} onClick={()=>setPage(id)} style={{flex:1,padding:"10px 0",background:"none",border:"none",color:page===id?"var(--amber)":"var(--text3)",display:"flex",flexDirection:"column",alignItems:"center",gap:2,fontSize:10,fontFamily:"var(--font-d)",fontWeight:700,cursor:"pointer"}}>
          <span style={{fontSize:20}}>{icon}</span>{label}
        </button>
      ))}
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [screen,setScreen]=useState("landing"); // landing|auth|onboarding|app
  const [authMode,setAuthMode]=useState("signup");
  const [user,setUser]=useState(null);
  const [profile,setProfile]=useState(null);
  const [page,setPage]=useState("dashboard");
  const [plan,setPlan]=useState("artist");
  const [outreach,setOutreach]=useState(SAMPLE_OUTREACH);
  const [venues,setVenues]=useState(VENUES_DB);
  const [matchedVenues,setMatchedVenues]=useState([]);
  const [emailVenue,setEmailVenue]=useState(null);
  const [showUpgrade,setShowUpgrade]=useState(false);
  const [toast,setToast]=useState(null);
  const [isMobile,setIsMobile]=useState(window.innerWidth<768);

  useEffect(()=>{
    const r=()=>setIsMobile(window.innerWidth<768);
    window.addEventListener("resize",r);return()=>window.removeEventListener("resize",r);
  },[]);

  useEffect(()=>{
    if(profile) setMatchedVenues(matchVenues(profile,venues));
  },[profile,venues]);

  const showToast=(msg,type="ok")=>setToast({msg,type});

  const handleAuth=(u)=>{setUser(u);setScreen("onboarding");};
  const handleOnboarding=(p)=>{
    setProfile(p);setScreen("app");
    showToast(`Welcome, ${p.artistName}! Discovering venues for you...`);
  };

  const handleSendEmail=(venue)=>setEmailVenue(venue);
  const handleEmailSent=({venue,subject})=>{
    setOutreach(prev=>[{id:Date.now(),venueId:venue.id,venue:venue.name,city:venue.city,date:new Date().toISOString().split("T")[0],status:"sent",subject,notes:""},...prev]);
    showToast(`Email sent to ${venue.name}!`);
  };

  const navItems=[
    {id:"dashboard",icon:"⚡",label:"Dashboard"},
    {id:"discover",icon:"🎯",label:"Discover Venues"},
    {id:"outreach",icon:"📬",label:"Outreach"},
    {id:"venues",icon:"🗺️",label:"Venue Database"},
    {id:"account",icon:"👤",label:"Account"},
  ];

  if(screen==="landing") return(
    <>
      <style>{G}</style>
      <Landing onSignup={()=>{setAuthMode("signup");setScreen("auth");}} onLogin={()=>{setAuthMode("login");setScreen("auth");}}/>
      {toast&&<Toast msg={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
    </>
  );

  if(screen==="auth") return(
    <>
      <style>{G}</style>
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)"}}>
        <Auth initMode={authMode} onClose={()=>setScreen("landing")} onAuth={handleAuth}/>
      </div>
    </>
  );

  if(screen==="onboarding") return(
    <>
      <style>{G}</style>
      <Onboarding user={user} onComplete={handleOnboarding}/>
    </>
  );

  // ── App shell ──
  return(
    <>
      <style>{G}</style>
      <div className="app-shell">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="nav-logo">Gig<em>Pilot</em> AI<small>Booking assistant</small></div>
          <div className="nav-section">Menu</div>
          {navItems.map(n=>(
            <button key={n.id} className={`nav-item ${page===n.id?"active":""}`} onClick={()=>setPage(n.id)}>
              <span className="ni">{n.icon}</span>{n.label}
            </button>
          ))}
          <hr className="nav-divider"/>
          <div className="nav-section">Account</div>
          <button className="nav-item" onClick={()=>setPage("account")}>
            <span className="ni">👤</span>{user?.name||"Account"}
          </button>

          {/* Plan widget */}
          <div style={{marginTop:"auto",padding:"16px 12px"}}>
            <div style={{background:"var(--amberDim)",border:"1px solid rgba(245,166,35,.22)",borderRadius:12,padding:"14px 14px"}}>
              <div style={{fontFamily:"var(--font-d)",fontWeight:800,fontSize:13,color:"var(--amber)",marginBottom:4}}>
                {plan.charAt(0).toUpperCase()+plan.slice(1)} Plan
              </div>
              {plan==="free"?<>
                <div className="pbar" style={{marginBottom:5}}><div className="pfill" style={{width:"60%"}}/></div>
                <div style={{fontSize:11,color:"var(--text3)"}}>3/5 matches · 0/3 emails</div>
                <button className="btn btn-amber btn-sm btn-block" style={{marginTop:10,fontSize:12}} onClick={()=>setShowUpgrade(true)}>Upgrade</button>
              </>:<div style={{fontSize:11,color:"var(--text3)"}}>Unlimited matches & emails</div>}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="main" style={{paddingBottom:isMobile?80:0}}>
          {page==="dashboard"&&<Dashboard profile={profile} outreach={outreach} matchedVenues={matchedVenues} onGoDiscover={()=>setPage("discover")}/>}
          {page==="discover"&&<Discover profile={profile} plan={plan} matchedVenues={matchedVenues} outreach={outreach} onSendEmail={handleSendEmail} onUpgrade={()=>setShowUpgrade(true)}/>}
          {page==="outreach"&&<Outreach outreach={outreach} setOutreach={setOutreach} plan={plan} onUpgrade={()=>setShowUpgrade(true)}/>}
          {page==="venues"&&<VenueDB venues={venues} setVenues={setVenues} showToast={showToast}/>}
          {page==="account"&&<Account user={user} profile={profile} plan={plan} onUpgrade={()=>setShowUpgrade(true)} onLogout={()=>{setUser(null);setProfile(null);setScreen("landing");}}/>}
        </main>
      </div>

      {/* Mobile bottom nav */}
      {isMobile&&screen==="app"&&<MobileNav page={page} setPage={setPage}/>}

      {/* Modals */}
      {emailVenue&&<EmailModal venue={emailVenue} profile={profile} onClose={()=>setEmailVenue(null)} onSend={handleEmailSent}/>}
      {showUpgrade&&<UpgradeModal onClose={()=>setShowUpgrade(false)} onUpgrade={p=>{setPlan(p);showToast(`Upgraded to ${p.charAt(0).toUpperCase()+p.slice(1)} plan! 🎉`);}}/>}
      {toast&&<Toast msg={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
    </>
  );
}

