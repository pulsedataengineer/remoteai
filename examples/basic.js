/**
 * RemoteAI SDK — Basic Usage Examples
 * 
 * Run: node examples/basic.js
 * (Replace "rai_your_key_here" with your actual key from pulsedataengineer.com/RemoteAI)
 */

import RemoteAI from "../src/index.js";

const ai = new RemoteAI({
  apiKey: "rai_your_key_here",  // ← Replace with your key
  strategy: "auto",             // auto | cheapest | fastest | quality
});

async function run() {
  console.log("⚡ RemoteAI SDK — Examples\n");

  // ── Example 1: Simple ask ───────────────────────────────────────────────
  console.log("📌 Example 1: Simple ask");
  const res1 = await ai.ask("Explain supervised learning in 2 sentences.");
  console.log("Response:", res1.text);
  console.log("Meta:", res1.meta);
  console.log();

  // ── Example 2: Ask with strategy override ──────────────────────────────
  console.log("📌 Example 2: Cheapest routing");
  const res2 = await ai.ask("List 3 benefits of microservices.", { strategy: "cheapest" });
  console.log("Response:", res2.text);
  console.log("Provider used:", res2.meta?.providerName);
  console.log();

  // ── Example 3: Multi-turn chat ─────────────────────────────────────────
  console.log("📌 Example 3: Multi-turn chat");
  const res3 = await ai.chat([
    { role: "system", content: "You are a concise Python expert." },
    { role: "user",   content: "Write a binary search function in Python." },
  ]);
  console.log("Response:", res3.text);
  console.log();

  // ── Example 4: Session cost tracking ──────────────────────────────────
  console.log("📌 Example 4: Session tracking");
  console.log("Session Cost:", ai.sessionCost());
  console.log("Session Tokens:", ai.sessionTokens());
  console.log("Breakdown:", ai.breakdown());
  console.log();

  // ── Example 5: Check usage/limits ─────────────────────────────────────
  console.log("📌 Example 5: API key usage");
  const usage = await ai.usage();
  console.log("Plan:", usage.plan);
  console.log("Requests used:", usage.totalRequests, "/", usage.monthlyLimit);
  console.log("Remaining:", usage.remainingRequests);
}

run().catch(console.error);
