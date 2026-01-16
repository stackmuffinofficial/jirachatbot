// assets/pricing.js
const cfg = getConfig();
const toast = qs("#toast");

async function startCheckout(plan){
  // Mode A: Stripe Payment Link (no backend)
  const link = cfg.STRIPE_PAYMENT_LINKS && cfg.STRIPE_PAYMENT_LINKS[plan];
  if(link && link.startsWith("http")){
    window.location.href = link;
    return;
  }

  // Mode B: Autom Mate backend creates checkout URL
  // Expected response: { checkout_url: "https://..." }
  const url = cfg.AUTOMATE_BASE_URL + cfg.CHECKOUT_ENDPOINT;

  const payload = {
    plan,
    success_url: window.location.origin + "/success.html",
    cancel_url: window.location.origin + "/cancel.html"
  };

  const res = await postJSON(url, payload);
  if(!res.checkout_url) throw new Error("Backend did not return checkout_url");
  window.location.href = res.checkout_url;
}

qsa("button[data-plan]").forEach(btn => {
  btn.addEventListener("click", async () => {
    const plan = btn.dataset.plan;
    toast.style.display = "none";
    try{
      btn.disabled = true;
      btn.textContent = "Redirecting...";
      await startCheckout(plan);
    }catch(err){
      setToast(toast, "err", err.message || "Checkout failed.");
      btn.disabled = false;
      btn.textContent = `Buy ${plan[0].toUpperCase()+plan.slice(1)}`;
    }
  });
});
