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
 * Whether the browser console (console.log with %c styles) is available.
 * True in browsers (including devtools), false in Node / mini programs.
 */
function supportsBrowserConsole() {
  return (
    typeof window !== "undefined" &&
    typeof window.console !== "undefined" &&
    typeof window.console.log === "function"
  );
}

/**
 * Print a colored log line with a level icon.
 * Colors: ANSI in Node TTY, %c styles in browser console,
 * plain text otherwise (NO_COLOR / redirected output / mini programs).
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
  } else if (supportsBrowserConsole()) {
    const style = `color: rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]});`;
    console.log(`%c${icon} %c${text}`, `${style} font-weight: bold;`, style);
  } else {
    console.log(`${icon} ${text}`);
  }
  return message;
}

module.exports = { log };
