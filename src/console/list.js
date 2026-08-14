/**
 * menlu - console utilities: list
 * CommonJS implementation
 */

const { COLORS, paint, displayWidth, padWidth } = require("./ansi");

/**
 * Print an array or object as a readable list.
 *
 * - Array: one bullet point per item
 * - Object: aligned "key: value" lines
 *
 * @param {Array|Object} items
 */
function list(items) {
  if (Array.isArray(items)) {
    for (const item of items) {
      console.log(`  ${paint("\u2022", COLORS.dim)} ${String(item)}`);
    }
    return;
  }

  if (items && typeof items === "object") {
    const entries = Object.entries(items);
    if (entries.length === 0) return;
    const keyWidth = Math.max(...entries.map(([k]) => displayWidth(k)));
    for (const [key, value] of entries) {
      console.log(
        `  ${paint(padWidth(key, keyWidth), COLORS.header)}: ${String(value)}`,
      );
    }
    return;
  }

  console.log(String(items));
}

module.exports = { list };
