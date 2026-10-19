// Chord logic shared by the app (index.html) and the article generator (scripts/pages/).
// Plain script: in the browser it defines the global GCF; in Node, require() returns it.
// Keep it free of DOM and app state so the guide tables always match what the app shows.
(function (root) {
  "use strict";
  // ---------- Chords ----------
  const SHARP = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
  const FLAT  = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"];
  const ROOTS = [0,1,2,3,4,5,6,7,8,9,10,11];
  const ROOT_LABEL = ["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"];
  const FLAT_ROOTS = new Set([1,3,5,8,10]);
  // Shapes are searched up to this fret, with the root (or the chosen slash-chord bass) as the lowest note
  const MAX_FRET = 14;
  // Score added for each open string above the lowest fretted string in the middle/high positions
  // (high enough that the usual fully fretted shape stays first; ringing-open shapes follow or fill empty positions)
  const INNER_OPEN_COST = 2.5;

  // iv: chord tones (semitones), opt: tones that may be left out, deg: interval labels
  const QUALS = [
    {id:"",    label:"Major",   iv:[0,4,7]},
    {id:"m",   label:"m",       iv:[0,3,7]},
    {id:"5",   label:"5",       iv:[0,7]},
    {id:"sus2",label:"sus2",    iv:[0,2,7]},
    {id:"sus4",label:"sus4",    iv:[0,5,7]},
    {id:"add9",label:"add9",    iv:[0,4,7,2], opt:[7]},
    {id:"madd9",label:"m(add9)",iv:[0,3,7,2], opt:[7]},
    {id:"6",   label:"6",       iv:[0,4,7,9], opt:[7]},
    {id:"7",   label:"7",       iv:[0,4,7,10],opt:[7]},
    {id:"maj7",label:"maj7",    iv:[0,4,7,11],opt:[7]},
    {id:"m7",  label:"m7",      iv:[0,3,7,10],opt:[7]},
    {id:"7sus4",label:"7sus4",  iv:[0,5,7,10],opt:[7]},
    {id:"m7b5",label:"m7♭5",    iv:[0,3,6,10]},
    {id:"dim", label:"dim",     iv:[0,3,6]},
    {id:"dim7",label:"dim7",    iv:[0,3,6,9]},
    {id:"aug", label:"aug",     iv:[0,4,8]},
  ];
  // Extra chords used only for naming a shape (not offered in the finder)
  const EXTRA = [
    {id:"9",label:"9",iv:[0,4,7,10,2],opt:[7],rare:true},
    {id:"m9",label:"m9",iv:[0,3,7,10,2],opt:[7],rare:true},
    {id:"maj9",label:"maj9",iv:[0,4,7,11,2],opt:[7],rare:true},
    {id:"m6",label:"m6",iv:[0,3,7,9],opt:[7],rare:true},
    {id:"add11",label:"add11",iv:[0,4,7,5],opt:[7],rare:true,deg:{5:"11"}},
    {id:"sus2sus4",label:"sus2sus4",iv:[0,2,5,7],rare:true},
    {id:"6/9",label:"6/9",iv:[0,4,7,9,2],opt:[7],rare:true},
    {id:"7(9)sus4",label:"9sus4",iv:[0,5,7,10,2],opt:[7],rare:true},
    // Tension chords (the 5th may be left out). deg gives the interval labels in that chord
    {id:"7(#9)", label:"7(#9)", iv:[0,4,7,10,3],opt:[7],rare:true,deg:{3:"#9"}},
    {id:"7(♭9)", label:"7(♭9)", iv:[0,4,7,10,1],opt:[7],rare:true,deg:{1:"♭9"}},
    {id:"7(13)", label:"7(13)", iv:[0,4,7,10,9],opt:[7],rare:true,deg:{9:"13"}},
    {id:"7(♭13)",label:"7(♭13)",iv:[0,4,7,10,8],opt:[7],rare:true,deg:{8:"♭13"}},
    {id:"7(#11)",label:"7(#11)",iv:[0,4,7,10,6],opt:[7],rare:true,deg:{6:"#11"}},
    {id:"m7(11)",label:"m7(11)",iv:[0,3,7,10,5],opt:[7],rare:true,deg:{5:"11"}},
    {id:"maj7(#11)",label:"maj7(#11)",iv:[0,4,7,11,6],opt:[7],rare:true,deg:{6:"#11"}},
  ];
  const ALLQ = [...QUALS, ...EXTRA];
  const DEG = {0:"R",1:"♭9",2:"9",3:"♭3",4:"3",5:"4",6:"♭5",7:"5",8:"♯5",9:"6",10:"♭7",11:"7"};
  function degLabel(q,iv){ if(q&&q.deg&&q.deg[iv]) return q.deg[iv]; if(q&&q.id==="dim7"&&iv===9) return "𝄫7"; if(iv===2 && q.id==="sus2") return "2"; return DEG[iv]; }

  const PRESETS = [
    {name:"Standard", notes:[4,9,2,7,11,4]},
    {name:"DADGAD", notes:[2,9,2,7,9,2]},
    {name:"Drop D", notes:[2,9,2,7,11,4]},
    {name:"DGDGAD", notes:[2,7,2,7,9,2]},
    {name:"Open D", notes:[2,9,2,6,9,2]},
    {name:"Open G", notes:[2,7,2,7,11,2]},
    {name:"Open C", notes:[0,7,0,7,0,4]},
    {name:"Open E", notes:[4,11,4,8,11,4]},
    {name:"DADGBD", notes:[2,9,2,7,11,2]},
    {name:"CGDGBD", notes:[0,7,2,7,11,2]},
  ];

  function spell(pc,root){ return (FLAT_ROOTS.has(root)?FLAT:SHARP)[((pc%12)+12)%12]; }
  // Pitch of each open string (MIDI): the nearest note within -6 to +5 semitones of standard (E2 A2 D3 G3 B3 E4)
  const STD = [40,45,50,55,59,64];
  function tuningMidi(t){
    return STD.map((s,i)=>{ for(let d=-6;d<=5;d++) if(((s+d)%12+12)%12===t[i]) return s+d; return s; });
  }
  function offsets(t){ return tuningMidi(t).map((m,i)=>m-STD[i]); }
  // Shape as text, 6th string first: "x 3 2 0 1 0", "8 10 10 9 8 8"
  function fmtTab(sh){ return sh.map(f=>f<0?"x":f).join(" "); }
  function fmtOff(d){ return d===0?"±0":(d>0?"+"+d:"−"+(-d)); }
  const REGIONS = ["low", "mid", "high"];
  function regionOf(sh){
    const fr=sh.filter(f=>f>0); if(!fr.length) return "low";
    const mx=Math.max(...fr), mn=Math.min(...fr);
    if(mx<=4) return "low";
    if(mn>=7) return "high";
    if(mn>=3) return "mid";
    return null; // shapes that mix open strings and high frets are left out
  }

  // ---------- Search ----------
  // Natural shapes for a chord, best first, up to 6 per position (low / mid / high).
  // opts: {tuning, root, qual, slash (pitch class or null), maxFret}
  function search(opts){
    const q=QUALS.find(x=>x.id===opts.qual);
    const root=opts.root;
    const slash=(opts.slash!=null && opts.slash!==root)?opts.slash:null;
    const pcs=q.iv.map(i=>(root+i)%12);
    const required=q.iv.filter(i=>!(q.opt||[]).includes(i)).map(i=>(root+i)%12);
    if(slash!==null){ if(!pcs.includes(slash)) pcs.push(slash); required.push(slash); }
    const bassTarget=slash!==null?slash:root;
    const tun=opts.tuning, maxF=opts.maxFret||MAX_FRET;
    const cands=tun.map(open=>{
      const c=[-1];
      for(let f=0;f<=maxF;f++) if(pcs.includes((open+f)%12)) c.push(f);
      return c;
    });
    const results=[]; const cur=new Array(6);
    (function rec(s,minF,maxFr){
      if(s===6){ evaluate(cur.slice()); return; }
      for(const f of cands[s]){
        let mn=minF,mx=maxFr;
        if(f>0){ mn=Math.min(mn,f); mx=Math.max(mx,f); if(mx-mn>3) continue; }
        cur[s]=f; rec(s+1,mn,mx);
      }
    })(0,99,-1);

    function evaluate(sh){
      const sounding=sh.map((f,i)=>f>=0?i:-1).filter(i=>i>=0);
      if(sounding.length<(q.iv.length<=2?3:4)) return;
      const notePcs=sounding.map(i=>(tun[i]+sh[i])%12);
      for(const r of required) if(!notePcs.includes(r)) return;
      // Sounding strings must be next to each other (no muted string inside). Only the 1st string may be muted on the treble side
      const firstSound=sounding[0];
      let lastSound=sounding[sounding.length-1];
      // Exception: the thumb frets the 6th string and mutes the 5th right above it (e.g. 2x0232)
      let interior=0;
      for(let i=firstSound;i<=lastSound;i++) if(sh[i]<0){
        if(i===1 && firstSound===0 && sh[0]>0 && interior===0) interior=1; else return;
      }
      if(lastSound<4) return;
      const region=regionOf(sh); if(!region) return;
      // Leave out unnatural shapes:
      //  - in the middle/high positions, open strings between fretted strings
      //  - a lower string fretted 3 or more frets above a higher string (hard on the wrist)
      const frIdx=sounding.filter(i=>sh[i]>0);
      // In the middle/high positions, fret 3 or more notes and use open strings only as a drone on the bass side
      // Open strings above the lowest fretted string ring with the fretted notes (e.g. DADGAD G: 5 5 0 4 5 5).
      // They are allowed, with a small cost so fully fretted shapes still come first when both are good.
      let innerOpen=0;
      if(region!=="low"){
        if(frIdx.length<3) return;
        for(let i=frIdx[0];i<6;i++) if(sh[i]===0) innerOpen++;
      }
      for(let i=0;i<frIdx.length;i++) for(let j=i+1;j<frIdx.length;j++)
        if(sh[frIdx[i]]-sh[frIdx[j]]>=3) return;
      // Number of fingers (with a barre)
      const fretted=sounding.filter(i=>sh[i]>0);
      let fingers=fretted.length, barre=null;
      if(fretted.length){
        const mn=Math.min(...fretted.map(i=>sh[i]));
        if(fingers>4){
          const at=fretted.filter(i=>sh[i]===mn);
          if(at.length>=2){
            const a=at[0], b=at[at.length-1];
            let ok=true; for(let i=a;i<=b;i++) if(sh[i]===0) ok=false;
            if(ok){ fingers=fingers-at.length+1; barre={fret:mn,from:a,to:b}; }
          }
        }
        if(fingers>4) return;
      }
      const bassPc=(tun[firstSound]+sh[firstSound])%12;
      if(slash!==null){ if(bassPc!==slash) return; }
      else if(bassPc!==root) return;
      const frets=fretted.map(i=>sh[i]);
      const span=frets.length?Math.max(...frets)-Math.min(...frets):0;
      const pos=frets.length?Math.min(...frets):0;
      const opens=sounding.filter(i=>sh[i]===0).length;
      const mutes=6-sounding.length;
      const thirdMissing=(q.iv.includes(4)||q.iv.includes(3)) && !notePcs.includes((root+(q.iv.includes(4)?4:3))%12);
      let score=span*1.6 + fingers*1.2 + pos*0.7 + mutes*1.5 + interior*2 - opens*0.9 + (barre?1.5:0)
        + (bassPc===bassTarget?0:6) + (thirdMissing?6:0);
      // In the middle/high positions, the position itself is not penalized (shapes are compared within the position)
      if(region!=="low") score-=pos*0.5 - opens*1.4;
      score+=innerOpen*INNER_OPEN_COST;
      if(sounding.length<5) score+=1.5;
      // Close intervals (3 semitones or less) low in the bass sound muddy (e.g. F#2 and A2)
      const mids=tuningMidi(tun);
      const low=sounding.map(i=>mids[i]+sh[i]).sort((a,b)=>a-b);
      if(low.length>=2 && low[1]-low[0]<=3 && low[0]<45) score+=5;
      // A barre at the fret of the lowest note or of the lowest root (e.g. 035553)
      const rootStr=sounding.find(i=>(tun[i]+sh[i])%12===root);
      const rootBarre=!!barre && ((sh[firstSound]===barre.fret && barre.from===firstSound) ||
        (rootStr!==undefined && sh[rootStr]===barre.fret && barre.from===rootStr));
      results.push({sh,score,barre,bassPc,region,rootBarre});
    }
    // On a tie, a barre at the root's fret comes before shapes with open or muted strings
    results.sort((a,b)=>{ const d=a.score-b.score; if(Math.abs(d)>1e-6) return d; return (b.rootBarre?1:0)-(a.rootBarre?1:0); });
    const byRegion={};
    REGIONS.forEach(r=>byRegion[r]=results.filter(x=>x.region===r).slice(0,6));
    return {byRegion, total:results.length, q, pcs};
  }

  // ---------- Naming a shape ----------
  // Chord names for the sounding notes, best first. pcsArr: pitch classes of the sounding strings; bassPc: the lowest one.
  // Scoring (lower is better): an inversion with the 3rd or 5th in the bass (D/F#) costs less than one with
  // the 7th or a tension in the bass; a bass note that is not a chord tone and sounds only in the bass is
  // named as "upper chord / bass" (G/C, Am/G).
  const BASS_IN_TRIAD = [3, 4, 6, 7, 8];   // ♭3, 3, ♭5, 5, ♯5 above the root
  function identify(pcsArr,bassPc){
    const set=[...new Set(pcsArr)];
    const out=[];
    const fits=(notes,q,r)=>{
      const need=q.iv.filter(i=>!(q.opt||[]).includes(i)).map(i=>(r+i)%12);
      const all=q.iv.map(i=>(r+i)%12);
      return notes.every(p=>all.includes(p)) && need.every(p=>notes.includes(p)) ? all : null;
    };
    const base=(q,all,notes)=>(all.length-notes.length)+q.iv.length*0.1+(q.rare?1.5:0);
    for(const r of ROOTS){
      for(const q of ALLQ){
        const all=fits(set,q,r);
        if(!all) continue;
        let n=spell(r,r)+q.id, slash=0;
        if(bassPc!==r){
          n+="/"+spell(bassPc,r);
          slash=BASS_IN_TRIAD.includes(((bassPc-r)%12+12)%12)?2:3;
        }
        out.push({n,root:r,q,score:slash+base(q,all,set)});
      }
    }
    // The bass note sounds only in the bass: name the chord above it, over that bass
    const i=pcsArr.indexOf(bassPc);
    const upper=[...new Set(pcsArr.filter((p,k)=>k!==i))];
    if(!upper.includes(bassPc) && upper.length>=3){
      for(const r of ROOTS){
        for(const q of ALLQ){
          const all=fits(upper,q,r);
          if(!all || all.includes(bassPc)) continue;
          out.push({n:spell(r,r)+q.id+"/"+spell(bassPc,r),root:r,q,over:bassPc,score:2+base(q,all,upper)});
        }
      }
    }
    return out.sort((a,b)=>a.score-b.score);
  }

  // ---------- Diagram ----------
  // SVG chord diagram. root: for the interval labels; tuning: for the note names
  function diagram(sh,barre,q,root,tuning){
    const RT=root;
    const bassStr=sh.findIndex(f=>f>=0); // only the lowest note is black
    const W=150,H=176,L=22,T=34,SX=21,FH=24,NF=5;
    const fretted=sh.filter(f=>f>0);
    const mx=fretted.length?Math.max(...fretted):0, mn=fretted.length?Math.min(...fretted):0;
    const start=mx<=5?1:mn;
    let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${sh.map(f=>f<0?'x':f).join(' ')}">`;
    s+=`<rect x="${L-6}" y="${T}" width="${SX*5+12}" height="${FH*NF}" rx="3" fill="var(--paper)"/>`;
    for(let k=0;k<=NF;k++){
      const y=T+k*FH;
      s+=`<line x1="${L-6}" x2="${L+SX*5+6}" y1="${y}" y2="${y}" stroke="${k===0&&start===1?'var(--ink)':'var(--line-strong)'}" stroke-width="${k===0&&start===1?4:1.2}"/>`;
    }
    for(let i=0;i<6;i++){
      const x=L+i*SX;
      s+=`<line x1="${x}" x2="${x}" y1="${T}" y2="${T+FH*NF}" stroke="var(--subtle)" stroke-width="${1.6-i*0.15}"/>`;
    }
    if(start>1) s+=`<text x="${L-10}" y="${T+FH*0.5+4}" text-anchor="end" font-family="Consolas,Menlo,monospace" font-size="11" fill="var(--muted)">${start}</text>`;
    if(barre){
      const y=T+(barre.fret-start+0.5)*FH;
      s+=`<rect x="${L+barre.from*SX-8}" y="${y-8}" width="${(barre.to-barre.from)*SX+16}" height="16" rx="8" fill="var(--ink)" opacity=".14"/>`;
    }
    for(let i=0;i<6;i++){
      const x=L+i*SX, f=sh[i];
      const pc=(tuning[i]+Math.max(f,0))%12;
      const iv=((pc-RT)%12+12)%12;
      const lab=f<0?"":(q?degLabel(q,iv):DEG[iv]);
      if(f<0){ s+=`<text x="${x}" y="${T-10}" text-anchor="middle" font-size="13" fill="var(--muted)" font-family="Consolas,Menlo,monospace">×</text>`; }
      else if(f===0){
        s+=`<circle cx="${x}" cy="${T-14}" r="6" fill="${i===bassStr?'var(--ink)':'none'}" stroke="${i===bassStr?'var(--ink)':'var(--subtle)'}" stroke-width="1.6"/>`;
      } else {
        const y=T+(f-start+0.5)*FH;
        s+=`<circle cx="${x}" cy="${y}" r="9" fill="${i===bassStr?'var(--ink)':'var(--paper)'}" stroke="var(--ink)" stroke-width="1.5"/>`;
        s+=`<text x="${x}" y="${y+3.5}" text-anchor="middle" font-size="${lab.length>2?7:lab.length>1?8.5:10}" font-weight="700" fill="${i===bassStr?'var(--paper)':'var(--ink)'}" font-family="Consolas,Menlo,monospace">${lab}</text>`;
      }
      // Bottom row: note name
      const name=f<0?"":spell(pc,RT);
      s+=`<text x="${x}" y="${T+FH*NF+16}" text-anchor="middle" font-size="10" fill="var(--muted)" font-family="Consolas,Menlo,monospace">${name}</text>`;
    }
    return s+"</svg>";
  }


  const GCF = { SHARP, FLAT, ROOTS, ROOT_LABEL, FLAT_ROOTS, QUALS, EXTRA, ALLQ, DEG, degLabel, PRESETS, MAX_FRET, spell, STD, tuningMidi, offsets, fmtTab, fmtOff, REGIONS, regionOf, search, identify, diagram };
  if (typeof module !== "undefined" && module.exports) module.exports = GCF;
  else root.GCF = GCF;
})(typeof self !== "undefined" ? self : this);
