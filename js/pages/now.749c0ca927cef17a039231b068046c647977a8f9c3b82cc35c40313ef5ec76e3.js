(()=>{function u(e,t="info"){let n=document.getElementById("toast-container");n||(n=document.createElement("div"),n.id="toast-container",n.className="toast-container",document.body.appendChild(n));let o=document.createElement("div");o.className=`toast toast-${t}`;let s="\u2139\uFE0F";t==="success"&&(s="\u2705"),t==="error"&&(s="\u274C"),t==="warning"&&(s="\u26A0\uFE0F"),o.innerHTML=`<span class="toast-icon">${s}</span><span class="toast-content">${e}</span>`,n.appendChild(o),setTimeout(()=>{o.classList.add("hide"),o.addEventListener("animationend",()=>{o.remove(),n.children.length===0&&n.remove()})},4e3)}window.showToast=u;var E=1,S=3;async function y(e=1){E=e;let t=window.SiteConfig.urls.pb,n=window.SiteConfig.urls.translator,o=document.getElementById("notes-container");if(o){if(e===1)o.innerHTML=`<div class="loading" style="text-align:center; padding: 40px;"><span class="terminal-loader">${window.getMessage("loading_notes")}</span></div>`;else{let s=document.getElementById("notes-load-more");s&&(s.innerHTML=`<span class="terminal-loader">${window.getMessage("loading_more")||"LOADING..."}</span>`,s.disabled=!0)}try{let s=t.includes("?")?"&":"?",i=`${t}${s}page=${e}&perPage=${S}`,c=await fetch(i);if(!c.ok)throw c.status===403?new Error(window.getMessage("error_403")):new Error(`HTTP Error: ${c.status}`);let r=await c.json();e===1&&(o.innerHTML=""),r.items&&r.items.length>0?(await Promise.all(r.items.map(async a=>{let l=a.content||a.text||a.message||"";!l&&a.title&&(l=a.title);try{let g=window.currentLanguage||"en";if(l&&g&&a.language&&a.language!==g){let m=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({q:l,source:a.language,target:g,format:"text"})});if(m.ok){let f=await m.json();f.translatedText&&(l=`${f.translatedText} <span class="translation-indicator" title="${window.getMessage("original_text")}: ${l.replace(/"/g,"&quot;")}">(${window.getMessage("translated_from")} ${window.getMessage(`language_${a.language}`)})</span>`)}}}catch(g){console.warn("Translation failed for note:",a.id,g)}return{...a,displayContent:l}}))).forEach(a=>{let l=document.createElement("div");l.className="note-card",a.temporary&&l.classList.add("note-temporary");let g=new Date(a.created).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}),m=a.displayContent.replace(/\n/g,"<br>");l.innerHTML=`
                        <div class="note-date">${g}</div>
                        <div class="note-body">${m}</div>
                    `,o.appendChild(l)}):e===1&&(o.innerHTML=`<div class="note-empty">${window.getMessage("notes_empty")}</div>`),I(r.page<r.totalPages)}catch(s){if(console.error("Error loading notes:",s),e===1)o.innerHTML=`<div class="note-error">${window.getMessage("notes_error")}${s.message}</div>`;else{let i=document.getElementById("notes-load-more");i&&(i.innerText=window.getMessage("error_retry")||"RETRY",i.disabled=!1),u(window.getMessage("notes_error")+s.message,"error")}}}}function I(e){let t=document.getElementById("notes-load-more"),n=document.getElementById("notes-container");if(!e){t&&t.remove();return}t||(t=document.createElement("button"),t.id="notes-load-more",t.className="btn-load-more",n.parentNode&&n.parentNode.insertBefore(t,n.nextSibling),t.onclick=()=>y(E+1)),t.innerText=window.getMessage("load_more")||"[ ACCESSING_ARCHIVES ]",t.disabled=!1}async function v(){let e=document.getElementById("games-container");if(!e)return;let t=window.SiteConfig.urls.games,n=window.SiteConfig.keys.rawg;e.innerHTML=`
        <div class="lastfm-card">
            <div class="lastfm-header">\u{1F47E} ${window.getMessage("played_recently")}</div>
            <div class="lastfm-content" style="padding-left: 1.2rem; font-size: 0.9em; opacity: 0.9; color: var(--secondary);">
                <span class="terminal-loader">${window.getMessage("loading_games")}</span>
            </div>
        </div>`;try{let o=await fetch(t);if(!o.ok)return;let s=await o.json();if(!s.items||s.items.length===0)return;let i=s.items[0],c=i.title,r=i.platform||"Console",d="",a="",l=c;try{n?d=`https://api.rawg.io/api/games?key=${n}&search=${encodeURIComponent(c)}&page_size=1`:d=`/api/ext/rawg/?search=${encodeURIComponent(c)}&page_size=1`;let m=await fetch(d);if(m.ok){let f=await m.json();if(f.results&&f.results.length>0){let T=f.results[0];a=T.background_image,l=T.name}}else console.warn("RAWG fetch failed, using fallback data.")}catch(m){console.warn("RAWG API Error (likely missing key or proxy):",m)}let g=window.getMessage("played_recently");e.innerHTML=`
                <div class="lastfm-card"> 
                    <div class="lastfm-header">\u{1F47E} ${g}</div>
                    <div class="lastfm-content fade-in-content">
                        ${a?`<img src="${a}" alt="${l}" class="lastfm-art">`:'<div class="trakt-icon">\u{1F3AE}</div>'}
                        <div class="lastfm-info">
                            <div class="lastfm-song">${l}</div>
                            <div class="lastfm-artist">${r}</div>
                        </div>
                    </div>
                </div>
            `,e.style.opacity="1"}catch(o){console.error("Games Error:",o),e.innerHTML=`
            <div class="lastfm-card">
                <div class="lastfm-header">\u{1F47E} ${window.getMessage("played_recently")}</div>
                <div class="lastfm-content" style="padding-left: 1.2rem; opacity: 0.6; font-size: 0.85em;">
                    ${window.getMessage("error_loading_games")||"Unable to load games."}
                </div>
            </div>`}}async function h(){let e=document.getElementById("learning-list");if(!e)return;let t=window.SiteConfig.urls.learning;e.innerHTML=`<li style="list-style: none;"><span class="terminal-loader">${window.getMessage("loading_learning")}</span></li>`;try{let n=await fetch(t);if(!n.ok)throw new Error(n.status);let o=await n.json();if(!o.items||o.items.length===0){e.innerHTML='<li style="opacity: 0.6; list-style: none;">...</li>';return}e.innerHTML="";let s=window.currentLanguage||"en";o.items.forEach((i,c)=>{let r=i.title_en;s==="pt"&&i.title_pt&&(r=i.title_pt),r||(r=i.title_en||i.title_pt||i.title||window.getMessage("untitled"));let d=document.createElement("li");d.style.marginBottom="4px",d.style.animation=`contentFadeIn 0.5s ease-out ${c*.05}s forwards`,d.style.opacity="0",typeof marked<"u"?d.innerHTML=marked.parseInline(r):d.innerHTML=r,e.appendChild(d)})}catch(n){console.error("Learning Error:",n),e.innerHTML=`<li style="opacity: 0.6; list-style: none; font-size: 0.9em;">${window.getMessage("error_loading_learning")}</li>`}}async function b(){let e=document.getElementById("lastfm-container");if(!e)return;let t=window.SiteConfig.urls.lastfm;e.innerHTML=`
        <div class="lastfm-card">
            <div class="lastfm-header">\u{1F3B5} ${window.getMessage("last_played")}</div>
            <div class="lastfm-content" style="padding-left: 1.2rem; font-size: 0.9em; opacity: 0.9; color: var(--secondary);">
                <span class="terminal-loader">${window.getMessage("loading_music")}</span>
            </div>
        </div>`;try{let s=(await(await fetch(t)).json()).recenttracks.track[0];if(!s)return;let i=s["@attr"]&&s["@attr"].nowplaying,c=s.artist["#text"],r=s.name,d=s.image[2]["#text"],a=s.url,l=i?window.getMessage("listening_now"):window.getMessage("last_played");e.innerHTML=`
                <div class="lastfm-card">
                    <div class="lastfm-header">\u{1F3B5} ${l}</div>
                    <a href="${a}" target="_blank" rel="noopener noreferrer" class="lastfm-content fade-in-content">
                        <img src="${d}" alt="${r}" class="lastfm-art">
                        <div class="lastfm-info">
                            <div class="lastfm-song">${r}</div>
                            <div class="lastfm-artist">${c}</div>
                        </div>
                        <div class="lastfm-equalizer">
                            ${i?`
                                <div class="bar"></div>
                                <div class="bar"></div>
                                <div class="bar"></div>
                            `:""}
                        </div>
                    </a>
                </div>
            `,e.style.opacity="1"}catch(n){console.error("LastFM Error:",n),e.innerHTML=`
            <div class="lastfm-card">
                 <div class="lastfm-header">\u{1F3B5} ${window.getMessage("last_played")}</div>
                 <div class="lastfm-content" style="padding-left: 1.2rem; opacity: 0.6; font-size: 0.85em;">
                    ${window.getMessage("error_loading_music")||"Unable to load music."}
                 </div>
            </div>`}}async function _(){let e=document.getElementById("trakt-container");if(!e)return;let t=window.SiteConfig.urls.trakt,n=window.SiteConfig.keys.traktClientId,o=window.SiteConfig.user.trakt;e.innerHTML=`
        <div class="lastfm-card">
            <div class="lastfm-header">\u{1F4FA} ${window.getMessage("watched_recently")}</div>
            <div class="lastfm-content" style="padding-left: 1.2rem; font-size: 0.9em; opacity: 0.9; color: var(--secondary);">
                <span class="terminal-loader">${window.getMessage("loading_tv")}</span>
            </div>
        </div>`;try{let s={"Content-Type":"application/json"};n&&(s["trakt-api-version"]="2",s["trakt-api-key"]=n);let i=await fetch(t,{headers:s});if(!i.ok)throw new Error(i.status);let c=await i.json();if(!c||c.length===0)return;let r=c[0],d=r.type,a="",l="",g=`https://trakt.tv/users/${o}/history`;d==="movie"?(a=r.movie.title,l=r.movie.year||""):d==="episode"&&(a=r.show.title,l=`${r.episode.season}x${String(r.episode.number).padStart(2,"0")} - ${r.episode.title}`);let m=window.getMessage("watched_recently");e.innerHTML=`
                <div class="lastfm-card"> <!-- Reusing LastFM card style for consistency -->
                    <div class="lastfm-header">\u{1F4FA} ${m}</div>
                    <a href="${g}" target="_blank" rel="noopener noreferrer" class="lastfm-content fade-in-content">
                        <div class="trakt-icon">
                            ${d==="movie"?"\u{1F3AC}":"\u{1F4FA}"}
                        </div>
                        <div class="lastfm-info">
                            <div class="lastfm-song">${a}</div>
                            <div class="lastfm-artist">${l}</div>
                        </div>
                    </a>
                </div>
            `,e.style.opacity="1"}catch(s){console.error("Trakt Error:",s),e.innerHTML=`
            <div class="lastfm-card">
                <div class="lastfm-header">\u{1F4FA} ${window.getMessage("watched_recently")}</div>
                <div class="lastfm-content" style="padding-left: 1.2rem; opacity: 0.6; font-size: 0.85em;">
                    ${window.getMessage("error_loading_tv")||"Unable to load history."}
                </div>
            </div>`}}function M(e){return new Promise(t=>{let n=document.getElementById("confirm-modal");n||(n=document.createElement("div"),n.id="confirm-modal",n.className="confirm-modal",n.innerHTML=`
                <div class="confirm-box">
                    <div id="confirm-message" class="confirm-message"></div>
                    <div class="confirm-buttons">
                        <button id="confirm-no" class="confirm-btn no">NO</button>
                        <button id="confirm-yes" class="confirm-btn yes">YES</button>
                    </div>
                </div>
            `,document.body.appendChild(n));let o=document.getElementById("confirm-message"),s=document.getElementById("confirm-yes"),i=document.getElementById("confirm-no");o.innerText=e,s.innerText=window.getMessage("yes")||"YES",i.innerText=window.getMessage("no")||"NO";let c=d=>{d.key==="Escape"&&(r(),t(!1))},r=()=>{n.classList.remove("show"),s.onclick=null,i.onclick=null,window.removeEventListener("keydown",c)};s.onclick=()=>{r(),t(!0)},i.onclick=()=>{r(),t(!1)},window.addEventListener("keydown",c),n.classList.add("show")})}window.showConfirm=M;var p=null;function R(e){let t="=".repeat((4-e.length%4)%4),n=(e+t).replace(/-/g,"+").replace(/_/g,"/"),o=window.atob(n),s=new Uint8Array(o.length);for(let i=0;i<o.length;++i)s[i]=o.charCodeAt(i);return s}async function L(){if("serviceWorker"in navigator)try{let t=await(await navigator.serviceWorker.ready).pushManager.getSubscription();w(!!t),p=t}catch(e){console.error("Error checking subscription:",e)}}function w(e){let t=document.getElementById("push-btn");t&&(e?(t.innerText=window.getMessage("push_subscribed"),t.classList.add("subscribed"),t.disabled=!1,t.title=window.getMessage("push_cancel_hover")):(t.innerText=window.getMessage("push_subscribe"),t.classList.remove("subscribed"),t.disabled=!1,t.title=""))}async function $(){let e=window.SiteConfig.urls.pbSubscription,t=window.SiteConfig.keys.vapid,n=document.getElementById("push-btn"),o=!!p;if(n.disabled=!0,o){if(!await M(window.getMessage("push_confirm_unsubscribe"))){n.disabled=!1;return}try{n.innerText=window.getMessage("push_canceling"),await p.unsubscribe();let i=localStorage.getItem("pb_sub_id");if(i){try{await fetch(`${e}/${i}`,{method:"DELETE"}),console.log("Record removed from PocketBase:",i)}catch(c){console.error("Error clearing DB (non-critical):",c)}localStorage.removeItem("pb_sub_id")}p=null,w(!1),u(window.getMessage("push_unsubscribed_alert"),"success")}catch(i){console.error("Error unsubscribing:",i),u(window.getMessage("push_error_unsubscribe")+i.message,"error"),n.disabled=!1,w(!0)}}else try{if(!("serviceWorker"in navigator)||!("PushManager"in window)){u(window.getMessage("push_not_supported"),"error");return}n.innerText=window.getMessage("push_subscribing");let s=await navigator.serviceWorker.getRegistration()||await navigator.serviceWorker.register("/sw.js");if(await Notification.requestPermission()!=="granted"){u(window.getMessage("push_denied"),"error"),w(!1);return}let c=R(t),r=await s.pushManager.getSubscription();r||(r=await s.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:c}));let d=r.toJSON(),a={};try{let f=await fetch("https://ipapi.co/json/");f.ok&&(a=await f.json(),a={ip:a.ip,city:a.city,region:a.region,country:a.country_name,latitude:a.latitude,longitude:a.longitude,org:a.org})}catch(f){console.warn("Could not fetch GeoIP:",f)}let l={...d,userAgent:navigator.userAgent,language:navigator.language,platform:navigator.platform,screen:`${window.screen.width}x${window.screen.height}`,timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone,referrer:document.referrer,geo:a},g=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({data:l})});if(!g.ok)throw new Error(`Server error: ${g.status}`);let m=await g.json();m.id&&localStorage.setItem("pb_sub_id",m.id),p=r,w(!0),u(window.getMessage("push_success"),"success")}catch(s){console.error("Error subscribing:",s),u(window.getMessage("push_error_subscribe")+s.message,"error"),w(!1)}}function k(){console.log("Initializing Now Page...");let e=document.getElementById("studies-title");e&&(e.innerHTML=`\u{1F4DA} ${window.getMessage("studies_title")}`);let t=document.getElementById("timeline-title");t&&(t.innerHTML=`\u{1F4DD} ${window.getMessage("timeline_title")}`);let n=document.getElementById("push-btn");n&&(n.innerText=window.getMessage("push_subscribe"),n.addEventListener("click",$),L()),y(),b(),_(),v(),h(),typeof PullToRefresh<"u"&&PullToRefresh.init({mainElement:"body",triggerElement:"body",instructionsPullToRefresh:window.getMessage("ptr_pull"),instructionsReleaseToRefresh:window.getMessage("ptr_release"),instructionsRefreshing:window.getMessage("ptr_refreshing"),onRefresh:function(){return new Promise(async i=>{await Promise.all([y(),b(),_(),v(),h()]),i()})}});let o=(/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1)&&!window.MSStream,s=window.matchMedia("(display-mode: standalone)").matches;if(o&&!s){let i=document.getElementById("subscription-ui");if(i){let c=document.createElement("p");c.innerText=window.getMessage("push_ios_hint"),c.className="ios-hint",i.appendChild(c)}}}document.addEventListener("DOMContentLoaded",()=>{window.i18nMessages&&Object.keys(window.i18nMessages).length>0?k():window.addEventListener("i18nLoaded",()=>{k()},{once:!0})});})();
