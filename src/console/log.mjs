/**
 * menlu - console utilities: log
 * ESM entry (thin wrapper around the CommonJS implementation)
 */

import consoleLog from "./log.js";

export const log = consoleLog.log;

export default { log };
