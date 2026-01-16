// assets/config.js
window.APP_CONFIG = {
  // Where the frontend sends connect/setup requests
  AUTOMATE_BASE_URL: "https://YOUR-AUTOM-MATE-DOMAIN", // e.g. https://api.jirachatbot.com
  CONNECT_ENDPOINT: "/public/jirachatbot/connect",     // POST
  CHECKOUT_ENDPOINT: "/public/jirachatbot/checkout",   // POST (optional)

  // If you use Stripe Payment Links instead of backend checkout creation:
  STRIPE_PAYMENT_LINKS: {
    starter: "https://buy.stripe.com/XXXX_STARTER",
    pro: "https://buy.stripe.com/XXXX_PRO",
    business: "https://buy.stripe.com/XXXX_BUSINESS"
  },

  BRAND: {
    name: "Jira Chatbot",
    domain: "jirachatbot.com"
  }
};
