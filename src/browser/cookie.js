/**
 * menlu - browser utilities: cookie
 * CommonJS implementation
 */

const UNIT_MS = {
  ms: 1,
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
  w: 7 * 24 * 60 * 60 * 1000,
  y: 365 * 24 * 60 * 60 * 1000,
};

/**
 * Resolve a TTL input to a UTC expires string.
 *
 * Accepts:
 * - number + options.unit ('ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'y', default 's')
 * - string with unit suffix, e.g. '30m', '2h', '7d', '500ms'
 * - Date instance (exact expiry)
 * - undefined -> session cookie (no expires)
 *
 * Unparseable input is treated as a session cookie.
 */
function toExpires(ttl, unit) {
  if (ttl == null) return undefined;
  if (ttl instanceof Date) return ttl.toUTCString();

  if (typeof ttl === "string") {
    const m = ttl.trim().match(/^(\d+)(ms|s|m|h|d|w|y)$/i);
    if (!m) return undefined;
    return new Date(
      Date.now() + Number(m[1]) * UNIT_MS[m[2].toLowerCase()],
    ).toUTCString();
  }

  if (typeof ttl === "number") {
    const key = unit ? String(unit).toLowerCase() : "s";
    const mult = UNIT_MS[key];
    if (!mult) return undefined;
    return new Date(Date.now() + ttl * mult).toUTCString();
  }

  return undefined;
}

/**
 * Set a cookie.
 *
 * @param {string} name - cookie name
 * @param {*} value - cookie value, will be stringified and URI-encoded
 * @param {number|string|Date} [ttl] - lifetime:
 *   number + options.unit (default unit 's'), e.g. 7200 + { unit: 's' }
 *   string with suffix, e.g. '2h', '30m', '7d', '500ms'
 *   Date instance for an exact expiry
 *   omit for a session cookie
 * @param {Object} [options] - { unit, path ('/' default), domain, secure, sameSite }
 * @returns {boolean} true in browsers, false where document is unavailable
 */
function setCookie(name, value, ttl, options = {}) {
  if (typeof document === "undefined") return false;

  const parts = [
    `${encodeURIComponent(name)}=${encodeURIComponent(String(value == null ? "" : value))}`,
  ];
  const expires = toExpires(ttl, options.unit);
  if (expires) parts.push(`expires=${expires}`);
  parts.push(`path=${options.path || "/"}`);
  if (options.domain) parts.push(`domain=${options.domain}`);
  if (options.secure) parts.push("secure");
  if (options.sameSite) parts.push(`samesite=${options.sameSite}`);

  document.cookie = parts.join("; ");
  return true;
}

/**
 * Get a cookie value by name.
 *
 * @param {string} name - cookie name
 * @returns {string|null} decoded value, or null if missing / not in a browser
 */
function getCookie(name) {
  if (typeof document === "undefined") return null;

  const key = `${encodeURIComponent(name)}=`;
  const cookies = document.cookie.split("; ");
  for (const c of cookies) {
    if (c.indexOf(key) === 0) {
      return decodeURIComponent(c.slice(key.length));
    }
  }
  return null;
}

/**
 * Remove a cookie. Use the same path/domain it was set with.
 *
 * @param {string} name - cookie name
 * @param {Object} [options] - { path ('/' default), domain, secure }
 * @returns {boolean} true in browsers, false where document is unavailable
 */
function removeCookie(name, options = {}) {
  if (typeof document === "undefined") return false;

  const parts = [`${encodeURIComponent(name)}=`];
  parts.push("expires=Thu, 01 Jan 1970 00:00:00 GMT");
  parts.push(`path=${options.path || "/"}`);
  if (options.domain) parts.push(`domain=${options.domain}`);
  if (options.secure) parts.push("secure");

  document.cookie = parts.join("; ");
  return true;
}

module.exports = { setCookie, getCookie, removeCookie };
