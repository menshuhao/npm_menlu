/**
 * menlu - console utilities: table
 * CommonJS implementation
 */

const { COLORS, paint, displayWidth, padWidth } = require("./ansi");

const BORDER = {
  topLeft: "\u250C", // ┌
  topMid: "\u252C", // ┬
  topRight: "\u2510", // ┐
  midLeft: "\u251C", // ├
  midMid: "\u253C", // ┼
  midRight: "\u2524", // ┤
  bottomLeft: "\u2514", // └
  bottomMid: "\u2534", // ┴
  bottomRight: "\u2518", // ┘
  v: "\u2502", // │
  h: "\u2500", // ─
};

function border(line) {
  return paint(line, COLORS.border);
}

function cell(text, width) {
  return ` ${padWidth(text, width)} `;
}

function rowLine(left, mid, right, widths) {
  return border(
    `${left}${widths.map((w) => BORDER.h.repeat(w + 2)).join(mid)}${right}`,
  );
}

/**
 * Print a bordered table with a blue bold header row.
 *
 * Accepts:
 * - array of objects: keys of the first row are used as headers
 * - array of arrays: first row is treated as the header row
 *
 * @param {Array} data - table data
 */
function table(data) {
  if (!Array.isArray(data) || data.length === 0) {
    console.log(paint("(empty)", COLORS.dim));
    return;
  }

  let headers;
  let rows;

  if (Array.isArray(data[0])) {
    [headers, ...rows] = data;
  } else {
    headers = [];
    for (const row of data) {
      for (const key of Object.keys(row)) {
        if (!headers.includes(key)) headers.push(key);
      }
    }
    rows = data.map((row) =>
      headers.map((h) => (row[h] == null ? "" : String(row[h]))),
    );
  }

  headers = headers.map(String);
  const widths = headers.map((h, i) =>
    Math.max(
      displayWidth(h),
      ...rows.map((r) => displayWidth(r[i] == null ? "" : String(r[i]))),
    ),
  );

  console.log(rowLine(BORDER.topLeft, BORDER.topMid, BORDER.topRight, widths));
  console.log(
    border(
      `\u2502${headers.map((h, i) => ` ${paint(padWidth(h, widths[i]), COLORS.header, true)} `).join(BORDER.v)}\u2502`,
    ),
  );
  console.log(rowLine(BORDER.midLeft, BORDER.midMid, BORDER.midRight, widths));

  for (const row of rows) {
    console.log(
      border(
        `\u2502${widths.map((w, i) => cell(row[i] == null ? "" : String(row[i]), w)).join(BORDER.v)}\u2502`,
      ),
    );
  }

  console.log(
    rowLine(BORDER.bottomLeft, BORDER.bottomMid, BORDER.bottomRight, widths),
  );
}

module.exports = { table };
