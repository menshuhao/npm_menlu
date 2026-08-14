/**
 * menlu - date format utilities
 * CommonJS implementation
 */

function pad(n) {
  return String(n).padStart(2, "0");
}

/**
 * Format a date with a pattern string.
 *
 * Supported tokens:
 *   YYYY - 4-digit year        YY   - 2-digit year
 *   MM   - zero-padded month   M    - month
 *   DD   - zero-padded day     D    - day
 *   HH   - zero-padded hour    H    - hour
 *   mm   - zero-padded minute  m    - minute
 *   ss   - zero-padded second  s    - second
 *
 * @param {Date|number|string} [date=new Date()] - Date instance, timestamp, or parseable date string
 * @param {string} [pattern='YYYY-MM-DD'] - format template
 * @returns {string} formatted date string
 * @throws {TypeError} if date is invalid
 */
function formatDate(date = new Date(), pattern = "YYYY-MM-DD") {
  const d = date instanceof Date ? date : new Date(date);

  if (Number.isNaN(d.getTime())) {
    throw new TypeError("Invalid date");
  }

  const tokens = {
    YYYY: String(d.getFullYear()),
    YY: String(d.getFullYear()).slice(-2),
    MM: pad(d.getMonth() + 1),
    M: String(d.getMonth() + 1),
    DD: pad(d.getDate()),
    D: String(d.getDate()),
    HH: pad(d.getHours()),
    H: String(d.getHours()),
    mm: pad(d.getMinutes()),
    m: String(d.getMinutes()),
    ss: pad(d.getSeconds()),
    s: String(d.getSeconds()),
  };

  return pattern.replace(
    /YYYY|YY|MM|M|DD|D|HH|H|mm|m|ss|s/g,
    (token) => tokens[token],
  );
}

module.exports = {
  formatDate,
};
