import { useState, useEffect } from 'react';

const BG='#05050A', BG2='rgba(20, 20, 35, 0.4)', BG3='rgba(30, 30, 45, 0.6)', BG4='rgba(40, 40, 60, 0.7)';
const AC='#6c63ff', AC2='#8b85ff', GR='#10b981', RD='#ef4444', BR='rgba(255,255,255,0.08)';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Syne:wght@600;800&display=swap');
  
  :root {
    --bg: #05050A;
    --card-bg: rgba(20, 20, 35, 0.4);
    --card-border: rgba(255, 255, 255, 0.08);
    --accent: #6C63FF;
    --accent-glow: rgba(108, 99, 255, 0.4);
  }
  
  body {
    background-color: var(--bg);
    color: white;
    font-family: 'Outfit', sans-serif;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
  
  .glass-panel {
    background: var(--card-bg);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid var(--card-border);
    border-radius: 24px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.4), 
                inset 0 1px 0 rgba(255,255,255,0.1),
                inset 0 -1px 0 rgba(0,0,0,0.2);
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
  }
  
  .glass-panel:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 30px 60px rgba(0,0,0,0.5), 
                0 0 40px var(--accent-glow),
                inset 0 1px 0 rgba(255,255,255,0.2);
  }

  .glass-item {
    background: rgba(30, 30, 45, 0.4);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 16px;
    transition: all 0.3s ease;
  }
  .glass-item:hover {
    background: rgba(40, 40, 60, 0.6);
    border-color: rgba(255,255,255,0.15);
  }

  .title-3d {
    font-family: 'Syne', sans-serif;
    background: linear-gradient(135deg, #fff 0%, #a5a5b5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5));
    letter-spacing: -1px;
  }

  .ambient-bg {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    z-index: -1;
    background: radial-gradient(circle at 15% 50%, rgba(108, 99, 255, 0.12), transparent 25%),
                radial-gradient(circle at 85% 30%, rgba(16, 185, 129, 0.08), transparent 25%),
                radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.08), transparent 25%);
    filter: blur(60px);
    animation: pulseBg 15s ease-in-out infinite alternate;
  }
  
  @keyframes pulseBg {
    0% { transform: scale(1) rotate(0deg); opacity: 0.8; }
    100% { transform: scale(1.1) rotate(2deg); opacity: 1; }
  }

  .hide-scroll::-webkit-scrollbar { display: none; }
  .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
  
  .btn-3d {
    background: linear-gradient(135deg, var(--accent) 0%, #4a43b8 100%);
    border: 1px solid rgba(255,255,255,0.2);
    box-shadow: 0 10px 20px rgba(108,99,255,0.3), inset 0 2px 0 rgba(255,255,255,0.2);
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    color: white;
    font-weight: 600;
    font-family: 'Outfit', sans-serif;
    cursor: pointer;
    border-radius: 12px;
    padding: 12px 24px;
    text-align: center;
  }
  .btn-3d:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(108,99,255,0.5), inset 0 2px 0 rgba(255,255,255,0.4);
  }
  .btn-3d:active {
    transform: translateY(1px);
    box-shadow: 0 5px 10px rgba(108,99,255,0.3), inset 0 0px 0 rgba(255,255,255,0);
  }
  
  .input-3d {
    background: rgba(10, 10, 20, 0.5);
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
    color: white;
    border-radius: 12px;
    padding: 14px 18px;
    font-family: 'Outfit', sans-serif;
    outline: none;
    transition: all 0.3s ease;
  }
  .input-3d:focus {
    border-color: var(--accent);
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.5), 0 0 15px rgba(108,99,255,0.3);
  }
  
  .pill-nav {
    padding: 10px 20px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    transition: all 0.3s ease;
    border: 1px solid transparent;
  }
  .pill-nav.active {
    box-shadow: 0 8px 16px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.2);
  }
`;

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

const CRITERIA_ECONOMIA=[
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

const getCriteriaForSubj = (subj) => {
  if (subj === "Economía") return CRITERIA_ECONOMIA;
  if (subj === "Matemáticas") return [
    {id:1,code:"CE1.1",desc:"Resuelve problemas matemáticos complejos usando álgebra y geometría"},
    {id:2,code:"CE1.2",desc:"Comprende y aplica el cálculo diferencial en situaciones reales"},
    {id:3,code:"CE2.1",desc:"Analiza funciones y gráficas matemáticas"},
    {id:4,code:"CE2.2",desc:"Aplica la estadística y probabilidad a la toma de decisiones"},
    {id:5,code:"CE3.1",desc:"Utiliza el razonamiento lógico-matemático en contextos reales"}
  ];
  if (subj === "Lengua") return [
    {id:1,code:"CE1.1",desc:"Analiza sintáctica y morfológicamente oraciones y textos"},
    {id:2,code:"CE1.2",desc:"Comprende e interpreta textos literarios de diferentes épocas"},
    {id:3,code:"CE2.1",desc:"Redacta textos argumentativos y expositivos con coherencia"},
    {id:4,code:"CE2.2",desc:"Identifica y utiliza figuras retóricas y recursos literarios"}
  ];
  if (subj === "Filosofía") return [
    {id:1,code:"CE1.1",desc:"Analiza críticamente textos filosóficos clásicos y contemporáneos"},
    {id:2,code:"CE1.2",desc:"Argumenta sobre problemas éticos y morales de la actualidad"},
    {id:3,code:"CE2.1",desc:"Comprende la evolución del pensamiento filosófico"}
  ];
  if (subj === "Inglés") return [
    {id:1,code:"CE1.1",desc:"Comprende textos orales y escritos complejos en inglés"},
    {id:2,code:"CE1.2",desc:"Se expresa con fluidez y precisión en situaciones comunicativas"},
    {id:3,code:"CE2.1",desc:"Aplica conocimientos léxicos y gramaticales avanzados"}
  ];
  return [
    {id:1,code:"CE1.1",desc:`Comprende los fundamentos teóricos de ${subj}`},
    {id:2,code:"CE1.2",desc:`Aplica técnicas específicas de ${subj} en proyectos prácticos`},
    {id:3,code:"CE2.1",desc:`Analiza críticamente la información y fuentes de ${subj}`},
    {id:4,code:"CE2.2",desc:`Demuestra habilidades de resolución en el contexto de ${subj}`}
  ];
};

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
    const criteria = {};
    SUBJECTS.forEach(sub => {
      const crit = getCriteriaForSubj(sub.name);
      crit.forEach(c => {
        const isEco = sub.name === "Economía";
        criteria[`${sub.name}_${c.id}`] = Math.random() > (isEco ? 0.2 : 0.5);
      });
    });

    d[s.id]={
      criteria,
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
    <div style={{width:sz,height:sz,borderRadius:"50%",background:`linear-gradient(135deg, ${color} 0%, ${color}88 100%)`,display:"flex",alignItems:"center",
      justifyContent:"center",color:"white",fontWeight:800,fontSize:sz*0.35,flexShrink:0,letterSpacing:"-0.5px",
      boxShadow:`0 10px 20px ${color}40, inset 0 2px 0 rgba(255,255,255,0.3)`}}>
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
    <svg width={sz} height={sz} style={{flexShrink:0, filter:"drop-shadow(0 10px 20px rgba(0,0,0,0.5))"}}>
      {[2,4,6,8,10].map(lv=>{
        const gp=Array.from({length:n},(_,i)=>{
          const a=i*step-Math.PI/2,r=(lv/10)*maxR;
          return `${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`;
        }).join(" ");
        return <polygon key={lv} points={gp} fill={lv%4===0?"rgba(255,255,255,0.02)":"none"} stroke="rgba(255,255,255,0.08)" strokeWidth={lv===10?1:0.5}/>;
      })}
      {Array.from({length:n},(_,i)=>{
        const a=i*step-Math.PI/2;
        return <line key={i} x1={cx} y1={cy} x2={cx+maxR*Math.cos(a)} y2={cy+maxR*Math.sin(a)} stroke="rgba(255,255,255,0.08)" strokeWidth={0.5}/>;
      })}
      {[4,6,8].map(lv=>(
        <text key={lv} x={cx+4} y={cy-(lv/10)*maxR+3} fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="'Outfit', sans-serif">{lv}</text>
      ))}
      <polygon points={ptsStr} fill={AC} fillOpacity={0.25} stroke={AC} strokeWidth={2.5} filter="drop-shadow(0 0 10px rgba(108,99,255,0.5))"/>
      {pts.map((p,i)=>(
        <circle key={i} cx={p[0]} cy={p[1]} r={5} fill={SUBJECTS[i].col} stroke={BG} strokeWidth={2} filter={`drop-shadow(0 0 5px ${SUBJECTS[i].col})`}/>
      ))}
      {SUBJECTS.map((sub,i)=>{
        const a=i*step-Math.PI/2,lr=maxR+25;
        const lx=cx+lr*Math.cos(a),ly=cy+lr*Math.sin(a);
        const ca=Math.cos(a),sa=Math.sin(a);
        const anchor=ca>0.18?"start":ca<-0.18?"end":"middle";
        const g=vals[i];
        return(
          <g key={i} style={{transition:"all 0.3s ease"}}>
            <text x={lx} y={sa<-0.1?ly-9:sa>0.1?ly-1:ly-5} textAnchor={anchor} fill={sub.col} fontSize="10" fontFamily="'Outfit', sans-serif" fontWeight="600" filter={`drop-shadow(0 2px 4px rgba(0,0,0,0.8))`}>{sub.name}</text>
            <text x={lx} y={sa<-0.1?ly+4:sa>0.1?ly+12:ly+8} textAnchor={anchor} fill={g>=5?GR:RD} fontSize="12" fontFamily="'Syne', sans-serif" fontWeight="800">{g}</text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={24} fill="rgba(20,20,35,0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth={1} style={{backdropFilter:"blur(10px)"}}/>
      <text x={cx} y={cy-4} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="'Outfit', sans-serif">MEDIA</text>
      <text x={cx} y={cy+11} textAnchor="middle" fill="white" fontSize="17" fontWeight="800" fontFamily="'Syne', sans-serif">{avg}</text>
    </svg>
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

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  const Nav=()=>(
    <div style={{background:"rgba(10,10,15,0.8)", backdropFilter:"blur(20px)", borderBottom:`1px solid ${BR}`,padding:"14px 32px",display:"flex",gap:28,alignItems:"center",position:"sticky",top:0,zIndex:10, boxShadow:"0 10px 30px rgba(0,0,0,0.5)"}}>
      <span className="title-3d" style={{fontSize:22}}>Competencias<span style={{color:AC}}>AI</span></span>
      <div style={{width:1,height:24,background:BR}}/>
      {[["teacherHome","Panel de Control"],["classes","Mis Clases"]].map(([p,l])=>(
        <span key={p} onClick={()=>setPg(p)}
          style={{cursor:"pointer",fontSize:14,fontWeight:600,color:pg===p?"#fff":"rgba(255,255,255,0.5)",borderBottom:pg===p?`2px solid ${AC}`:0,paddingBottom:4,transition:"all 0.2s"}}>
          {l}
        </span>
      ))}
      <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:20}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <Av initials={(user.name[0]||"P").toUpperCase()+(user.sur[0]||"R").toUpperCase()} color={AC} sz={38}/>
          <div style={{display:"flex", flexDirection:"column"}}>
            <span style={{fontSize:14,color:"white",fontWeight:600}}>{user.name||"Profesor"}{user.sur?" "+user.sur:""}</span>
            <span style={{fontSize:11,color:"rgba(255,255,255,0.5)"}}>Dpto. Economía</span>
          </div>
        </div>
        <div style={{width:1,height:24,background:BR}}/>
        <span onClick={()=>{setPg("login");setRole(null);}} style={{cursor:"pointer",color:AC,fontSize:13,fontWeight:600,padding:"8px 16px",borderRadius:12,background:`rgba(108, 99, 255, 0.15)`, border:"1px solid rgba(108,99,255,0.3)",transition:"all 0.3s"}} onMouseEnter={e=>{e.currentTarget.style.background=`rgba(108, 99, 255, 0.3)`;e.currentTarget.style.transform="translateY(-2px)"}} onMouseLeave={e=>{e.currentTarget.style.background=`rgba(108, 99, 255, 0.15)`;e.currentTarget.style.transform="translateY(0)"}}>Salir</span>
      </div>
    </div>
  );

  if(pg==="login"){
    return(
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center", position:"relative"}}>
        <div className="ambient-bg"></div>
        <div className="glass-panel" style={{padding:48,width:400, position:"relative", zIndex:2}}>
          <div style={{textAlign:"center",marginBottom:40}}>
            <div className="title-3d" style={{fontSize:36}}>Competencias<span style={{color:AC}}>AI</span></div>
            <div style={{color:"rgba(255,255,255,0.5)",fontSize:14,marginTop:12,fontWeight:300}}>Plataforma Educativa 3.0 · LOMLOE</div>
          </div>
          {[["Nombre","name"],["Apellido","sur"],["ID Classroom","cid"]].map(([label,key])=>(
            <div key={key} style={{marginBottom:20}}>
              <label style={{color:"rgba(255,255,255,0.6)",fontSize:12,display:"block",marginBottom:8,textTransform:"uppercase",letterSpacing:"1px",fontWeight:600}}>{label}</label>
              <input className="input-3d" value={user[key]} onChange={e=>setUser({...user,[key]:e.target.value})}
                style={{width:"100%",boxSizing:"border-box"}}
                placeholder={`Escribe tu ${label.toLowerCase()}...`}
              />
            </div>
          ))}
          <div style={{display:"flex",gap:12,marginBottom:32,marginTop:12}}>
            {[["student","Vista Alumno"],["teacher","Vista Profesor"]].map(([r,l])=>(
              <div key={r} onClick={()=>setUser({...user,role:r})}
                style={{flex:1,padding:"14px 0",borderRadius:12,textAlign:"center",cursor:"pointer",fontSize:13,fontWeight:600,
                  background:user.role===r?"rgba(108, 99, 255, 0.2)":"rgba(255,255,255,0.03)",color:user.role===r?"white":"rgba(255,255,255,0.5)",border:`1px solid ${user.role===r?AC:BR}`,transition:"all 0.3s", boxShadow:user.role===r?"inset 0 0 20px rgba(108,99,255,0.3)":"none"}}>
                {l}
              </div>
            ))}
          </div>
          <div className="btn-3d" onClick={()=>{setRole(user.role);setPg(user.role==="teacher"?"teacherHome":"studentHome");}} style={{width:"100%",boxSizing:"border-box",padding:"16px 0",fontSize:16}}>
            Acceder al Sistema →
          </div>
        </div>
      </div>
    );
  }

  // ── STUDENT HOME ─────────────────────────────────────────────────────────
  if(role==="student"){
    const s=STUDENTS[0];
    const sd=sData[s.id];
    const grades=sd.tgrades[tri];
    
    const currentCriteria = getCriteriaForSubj(stuSubj);
    const sup = currentCriteria.filter(c => sd.criteria[`${stuSubj}_${c.id}`]).length;
    
    const hasMsg=sd.notes.length>0;
    const hasTask=tasks.length>0;
    const sorted=[...SUBJECTS].sort((a,b)=>parseFloat(grades[b.name])-parseFloat(grades[a.name]));
    
    return(
      <div style={{minHeight:"100vh", position:"relative"}}>
        <div className="ambient-bg"></div>
        
        <div style={{background:"rgba(10,10,15,0.8)", backdropFilter:"blur(20px)", borderBottom:`1px solid ${BR}`,padding:"14px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:10, boxShadow:"0 10px 30px rgba(0,0,0,0.5)"}}>
          <span className="title-3d" style={{fontSize:22}}>Competencias<span style={{color:AC}}>AI</span></span>
          <div style={{display:"flex",gap:16,alignItems:"center"}}>
            <span style={{color:"#10b981",fontSize:12,background:"rgba(16, 185, 129, 0.1)",border:`1px solid rgba(16,185,129,0.3)`,borderRadius:8,padding:"6px 14px", fontWeight:600}}>Sesión Alumno Activa</span>
            <span onClick={()=>{setPg("login");setRole(null);}} style={{cursor:"pointer",color:AC,fontSize:13,fontWeight:600,padding:"8px 16px",borderRadius:12,background:`rgba(108, 99, 255, 0.15)`, border:"1px solid rgba(108,99,255,0.3)",transition:"all 0.3s"}} onMouseEnter={e=>{e.currentTarget.style.background=`rgba(108, 99, 255, 0.3)`;e.currentTarget.style.transform="translateY(-2px)"}} onMouseLeave={e=>{e.currentTarget.style.background=`rgba(108, 99, 255, 0.15)`;e.currentTarget.style.transform="translateY(0)"}}>Cerrar Sesión</span>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        {(hasMsg||hasTask)&&(
          <div style={{maxWidth:900,margin:"24px auto 0",padding:"0 20px",display:"flex",flexDirection:"column",gap:12}}>
            {hasMsg&&(
              <div className="glass-panel" style={{padding:"18px 24px",display:"flex",gap:16,alignItems:"flex-start", borderLeft:`4px solid ${GR}`}}>
                <div style={{width:42,height:42,borderRadius:12,background:"rgba(16,185,129,0.15)",border:"1px solid rgba(16,185,129,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0,boxShadow:"0 0 20px rgba(16,185,129,0.2)"}}>💬</div>
                <div>
                  <div style={{fontSize:15,fontWeight:800,color:"#6ee7b7"}}>Nuevo mensaje de tu profesor</div>
                  <div style={{fontSize:14,color:"rgba(255,255,255,0.8)",marginTop:6,fontStyle:"italic",lineHeight:1.5}}>"{sd.notes[sd.notes.length-1].text}"</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.4)",marginTop:8}}>{sd.notes[sd.notes.length-1].date}</div>
                </div>
              </div>
            )}
            {hasTask&&(
              <div className="glass-panel" style={{padding:"18px 24px",display:"flex",gap:16,alignItems:"flex-start", borderLeft:`4px solid ${AC}`}}>
                <div style={{width:42,height:42,borderRadius:12,background:"rgba(108,99,255,0.15)",border:"1px solid rgba(108,99,255,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0,boxShadow:"0 0 20px rgba(108,99,255,0.2)"}}>📌</div>
                <div>
                  <div style={{fontSize:15,fontWeight:800,color:AC2}}>Nueva tarea asignada</div>
                  <div style={{fontSize:14,color:"rgba(255,255,255,0.8)",marginTop:6,fontStyle:"italic",lineHeight:1.5}}>"{tasks[tasks.length-1]?.text}"</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.4)",marginTop:8}}>{tasks[tasks.length-1]?.date}</div>
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{maxWidth:900,margin:"0 auto",padding:"32px 20px"}}>
          {/* Profile */}
          <div className="glass-panel" style={{padding:32,display:"flex",gap:24,alignItems:"center",marginBottom:24}}>
            <Av initials={s.av} color={s.cl} sz={90}/>
            <div style={{flex:1}}>
              <div className="title-3d" style={{fontSize:32,marginBottom:4}}>{user.name||s.name} {user.sur}</div>
              <div style={{color:"rgba(255,255,255,0.6)",fontSize:15,fontWeight:300}}>1º Bachillerato A · {s.age} años · <strong style={{color:"white",fontWeight:600}}>{stuSubj}</strong></div>
              <div style={{color:AC2,fontSize:13,marginTop:8,fontWeight:600,background:"rgba(108,99,255,0.1)",display:"inline-block",padding:"4px 12px",borderRadius:20,border:"1px solid rgba(108,99,255,0.2)"}}>ID: {user.cid||"BCH-2024-001"}</div>
            </div>
            <div style={{display:"flex",gap:16}}>
              <div style={{textAlign:"center",background:"rgba(0,0,0,0.3)",borderRadius:16,padding:"16px 24px",border:`1px solid ${BR}`,boxShadow:"inset 0 2px 10px rgba(0,0,0,0.5)"}}>
                <div style={{fontSize:28,fontWeight:800,color:GR,fontFamily:"'Syne', sans-serif"}}>{sup}/{currentCriteria.length}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",marginTop:4,textTransform:"uppercase",letterSpacing:"1px",fontWeight:600}}>Criterios</div>
              </div>
              <div style={{textAlign:"center",background:"rgba(0,0,0,0.3)",borderRadius:16,padding:"16px 24px",border:`1px solid ${BR}`,boxShadow:"inset 0 2px 10px rgba(0,0,0,0.5)"}}>
                <div style={{fontSize:28,fontWeight:800,color:AC2,fontFamily:"'Syne', sans-serif"}}>{Math.round(sup/currentCriteria.length*100)}%</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",marginTop:4,textTransform:"uppercase",letterSpacing:"1px",fontWeight:600}}>Progreso</div>
              </div>
            </div>
          </div>

          {/* Subjects menu */}
          <div style={{display:"flex",gap:12,overflowX:"auto",marginBottom:24,paddingBottom:12,WebkitOverflowScrolling:"touch"}} className="hide-scroll">
            {SUBJECTS.map(sub=>(
              <div key={sub.name} onClick={()=>setStuSubj(sub.name)}
                className={`pill-nav ${stuSubj===sub.name?'active':''}`}
                style={{
                  background:stuSubj===sub.name?`linear-gradient(135deg, ${sub.col} 0%, ${sub.col}aa 100%)`:"rgba(255,255,255,0.05)",
                  color:stuSubj===sub.name?"white":"rgba(255,255,255,0.6)",
                  borderColor:stuSubj===sub.name?sub.col:"rgba(255,255,255,0.1)"
                }}>
                {sub.name}
              </div>
            ))}
          </div>

          {/* Trimester */}
          <div style={{display:"flex",gap:12,marginBottom:24}}>
            {[1,2,3].map(t=>(
              <div key={t} onClick={()=>setTri(t)}
                className="glass-item"
                style={{flex:1,padding:"14px 0",borderRadius:12,textAlign:"center",cursor:"pointer",fontWeight:600,fontSize:14,
                  background:tri===t?"rgba(108,99,255,0.2)":"rgba(0,0,0,0.2)",
                  border:`1px solid ${tri===t?AC:BR}`,
                  color:tri===t?"white":"rgba(255,255,255,0.5)",
                  boxShadow:tri===t?"inset 0 0 20px rgba(108,99,255,0.2)":"none"}}>
                {t}º Trimestre
              </div>
            ))}
          </div>

          {/* RADAR CHART + ALL SUBJECT GRADES */}
          <div className="glass-panel" style={{padding:32,marginBottom:24}}>
            <div style={{fontWeight:800,marginBottom:28,fontSize:18,color:"white",fontFamily:"'Syne', sans-serif",letterSpacing:"-0.5px"}}>Desarrollo Integral — {tri}º Trimestre</div>
            <div style={{display:"flex",gap:32,alignItems:"center",flexWrap:"wrap",justifyContent:"center"}}>
              <RadarChart grades={grades}/>
              <div style={{flex:1,minWidth:250}}>
                {sorted.map((sub,i)=>{
                  const g=parseFloat(grades[sub.name]||5);
                  return(
                    <div key={i} style={{marginBottom:14}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,alignItems:"center"}}>
                        <div style={{display:"flex",gap:10,alignItems:"center"}}>
                          <div style={{width:10,height:10,borderRadius:"50%",background:sub.col,flexShrink:0,boxShadow:`0 0 8px ${sub.col}`}}/>
                          <span style={{fontSize:14,color:"rgba(255,255,255,0.8)",fontWeight:600}}>{sub.name}</span>
                        </div>
                        <div style={{display:"flex",gap:8,alignItems:"center"}}>
                          <span style={{fontFamily:"'Syne', sans-serif",fontWeight:800,color:g>=5?GR:RD,fontSize:16,minWidth:30,textAlign:"right"}}>{g}</span>
                          <span style={{fontSize:11,padding:"2px 6px",borderRadius:6,background:g>=5?"rgba(16,185,129,0.15)":"rgba(239,68,68,0.15)",
                            color:g>=5?"#6ee7b7":RD,fontWeight:800,border:`1px solid ${g>=5?"rgba(16,185,129,0.3)":"rgba(239,68,68,0.3)"}`}}>{g>=5?"PASS":"FAIL"}</span>
                        </div>
                      </div>
                      <div style={{background:"rgba(0,0,0,0.5)",borderRadius:8,height:8,overflow:"hidden",boxShadow:"inset 0 1px 3px rgba(0,0,0,0.8)"}}>
                        <div style={{width:`${g*10}%`,height:"100%",background:`linear-gradient(90deg,${sub.col}40,${sub.col})`,transition:"width 1s cubic-bezier(0.22, 1, 0.36, 1)",borderRadius:8}}/>
                      </div>
                    </div>
                  );
                })}
                <div style={{marginTop:24,background:"rgba(10,10,20,0.6)",borderRadius:16,padding:"16px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",border:`1px solid ${BR}`,boxShadow:"inset 0 2px 10px rgba(0,0,0,0.5)"}}>
                  <div>
                    <div style={{color:"rgba(255,255,255,0.5)",fontSize:12,textTransform:"uppercase",letterSpacing:"1px",fontWeight:600}}>Rendimiento Global</div>
                    <div style={{color:"rgba(255,255,255,0.8)",fontSize:13,marginTop:4}}>{SUBJECTS.filter(s=>parseFloat(grades[s.name])>=5).length} de {SUBJECTS.length} aprobadas</div>
                  </div>
                  <span style={{fontWeight:800,color:AC2,fontSize:32,fontFamily:"'Syne', sans-serif",textShadow:"0 4px 10px rgba(0,0,0,0.5)"}}>
                    {(SUBJECTS.reduce((a,s)=>a+parseFloat(grades[s.name]||5),0)/SUBJECTS.length).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Subject criteria */}
          <div className="glass-panel" style={{padding:32,marginBottom:24}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div style={{fontWeight:800,fontSize:18,color:"white",fontFamily:"'Syne', sans-serif",letterSpacing:"-0.5px"}}>Criterios LOMLOE — {stuSubj}</div>
              <span style={{fontSize:13,color:"white",fontWeight:600,background:"rgba(255,255,255,0.1)",borderRadius:20,padding:"6px 16px",border:`1px solid ${BR}`,backdropFilter:"blur(10px)"}}>
                <span style={{color:GR}}>{sup}</span> / {currentCriteria.length} superados
              </span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {currentCriteria.map(c=>{
                const ok=sd.criteria[`${stuSubj}_${c.id}`];
                return(
                  <div key={c.id} className="glass-item" style={{display:"flex",alignItems:"flex-start",gap:12,padding:"14px 16px",
                    background:ok?"rgba(16,185,129,0.05)":"",borderColor:ok?"rgba(16,185,129,0.2)":""}}>
                    <div style={{width:20,height:20,borderRadius:6,background:ok?GR:"rgba(0,0,0,0.5)",display:"flex",
                      alignItems:"center",justifyContent:"center",fontSize:11,flexShrink:0,marginTop:2,color:"white",fontWeight:800,
                      boxShadow:ok?"0 0 10px rgba(16,185,129,0.4)":"inset 0 1px 3px rgba(0,0,0,0.8)"}}>
                      {ok?"✓":""}
                    </div>
                    <div>
                      <div style={{color:ok?"#6ee7b7":AC2,fontSize:12,fontWeight:800,fontFamily:"'Syne', sans-serif",letterSpacing:"0.5px"}}>{c.code}</div>
                      <div style={{fontSize:13,color:ok?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.5)",lineHeight:1.5,marginTop:4}}>{c.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Teacher messages */}
          <div className="glass-panel" style={{padding:32,marginBottom:24}}>
            <div style={{fontWeight:800,marginBottom:20,fontSize:18,color:"white",fontFamily:"'Syne', sans-serif",letterSpacing:"-0.5px"}}>Anotaciones del Profesorado</div>
            {sd.notes.length>0 ? sd.notes.map((n,i)=>(
              <div key={i} className="glass-item" style={{padding:"16px 20px",marginBottom:12,display:"flex",gap:16,alignItems:"flex-start"}}>
                <div style={{width:36,height:36,borderRadius:10,background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.2)",
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>💬</div>
                <div>
                  <div style={{fontSize:14,color:"rgba(255,255,255,0.9)",lineHeight:1.6}}>{n.text}</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.4)",marginTop:8}}>{n.date}</div>
                </div>
              </div>
            )) : (
              <div style={{color:"rgba(255,255,255,0.4)",fontSize:14,fontStyle:"italic",textAlign:"center",padding:"24px 0",background:"rgba(0,0,0,0.2)",borderRadius:12,border:`1px dashed ${BR}`}}>
                No hay anotaciones recientes en esta asignatura. El profesorado utiliza este espacio para dejar indicaciones personalizadas.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── TEACHER HOME ──────────────────────────────────────────────────────────
  if(pg==="teacherHome"){
    const totalCriteriaAcrossAll = SUBJECTS.map(s=>getCriteriaForSubj(s.name).length).reduce((a,b)=>a+b,0);
    // Arbitrary overall average for UI
    const avgSup=Math.round(STUDENTS.map(s=>Object.values(sData[s.id].criteria).filter(Boolean).length).reduce((a,b)=>a+b,0)/STUDENTS.length);
    
    return(
      <div style={{minHeight:"100vh", position:"relative"}}>
        <div className="ambient-bg"></div>
        <Nav/>
        <div style={{maxWidth:1000,margin:"0 auto",padding:"40px 20px"}}>
          <div className="glass-panel" style={{padding:40,display:"flex",gap:32,alignItems:"center",marginBottom:32}}>
            <Av initials={(user.name[0]||"P").toUpperCase()+(user.sur[0]||"R").toUpperCase()} color={AC} sz={110}/>
            <div>
              <div className="title-3d" style={{fontSize:36,marginBottom:6}}>{user.name||"Profesor"} {user.sur||"Demo"}</div>
              <div style={{color:AC2,fontWeight:600,fontSize:18,display:"inline-block",background:"rgba(108,99,255,0.1)",padding:"4px 16px",borderRadius:20,border:"1px solid rgba(108,99,255,0.2)"}}>Dpto. Economía · Bachillerato</div>
              <div style={{color:"rgba(255,255,255,0.6)",marginTop:12,fontSize:14,lineHeight:1.6}}>Clases asignadas: <strong style={{color:"white"}}>{CLASSES.map(c=>c.name).join(" • ")}</strong></div>
              <div style={{color:"rgba(255,255,255,0.4)",fontSize:12,marginTop:8}}>Profesor ID: {user.cid||"PROF-2024-ECO"}</div>
            </div>
          </div>
          
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20,marginBottom:40}}>
            {[{l:"Estudiantes",v:STUDENTS.length,c:"#6c63ff"},{l:"Clases Activas",v:CLASSES.length,c:GR},{l:"Total Criterios",v:totalCriteriaAcrossAll,c:"#f59e0b"},{l:"Media General",v:`${avgSup}/${totalCriteriaAcrossAll}`,c:"#06b6d4"}].map((s,i)=>(
              <div key={i} className="glass-panel" style={{padding:"24px 20px",textAlign:"center",borderTop:`4px solid ${s.c}`}}>
                <div style={{fontSize:36,fontWeight:800,color:s.c,fontFamily:"'Syne', sans-serif",textShadow:`0 0 20px ${s.c}40`}}>{s.v}</div>
                <div style={{color:"rgba(255,255,255,0.6)",fontSize:13,marginTop:8,fontWeight:600,textTransform:"uppercase",letterSpacing:"1px"}}>{s.l}</div>
              </div>
            ))}
          </div>
          
          <div style={{fontWeight:800,fontSize:20,marginBottom:20,color:"white",fontFamily:"'Syne', sans-serif",letterSpacing:"-0.5px"}}>Acceso Rápido a Grupos</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {CLASSES.map(cl=>(
              <div key={cl.id} onClick={()=>{setCls(cl);setPg("classDetail");}}
                className="glass-panel" style={{padding:28,cursor:"pointer"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div style={{fontWeight:800,fontSize:22,fontFamily:"'Syne', sans-serif"}}>{cl.name}</div>
                  <div style={{background:"rgba(255,255,255,0.1)",padding:"4px 10px",borderRadius:12,fontSize:12,fontWeight:800,color:AC2}}>{cl.subj}</div>
                </div>
                <div style={{color:"rgba(255,255,255,0.5)",fontSize:14,marginTop:16}}><strong style={{color:"white"}}>{cl.ids.length}</strong> alumnos matriculados</div>
                <div className="btn-3d" style={{marginTop:24,padding:"12px 0"}}>Gestionar Aula →</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if(pg==="classes"){
    return(
      <div style={{minHeight:"100vh", position:"relative"}}>
        <div className="ambient-bg"></div>
        <Nav/>
        <div style={{maxWidth:1000,margin:"0 auto",padding:"40px 20px"}}>
          <div className="title-3d" style={{fontSize:32,marginBottom:32}}>Administración de Clases</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:24}}>
            {CLASSES.map(cl=>(
              <div key={cl.id} onClick={()=>{setCls(cl);setPg("classDetail");}}
                className="glass-panel" style={{padding:32,cursor:"pointer"}}>
                <div style={{fontWeight:800,fontSize:24,fontFamily:"'Syne', sans-serif"}}>{cl.name}</div>
                <div style={{color:AC2,fontWeight:600,marginTop:8,fontSize:15}}>{cl.subj}</div>
                <div style={{color:"rgba(255,255,255,0.5)",marginTop:16,fontSize:14}}><strong style={{color:"white"}}>{cl.ids.length}</strong> estudiantes</div>
                <div className="btn-3d" style={{marginTop:24,padding:"12px 0"}}>Ver Evaluaciones →</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if(pg==="classDetail"&&cls){
    const students=STUDENTS.filter(s=>cls.ids.includes(s.id));
    const classCrit = getCriteriaForSubj(cls.subj);
    
    return(
      <div style={{minHeight:"100vh", position:"relative"}}>
        <div className="ambient-bg"></div>
        <Nav/>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"32px 20px"}}>
          <div style={{display:"flex",gap:8,marginBottom:24,color:"rgba(255,255,255,0.4)",fontSize:14,fontWeight:600}}>
            <span onClick={()=>setPg("classes")} style={{cursor:"pointer",color:AC2,transition:"color 0.2s"}} onMouseEnter={e=>e.currentTarget.style.color="white"} onMouseLeave={e=>e.currentTarget.style.color=AC2}>Clases</span>
            <span>›</span><span style={{color:"white"}}>{cls.name}</span>
          </div>
          
          <div className="glass-panel" style={{padding:"24px 32px",marginBottom:32,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20}}>
            <div>
              <div className="title-3d" style={{fontSize:32}}>{cls.name}</div>
              <div style={{color:AC2,fontWeight:600,marginTop:8,fontSize:15,background:"rgba(108,99,255,0.1)",padding:"4px 12px",borderRadius:12,display:"inline-block"}}>{cls.subj} · {students.length} alumnos</div>
            </div>
            <div style={{display:"flex",gap:12,flex:1,maxWidth:500}}>
              <input className="input-3d" value={newTask} onChange={e=>setNewTask(e.target.value)}
                placeholder="Añadir recordatorio o tarea global..."
                style={{flex:1}}
              />
              <div className="btn-3d" onClick={()=>{if(newTask.trim()){setTasks([...tasks,{text:newTask,date:new Date().toLocaleDateString()}]);setNewTask("");}}} style={{whiteSpace:"nowrap",padding:"14px 24px"}}>
                + Publicar
              </div>
            </div>
          </div>
          
          {tasks.length>0&&(
            <div style={{marginBottom:32,display:"flex",gap:12,flexWrap:"wrap"}}>
              {tasks.map((t,i)=>(
                <div key={i} className="glass-item" style={{padding:"8px 16px",fontSize:13,color:"#86efac",display:"flex",gap:12,alignItems:"center",borderColor:"rgba(16,185,129,0.3)",background:"rgba(16,185,129,0.1)"}}>
                  📌 {t.text}
                  <span onClick={()=>setTasks(tasks.filter((_,j)=>j!==i))} style={{cursor:"pointer",color:"rgba(255,255,255,0.5)",padding:"2px 6px",borderRadius:4,background:"rgba(0,0,0,0.2)",fontWeight:800}}>✕</span>
                </div>
              ))}
            </div>
          )}
          
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:16}}>
            {students.map(s=>{
              const sup=classCrit.filter(c => sData[s.id].criteria[`${cls.subj}_${c.id}`]).length;
              const pct=Math.round(sup/classCrit.length*100);
              return(
                <div key={s.id} onClick={()=>{setStu(s);setPg("studentDetail");setTab("criteria");}}
                  className="glass-panel" style={{padding:24,cursor:"pointer",textAlign:"center"}}>
                  <div style={{display:"flex",justifyContent:"center",marginBottom:16}}><Av initials={s.av} color={s.cl} sz={60}/></div>
                  <div style={{fontWeight:800,fontSize:14,lineHeight:1.3,color:"white",fontFamily:"'Syne', sans-serif"}}>{s.name}</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginTop:8,fontWeight:600}}>{pct}% Superado</div>
                  <div style={{marginTop:12,background:"rgba(0,0,0,0.5)",borderRadius:8,height:6,overflow:"hidden",boxShadow:"inset 0 1px 2px rgba(0,0,0,0.8)"}}>
                    <div style={{width:`${pct}%`,height:"100%",background:`linear-gradient(90deg, ${s.cl}40, ${s.cl})`,borderRadius:8}}/>
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
    const targetSubj = cls?.subj || "Economía";
    const classCrit = getCriteriaForSubj(targetSubj);
    const sup = classCrit.filter(c => sd.criteria[`${targetSubj}_${c.id}`]).length;
    
    const toggle=cid=>setSData(p=>({...p,[s.id]:{...p[s.id],criteria:{...p[s.id].criteria,[`${targetSubj}_${cid}`]:!p[s.id].criteria[`${targetSubj}_${cid}`]}}}));
    const sendNote=()=>{
      if(!note.trim())return;
      setSData(p=>({...p,[s.id]:{...p[s.id],notes:[...p[s.id].notes,{text:note,date:new Date().toLocaleDateString()}]}}));
      setNote("");
    };
    
    return(
      <div style={{minHeight:"100vh", position:"relative"}}>
        <div className="ambient-bg"></div>
        <Nav/>
        <div style={{maxWidth:1000,margin:"0 auto",padding:"32px 20px"}}>
          <div style={{display:"flex",gap:8,marginBottom:24,color:"rgba(255,255,255,0.4)",fontSize:14,fontWeight:600}}>
            <span onClick={()=>setPg("classes")} style={{cursor:"pointer",color:AC2,transition:"color 0.2s"}} onMouseEnter={e=>e.currentTarget.style.color="white"} onMouseLeave={e=>e.currentTarget.style.color=AC2}>Clases</span>
            <span>›</span>
            <span onClick={()=>setPg("classDetail")} style={{cursor:"pointer",color:AC2,transition:"color 0.2s"}} onMouseEnter={e=>e.currentTarget.style.color="white"} onMouseLeave={e=>e.currentTarget.style.color=AC2}>{cls?.name}</span>
            <span>›</span><span style={{color:"white"}}>{s.name}</span>
          </div>
          
          <div className="glass-panel" style={{padding:32,display:"flex",gap:28,alignItems:"center",marginBottom:32}}>
            <Av initials={s.av} color={s.cl} sz={96}/>
            <div style={{flex:1}}>
              <div className="title-3d" style={{fontSize:32,marginBottom:6}}>{s.name}</div>
              <div style={{color:"rgba(255,255,255,0.6)",fontSize:15,fontWeight:600}}>{cls?.name} · {s.age} años · <strong style={{color:"white"}}>{targetSubj}</strong></div>
              <div style={{display:"flex",gap:24,marginTop:20}}>
                {[[sup,"Superados",GR],[classCrit.length-sup,"Pendientes","rgba(255,255,255,0.5)"],[`${Math.round(sup/classCrit.length*100)}%`,"Progreso",AC2]].map(([v,l,c])=>(
                  <div key={l}><div style={{fontSize:24,fontWeight:800,color:c,fontFamily:"'Syne', sans-serif"}}>{v}</div><div style={{fontSize:11,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"1px",fontWeight:800,marginTop:4}}>{l}</div></div>
                ))}
              </div>
            </div>
          </div>
          
          <div style={{display:"flex",gap:12,marginBottom:32,background:"rgba(0,0,0,0.3)",borderRadius:16,padding:6,boxShadow:"inset 0 2px 10px rgba(0,0,0,0.5)",border:`1px solid ${BR}`}}>
            {[["criteria","Evaluación Criterial"],["grades","Calificaciones"],["notes","Comunicación"]].map(([k,l])=>(
              <div key={k} onClick={()=>setTab(k)}
                style={{flex:1,padding:"12px 0",borderRadius:12,textAlign:"center",cursor:"pointer",fontSize:14,fontWeight:600,
                  background:tab===k?"rgba(108,99,255,0.2)":"transparent",color:tab===k?"white":"rgba(255,255,255,0.5)",transition:"all 0.3s",boxShadow:tab===k?"inset 0 0 20px rgba(108,99,255,0.2)":"none"}}>
                {l}
              </div>
            ))}
          </div>
          
          <div className="glass-panel" style={{padding:32}}>
            {tab==="criteria"&&(
              <div>
                <div style={{fontSize:13,color:"rgba(255,255,255,0.4)",marginBottom:20,fontStyle:"italic"}}>Haz clic en un criterio para alternar su estado entre superado y pendiente.</div>
                {classCrit.map(c=>{
                  const ok=sd.criteria[`${targetSubj}_${c.id}`];
                  return(
                    <div key={c.id} onClick={()=>toggle(c.id)}
                      className="glass-item" style={{display:"flex",alignItems:"center",gap:16,marginBottom:12,padding:"16px 20px",cursor:"pointer",
                        background:ok?"rgba(16,185,129,0.05)":"",borderColor:ok?"rgba(16,185,129,0.3)":""}}>
                      <div style={{width:24,height:24,borderRadius:8,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",
                        background:ok?GR:"rgba(0,0,0,0.5)",fontSize:13,fontWeight:800,color:"white",boxShadow:ok?"0 0 10px rgba(16,185,129,0.4)":"inset 0 1px 3px rgba(0,0,0,0.8)"}}>
                        {ok?"✓":""}
                      </div>
                      <div style={{flex:1}}>
                        <span style={{color:ok?"#6ee7b7":AC2,fontSize:13,fontWeight:800,fontFamily:"'Syne', sans-serif",letterSpacing:"0.5px"}}>{c.code} — </span>
                        <span style={{fontSize:14,color:ok?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.6)"}}>{c.desc}</span>
                      </div>
                      <span style={{fontSize:11,fontWeight:800,letterSpacing:"1px",color:ok?GR:"rgba(255,255,255,0.3)",flexShrink:0,minWidth:80,textAlign:"right"}}>
                        {ok?"SUPERADO":"PENDIENTE"}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
            
            {tab==="grades"&&(
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
                {sd.exams.map(ex=>(
                  <div key={ex.id} className="glass-item" style={{padding:24}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                      <div>
                        <div style={{fontWeight:800,fontSize:16,color:"white",fontFamily:"'Syne', sans-serif"}}>{ex.name}</div>
                        <div style={{color:"rgba(255,255,255,0.4)",fontSize:12,marginTop:6,fontWeight:600}}>{ex.date}</div>
                      </div>
                      <div style={{fontSize:36,fontWeight:800,color:ex.grade>=5?GR:RD,fontFamily:"'Syne', sans-serif",textShadow:`0 0 15px ${ex.grade>=5?GR:RD}40`}}>{ex.grade}</div>
                    </div>
                    <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginBottom:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"1px"}}>Criterios Evaluados</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                      {ex.crit.map(cid=>{
                        const c=classCrit.find(cr=>cr.id===cid);
                        return c?<span key={cid} style={{background:"rgba(255,255,255,0.05)",border:`1px solid ${BR}`,borderRadius:8,padding:"4px 10px",fontSize:11,color:AC2,fontWeight:800,fontFamily:"'Syne', sans-serif"}}>{c.code}</span>:null;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {tab==="notes"&&(
              <div>
                <div style={{background:"rgba(0,0,0,0.2)",borderRadius:16,padding:24,marginBottom:24,border:`1px solid ${BR}`}}>
                  <textarea className="input-3d" value={note} onChange={e=>setNote(e.target.value)}
                    placeholder={`Escribe un feedback o mensaje directo para ${s.name.split(" ")[0]}...`}
                    style={{width:"100%",resize:"vertical",minHeight:100,boxSizing:"border-box",marginBottom:16}}
                  />
                  <div className="btn-3d" onClick={sendNote}>Enviar Mensaje Privado</div>
                </div>
                {sd.notes.length===0&&<div style={{color:"rgba(255,255,255,0.4)",textAlign:"center",padding:40,fontSize:14,fontStyle:"italic"}}>Bandeja de comunicación vacía para este estudiante.</div>}
                {sd.notes.map((n,i)=>(
                  <div key={i} className="glass-item" style={{padding:20,marginBottom:12}}>
                    <div style={{fontSize:14,color:"white",lineHeight:1.6}}>{n.text}</div>
                    <div style={{fontSize:12,color:"rgba(255,255,255,0.4)",marginTop:12,fontWeight:600}}>{n.date}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
