/**
 * menlu - console utilities
 * Shared low-level helpers (ANSI colors, environment detection, width calc)
 * Internal module, not part of the public API.
 */

const COLORS = {
  info: [0, 188, 212], // #00BCD4 cyan
  success: [76, 175, 80], // #4CAF50 green
  warn: [255, 152, 0], // #FF9800 orange
  error: [244, 67, 54], // #F44336 red
  header: [33, 150, 243], // #2196F3 blue
  border: [158, 158, 158], // #9E9E9E grey
  dim: [120, 120, 120], // muted grey
};

/**
 * Whether ANSI colors can be used.
 * Enabled in Node TTY terminals, disabled when NO_COLOR is set,
 * and always disabled in browsers (fallback to plain text).
 */
function supportsColor() {
  return (
    typeof process !== "undefined" &&
    process.stdout &&
    process.stdout.isTTY &&
    !process.env.NO_COLOR
  );
}

/**
 * Wrap text in a truecolor ANSI escape sequence.
 * @param {string} text
 * @param {number[]} [rgb] - [r, g, b] 0-255
 * @param {boolean} [bold]
 * @returns {string}
 */
function paint(text, rgb, bold = false) {
  if (!supportsColor()) return String(text);
  const style = bold ? "\x1b[1m" : "";
  return `${style}\x1b[38;2;${rgb[0]};${rgb[1]};${rgb[2]}m${text}\x1b[0m`;
}

// Characters rendered twice as wide as regular ones (CJK, fullwidth, emoji).
const WIDE_RE =
  /[\u1100-\u115F\u2E80-\uA4CF\uAC00-\uD7A3\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFF60\uFFE0-\uFFE6\u{1F300}-\u{1FAFF}]/u;

/**
 * Display width of a string (CJK chars and emoji count as 2).
 * @param {string} text
 * @returns {number}
 */
function displayWidth(text) {
  let width = 0;
  for (const ch of String(text)) {
    width += WIDE_RE.test(ch) ? 2 : 1;
  }
  return width;
}

/**
 * Pad a string with spaces to a given display width (right side).
 * @param {string} text
 * @param {number} width
 * @returns {string}
 */
function padWidth(text, width) {
  const str = String(text);
  return str + " ".repeat(Math.max(0, width - displayWidth(str)));
}

module.exports = {
  COLORS,
  supportsColor,
  paint,
  displayWidth,
  padWidth,
};
