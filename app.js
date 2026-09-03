const CONFIG={
  // Replace this demo URL with your licensed Essence Network .m3u8 stream.
  // HLS playback uses hls.js where Media Source Extensions are available,
  // with native HLS fallback on supported devices.
  defaultStream:"https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
};

const channels=[
 {id:"main",name:"Essence TV",desc:"Flagship channel",stream:CONFIG.defaultStream},
 {id:"news",name:"Essence News",desc:"News & current affairs",stream:CONFIG.defaultStream},
 {id:"music",name:"Essence Music",desc:"Music & live sessions",stream:CONFIG.defaultStream},
 {id:"kids",name:"Essence Kids",desc:"Kids & family",stream:CONFIG.defaultStream}
];
const schedule=[
["06:00","08:00","Sunrise Uganda","News, weather and the stories starting your day."],
["08:00","10:00","Essence Morning","News, entertainment and conversation."],
["10:00","11:00","Midday News","Headlines and live updates from Uganda and Africa."],
["11:00","13:00","Essence Lifestyle","Food, culture, business and inspiring people."],
["13:00","14:00","Africa Today","Stories and perspectives from across the continent."],
["14:00","16:00","Essence Music","Music videos and live sessions."],
["16:00","18:00","Youth Connect","Technology, careers and youth culture."],
["18:00","19:00","Essence News","Your evening news bulletin."],
["19:00","20:00","Prime Talk","Conversations that matter."],
["20:00","22:00","Essence Movies","Premium evening entertainment."]
];
const videos=[["▶","Essence Morning Highlights","The best moments from the morning show."],["♪","Essence Live Session","Fresh music and performances."],["▶","Inside Kampala","People, places and stories around the city."],["★","Africa Now","Conversations shaping the continent."]];
const news=[["TOP STORY","Uganda's creative economy enters a new digital era","Creators, broadcasters and streaming are changing African media."],["BUSINESS","The future of African television","Why digital-first networks can reach audiences beyond traditional broadcast."],["CULTURE","Stories from home","Local stories, music and culture remain at the heart of entertainment."],["TECH","Streaming comes to the living room","Smart TVs and mobile devices are changing television."]];

let hls=null,current=null;

function renderChannels(target){document.querySelector(target).innerHTML=channels.map(c=>`<article class="channel" data-channel="${c.id}"><div class="logo">${c.name.toUpperCase()}</div><strong>${c.name}</strong><small>${c.desc}</small></article>`).join("")}
function renderGuide(){document.querySelector("#guide").innerHTML=schedule.map((s,i)=>`<div class="guide-row"><time>${s[0]}<br>—<br>${s[1]}</time><div><b>${s[2]}</b><p>${s[3]}</p></div>${i===1?'<span class="on">ON AIR</span>':''}</div>`).join("")}
function renderVideos(){document.querySelector("#videos").innerHTML=videos.map(v=>`<article class="video"><div class="thumb">${v[0]}</div><div><b>${v[1]}</b><p>${v[2]}</p></div></article>`).join("")}
function renderNews(){document.querySelector("#news").innerHTML=news.map(n=>`<article class="news"><span class="tag">${n[0]}</span><h2>${n[1]}</h2><p>${n[2]}</p></article>`).join("")}

function showView(v){document.querySelectorAll(".view").forEach(x=>x.classList.remove("active"));document.querySelector("#"+v+"View").classList.add("active");document.querySelectorAll(".nav").forEach(x=>x.classList.toggle("active",x.dataset.view===v));scrollTo(0,0)}
document.addEventListener("click",e=>{
 const nav=e.target.closest("[data-view]"); if(nav){e.preventDefault();showView(nav.dataset.view);return}
 const ch=e.target.closest("[data-channel]"); if(ch){showView("live");loadChannel(ch.dataset.channel)}
});

function setMessage(title,sub){document.querySelector("#playerMessage strong").textContent=title;document.querySelector("#playerMessage span").textContent=sub}
function stopHls(){if(hls){hls.destroy();hls=null}}
function loadChannel(id){
 const c=channels.find(x=>x.id===id)||channels[0]; current=c;
 const video=document.querySelector("#player"); stopHls(); video.removeAttribute("src"); video.load();
 document.querySelector("#nowTitle").textContent=c.name;document.querySelector("#nowDesc").textContent=c.desc;
 document.querySelector("#streamState").textContent="CONNECTING";document.querySelector("#buffering").style.display="block";setMessage(c.name,"Connecting to live HLS stream…");
 if(Hls.isSupported()){
   hls=new Hls({enableWorker:true,lowLatencyMode:true,maxBufferLength:30});
   hls.loadSource(c.stream);hls.attachMedia(video);
   hls.on(Hls.Events.MANIFEST_PARSED,()=>{document.querySelector("#streamState").textContent="LIVE";document.querySelector("#buffering").style.display="none";setMessage(c.name,"Live stream ready");video.play().catch(()=>{})});
   hls.on(Hls.Events.ERROR,(_,data)=>{if(data.fatal){document.querySelector("#streamState").textContent="ERROR";document.querySelector("#buffering").style.display="none";setMessage("STREAM ERROR","Check the HLS URL, CORS and server availability.")}});
 }else if(video.canPlayType("application/vnd.apple.mpegurl")){
   video.src=c.stream;video.addEventListener("loadedmetadata",()=>{document.querySelector("#streamState").textContent="LIVE";document.querySelector("#buffering").style.display="none";video.play().catch(()=>{})},{once:true});
 }else{
   document.querySelector("#streamState").textContent="UNSUPPORTED";document.querySelector("#buffering").style.display="none";setMessage("HLS NOT SUPPORTED","Try a modern browser or supported TV device.");
 }
}
document.querySelector("#reloadStream").onclick=()=>loadChannel(current?.id||"main");

const hv=document.querySelector("#heroVideo");
if(Hls.isSupported()){const hh=new Hls();hh.loadSource(CONFIG.defaultStream);hh.attachMedia(hv);hh.on(Hls.Events.MANIFEST_PARSED,()=>{document.querySelector("#heroStatus").textContent="LIVE";hv.play().catch(()=>{})})}
else if(hv.canPlayType("application/vnd.apple.mpegurl")){hv.src=CONFIG.defaultStream;hv.addEventListener("loadedmetadata",()=>hv.play().catch(()=>{}),{once:true})}

document.querySelector("#searchBtn").onclick=()=>{document.querySelector("#searchPanel").classList.add("open");document.querySelector("#searchInput").focus()};
document.querySelector("#closeSearch").onclick=()=>document.querySelector("#searchPanel").classList.remove("open");
document.querySelector("#searchInput").oninput=e=>{let q=e.target.value.toLowerCase().trim();let all=[...channels.map(c=>[c.name,c.desc]),...schedule.map(s=>[s[2],s[3]]),...news.map(n=>[n[1],n[2]])];let r=all.filter(x=>(x[0]+" "+x[1]).toLowerCase().includes(q));document.querySelector("#results").innerHTML=q?r.map(x=>`<div class="result"><b>${x[0]}</b><small>${x[1]}</small></div>`).join(""):""};

renderChannels("#channels");renderChannels("#liveChannels");renderGuide();renderVideos();renderNews();loadChannel("main");
