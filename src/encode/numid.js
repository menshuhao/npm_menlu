/**
 * menlu - pure numeric random ID generator
 * CommonJS implementation
 */

const { getRandomValues } = require("./uuid");

/**
 * Generate a pure numeric random ID (crypto-secure).
 *
 * First digit is 1-9 (never 0), the rest are 0-9.
 * Useful for: order numbers, invite codes, SMS verification codes.
 *
 * @param {number} [length=10] - number of digits (1-100, clamped)
 * @returns {string} e.g. "4839201745"
 */
function numId(length = 10) {
  const n = Math.max(1, Math.min(Number(length) || 10, 100));
  const bytes = getRandomValues(new Uint8Array(n + 1));

  let result = String((bytes[0] % 9) + 1);
  for (let i = 1; i < n; i++) {
    result += String(bytes[i] % 10);
  }
  return result;
}

module.exports = { numId };
