/* Format : "Nom|coef|drapeaux" ; o = optionnelle, u = coefficient non confirmé, a = moyenne annuelle (activités) */
const M=s=>s.split(";").map(x=>{const[n,c,f=""]=x.split("|");return{n,c:+c,o:f.includes("o"),u:f.includes("u"),a:f.includes("a")}});
const PRE=M("Langue arabe|1|u;Mathématiques|1|u;Éducation islamique|1|u;Sport|1|u;Éducation artistique|1|u;Activités scientifiques|1|u");
const AP12=M("Langue arabe|1|u;Mathématiques|1|u;Éducation islamique|1|u;Sport|1|u;Éducation artistique|1|u;Éducation scientifique et technologie|1|u;Activités scientifiques|1|u");
const AP3=M("Langue arabe|1|u;Mathématiques|1|u;Anglais|1|u;Éducation civique|1|u;Éducation islamique|1|u;Histoire et géographie|1|u;Sport|1|u;Éducation artistique|1|u;Éducation scientifique et technologie|1|u;Activités scientifiques|1|u;Tamazight|1|uo");
const AP45=M("Langue arabe|1|u;Mathématiques|1|u;Français|1|u;Anglais|1|u;Éducation civique|1|u;Éducation islamique|1|u;Histoire et géographie|1|u;Sport|1|u;Éducation artistique|1|u;Éducation scientifique et technologie|1|u;Tamazight|1|uo");
/* CEM 2026-2027 : coefficients par niveau [1AM,2AM,3AM,4AM] rapportés par la presse (décision ministérielle) */
const CEMT=[["Langue arabe",[2,2,3,5]],["Mathématiques",[2,3,3,4]],["Anglais",[1,3,3,3]],["Français",[1,2,2,3]],["Sciences naturelles",[1,2,2,2]],["Physique et technologie",[1,2,2,1]],["Histoire et géographie",[2,2,2,2],"u"],["Éducation islamique",[1,1,1,1]],["Éducation civique",[1,1,1,1]],["Éducation physique et sportive",[1,1,1,1]],["Informatique",[1,1,1,1]],["Éducation artistique",[1,1,1,1],"u"],["Éducation musicale",[1,1,1,1],"u"],["Tamazight",[2,2,2,2],"uo"]];
const cem=l=>CEMT.map(t=>({n:t[0],c:t[1][l],o:(t[2]||"").includes("o"),u:(t[2]||"").includes("u"),a:false}));
/* BEM : Arabe 5, Maths 4, Hist-Géo 3, Anglais 3 confirmés (décision n°07 du 27/06/2026, presse) */
const BEM=M("Langue arabe|5;Mathématiques|4;Histoire et géographie|3;Anglais|3;Français|3|u;Sciences naturelles|2|u;Physique et technologie|2|u;Éducation islamique|2|u;Éducation civique|1|u;Tamazight|2|uo;Éducation physique et sportive|1|a;Éducation artistique|1|ao;Éducation musicale|1|ao");
/* Bac 3AS : coefficients de mémoire, non confirmés */
const EPS=";Éducation physique et sportive|1|ua";
const SE=M("Sciences naturelles|5|u;Sciences physiques|5|u;Mathématiques|5|u;Langue arabe|3|u;Français|2|u;Anglais|2|u;Philosophie|2|u;Histoire et géographie|2|u;Éducation islamique|2|u"+EPS);
const MA=M("Mathématiques|7|u;Sciences physiques|6|u;Sciences naturelles|2|u;Langue arabe|3|u;Français|2|u;Anglais|2|u;Philosophie|2|u;Histoire et géographie|2|u;Éducation islamique|2|u"+EPS);
const LE=M("Langue arabe|6|u;Philosophie|6|u;Histoire et géographie|4|u;Français|3|u;Anglais|3|u;Éducation islamique|2|u;Mathématiques|2|u"+EPS);
const LA=M("Langue arabe|5|u;Français|5|u;Anglais|5|u;3ᵉ langue étrangère|4|u;Philosophie|2|u;Histoire et géographie|2|u;Éducation islamique|2|u;Mathématiques|2|u"+EPS);
/* 3AS : tableaux de plateformes éducatives indépendantes (totaux 30/29/33/34/27/28), non officiels */
const A3=";Éducation physique et sportive|1|ua;Tamazight|2|uo";
const SE3=M("Sciences naturelles|6|u;Sciences physiques|5|u;Mathématiques|5|u;Langue arabe|3|u;Langue française|2|u;Langue anglaise|2|u;Philosophie|2|u;Histoire et géographie|2|u;Sciences islamiques|2|u"+A3);
const MA3=M("Mathématiques|7|u;Sciences physiques|6|u;Sciences naturelles|2|u;Langue arabe|3|u;Langue française|2|u;Langue anglaise|2|u;Philosophie|2|u;Histoire et géographie|2|u;Sciences islamiques|2|u"+A3);
const TM3=M("Technologie (spécialité)|7|u;Mathématiques|6|u;Sciences physiques|6|u;Langue arabe|3|u;Langue française|2|u;Langue anglaise|2|u;Philosophie|2|u;Histoire et géographie|2|u;Sciences islamiques|2|u"+A3);
const GE3=M("Gestion comptable et financière|6|u;Économie et management|5|u;Mathématiques|5|u;Histoire et géographie|4|u;Langue arabe|3|u;Droit|2|u;Langue française|2|u;Langue anglaise|2|u;Philosophie|2|u;Sciences islamiques|2|u"+A3);
const LP3=M("Philosophie|6|u;Langue arabe|6|u;Histoire et géographie|4|u;Langue française|3|u;Langue anglaise|3|u;Mathématiques|2|u;Sciences islamiques|2|u"+A3);
const LE3=M("Langue arabe|5|u;Langue française|5|u;Langue anglaise|5|u;Troisième langue étrangère|4|u;Philosophie|2|u;Histoire et géographie|2|u;Mathématiques|2|u;Sciences islamiques|2|u"+A3);
const FIL3=[["Sciences expérimentales",SE3],["Mathématiques",MA3],["Techniques mathématiques",TM3],["Gestion et économie",GE3],["Lettres et philosophie",LP3],["Langues étrangères",LE3]];
const FIL12=FIL3.map(f=>[f[0],null]);
/* 1AS : coefficients concordants sur plusieurs sites éducatifs (totaux 30 et 26), non issus d'un texte officiel lu */
const ST1=M("Langue arabe|3|u;Langue française|2|u;Langue anglaise|2|u;Mathématiques|5|u;Histoire et géographie|2|u;Sciences naturelles|4|u;Sciences physiques et technologie|4|u;Sciences islamiques|2|u;Informatique|2|u;Technologie|2|u;Éducation physique et sportive|1|u;Éducation artistique|1|u;Tamazight|2|uo");
const LT1=M("Langue arabe|5|u;Langue française|3|u;Langue anglaise|3|u;Mathématiques|2|u;Histoire et géographie|3|u;Sciences naturelles|2|u;Sciences physiques|2|u;Sciences islamiques|2|u;Informatique|2|u;Éducation physique et sportive|1|u;Éducation artistique|1|u;Tamazight|2|uo");
const FIL1=[["Tronc commun sciences et technologie",ST1],["Tronc commun lettres",LT1]];
/* 2AS : tableaux issus de calculateurs éducatifs (totaux 28/27/29/27/30/26 + 2 avec tamazight), non officiels */
const A2=";Éducation physique et sportive|1|u;Éducation artistique|1|u;Tamazight|2|uo";
const SE2=M("Sciences naturelles|6|u;Mathématiques|5|u;Sciences physiques|5|u;Langue arabe|2|u;Sciences islamiques|2|u;Histoire et géographie|2|u;Langue française|2|u;Langue anglaise|2|u"+A2);
const MA2=M("Mathématiques|7|u;Sciences physiques|6|u;Langue arabe|2|u;Sciences naturelles|2|u;Sciences islamiques|2|u;Histoire et géographie|2|u;Langue française|2|u;Langue anglaise|2|u"+A2);
const TM2=M("Mathématiques|6|u;Technologie (selon la spécialité)|6|u;Sciences physiques|5|u;Langue arabe|2|u;Sciences islamiques|2|u;Histoire et géographie|2|u;Langue française|2|u;Langue anglaise|2|u"+A2);
const GE2=M("Gestion comptable et financière|5|u;Économie et management|4|u;Mathématiques|3|u;Histoire et géographie|3|u;Langue arabe|2|u;Droit|2|u;Sciences islamiques|2|u;Langue française|2|u;Langue anglaise|2|u"+A2);
const LP2=M("Langue arabe et littérature|5|u;Philosophie|5|u;Histoire et géographie|4|u;Langue française|3|u;Langue anglaise|3|u;Sciences islamiques|2|u;Mathématiques|2|u;Sciences naturelles|2|u;Sciences physiques|2|u"+A2);
const LE2=M("Langue arabe|4|u;Langue française|4|u;Langue anglaise|4|u;Troisième langue étrangère|4|u;Histoire et géographie|4|u;Sciences islamiques|2|u;Mathématiques|2|u"+A2);
const FIL2=[["Sciences expérimentales",SE2],["Mathématiques",MA2],["Techniques mathématiques",TM2],["Gestion et économie",GE2],["Lettres et philosophie",LP2],["Langues étrangères",LE2]];
const NIV={
 p:[["Année préparatoire",()=>PRE,"simple"],["1AP",()=>AP12,"simple"],["2AP",()=>AP12,"simple"],["3AP",()=>AP3,"simple"],["4AP",()=>AP45,"simple"],["5AP",()=>AP45,"simple"]],
 c:[["1AM",()=>cem(0),"cem"],["2AM",()=>cem(1),"cem"],["3AM",()=>cem(2),"cem"],["4AM",()=>cem(3),"cem"],["BEM (examen)",()=>BEM,"bem"]],
 l:[["1AS",null,"lyc"],["2AS",null,"lyc"],["3AS – Moyenne trimestrielle et annuelle",null,"lyc"],["3AS – Baccalauréat",null,"bac"]]
};
const $=id=>document.getElementById(id);
const fmt=x=>x.toFixed(2).replace(".",",");
const F3=["Éval. continue","Devoir","Composition"];
let cur=null,tri=0,vals={},act={},coef={},tp={};

function fill(sel,items){sel.innerHTML=`<option value="">Choisir…</option>`+items.map((t,i)=>`<option value="${i}">${t}</option>`).join("")}
function reset(){cur=null;$("form").hidden=true;$("res").hidden=true}
$("cycle").onchange=()=>{const c=$("cycle").value;$("wF").hidden=true;reset();if(!c){$("wN").hidden=true;return}fill($("niv"),NIV[c].map(n=>n[0]));$("wN").hidden=false};
$("niv").onchange=()=>{
  const c=$("cycle").value,i=$("niv").value;reset();if(i==="")return;const n=NIV[c][i];
  if(c==="l"){const list=n[2]==="bac"||n[0].startsWith("3AS")?FIL3:n[0]==="1AS"?FIL1:n[0]==="2AS"?FIL2:FIL12;fill($("fil"),list.map(f=>f[0]));$("wF").hidden=false;
    $("fil").onchange=()=>{reset();const j=$("fil").value;if(j!=="")start(n,list[j][1],list[j][0])}}
  else{$("wF").hidden=true;start(n,n[1](),n[0])}
};

function start(n,mat,label){
  vals={};act={};coef={};tp={};tri=0;
  if(!mat){$("form").hidden=false;$("form").innerHTML=`<p>Les coefficients et les matières de cette filière ne sont pas encore renseignés. Cette partie sera ajoutée dès qu’un texte officiel sera vérifié.</p>`;return}
  const mode=n[2];
  cur={mode,mat,label:n[0]+(label&&label!==n[0]?" – "+label:""),max:mode==="simple"?10:20,tri3:mode==="cem"||mode==="lyc"};
  mat.forEach((m,i)=>{act[i]=!m.o;coef[i]=m.c});
  draw();
}

function inp(i,k,ph,v,en){return `<input type="number" min="0" max="${cur.max}" step="0.01" placeholder="${ph}" aria-label="${cur.mat[i].n} – ${ph}" data-i="${i}" data-k="${k}" value="${v??""}" ${en?"":"disabled"}>`}

function draw(){
  const {mode,mat,max,tri3}=cur,key=tri3?tri:0;vals[key]=vals[key]||{};
  let h="";
  if(tri3){
    h+=`<div class="tabs" role="tablist">${[0,1,2].map(t=>`<button class="tab" role="tab" aria-selected="${t===tri}" data-t="${t}">Trimestre ${t+1}</button>`).join("")}</div>
    <p class="info">Pour chaque matière : évaluation continue (التقويم المستمر), devoir et composition.<br>${mode==="cem"?"Moyenne de matière = ((évaluation continue + devoir) / 2 + 2 × composition) / 3 (circulaire 2026-2027, rapportée par la presse).":"Moyenne de matière = (évaluation continue + devoir + 2 × composition) / 4, ou (évaluation continue + devoir + TP + 2 × composition) / 5 si la matière a des travaux pratiques. Formules de calculateurs éducatifs, non confirmées."}</p>`;
  }else if(mode==="simple")h+=`<p class="info">Notes sur 10. Moyenne générale = somme(note × coef) / somme(coef).</p>`;
  else if(mode==="bem")h+=`<p class="info">Notes de l’examen sur 20. Pour l’éducation physique et sportive, l’éducation artistique et l’éducation musicale, saisis la moyenne annuelle des trois trimestres (note ministérielle 2026). Un élève de 4AM étudie l’une des deux matières artistiques seulement.</p>`;
  else h+=`<p class="info">Notes de l’examen sur 20. Pour l’éducation physique et sportive, saisis la moyenne annuelle des trois trimestres.</p>`;

  mat.forEach((m,i)=>{
    const v=vals[key][i]||{};
    h+=`<div class="sr"><div class="top"><span class="nm">${m.n}${m.u?'<em class="u">non confirmé</em>':""}</span>
      <label class="cf">coef <input type="number" min="0" max="20" step="1" data-c="${i}" value="${coef[i]}" aria-label="Coefficient ${m.n}"></label></div>`;
    if(m.o)h+=`<label class="opt"><input type="checkbox" data-o="${i}" ${act[i]?"checked":""}> Je suis cette matière</label>`;
    if(mode==="lyc")h+=`<label class="opt"><input type="checkbox" data-tp="${i}" ${tp[i]?"checked":""}> Cette matière a des travaux pratiques (TP)</label>`;
    h+=tri3?`<div class="ins ${tp[i]?"i4":"i3"}">${inp(i,"a",F3[0],v.a,act[i])}${inp(i,"b",F3[1],v.b,act[i])}${tp[i]?inp(i,"d","TP",v.d,act[i]):""}${inp(i,"c",F3[2],v.c,act[i])}</div>`
           :`<div class="ins i1">${inp(i,"n",m.a?"Moyenne annuelle /20":"Note /"+max,v.n,act[i])}</div>`;
    h+=`</div>`;
  });
  if(mode==="bem")h+=`<div class="sr"><div class="top"><span class="nm">Moyenne annuelle générale de 4AM</span></div><div class="ins i1"><input type="number" min="0" max="20" step="0.01" id="ann" placeholder="Facultatif, pour le calcul de rattrapage" aria-label="Moyenne annuelle de 4AM"></div></div>`;
  h+=`<p class="info" id="sc"></p><button class="btn" id="go">Calculer ma moyenne</button><div class="err" id="err" role="alert"></div>`;
  $("form").innerHTML=h;$("form").hidden=false;
  const f=$("form");
  f.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{tri=+b.dataset.t;draw()});
  f.querySelectorAll("[data-o]").forEach(c=>c.onchange=()=>{act[c.dataset.o]=c.checked;draw()});
  f.querySelectorAll("[data-tp]").forEach(c=>c.onchange=()=>{tp[c.dataset.tp]=c.checked;draw()});
  f.querySelectorAll("[data-c]").forEach(c=>c.oninput=()=>{coef[c.dataset.c]=+c.value;sumC()});
  f.querySelectorAll("input[data-i]").forEach(e=>e.oninput=()=>{const o=vals[key][e.dataset.i]=vals[key][e.dataset.i]||{};o[e.dataset.k]=e.value});
  $("go").onclick=calc;sumC();
}
function sumC(){let s=0;cur.mat.forEach((m,i)=>{if(act[i])s+=coef[i]||0});$("sc").textContent=`Somme des coefficients : ${s}`}

const ok=v=>v!==undefined&&v!==""&&!isNaN(+v)&&+v>=0&&+v<=cur.max;
const wavg=a=>{let t=0,s=0;a.forEach(([n,c])=>{t+=n*c;s+=c});return s?t/s:0};
function subj(v,i){const a=+v.a,b=+v.b,c=+v.c;if(cur.mode==="cem")return((a+b)/2+2*c)/3;return tp[i]?(a+b+ +v.d+2*c)/5:(a+b+2*c)/4}

function trimAvg(t){
  const arr=[];
  for(let i=0;i<cur.mat.length;i++){
    if(!act[i])continue;const v=(vals[t]||{})[i]||{};
    if(!ok(v.a)||!ok(v.b)||!ok(v.c)||(tp[i]&&!ok(v.d)))return null;
    arr.push([subj(v,i),coef[i]]);
  }
  return arr.length?wavg(arr):null;
}

function calc(){
  $("err").textContent="";
  const {mode,mat,max}=cur;let moy,extra="",title="Moyenne générale";
  if(cur.tri3){
    const ct=trimAvg(tri);
    if(ct===null){$("err").textContent="Remplis les trois notes de chaque matière du trimestre (entre 0 et 20).";return}
    const all=[0,1,2].map(trimAvg),done=all.filter(x=>x!==null);
    extra=all.map((x,i)=>x===null?null:`T${i+1} : ${fmt(x)}`).filter(Boolean).join("  |  ");
    if(done.length>1){moy=done.reduce((a,b)=>a+b)/done.length;title=`Moyenne annuelle (${done.length} trimestres)`}
    else{moy=ct;title=`Moyenne du trimestre ${tri+1}`}
  }else{
    const arr=[];
    for(let i=0;i<mat.length;i++){
      if(!act[i])continue;const v=(vals[0]||{})[i]||{};
      if(!ok(v.n)){$("err").textContent=`Vérifie la note de « ${mat[i].n} » : un nombre entre 0 et ${max}.`;return}
      arr.push([+v.n,coef[i]]);
    }
    moy=wavg(arr);
    if(mode==="bem"){
      title="Moyenne de l’examen";const a=$("ann").value;
      if(a!==""){if(!(+a>=0&&+a<=20)){$("err").textContent="La moyenne annuelle doit être entre 0 et 20.";return}
        extra=`Examen : ${fmt(moy)}  |  Annuelle : ${fmt(+a)}`;moy=(moy+ +a)/2;title="Moyenne de rattrapage (examen + annuelle) / 2"}
    }
    if(mode==="bac")title="Moyenne du baccalauréat";
  }
  const nom=$("nom").value.trim(),age=$("age").value,pass=moy>=max/2;
  const ment=(mode==="bem"||mode==="bac")?(moy>=16?"Mention très bien":moy>=14?"Mention bien":moy>=12?"Mention assez bien":moy>=10?"Mention passable":""):"";
  const esc=s=>s.replace(/[<>&"]/g,"");
  $("res").innerHTML=`<div class="lbl">${nom?esc(nom):"Élève"}${age?", "+(+age)+" ans":""} · ${cur.label}</div>
  <div class="lbl">${title}</div><div class="big ${pass?"ok":"ko"}">${fmt(moy)}<span style="font-size:1.4rem;color:var(--mut)"> / ${max}</span></div>
  <p class="${pass?"ok":"ko"}">${pass?"Moyenne atteinte (≥ "+max/2+")":"Moyenne non atteinte (< "+max/2+")"}${ment?" · "+ment:""}</p>
  ${extra?`<div class="trim">${extra}</div>`:""}`;
  $("res").hidden=false;$("res").scrollIntoView({behavior:"smooth",block:"nearest"});
}
