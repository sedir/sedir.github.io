(()=>{function u(){window.i18nMessages={};let t=window.SiteConfig&&window.SiteConfig.language||"en";window.currentLanguage=t,fetch("/messages.json").then(e=>e.json()).then(e=>{window.i18nMessages=e,window.dispatchEvent(new Event("i18nLoaded"))}).catch(e=>{console.error("Failed to load i18n messages:",e),window.dispatchEvent(new Event("i18nLoaded"))})}function M(t,e){let n=e||window.currentLanguage||"en";return window.i18nMessages&&window.i18nMessages[t]&&window.i18nMessages[t][n]?window.i18nMessages[t][n]:t}window.getMessage=M;function l(t,e="info"){let n=document.getElementById("toast-container");n||(n=document.createElement("div"),n.id="toast-container",n.className="toast-container",document.body.appendChild(n));let o=document.createElement("div");o.className=`toast toast-${e}`;let a="\u2139\uFE0F";e==="success"&&(a="\u2705"),e==="error"&&(a="\u274C"),e==="warning"&&(a="\u26A0\uFE0F"),o.innerHTML=`<span class="toast-icon">${a}</span><span class="toast-content">${t}</span>`,n.appendChild(o),setTimeout(()=>{o.classList.add("hide"),o.addEventListener("animationend",()=>{o.remove(),n.children.length===0&&n.remove()})},4e3)}window.showToast=l;function w(){if(!document.getElementById("contactModal")){let t=`
        <div id="contactModal" class="contact-modal">
            <div class="contact-modal-content">
                <span class="contact-close" onclick="window.closeContactModal()">&times;</span>
                <div class="contact-header">
                    <h2>${window.getMessage("contact_title")}</h2>
                </div>
                <form id="contactForm" onsubmit="window.submitContactForm(event)">
                    <div class="contact-form-group">
                        <label for="contact-name">${window.getMessage("contact_from_label")}</label>
                        <input type="text" id="contact-name" class="contact-input" placeholder="${window.getMessage("contact_name_placeholder")}" required>
                    </div>
                    <div class="contact-form-group">
                        <label for="contact-info">${window.getMessage("contact_info_label")}</label>
                        <input type="text" id="contact-info" class="contact-input" placeholder="${window.getMessage("contact_info_placeholder")}">
                    </div>
                    <div class="contact-form-group">
                        <label for="contact-message">${window.getMessage("contact_message_label")}</label>
                        <textarea id="contact-message" class="contact-textarea" placeholder="${window.getMessage("contact_message_placeholder")}" required></textarea>
                    </div>
                    <button type="submit" id="contact-submit-btn" class="contact-submit">${window.getMessage("contact_send")}</button>
                </form>
            </div>
        </div>`;document.body.insertAdjacentHTML("beforeend",t)}document.querySelectorAll('a[href$="#contact"]').forEach(t=>{t.addEventListener("click",e=>{e.preventDefault(),v()})}),window.onclick=function(t){let e=document.getElementById("contactModal");t.target===e&&r()},window.addEventListener("keydown",t=>{t.key==="Escape"&&r()}),window.closeContactModal=r,window.submitContactForm=b}function v(){let t=document.getElementById("contactModal");t&&(t.style.display="block",setTimeout(()=>document.getElementById("contact-name").focus(),100))}function r(){let t=document.getElementById("contactModal");t&&(t.style.display="none")}async function b(t){t.preventDefault();let e=window.SiteConfig.urls.contact,n="contact_history",o=600*1e3,a=2,f=Date.now(),s=JSON.parse(localStorage.getItem(n)||"[]");if(s=s.filter(c=>f-c<o),s.length>=a){l(window.getMessage("contact_rate_limit")||"Please wait a while before sending another message.","warning");return}let m=document.getElementById("contact-name"),i=document.getElementById("contact-info"),g=document.getElementById("contact-message"),d=document.getElementById("contact-submit-btn"),p=d.innerText;d.disabled=!0,d.innerText=window.getMessage("contact_sending");try{let c=g.value;i&&i.value.trim()!==""&&(c+=`

---
Contact Info: ${i.value.trim()}`);let h={author:m.value,content:c,source:window.location.href};if(!(await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(h)})).ok)throw new Error("Failed to send");s.push(Date.now()),localStorage.setItem(n,JSON.stringify(s)),l(window.getMessage("contact_success"),"success"),r(),m.value="",i&&(i.value=""),g.value=""}catch(c){console.error("Contact error:",c),l(window.getMessage("contact_error"),"error")}finally{d.disabled=!1,d.innerText=p}}document.addEventListener("DOMContentLoaded",()=>{u(),window.i18nMessages&&Object.keys(window.i18nMessages).length>0?w():window.addEventListener("i18nLoaded",()=>{w()},{once:!0})});})();
