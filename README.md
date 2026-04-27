# ⚡ RemoteAI SDK

> One SDK. Every AI Provider.

A unified wrapper that connects **OpenAI, Anthropic Claude, Google Gemini, Groq, Mistral & more** — with smart auto-routing, cost tracking, and fallback chains. Built by [PulseDataEngineer](https://pulsedataengineer.com).

---

## 🚀 Install

```bash
npm install remoteai
```

---

## 🔑 Get Your API Key

Get a free API key (100 req/mo) at → **https://pulsedataengineer.com/RemoteAI**

---

## 📦 Quick Start

```js
import RemoteAI from "remoteai";

const ai = new RemoteAI({
  apiKey: "rai_your_key_here",
});

// Simple prompt
const res = await ai.ask("Explain gradient descent in 2 sentences.");
console.log(res.text);
console.log(res.meta);
// → { provider: "groq", model: "llama3-70b", cost: "$0.0002", latency: "118ms" }
```

---

## 🔀 Routing Strategies

```js
// Auto (default) — RemoteAI picks the best provider
const auto = await ai.ask("Your prompt", { strategy: "auto" });

// Cheapest available provider
const cheap = await ai.ask("Your prompt", { strategy: "cheapest" });

// Fastest (lowest latency)
const fast = await ai.ask("Your prompt", { strategy: "fastest" });

// Best quality
const best = await ai.ask("Complex analysis...", { strategy: "quality" });
```

---

## 💬 Multi-turn Chat

```js
const res = await ai.chat([
  { role: "system",    content: "You are a concise data analyst." },
  { role: "user",      content: "What are the top 3 KPIs for SaaS?" },
]);

console.log(res.text);
```

---

## 📊 Cost & Session Tracking

```js
await ai.ask("First query...");
await ai.ask("Second query...");
await ai.ask("Third query...");

console.log(ai.sessionCost());    // "$0.0034"
console.log(ai.sessionTokens());  // 1420

console.log(ai.breakdown());
// [
//   { provider: "groq",    calls: 2, tokens: 820, cost: "$0.0007" },
//   { provider: "gemini",  calls: 1, tokens: 600, cost: "$0.0027" }
// ]

ai.resetSession(); // Start fresh tracking
```

---

## 📈 Check Usage & Limits

```js
const usage = await ai.usage();

console.log(usage.plan);               // "starter"
console.log(usage.totalRequests);      // 247
console.log(usage.monthlyLimit);       // 1000
console.log(usage.remainingRequests);  // 753
```

---

## 💰 Pricing

| Plan    | Price   | Requests/mo | Providers          |
|---------|---------|-------------|--------------------|
| Free    | $0      | 100         | Groq               |
| Starter | $9/mo   | 1,000       | Groq + Gemini      |
| Pro     | $29/mo  | Unlimited   | All 8+ providers   |

---

## 🌐 Supported Providers

- ⚡ Groq (Llama) — fastest, free tier
- 🔵 Google Gemini Flash / Pro
- 🟣 Anthropic Claude (Haiku, Sonnet, Opus)
- 🟢 OpenAI GPT-4o / GPT-4o-mini
- 🟠 Mistral AI
- 🔴 Together AI
- 🔷 Azure OpenAI
- 🟡 Cohere

---

## 📄 License

MIT © [PulseDataEngineer](https://pulsedataengineer.com)

---

*Built with ❤️ by the PulseDataEngineer · TechPulse team · info@pulsedataengineer.com*
