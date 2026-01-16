// assets/connect.js
const cfg = getConfig();

const platformTemplates = {
  whatsapp: `
    <div class="row">
      <div class="field">
        <label>WhatsApp Provider (Twilio / Meta / Other)</label>
        <select id="waProvider">
          <option value="twilio">Twilio</option>
          <option value="meta">Meta Cloud API</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="field">
        <label>WhatsApp sender number / phone id</label>
        <input id="waSender" class="input" placeholder="+90..." />
      </div>
    </div>
    <div class="row">
      <div class="field">
        <label>Provider account id (optional)</label>
        <input id="waAccountId" class="input" placeholder="..." />
      </div>
      <div class="field">
        <label>Provider token / secret</label>
        <input id="waToken" class="input" type="password" placeholder="********" />
      </div>
    </div>
  `,
  teams: `
    <div class="row">
      <div class="field">
        <label>Azure AD Tenant ID</label>
        <input id="teamsTenantId" class="input" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" />
      </div>
      <div class="field">
        <label>Teams App (Client) ID</label>
        <input id="teamsClientId" class="input" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" />
      </div>
    </div>
    <div class="row">
      <div class="field">
        <label>Teams Client Secret</label>
        <input id="teamsClientSecret" class="input" type="password" placeholder="********" />
      </div>
      <div class="field">
        <label>Default Teams channel (optional)</label>
        <input id="teamsChannel" class="input" placeholder="e.g. Support" />
      </div>
    </div>
  `,
  slack: `
    <div class="row">
      <div class="field">
        <label>Slack Bot Token</label>
        <input id="slackBotToken" class="input" type="password" placeholder="xoxb-..." />
      </div>
      <div class="field">
        <label>Slack Signing Secret</label>
        <input id="slackSigningSecret" class="input" type="password" placeholder="********" />
      </div>
    </div>
    <div class="row">
      <div class="field">
        <label>Slack Workspace ID (optional)</label>
        <input id="slackWorkspaceId" class="input" placeholder="T0123..." />
      </div>
      <div class="field">
        <label>Default channel (optional)</label>
        <input id="slackChannel" class="input" placeholder="#jira" />
      </div>
    </div>
  `
};

let selectedPlatform = "whatsapp";

function renderPlatformFields(){
  qs("#platformFields").innerHTML = platformTemplates[selectedPlatform];
}

function setActivePill(){
  qsa(".pill").forEach(p => p.classList.remove("active"));
  const el = qsa(".pill").find(p => p.dataset.platform === selectedPlatform);
  if(el) el.classList.add("active");
}

qsa(".pill").forEach(p => {
  p.addEventListener("click", () => {
    selectedPlatform = p.dataset.platform;
    setActivePill();
    renderPlatformFields();
  });
});

renderPlatformFields();

qs("#btnSubmit").addEventListener("click", async () => {
  const toast = qs("#toast");
  toast.style.display = "none";

  const payload = {
    workspace: {
      name: qs("#workspaceName").value.trim(),
      admin_email: qs("#adminEmail").value.trim(),
      plan: qs("#plan").value
    },
    platform: selectedPlatform,
    jira: {
      base_url: qs("#jiraBaseUrl").value.trim(),
      project_key: qs("#jiraProjectKey").value.trim() || null,
      user: qs("#jiraUser").value.trim(),
      api_token: qs("#jiraToken").value // don't trim passwords/tokens
    },
    platform_config: {}
  };

  // Basic validation
  if(!payload.workspace.name) return setToast(toast, "err", "Workspace name is required.");
  if(!payload.workspace.admin_email || !payload.workspace.admin_email.includes("@")) return setToast(toast, "err", "Valid admin email is required.");
  if(!payload.jira.base_url.startsWith("http")) return setToast(toast, "err", "Jira base URL must start with http(s).");
  if(!payload.jira.user) return setToast(toast, "err", "Jira user/email is required.");
  if(!payload.jira.api_token) return setToast(toast, "err", "Jira API token is required.");

  // Platform-specific fields
  if(selectedPlatform === "whatsapp"){
    payload.platform_config = {
      provider: qs("#waProvider").value,
      sender: qs("#waSender").value.trim(),
      account_id: qs("#waAccountId").value.trim() || null,
      token: qs("#waToken").value
    };
    if(!payload.platform_config.sender) return setToast(toast, "err", "WhatsApp sender is required.");
    if(!payload.platform_config.token) return setToast(toast, "err", "WhatsApp token/secret is required.");
  }

  if(selectedPlatform === "teams"){
    payload.platform_config = {
      tenant_id: qs("#teamsTenantId").value.trim(),
      client_id: qs("#teamsClientId").value.trim(),
      client_secret: qs("#teamsClientSecret").value,
      default_channel: qs("#teamsChannel").value.trim() || null
    };
    if(!payload.platform_config.tenant_id) return setToast(toast, "err", "Tenant ID is required.");
    if(!payload.platform_config.client_id) return setToast(toast, "err", "Client ID is required.");
    if(!payload.platform_config.client_secret) return setToast(toast, "err", "Client secret is required.");
  }

  if(selectedPlatform === "slack"){
    payload.platform_config = {
      bot_token: qs("#slackBotToken").value,
      signing_secret: qs("#slackSigningSecret").value,
      workspace_id: qs("#slackWorkspaceId").value.trim() || null,
      default_channel: qs("#slackChannel").value.trim() || null
    };
    if(!payload.platform_config.bot_token) return setToast(toast, "err", "Slack bot token is required.");
    if(!payload.platform_config.signing_secret) return setToast(toast, "err", "Slack signing secret is required.");
  }

  try{
    qs("#btnSubmit").disabled = true;
    qs("#btnSubmit").textContent = "Submitting...";

    const url = cfg.AUTOMATE_BASE_URL + cfg.CONNECT_ENDPOINT;
    const res = await postJSON(url, payload);

    // Expect backend returns something like: { ok:true, workspace_id:"...", next_steps:[...]}
    setToast(toast, "ok", res.message || "Setup received. Check your email or next steps in Autom Mate.");
  }catch(err){
    setToast(toast, "err", err.message || "Failed to submit setup.");
  }finally{
    qs("#btnSubmit").disabled = false;
    qs("#btnSubmit").textContent = "Submit setup";
  }
});
