/**
 * menlu - console utilities: box
 * CommonJS implementation
 */

const { COLORS, paint, displayWidth, padWidth } = require("./ansi");

/**
 * Print a grey-bordered box with a colored message inside.
 * Supports multi-line text.
 *
 * @param {*} text - message, will be stringified
 * @param {string} [type='info'] - 'info' | 'success' | 'warn' | 'error'
 */
function box(text, type = "info") {
  const rgb = Object.prototype.hasOwnProperty.call(COLORS, type)
    ? COLORS[type]
    : COLORS.info;
  const lines = String(text).split("\n");
  const width = Math.max(...lines.map(displayWidth));

  console.log(
    paint(`\u250C${"\u2500".repeat(width + 2)}\u2510`, COLORS.border),
  );
  for (const line of lines) {
    console.log(
      `${paint("\u2502", COLORS.border)} ${paint(padWidth(line, width), rgb)} ${paint("\u2502", COLORS.border)}`,
    );
  }
  console.log(
    paint(`\u2514${"\u2500".repeat(width + 2)}\u2518`, COLORS.border),
  );
}

module.exports = { box };
