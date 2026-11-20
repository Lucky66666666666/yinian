const KEY="yinian_demo_v1";
const fresh=()=>({beads:0,lotus:0,days:[],wishes:[],member:false,incense:false});
let data={...fresh(),...(JSON.parse(localStorage.getItem(KEY)||"{}"))};
const save=()=>{localStorage.setItem(KEY,JSON.stringify(data));render()};
const today=()=>new Date().toISOString().slice(0,10);
const toast=(s)=>{const t=document.getElementById("toast");t.textContent=s;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800)};
function go(id){document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id===id));document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("selected",b.dataset.go===id));window.scrollTo({top:0,behavior:"smooth"});render()}
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));
document.getElementById("today").textContent=new Date().toLocaleDateString("zh-CN",{year:"numeric",month:"long",day:"numeric"});
document.getElementById("incenseBtn").onclick=()=>{data.incense=true;document.getElementById("incenseMsg").textContent="心香已点燃。愿你此刻安宁，从容呼吸。";toast("愿这一念，带来片刻安宁")};
document.getElementById("beadBtn").onclick=()=>{data.beads++;save();toast("一念已记下")};
document.getElementById("lotusBtn").onclick=()=>{data.lotus++;save();toast("为自己点亮一朵莲花")};
document.getElementById("bellBtn").onclick=()=>{toast("当——愿心归于宁静")};
document.getElementById("wishBtn").onclick=()=>document.getElementById("wishDialog").showModal();
document.getElementById("saveWish").onclick=(e)=>{e.preventDefault();const v=document.getElementById("wishInput").value.trim();if(!v){toast("先写下一句话吧");return}data.wishes.unshift({text:v,date:today()});document.getElementById("wishInput").value="";document.getElementById("wishDialog").close();save();toast("心愿已收藏在本机")};
document.getElementById("checkinBtn").onclick=()=>{if(data.days.includes(today())){toast("今天已经打卡，给自己一个赞");return}data.days.push(today());save();toast("今日静心完成，辛苦了")};
document.getElementById("demoMember").onclick=()=>{data.member=true;save();toast("演示会员已开启，没有发生扣款")};
document.getElementById("viewWishes").onclick=()=>{document.getElementById("wishList").innerHTML=data.wishes.length?data.wishes.map(w=>`<div class="wish-entry">${escapeHtml(w.text)}<small>${w.date}</small></div>`).join(""):"<p>还没有收藏心愿。你可以在祈福页面写下此刻的心愿。</p>";document.getElementById("wishesDialog").showModal()};
document.getElementById("shareBtn").onclick=async()=>{const text="我在体验「一念 · 禅心祈福」，每天给自己五分钟，静心与觉察。";try{if(navigator.share)await navigator.share({title:"一念 · 禅心祈福",text});else{await navigator.clipboard.writeText(text);toast("分享文案已复制")}}catch(e){}};
document.getElementById("resetBtn").onclick=()=>{if(confirm("确定清除当前浏览器中的一念演示记录吗？")){data=fresh();save();toast("演示记录已清除")}};
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function render(){const n=data.days.length;["homeDays","meDays"].forEach(id=>document.getElementById(id).textContent=n);["homeBeads","beadCount","meBeads"].forEach(id=>document.getElementById(id).textContent=data.beads);["homeLotus","lotusCount","meLotus"].forEach(id=>document.getElementById(id).textContent=data.lotus);document.getElementById("progressNum").textContent=Math.min(n,30);document.getElementById("progressBar").style.width=Math.min(n/30*100,100)+"%";document.getElementById("progressHint").textContent=n?`你已经为自己留出了 ${n} 天时间，继续温柔前行。`:"从今天开始，给自己一个新的起点。";document.getElementById("closing").textContent=n>=30?"你完成了这段30天体验。愿你把觉察与温柔带回日常。":"每一次愿意停下来，都是一次照顾自己。";document.getElementById("calendar").innerHTML=Array.from({length:30},(_,i)=>`<span class="${i<n?'done':''}">${i+1}</span>`).join("")}
render();