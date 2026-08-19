/**
 * menlu - 通用数据脱敏工具
 * ESM entry (thin wrapper around the CommonJS implementation)
 */

import vueUseMask from "./useMask.js";

export const mask = vueUseMask.mask;
export const maskString = vueUseMask.maskString;

export default { mask, maskString };
