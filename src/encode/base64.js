/**
 * menlu - base64 encode/decode
 * CommonJS implementation
 */

/**
 * Base64-encode a string. Unicode-safe: UTF-8 encoded before encoding,
 * unlike native btoa() which throws on non-Latin1 characters.
 *
 * @param {string} text - string to encode
 * @returns {string} base64 string
 */
function toBase64(text) {
  const str = String(text == null ? "" : text);

  if (typeof Buffer !== "undefined") {
    return Buffer.from(str, "utf8").toString("base64");
  }

  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (const b of bytes) {
    binary += String.fromCharCode(b);
  }
  return btoa(binary);
}

/**
 * Decode a base64 string back to UTF-8 text.
 *
 * @param {string} base64 - base64 string
 * @returns {string} decoded text
 */
function fromBase64(base64) {
  const str = String(base64 == null ? "" : base64);

  if (typeof Buffer !== "undefined") {
    return Buffer.from(str, "base64").toString("utf8");
  }

  const binary = atob(str);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

module.exports = { toBase64, fromBase64 };
