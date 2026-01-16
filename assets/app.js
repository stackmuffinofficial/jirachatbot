// assets/app.js
function qs(sel){ return document.querySelector(sel); }
function qsa(sel){ return Array.from(document.querySelectorAll(sel)); }

function getConfig(){
  if(!window.APP_CONFIG) throw new Error("APP_CONFIG missing. Check assets/config.js");
  return window.APP_CONFIG;
}

async function postJSON(url, data){
  const res = await fetch(url, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(data)
  });

  let json = null;
  try { json = await res.json(); } catch(_) {}

  if(!res.ok){
    const msg = (json && (json.error || json.message)) ? (json.error || json.message) : `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return json;
}

function setToast(el, type, msg){
  el.className = "toast " + (type === "ok" ? "ok" : "err");
  el.textContent = msg;
  el.style.display = "block";
}
