import { useState } from "react";

const BG="#0d0d1a",BG2="#141428",BG3="#1e1e38",BG4="#252548",AC="#6c63ff",AC2="#8b85ff",GR="#10b981",RD="#ef4444",BR="#2a2a50";

const STUDENTS=[
  {id:1,name:"Alejandro García",age:16,av:"AG",cl:"#6c63ff"},{id:2,name:"María López",age:17,av:"ML",cl:"#ec4899"},
  {id:3,name:"Carlos Martínez",age:16,av:"CM",cl:"#14b8a6"},{id:4,name:"Lucía Fernández",age:16,av:"LF",cl:"#f59e0b"},
  {id:5,name:"Pablo Rodríguez",age:17,av:"PR",cl:"#ef4444"},{id:6,name:"Sofía González",age:16,av:"SG",cl:"#8b5cf6"},
  {id:7,name:"Diego Sánchez",age:17,av:"DS",cl:"#06b6d4"},{id:8,name:"Ana Torres",age:16,av:"AT",cl:"#10b981"},
  {id:9,name:"Javier Pérez",age:16,av:"JP",cl:"#f97316"},{id:10,name:"Carmen Díaz",age:17,av:"CD",cl:"#e11d48"},
  {id:11,name:"Andrés Ruiz",age:16,av:"AR",cl:"#7c3aed"},{id:12,name:"Isabel Moreno",age:17,av:"IM",cl:"#0891b2"},
  {id:13,name:"Miguel Jiménez",age:16,av:"MJ",cl:"#16a34a"},{id:14,name:"Elena Álvarez",age:17,av:"EA",cl:"#d97706"},
  {id:15,name:"Rubén Romero",age:16,av:"RR",cl:"#dc2626"},{id:16,name:"Patricia Navarro",age:17,av:"PN",cl:"#9333ea"},
  {id:17,name:"Sergio Iglesias",age:16,av:"SI",cl:"#0284c7"},{id:18,name:"Natalia Ramos",age:17,av:"NR",cl:"#059669"},
  {id:19,name:"Iván Castro",age:16,av:"IC",cl:"#ca8a04"},{id:20,name:"Claudia Ortega",age:17,av:"CO",cl:"#db2777"},
  {id:21,name:"Héctor Suárez",age:16,av:"HS",cl:"#4f46e5"},{id:22,name:"Nuria Molina",age:17,av:"NM",cl:"#0d9488"},
];

const CRITERIA=[
  {id:1,code:"CE1.1",desc:"Identifica el problema de la escasez y la necesidad de elegir entre alternativas"},
  {id:2,code:"CE1.2",desc:"Distingue coste de oportunidad y analiza la frontera de posibilidades de producción"},
  {id:3,code:"CE2.1",desc:"Analiza el funcionamiento de la oferta y la demanda en mercados reales"},
  {id:4,code:"CE2.2",desc:"Calcula e interpreta el precio de equilibrio y los cambios en el mercado"},
  {id:5,code:"CE2.3",desc:"Identifica los tipos de competencia imperfecta y sus efectos para el consumidor"},
  {id:6,code:"CE3.1",desc:"Calcula e interpreta el PIB y distingue entre PIB nominal y real"},
  {id:7,code:"CE3.2",desc:"Analiza la inflación, el IPC y sus consecuencias sobre el poder adquisitivo"},
  {id:8,code:"CE3.3",desc:"Comprende las causas y tipos de desempleo y sus efectos socioeconómicos"},
  {id:9,code:"CE4.1",desc:"Identifica las fases del ciclo económico y sus principales variables macroeconómicas"},
  {id:10,code:"CE4.2",desc:"Analiza los instrumentos y efectos de la política fiscal expansiva y contractiva"},
  {id:11,code:"CE4.3",desc:"Comprende el funcionamiento de la política monetaria y el papel del BCE"},
  {id:12,code:"CE5.1",desc:"Describe el sistema bancario y el proceso de creación de dinero bancario"},
  {id:13,code:"CE5.2",desc:"Comprende los mercados financieros: acciones, bonos e índices bursátiles"},
  {id:14,code:"CE6.1",desc:"Analiza la desigualdad en la distribución de la renta y sus causas estructurales"},
  {id:15,code:"CE6.2",desc:"Valora críticamente las políticas redistributivas y el Estado del bienestar"},
  {id:16,code:"CE6.3",desc:"Comprende los fallos de mercado y justifica la intervención del Estado"},
  {id:17,code:"CE7.1",desc:"Analiza las ventajas y límites del comercio internacional y la especialización"},
  {id:18,code:"CE7.2",desc:"Comprende los tipos de cambio y la balanza de pagos"},
  {id:19,code:"CE8.1",desc:"Relaciona las actividades económicas con sus consecuencias medioambientales"},
  {id:20,code:"CE8.2",desc:"Valora modelos de desarrollo económico sostenible y economía circular"},
];

const SUBJECTS=[
  {name:"Matemáticas",col:"#6c63ff"},{name:"Lengua",col:"#ec4899"},{name:"Filosofía",col:"#14b8a6"},
  {name:"Economía",col:"#f59e0b"},{name:"Inglés",col:"#ef4444"},{name:"Ed. Física",col:"#8b5cf6"},
  {name:"Cerámica",col:"#06b6d4"},{name:"Historia",col:"#10b981"},{name:"Biología",col:"#f97316"},
];

const CLASSES=[
  {id:1,name:"1º Bach A",subj:"Economía",ids:STUDENTS.map(s=>s.id)},
  {id:2,name:"1º Bach B",subj:"Economía",ids:[1,3,5,7,9,11,13,15,17,19,21]},
  {id:3,name:"2º ESO C",subj:"Economía",ids:[2,4,6,8,10,12,14,16,18,20,22]},
];

const rnd=(a,b)=>parseFloat((Math.random()*(b-a)+a).toFixed(1));

const initData=()=>{
  const d={};
  STUDENTS.forEach(s=>{
    d[s.id]={
      criteria:Object.fromEntries(CRITERIA.map(c=>[c.id,Math.random()>0.42])),
      exams:[
        {id:1,name:"Examen T1: Microeconomía",date:"15/10/2024",grade:rnd(5,10),crit:[1,2,3,4]},
        {id:2,name:"Prueba: Mercados",date:"20/11/2024",grade:rnd(4,9),crit:[3,4,5]},
        {id:3,name:"Examen T1: Macroeconomía",date:"10/12/2024",grade:rnd(4,10),crit:[6,7,8]},
        {id:4,name:"Examen T2: Ciclos y Política",date:"20/02/2025",grade:rnd(5,10),crit:[9,10,11]},
        {id:5,name:"Prueba: Sistema Financiero",date:"15/03/2025",grade:rnd(4,9),crit:[12,13]},
      ],
      tgrades:{
        1:Object.fromEntries(SUBJECTS.map(sub=>[sub.name,rnd(4,10)])),
        2:Object.fromEntries(SUBJECTS.map(sub=>[sub.name,rnd(4,10)])),
        3:Object.fromEntries(SUBJECTS.map(sub=>[sub.name,rnd(4,10)])),
      },
      notes:[],
    };
  });
  return d;
};

function Av({initials,color,sz=48}){
  return(
    <div style={{width:sz,height:sz,borderRadius:"50%",background:color,display:"flex",alignItems:"center",
      justifyContent:"center",color:"white",fontWeight:700,fontSize:sz*0.34,flexShrink:0,letterSpacing:"-0.5px"}}>
      {initials}
    </div>
  );
}

function RadarChart({grades}){
  const sz=290,cx=145,cy=145,maxR=92;
  const n=SUBJECTS.length,step=(2*Math.PI)/n;
  const vals=SUBJECTS.map(s=>parseFloat(grades[s.name]||5));
  const avg=(vals.reduce((a,b)=>a+b,0)/n).toFixed(1);
  const pts=vals.map((g,i)=>{
    const a=i*step-Math.PI/2,r=(g/10)*maxR;
    return [cx+r*Math.cos(a),cy+r*Math.sin(a)];
  });
  const ptsStr=pts.map(p=>p.join(",")).join(" ");
  return(
    <svg width={sz} height={sz} style={{flexShrink:0}}>
      {[2,4,6,8,10].map(lv=>{
        const gp=Array.from({length:n},(_,i)=>{
          const a=i*step-Math.PI/2,r=(lv/10)*maxR;
          return `${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`;
        }).join(" ");
        return <polygon key={lv} points={gp} fill={lv%4===0?"#1a1a35":"none"} stroke="#2a2a50" strokeWidth={lv===10?1:0.5}/>;
      })}
      {Array.from({length:n},(_,i)=>{
        const a=i*step-Math.PI/2;
        return <line key={i} x1={cx} y1={cy} x2={cx+maxR*Math.cos(a)} y2={cy+maxR*Math.sin(a)} stroke="#2a2a50" strokeWidth={0.5}/>;
      })}
      {/* Grade labels on top axis */}
      {[4,6,8].map(lv=>(
        <text key={lv} x={cx+4} y={cy-(lv/10)*maxR+3} fill="#444" fontSize="8" fontFamily="system-ui">{lv}</text>
      ))}
      <polygon points={ptsStr} fill={AC} fillOpacity={0.2} stroke={AC} strokeWidth={2.5}/>
      {pts.map((p,i)=>(
        <circle key={i} cx={p[0]} cy={p[1]} r={5} fill={SUBJECTS[i].col} stroke={BG} strokeWidth={2}/>
      ))}
      {SUBJECTS.map((sub,i)=>{
        const a=i*step-Math.PI/2,lr=maxR+22;
        const lx=cx+lr*Math.cos(a),ly=cy+lr*Math.sin(a);
        const ca=Math.cos(a),sa=Math.sin(a);
        const anchor=ca>0.18?"start":ca<-0.18?"end":"middle";
        const g=vals[i];
        return(
          <g key={i}>
            <text x={lx} y={sa<-0.1?ly-9:sa>0.1?ly-1:ly-5} textAnchor={anchor} fill={sub.col} fontSize="9" fontFamily="system-ui" fontWeight="700">{sub.name}</text>
            <text x={lx} y={sa<-0.1?ly+3:sa>0.1?ly+11:ly+7} textAnchor={anchor} fill={g>=5?GR:RD} fontSize="11" fontFamily="system-ui" fontWeight="800">{g}</text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={22} fill={BG3} stroke={BR} strokeWidth={1}/>
      <text x={cx} y={cy-4} textAnchor="middle" fill="#555" fontSize="8" fontFamily="system-ui">media</text>
      <text x={cx} y={cy+10} textAnchor="middle" fill="white" fontSize="16" fontWeight="800" fontFamily="system-ui">{avg}</text>
    </svg>
  );
}

function Btn({children,onClick,style={}}){
  return(
    <div onClick={onClick} style={{borderRadius:8,padding:"10px 18px",cursor:"pointer",fontSize:14,fontWeight:600,
      textAlign:"center",background:AC,color:"white",transition:"opacity 0.15s",...style}}
      onMouseEnter={e=>e.currentTarget.style.opacity="0.82"}
      onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
      {children}
    </div>
  );
}

export default function App(){
  const [pg,setPg]=useState("login");
  const [role,setRole]=useState(null);
  const [user,setUser]=useState({name:"",sur:"",cid:"",role:"student"});
  const [cls,setCls]=useState(null);
  const [stu,setStu]=useState(null);
  const [sData,setSData]=useState(initData);
  const [tri,setTri]=useState(1);
  const [tab,setTab]=useState("criteria");
  const [note,setNote]=useState("");
  const [newTask,setNewTask]=useState("");
  const [tasks,setTasks]=useState([]);
  const [stuSubj,setStuSubj]=useState("Economía");

  const Nav=()=>(
    <div style={{background:BG2,borderBottom:`1px solid ${BR}`,padding:"14px 28px",display:"flex",gap:28,alignItems:"center",position:"sticky",top:0,zIndex:10}}>
      <span style={{fontWeight:800,fontSize:19,letterSpacing:"-0.5px"}}>Competencias<span style={{color:AC}}>AI</span></span>
      <div style={{width:1,height:20,background:BR}}/>
      {[["teacherHome","Perfil"],["classes","Clases"]].map(([p,l])=>(
        <span key={p} onClick={()=>setPg(p)}
          style={{cursor:"pointer",fontSize:14,fontWeight:600,color:pg===p?AC2:"#666",borderBottom:pg===p?`2px solid ${AC}`:0,paddingBottom:3}}>
          {l}
        </span>
      ))}
      <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:16}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <Av initials={(user.name[0]||"P").toUpperCase()+(user.sur[0]||"R").toUpperCase()} color={AC} sz={34}/>
          <span style={{fontSize:13,color:"#666"}}>{user.name||"Profesor"}{user.sur?" "+user.sur:""}</span>
        </div>
        <div style={{width:1,height:20,background:BR}}/>
        <span onClick={()=>{setPg("login");setRole(null);}} style={{cursor:"pointer",color:AC,fontSize:13,fontWeight:600,padding:"6px 12px",borderRadius:6,background:`${AC}20`,transition:"background 0.2s"}} onMouseEnter={e=>e.currentTarget.style.background=`${AC}40`} onMouseLeave={e=>e.currentTarget.style.background=`${AC}20`}>Salir</span>
      </div>
    </div>
  );

  if(pg==="login"){
    return(
      <div style={{minHeight:"100vh",background:BG,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"system-ui"}}>
        <div style={{background:BG2,borderRadius:20,padding:44,width:380,border:`1px solid ${BR}`,boxShadow:"0 32px 80px rgba(0,0,0,0.7)"}}>
          <div style={{textAlign:"center",marginBottom:36}}>
            <div style={{fontSize:32,fontWeight:800,color:"white",letterSpacing:"-1px"}}>Competencias<span style={{color:AC}}>AI</span></div>
            <div style={{color:"#444",fontSize:13,marginTop:6}}>Plataforma LOMLOE · Bachillerato</div>
          </div>
          {[["Nombre","name"],["Apellido","sur"],["ID Classroom","cid"]].map(([label,key])=>(
            <div key={key} style={{marginBottom:16}}>
              <label style={{color:"#666",fontSize:12,display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.5px"}}>{label}</label>
              <input value={user[key]} onChange={e=>setUser({...user,[key]:e.target.value})}
                style={{width:"100%",background:BG3,border:`1px solid ${BR}`,borderRadius:8,padding:"11px 14px",color:"white",fontSize:14,boxSizing:"border-box",outline:"none"}}
                placeholder={label}
                onFocus={e=>e.target.style.borderColor=AC}
                onBlur={e=>e.target.style.borderColor=BR}
              />
            </div>
          ))}
          <div style={{display:"flex",gap:8,marginBottom:28,marginTop:8}}>
            {[["student","Alumno"],["teacher","Profesor"]].map(([r,l])=>(
              <div key={r} onClick={()=>setUser({...user,role:r})}
                style={{flex:1,padding:"11px 0",borderRadius:8,textAlign:"center",cursor:"pointer",fontSize:14,fontWeight:600,
                  background:user.role===r?AC:BG3,color:user.role===r?"white":"#666",border:`2px solid ${user.role===r?AC:BR}`,transition:"all 0.2s"}}>
                {l}
              </div>
            ))}
          </div>
          <Btn onClick={()=>{setRole(user.role);setPg(user.role==="teacher"?"teacherHome":"studentHome");}} style={{width:"100%",padding:"13px 0",fontSize:15}}>
            Entrar →
          </Btn>
        </div>
      </div>
    );
  }

  // ── STUDENT HOME ─────────────────────────────────────────────────────────
  if(role==="student"){
    const s=STUDENTS[0];
    const sd=sData[s.id];
    const grades=sd.tgrades[tri];
    const sup=Object.values(sd.criteria).filter(Boolean).length;
    const hasMsg=sd.notes.length>0;
    const hasTask=tasks.length>0;
    const sorted=[...SUBJECTS].sort((a,b)=>parseFloat(grades[b.name])-parseFloat(grades[a.name]));
    return(
      <div style={{minHeight:"100vh",background:BG,fontFamily:"system-ui",color:"white"}}>
        <div style={{background:BG2,borderBottom:`1px solid ${BR}`,padding:"14px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:10}}>
          <span style={{fontWeight:800,fontSize:19,letterSpacing:"-0.5px"}}>Competencias<span style={{color:AC}}>AI</span></span>
          <div style={{display:"flex",gap:12,alignItems:"center"}}>
            <span style={{color:"#555",fontSize:12,background:BG3,border:`1px solid ${BR}`,borderRadius:6,padding:"4px 10px"}}>Vista alumno</span>
            <span onClick={()=>{setPg("login");setRole(null);}} style={{cursor:"pointer",color:AC,fontSize:13,fontWeight:600,padding:"6px 12px",borderRadius:6,background:`${AC}20`,transition:"background 0.2s"}} onMouseEnter={e=>e.currentTarget.style.background=`${AC}40`} onMouseLeave={e=>e.currentTarget.style.background=`${AC}20`}>Salir</span>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        {(hasMsg||hasTask)&&(
          <div style={{maxWidth:840,margin:"16px auto 0",padding:"0 16px",display:"flex",flexDirection:"column",gap:8}}>
            {hasMsg&&(
              <div style={{background:"#061611",border:"1px solid #10b98145",borderRadius:12,padding:"14px 18px",display:"flex",gap:14,alignItems:"flex-start"}}>
                <div style={{width:36,height:36,borderRadius:10,background:"#10b98118",border:"1px solid #10b98130",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>💬</div>
                <div>
                  <div style={{fontSize:14,fontWeight:700,color:"#6ee7b7"}}>Tu profesor te ha enviado un mensaje</div>
                  <div style={{fontSize:13,color:"#555",marginTop:4,fontStyle:"italic",lineHeight:1.4}}>"{sd.notes[sd.notes.length-1].text}"</div>
                  <div style={{fontSize:11,color:"#374151",marginTop:6}}>{sd.notes[sd.notes.length-1].date}</div>
                </div>
              </div>
            )}
            {hasTask&&(
              <div style={{background:"#070814",border:"1px solid #6c63ff45",borderRadius:12,padding:"14px 18px",display:"flex",gap:14,alignItems:"flex-start"}}>
                <div style={{width:36,height:36,borderRadius:10,background:"#6c63ff18",border:"1px solid #6c63ff30",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>📌</div>
                <div>
                  <div style={{fontSize:14,fontWeight:700,color:AC2}}>Nueva tarea asignada por tu profesor</div>
                  <div style={{fontSize:13,color:"#555",marginTop:4,fontStyle:"italic"}}>"{tasks[tasks.length-1]?.text}"</div>
                  <div style={{fontSize:11,color:"#374151",marginTop:6}}>{tasks[tasks.length-1]?.date}</div>
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{maxWidth:840,margin:"0 auto",padding:"20px 16px"}}>
          {/* Profile */}
          <div style={{background:BG2,borderRadius:16,padding:24,display:"flex",gap:20,alignItems:"center",marginBottom:18,border:`1px solid ${BR}`}}>
            <Av initials={s.av} color={s.cl} sz={74}/>
            <div style={{flex:1}}>
              <div style={{fontSize:22,fontWeight:800,letterSpacing:"-0.5px"}}>{user.name||s.name} {user.sur}</div>
              <div style={{color:"#666",marginTop:4,fontSize:14}}>1º Bachillerato A · {s.age} años · {stuSubj}</div>
              <div style={{color:AC2,fontSize:12,marginTop:4}}>ID: {user.cid||"BCH-2024-001"}</div>
            </div>
            <div style={{display:"flex",gap:10}}>
              <div style={{textAlign:"center",background:BG3,borderRadius:10,padding:"12px 18px",border:`1px solid ${BR}`}}>
                <div style={{fontSize:22,fontWeight:800,color:GR}}>{sup}/{CRITERIA.length}</div>
                <div style={{fontSize:10,color:"#555",marginTop:2}}>criterios</div>
              </div>
              <div style={{textAlign:"center",background:BG3,borderRadius:10,padding:"12px 18px",border:`1px solid ${BR}`}}>
                <div style={{fontSize:22,fontWeight:800,color:AC2}}>{Math.round(sup/CRITERIA.length*100)}%</div>
                <div style={{fontSize:10,color:"#555",marginTop:2}}>progreso</div>
              </div>
            </div>
          </div>

          {/* Subjects menu */}
          <div style={{display:"flex",gap:10,overflowX:"auto",marginBottom:18,paddingBottom:8,WebkitOverflowScrolling:"touch"}} className="hide-scroll">
            <style>{`.hide-scroll::-webkit-scrollbar { display: none; } .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
            {SUBJECTS.map(sub=>(
              <div key={sub.name} onClick={()=>setStuSubj(sub.name)}
                style={{padding:"8px 18px",borderRadius:20,cursor:"pointer",fontSize:13,fontWeight:600,whiteSpace:"nowrap",
                  background:stuSubj===sub.name?sub.col:BG3,color:stuSubj===sub.name?"white":"#aaa",border:`1px solid ${stuSubj===sub.name?sub.col:BR}`,transition:"all 0.2s"}}>
                {sub.name}
              </div>
            ))}
          </div>

          {/* Trimester */}
          <div style={{display:"flex",gap:8,marginBottom:18}}>
            {[1,2,3].map(t=>(
              <div key={t} onClick={()=>setTri(t)}
                style={{flex:1,padding:"10px 0",borderRadius:8,textAlign:"center",cursor:"pointer",fontWeight:600,fontSize:13,
                  transition:"all 0.2s",background:tri===t?AC:BG2,border:`1px solid ${tri===t?AC:BR}`,color:tri===t?"white":"#666"}}>
                {t}º Trimestre
              </div>
            ))}
          </div>

          {/* RADAR CHART + ALL SUBJECT GRADES */}
          <div style={{background:BG2,borderRadius:16,padding:24,marginBottom:18,border:`1px solid ${BR}`}}>
            <div style={{fontWeight:700,marginBottom:20,fontSize:15,color:"#ccc"}}>Desarrollo por materias — {tri}º Trimestre</div>
            <div style={{display:"flex",gap:16,alignItems:"flex-start",flexWrap:"wrap",justifyContent:"center"}}>
              <RadarChart grades={grades}/>
              <div style={{flex:1,minWidth:210}}>
                {sorted.map((sub,i)=>{
                  const g=parseFloat(grades[sub.name]||5);
                  return(
                    <div key={i} style={{marginBottom:12}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,alignItems:"center"}}>
                        <div style={{display:"flex",gap:7,alignItems:"center"}}>
                          <div style={{width:9,height:9,borderRadius:2,background:sub.col,flexShrink:0}}/>
                          <span style={{fontSize:13,color:"#bbb"}}>{sub.name}</span>
                        </div>
                        <div style={{display:"flex",gap:6,alignItems:"center"}}>
                          <span style={{fontWeight:800,color:g>=5?GR:RD,fontSize:15,minWidth:28,textAlign:"right"}}>{g}</span>
                          <span style={{fontSize:10,padding:"1px 5px",borderRadius:4,background:g>=5?"#071a0f":"#1a0709",
                            color:g>=5?"#6ee7b7":RD,fontWeight:700}}>{g>=5?"✓":"✗"}</span>
                        </div>
                      </div>
                      <div style={{background:BG4,borderRadius:5,height:7,overflow:"hidden"}}>
                        <div style={{width:`${g*10}%`,height:"100%",background:`linear-gradient(90deg,${sub.col}99,${sub.col})`,transition:"width 0.5s"}}/>
                      </div>
                    </div>
                  );
                })}
                <div style={{marginTop:16,background:BG3,borderRadius:10,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",border:`1px solid ${BR}`}}>
                  <div>
                    <div style={{color:"#888",fontSize:12}}>Media global</div>
                    <div style={{color:"#555",fontSize:11,marginTop:2}}>{SUBJECTS.filter(s=>parseFloat(grades[s.name])>=5).length} de {SUBJECTS.length} aprobadas</div>
                  </div>
                  <span style={{fontWeight:800,color:AC2,fontSize:22}}>
                    {(SUBJECTS.reduce((a,s)=>a+parseFloat(grades[s.name]||5),0)/SUBJECTS.length).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Subject criteria */}
          <div style={{background:BG2,borderRadius:16,padding:24,marginBottom:18,border:`1px solid ${BR}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div style={{fontWeight:700,fontSize:15,color:"#ccc"}}>Criterios LOMLOE — {stuSubj}</div>
              <span style={{fontSize:12,color:"#555",background:BG3,borderRadius:6,padding:"3px 10px",border:`1px solid ${BR}`}}>
                {sup}/{CRITERIA.length} superados
              </span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
              {CRITERIA.map(c=>{
                const ok=sd.criteria[c.id];
                return(
                  <div key={c.id} style={{display:"flex",alignItems:"flex-start",gap:9,padding:"9px 11px",
                    background:ok?"#061611":BG3,borderRadius:8,border:`1px solid ${ok?"#10b98135":BR}`}}>
                    <div style={{width:15,height:15,borderRadius:4,background:ok?GR:"#2a2a50",display:"flex",
                      alignItems:"center",justifyContent:"center",fontSize:9,flexShrink:0,marginTop:2,color:"white",fontWeight:700}}>
                      {ok?"✓":""}
                    </div>
                    <div>
                      <div style={{color:AC2,fontSize:10,fontWeight:700}}>{c.code}</div>
                      <div style={{fontSize:11,color:ok?"#86efac":"#666",lineHeight:1.4,marginTop:2}}>{c.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Teacher messages */}
          <div style={{background:BG2,borderRadius:16,padding:24,marginBottom:18,border:`1px solid ${BR}`}}>
            <div style={{fontWeight:700,marginBottom:14,fontSize:15,color:"#ccc"}}>Anotaciones del profesorado</div>
            {sd.notes.length>0 ? sd.notes.map((n,i)=>(
              <div key={i} style={{background:BG3,borderRadius:10,padding:"14px 16px",marginBottom:8,
                border:`1px solid ${BR}`,display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{width:30,height:30,borderRadius:8,background:"#10b98112",border:"1px solid #10b98130",
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>💬</div>
                <div>
                  <div style={{fontSize:13,color:"#ccc",lineHeight:1.5}}>{n.text}</div>
                  <div style={{fontSize:11,color:"#444",marginTop:6}}>Recibido el {n.date}</div>
                </div>
              </div>
            )) : (
              <div style={{color:"#555",fontSize:13,fontStyle:"italic",textAlign:"center",padding:"10px 0"}}>
                No tienes anotaciones recientes en esta asignatura.
              </div>
            )}
          </div>

          {/* Class tasks */}
          {tasks.length>0&&(
            <div style={{background:BG2,borderRadius:16,padding:24,border:`1px solid ${BR}`}}>
              <div style={{fontWeight:700,marginBottom:14,fontSize:15,color:"#ccc"}}>Tareas y recordatorios</div>
              {tasks.map((t,i)=>(
                <div key={i} style={{background:BG3,borderRadius:10,padding:"14px 16px",marginBottom:8,
                  border:`1px solid ${BR}`,display:"flex",gap:12,alignItems:"flex-start"}}>
                  <div style={{width:30,height:30,borderRadius:8,background:"#6c63ff12",border:"1px solid #6c63ff30",
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>📌</div>
                  <div>
                    <div style={{fontSize:13,color:"#ccc"}}>{t.text}</div>
                    <div style={{fontSize:11,color:"#444",marginTop:6}}>Asignado el {t.date}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── TEACHER HOME ──────────────────────────────────────────────────────────
  if(pg==="teacherHome"){
    const avgSup=Math.round(STUDENTS.map(s=>Object.values(sData[s.id].criteria).filter(Boolean).length).reduce((a,b)=>a+b,0)/STUDENTS.length);
    return(
      <div style={{minHeight:"100vh",background:BG,fontFamily:"system-ui",color:"white"}}>
        <Nav/>
        <div style={{maxWidth:900,margin:"0 auto",padding:"32px 16px"}}>
          <div style={{background:BG2,borderRadius:20,padding:32,display:"flex",gap:28,alignItems:"center",marginBottom:28,border:`1px solid ${BR}`}}>
            <Av initials={(user.name[0]||"P").toUpperCase()+(user.sur[0]||"R").toUpperCase()} color={AC} sz={96}/>
            <div>
              <div style={{fontSize:28,fontWeight:800,letterSpacing:"-0.5px"}}>{user.name||"Nombre"} {user.sur||"Apellido"}</div>
              <div style={{color:AC2,fontWeight:700,marginTop:6,fontSize:16}}>Economía · 1º Bachillerato</div>
              <div style={{color:"#555",marginTop:8,fontSize:13}}>Clases: {CLASSES.map(c=>c.name).join(" · ")}</div>
              <div style={{color:"#444",fontSize:12,marginTop:4}}>ID: {user.cid||"PROF-2024-ECO"}</div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:28}}>
            {[{l:"Alumnos",v:STUDENTS.length,c:"#6c63ff"},{l:"Clases activas",v:CLASSES.length,c:GR},{l:"Criterios LOMLOE",v:CRITERIA.length,c:"#f59e0b"},{l:"Media criterios",v:`${avgSup}/${CRITERIA.length}`,c:"#06b6d4"}].map((s,i)=>(
              <div key={i} style={{background:BG2,borderRadius:12,padding:"18px 16px",border:`1px solid ${s.c}30`,textAlign:"center"}}>
                <div style={{fontSize:28,fontWeight:800,color:s.c}}>{s.v}</div>
                <div style={{color:"#555",fontSize:12,marginTop:4}}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{fontWeight:700,fontSize:15,marginBottom:14,color:"#ccc"}}>Acceso rápido a clases</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
            {CLASSES.map(cl=>(
              <div key={cl.id} onClick={()=>{setCls(cl);setPg("classDetail");}}
                style={{background:BG2,borderRadius:14,padding:22,cursor:"pointer",border:`1px solid ${BR}`,transition:"border 0.2s"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor=AC}
                onMouseLeave={e=>e.currentTarget.style.borderColor=BR}>
                <div style={{fontWeight:800,fontSize:18}}>{cl.name}</div>
                <div style={{color:AC2,fontSize:13,marginTop:4}}>{cl.subj}</div>
                <div style={{color:"#555",fontSize:12,marginTop:10}}>{cl.ids.length} alumnos</div>
                <div style={{marginTop:14,background:AC,borderRadius:8,padding:"8px 0",textAlign:"center",fontSize:13,fontWeight:600}}>Ver clase →</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if(pg==="classes"){
    return(
      <div style={{minHeight:"100vh",background:BG,fontFamily:"system-ui",color:"white"}}>
        <Nav/>
        <div style={{maxWidth:900,margin:"0 auto",padding:"32px 16px"}}>
          <div style={{fontWeight:800,fontSize:22,marginBottom:24,letterSpacing:"-0.5px"}}>Mis clases</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:16}}>
            {CLASSES.map(cl=>(
              <div key={cl.id} onClick={()=>{setCls(cl);setPg("classDetail");}}
                style={{background:BG2,borderRadius:16,padding:24,cursor:"pointer",border:`1px solid ${BR}`,transition:"border 0.2s"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor=AC}
                onMouseLeave={e=>e.currentTarget.style.borderColor=BR}>
                <div style={{fontWeight:800,fontSize:20}}>{cl.name}</div>
                <div style={{color:AC2,fontWeight:600,marginTop:6}}>{cl.subj}</div>
                <div style={{color:"#555",marginTop:12,fontSize:13}}>{cl.ids.length} alumnos</div>
                <div style={{marginTop:16,background:AC,borderRadius:8,padding:"9px 0",textAlign:"center",fontSize:13,fontWeight:600}}>Gestionar →</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if(pg==="classDetail"&&cls){
    const students=STUDENTS.filter(s=>cls.ids.includes(s.id));
    return(
      <div style={{minHeight:"100vh",background:BG,fontFamily:"system-ui",color:"white"}}>
        <Nav/>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"24px 16px"}}>
          <div style={{display:"flex",gap:6,marginBottom:20,color:"#555",fontSize:13}}>
            <span onClick={()=>setPg("classes")} style={{cursor:"pointer",color:AC2}}>Clases</span>
            <span>›</span><span style={{color:"#888"}}>{cls.name}</span>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24,gap:16,flexWrap:"wrap"}}>
            <div>
              <div style={{fontWeight:800,fontSize:24,letterSpacing:"-0.5px"}}>{cls.name}</div>
              <div style={{color:AC2,fontWeight:600,marginTop:4,fontSize:14}}>{cls.subj} · {students.length} alumnos</div>
            </div>
            <div style={{display:"flex",gap:8,flex:1,maxWidth:440}}>
              <input value={newTask} onChange={e=>setNewTask(e.target.value)}
                placeholder="Añadir tarea o recordatorio para la clase..."
                style={{flex:1,background:BG3,border:`1px solid ${BR}`,borderRadius:8,padding:"9px 12px",color:"white",fontSize:13,outline:"none"}}
                onFocus={e=>e.target.style.borderColor=AC}
                onBlur={e=>e.target.style.borderColor=BR}
              />
              <Btn onClick={()=>{if(newTask.trim()){setTasks([...tasks,{text:newTask,date:new Date().toLocaleDateString()}]);setNewTask("");}}} style={{whiteSpace:"nowrap",padding:"9px 16px"}}>
                + Añadir
              </Btn>
            </div>
          </div>
          {tasks.length>0&&(
            <div style={{marginBottom:20,display:"flex",gap:8,flexWrap:"wrap"}}>
              {tasks.map((t,i)=>(
                <div key={i} style={{background:"#071a0f",border:"1px solid #10b98140",borderRadius:8,padding:"6px 12px",fontSize:12,color:"#86efac",display:"flex",gap:8,alignItems:"center"}}>
                  📌 {t.text}
                  <span onClick={()=>setTasks(tasks.filter((_,j)=>j!==i))} style={{cursor:"pointer",color:"#555",marginLeft:2}}>✕</span>
                </div>
              ))}
            </div>
          )}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:12}}>
            {students.map(s=>{
              const sup=Object.values(sData[s.id].criteria).filter(Boolean).length;
              const pct=Math.round(sup/CRITERIA.length*100);
              return(
                <div key={s.id} onClick={()=>{setStu(s);setPg("studentDetail");setTab("criteria");}}
                  style={{background:BG2,borderRadius:12,padding:16,cursor:"pointer",border:`1px solid ${BR}`,textAlign:"center",transition:"border 0.2s"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=s.cl}
                  onMouseLeave={e=>e.currentTarget.style.borderColor=BR}>
                  <div style={{display:"flex",justifyContent:"center"}}><Av initials={s.av} color={s.cl} sz={50}/></div>
                  <div style={{marginTop:10,fontWeight:600,fontSize:12,lineHeight:1.3,color:"#ccc"}}>{s.name}</div>
                  <div style={{fontSize:11,color:"#555",marginTop:6}}>{pct}%</div>
                  <div style={{marginTop:6,background:BG4,borderRadius:4,height:4,overflow:"hidden"}}>
                    <div style={{width:`${pct}%`,height:"100%",background:s.cl}}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if(pg==="studentDetail"&&stu){
    const s=stu,sd=sData[s.id];
    const sup=Object.values(sd.criteria).filter(Boolean).length;
    const toggle=cid=>setSData(p=>({...p,[s.id]:{...p[s.id],criteria:{...p[s.id].criteria,[cid]:!p[s.id].criteria[cid]}}}));
    const sendNote=()=>{
      if(!note.trim())return;
      setSData(p=>({...p,[s.id]:{...p[s.id],notes:[...p[s.id].notes,{text:note,date:new Date().toLocaleDateString()}]}}));
      setNote("");
    };
    return(
      <div style={{minHeight:"100vh",background:BG,fontFamily:"system-ui",color:"white"}}>
        <Nav/>
        <div style={{maxWidth:900,margin:"0 auto",padding:"24px 16px"}}>
          <div style={{display:"flex",gap:6,marginBottom:20,color:"#555",fontSize:13}}>
            <span onClick={()=>setPg("classes")} style={{cursor:"pointer",color:AC2}}>Clases</span>
            <span>›</span>
            <span onClick={()=>setPg("classDetail")} style={{cursor:"pointer",color:AC2}}>{cls?.name}</span>
            <span>›</span><span style={{color:"#888"}}>{s.name}</span>
          </div>
          <div style={{background:BG2,borderRadius:16,padding:24,display:"flex",gap:20,alignItems:"center",marginBottom:24,border:`1px solid ${BR}`}}>
            <Av initials={s.av} color={s.cl} sz={72}/>
            <div style={{flex:1}}>
              <div style={{fontSize:22,fontWeight:800,letterSpacing:"-0.5px"}}>{s.name}</div>
              <div style={{color:"#666",marginTop:4,fontSize:14}}>{cls?.name} · {s.age} años</div>
              <div style={{display:"flex",gap:20,marginTop:14}}>
                {[[sup,"Superados",GR],[CRITERIA.length-sup,"Pendientes","#666"],[`${Math.round(sup/CRITERIA.length*100)}%`,"Progreso",AC2]].map(([v,l,c])=>(
                  <div key={l}><div style={{fontSize:20,fontWeight:800,color:c}}>{v}</div><div style={{fontSize:11,color:"#555"}}>{l}</div></div>
                ))}
              </div>
            </div>
          </div>
          <div style={{display:"flex",gap:4,marginBottom:24,background:BG2,borderRadius:10,padding:4,border:`1px solid ${BR}`}}>
            {[["criteria","Criterios"],["grades","Exámenes"],["notes","Mensajes"]].map(([k,l])=>(
              <div key={k} onClick={()=>setTab(k)}
                style={{flex:1,padding:"9px 0",borderRadius:7,textAlign:"center",cursor:"pointer",fontSize:13,fontWeight:600,
                  background:tab===k?AC:"transparent",color:tab===k?"white":"#666",transition:"all 0.2s"}}>
                {l}
              </div>
            ))}
          </div>
          {tab==="criteria"&&(
            <div>
              <div style={{fontSize:12,color:"#555",marginBottom:12}}>Clic para marcar criterio como superado o pendiente</div>
              {CRITERIA.map(c=>{
                const ok=sd.criteria[c.id];
                return(
                  <div key={c.id} onClick={()=>toggle(c.id)}
                    style={{display:"flex",alignItems:"center",gap:14,marginBottom:7,padding:"12px 16px",
                      background:ok?"#061611":BG2,borderRadius:10,cursor:"pointer",border:`1px solid ${ok?"#10b98140":BR}`,transition:"all 0.2s"}}>
                    <div style={{width:22,height:22,borderRadius:6,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",
                      background:ok?GR:"#2a2a50",fontSize:12,fontWeight:700,color:"white"}}>
                      {ok?"✓":""}
                    </div>
                    <div style={{flex:1}}>
                      <span style={{color:AC2,fontSize:11,fontWeight:700}}>{c.code} — </span>
                      <span style={{fontSize:13,color:ok?"#86efac":"#888"}}>{c.desc}</span>
                    </div>
                    <span style={{fontSize:11,fontWeight:700,color:ok?GR:"#444",flexShrink:0,minWidth:70,textAlign:"right"}}>
                      {ok?"SUPERADO":"PENDIENTE"}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
          {tab==="grades"&&(
            <div>
              {sd.exams.map(ex=>(
                <div key={ex.id} style={{background:BG2,borderRadius:12,padding:20,marginBottom:12,border:`1px solid ${BR}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                    <div>
                      <div style={{fontWeight:700,fontSize:15}}>{ex.name}</div>
                      <div style={{color:"#555",fontSize:12,marginTop:2}}>{ex.date}</div>
                    </div>
                    <div style={{fontSize:34,fontWeight:800,color:ex.grade>=5?GR:RD}}>{ex.grade}</div>
                  </div>
                  <div style={{fontSize:12,color:"#555",marginBottom:8}}>Criterios evaluados:</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {ex.crit.map(cid=>{
                      const c=CRITERIA.find(cr=>cr.id===cid);
                      return c?<span key={cid} style={{background:BG4,borderRadius:6,padding:"3px 8px",fontSize:11,color:AC2,fontWeight:600}}>{c.code}</span>:null;
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab==="notes"&&(
            <div>
              <div style={{background:BG2,borderRadius:12,padding:16,marginBottom:16,border:`1px solid ${BR}`}}>
                <textarea value={note} onChange={e=>setNote(e.target.value)}
                  placeholder={`Escribe un mensaje para ${s.name.split(" ")[0]}...`}
                  style={{width:"100%",background:BG3,border:`1px solid ${BR}`,borderRadius:8,padding:12,color:"white",
                    fontSize:13,resize:"vertical",minHeight:80,boxSizing:"border-box",outline:"none",fontFamily:"system-ui"}}
                  onFocus={e=>e.target.style.borderColor=AC}
                  onBlur={e=>e.target.style.borderColor=BR}
                />
                <Btn onClick={sendNote} style={{marginTop:10,width:"100%"}}>Enviar mensaje al alumno</Btn>
              </div>
              {sd.notes.length===0&&<div style={{color:"#444",textAlign:"center",padding:40,fontSize:14}}>Sin mensajes para este alumno</div>}
              {sd.notes.map((n,i)=>(
                <div key={i} style={{background:BG2,borderRadius:10,padding:16,marginBottom:8,border:`1px solid ${BR}`}}>
                  <div style={{fontSize:13,color:"#ccc"}}>{n.text}</div>
                  <div style={{fontSize:11,color:"#555",marginTop:8}}>Enviado el {n.date}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
