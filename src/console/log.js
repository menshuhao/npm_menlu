/**
 * menlu - console utilities: log
 * CommonJS implementation
 */

const { COLORS, paint } = require("./ansi");

const ICONS = {
  info: "\u2139", // ℹ
  success: "\u2714", // ✔
  warn: "\u26A0", // ⚠
  error: "\u2718", // ✘
};

/**
 * Print a colored log line with a level icon.
 *
 * @param {*} message - anything, will be stringified
 * @param {string} [type='info'] - 'info' | 'success' | 'warn' | 'error'
 * @returns {*} the original message
 */
function log(message, type = "info") {
  const level = Object.prototype.hasOwnProperty.call(ICONS, type)
    ? type
    : "info";
  const icon = ICONS[level];
  const text = String(message);
  const rgb = COLORS[level];

  if (paint("", rgb) !== "") {
    console.log(`${paint(icon, rgb, true)} ${paint(text, rgb)}`);
  } else {
    console.log(`${icon} ${text}`);
  }
  return message;
}

module.exports = { log };
