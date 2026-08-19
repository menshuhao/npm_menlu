/**
 * menlu - 通用数据脱敏工具
 * 支持 Vue 3 / React / uni-app / 原生 JS
 */

/**
 * 核心脱敏逻辑
 */
function maskString(str, prefixLen = 3, suffixLen = 4, maskChar = "*") {
  const minLen = prefixLen + suffixLen;
  if (!str || str.length < minLen) return str || "";
  const prefix = str.slice(0, prefixLen);
  const suffix = suffixLen > 0 ? str.slice(-suffixLen) : "";
  const maskLen = str.length - prefixLen - suffixLen;
  return prefix + maskChar.repeat(maskLen) + suffix;
}

/**
 * 检测是否为 Vue ref
 */
function isRef(val) {
  return val && typeof val === "object" && "value" in val;
}

/**
 * 检测是否为 Vue computed（有 .value 且是只读）
 */
function isComputed(val) {
  return isRef(val) && typeof val.effect === "object";
}

/**
 * 尝试加载 Vue
 */
let _vue = null;
function getVue() {
  if (_vue !== null) return _vue;
  try {
    _vue = require("vue");
  } catch (e) {
    _vue = false;
  }
  return _vue;
}

/**
 * 通用数据脱敏
 *
 * @param {string | { value: string }} source - 原始值（字符串或 Vue ref/computed）
 * @param {object} [options] - 配置项
 * @param {number} [options.prefixLen=3] - 保留前缀位数
 * @param {number} [options.suffixLen=4] - 保留后缀位数
 * @param {string} [options.maskChar='*'] - 掩码字符
 * @returns {string | { value: string }} 脱敏后的值（Vue 环境返回 computed）
 *
 * @example
 * // 原生 JS
 * mask("13812345678", { prefixLen: 3, suffixLen: 4 })
 * // => "138****5678"
 *
 * // Vue 3
 * import { ref } from "vue"
 * import { mask } from "menlu"
 * const phone = ref("13812345678")
 * const masked = mask(phone, { prefixLen: 3, suffixLen: 4 })
 * // => computed { value: "138****5678" }
 *
 * // React
 * import { useMemo } from "react"
 * import { mask } from "menlu"
 * function Component() {
 *   const [phone] = useState("13812345678")
 *   const masked = useMemo(() => mask(phone), [phone])
 * }
 */
function mask(source, options = {}) {
  const { prefixLen = 3, suffixLen = 4, maskChar = "*" } = options;

  // Vue ref/computed：返回 computed
  if (isRef(source)) {
    const Vue = getVue();
    if (Vue && Vue.computed) {
      return Vue.computed(() => {
        const str = source.value || "";
        return maskString(str, prefixLen, suffixLen, maskChar);
      });
    }
    // 有 ref 但无 Vue：提取 value 当字符串处理
    return maskString(source.value || "", prefixLen, suffixLen, maskChar);
  }

  // 普通字符串：直接返回
  return maskString(source, prefixLen, suffixLen, maskChar);
}

module.exports = { mask, maskString };
