/**
 * menlu - uuid generator
 * CommonJS implementation
 */

function getRandomValues(bytes) {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.getRandomValues === "function"
  ) {
    return crypto.getRandomValues(bytes);
  }
  // Node.js versions without a global Web Crypto
  if (typeof require === "function") {
    try {
      return require("crypto").randomFillSync(bytes);
    } catch {
      // fall through
    }
  }
  // Last-resort fallback
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = Math.floor(Math.random() * 256);
  }
  return bytes;
}

/**
 * Generate a random UUID v4 string.
 * Uses crypto.randomUUID when available (Node 19+/modern browsers),
 * otherwise builds one from 16 cryptographically random bytes.
 *
 * @returns {string} e.g. "550e8400-e29b-41d4-a716-446655440000"
 */
function uuid() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  const bytes = getRandomValues(new Uint8Array(16));

  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10xx

  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join(
    "",
  );
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

module.exports = { uuid };
