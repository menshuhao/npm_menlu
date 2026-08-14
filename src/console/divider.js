/**
 * menlu - console utilities: divider
 * CommonJS implementation
 */

const { COLORS, paint } = require("./ansi");

/**
 * Print a grey horizontal divider line.
 *
 * @param {number} [length=40] - number of line characters
 * @param {string} [char='─'] - line character
 */
function divider(length = 40, char = "\u2500") {
  const n = Math.max(1, Number(length) || 1);
  console.log(paint(char.repeat(n), COLORS.border));
}

module.exports = { divider };
