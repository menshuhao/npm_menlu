/**
 * menlu - base64 encode/decode
 * ESM entry (thin wrapper around the CommonJS implementation)
 */

import encodeBase64 from "./base64.js";

export const toBase64 = encodeBase64.toBase64;
export const fromBase64 = encodeBase64.fromBase64;

export default { toBase64, fromBase64 };
