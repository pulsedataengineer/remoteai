/**
 * RemoteAI SDK
 * One SDK. Every AI Provider.
 * 
 * © PulseDataEngineer · TechPulse
 * https://pulsedataengineer.com
 */

const GATEWAY_URL = "https://pulsedataengineer.com/functions/remoteAIGateway";

class RemoteAI {
  /**
   * @param {object} options
   * @param {string} options.apiKey  - Your RemoteAI API key (rai_...)
   * @param {string} [options.strategy="auto"] - Default routing strategy: auto | cheapest | fastest | quality
   * @param {string} [options.gatewayUrl]  - Override the gateway URL (optional)
   */
  constructor({ apiKey, strategy = "auto", gatewayUrl } = {}) {
    if (!apiKey) throw new Error("[RemoteAI] apiKey is required. Get yours at https://pulsedataengineer.com/RemoteAI");
    this._apiKey = apiKey;
    this._defaultStrategy = strategy;
    this._gatewayUrl = gatewayUrl || GATEWAY_URL;

    // Session tracking
    this._sessionCost = 0;
    this._sessionTokens = 0;
    this._sessionCalls = [];
  }

  // ─── Core Methods ──────────────────────────────────────────────────────────

  /**
   * Send a simple prompt and get a response.
   * @param {string} prompt
   * @param {object} [options]
   * @param {string} [options.strategy] - Override default routing strategy
   * @param {string} [options.systemPrompt] - System prompt to prepend
   * @returns {Promise<{ text: string, meta: object }>}
   */
  async ask(prompt, options = {}) {
    const payload = {
      action: "generate",
      remoteai_key: this._apiKey,
      prompt,
      strategy: options.strategy || this._defaultStrategy,
      system_prompt: options.systemPrompt || null,
    };

    const result = await this._post(payload);
    this._trackSession(result.meta);
    return result;
  }

  /**
   * Send a multi-turn chat conversation.
   * @param {Array<{ role: "user"|"system"|"assistant", content: string }>} messages
   * @param {object} [options]
   * @param {string} [options.strategy] - Override default routing strategy
   * @returns {Promise<{ text: string, meta: object }>}
   */
  async chat(messages, options = {}) {
    if (!Array.isArray(messages) || messages.length === 0) {
      throw new Error("[RemoteAI] messages must be a non-empty array");
    }

    // Extract system prompt and last user message for gateway compatibility
    const systemMsg = messages.find((m) => m.role === "system");
    const userMessages = messages.filter((m) => m.role !== "system");
    const lastUser = userMessages[userMessages.length - 1];

    // Build conversation history (all messages except the last user one)
    const history = userMessages.slice(0, -1);

    const payload = {
      action: "generate",
      remoteai_key: this._apiKey,
      prompt: lastUser?.content || "",
      system_prompt: systemMsg?.content || null,
      history: history.length > 0 ? history : null,
      strategy: options.strategy || this._defaultStrategy,
    };

    const result = await this._post(payload);
    this._trackSession(result.meta);
    return result;
  }

  /**
   * Check your API key usage and remaining quota.
   * @returns {Promise<{ plan: string, totalRequests: number, monthlyLimit: number, remainingRequests: number, totalCostUsd: number }>}
   */
  async usage() {
    return this._post({ action: "usage", remoteai_key: this._apiKey });
  }

  // ─── Session Tracking ──────────────────────────────────────────────────────

  /** Returns total estimated cost for the current session (string, e.g. "$0.0034") */
  sessionCost() {
    return `$${this._sessionCost.toFixed(6)}`;
  }

  /** Returns total tokens used in the current session */
  sessionTokens() {
    return this._sessionTokens;
  }

  /** Returns a per-provider breakdown of session usage */
  breakdown() {
    const map = {};
    for (const call of this._sessionCalls) {
      const key = call.provider || "unknown";
      if (!map[key]) map[key] = { provider: key, calls: 0, tokens: 0, cost: 0 };
      map[key].calls += 1;
      map[key].tokens += (call.inputTokens || 0) + (call.outputTokens || 0);
      map[key].cost += call.estimatedCostUsd || 0;
    }
    return Object.values(map).map((p) => ({
      ...p,
      cost: `$${p.cost.toFixed(6)}`,
    }));
  }

  /** Reset session cost/token tracking */
  resetSession() {
    this._sessionCost = 0;
    this._sessionTokens = 0;
    this._sessionCalls = [];
  }

  // ─── Internal ─────────────────────────────────────────────────────────────

  async _post(payload) {
    let response;
    try {
      response = await fetch(this._gatewayUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      throw new Error(`[RemoteAI] Network error: ${err.message}`);
    }

    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(`[RemoteAI] ${data.error || `HTTP ${response.status}`}`);
    }

    return data;
  }

  _trackSession(meta) {
    if (!meta) return;
    this._sessionCost += meta.estimatedCostUsd || 0;
    this._sessionTokens += (meta.inputTokens || 0) + (meta.outputTokens || 0);
    this._sessionCalls.push(meta);
  }
}

// ─── Exports ──────────────────────────────────────────────────────────────────

// ES Module default export
export default RemoteAI;
export { RemoteAI };
