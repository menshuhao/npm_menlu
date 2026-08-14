/**
 * menlu - browser utilities: copyText
 * ESM entry (thin wrapper around the CommonJS implementation)
 */

import browserCopy from "./copy.js";

export const copyText = browserCopy.copyText;

export default { copyText };
