/**
 * menlu - uuid generator
 * ESM entry (thin wrapper around the CommonJS implementation)
 */

import encodeUuid from "./uuid.js";

export const uuid = encodeUuid.uuid;

export default { uuid };
