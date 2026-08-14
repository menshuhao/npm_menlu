/**
 * menlu - pure numeric random ID generator
 * ESM entry (thin wrapper around the CommonJS implementation)
 */

import encodeNumId from "./numid.js";

export const numId = encodeNumId.numId;

export default { numId };
