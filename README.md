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

## 🌍 Use From Any Language (REST API)

The npm package is a JavaScript convenience wrapper. **Any language** can call RemoteAI directly via the REST API.

### 🐍 Python / Jupyter Notebook

```python
import requests

response = requests.post(
    "https://pulsedataengineer.com/functions/remoteAIGateway",
    json={
        "action":       "generate",
        "remoteai_key": "rai_your_key_here",
        "prompt":       "Explain gradient descent simply.",
        "strategy":     "auto",   # auto | cheapest | fastest | quality
    }
)

data = response.json()
print(data["text"])   # AI response
print(data["meta"])   # provider, model, cost, latency, tokens saved
```

---

### 🌐 cURL / REST

```bash
curl -X POST https://pulsedataengineer.com/functions/remoteAIGateway \
  -H "Content-Type: application/json" \
  -d '{
    "action":       "generate",
    "remoteai_key": "rai_your_key_here",
    "prompt":       "What is RAG in AI?",
    "strategy":     "cheapest"
  }'
```

---

### 🟦 JavaScript (fetch — no npm needed)

```js
const response = await fetch("https://pulsedataengineer.com/functions/remoteAIGateway", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    action:       "generate",
    remoteai_key: "rai_your_key_here",
    prompt:       "Summarize this article...",
    strategy:     "fastest",
  })
});

const data = await response.json();
console.log(data.text);
console.log(data.meta);
```

---

### ♦️ R Language

```r
library(httr)
library(jsonlite)

response <- POST(
  "https://pulsedataengineer.com/functions/remoteAIGateway",
  content_type_json(),
  body = toJSON(list(
    action       = "generate",
    remoteai_key = "rai_your_key_here",
    prompt       = "Explain linear regression.",
    strategy     = "auto"
  ), auto_unbox = TRUE)
)

data <- content(response, as = "parsed")
cat(data$text)
```

---

### 📡 API Response Format

Every request returns:
```json
{
  "text": "The AI response...",
  "meta": {
    "provider":        "groq",
    "model":           "llama3-70b",
    "latencyMs":       118,
    "inputTokens":     42,
    "outputTokens":    95,
    "estimatedCostUsd": 0.0002
  }
}
```

---

### 📋 Available Actions

| Action | Description |
|--------|-------------|
| `generate` | Single prompt → AI response |
| `register` | Get a free API key |
| `usage` | Check your usage & limits |

---

## 📄 License

MIT © [PulseDataEngineer](https://pulsedataengineer.com)

---

*Built with ❤️ by the PulseDataEngineer · TechPulse team · info@pulsedataengineer.com*
