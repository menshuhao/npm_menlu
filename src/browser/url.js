/**
 * menlu - URL utility toolkit
 * CommonJS implementation
 */

/**
 * Get current page full URL.
 *
 * @returns {string} full URL
 * @example
 * url(); // => 'https://example.com/path?id=1#section'
 */
function url() {
  if (typeof window !== "undefined" && window.location) {
    return window.location.href;
  }
  return "";
}

/**
 * Get current page URL without query parameters.
 *
 * @returns {string} URL without query (protocol + host + path)
 * @example
 * baseUrl(); // => 'https://example.com/path'
 */
function baseUrl() {
  if (typeof window !== "undefined" && window.location) {
    const loc = window.location;
    return loc.origin + loc.pathname;
  }
  return "";
}

/**
 * Parse all query parameters from current page URL.
 *
 * @returns {Object} key-value pairs of query parameters
 * @example
 * // Current URL: https://example.com?id=1&name=张三
 * urlParams(); // => { id: '1', name: '张三' }
 */
function urlParams() {
  if (typeof window !== "undefined" && window.location) {
    const search = window.location.search;
    if (!search) return {};

    const params = {};
    const searchParams = new URLSearchParams(search);
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }

  return {};
}

/**
 * Get a specific query parameter from current page URL.
 *
 * @param {string} name - parameter name
 * @param {*} [defaultValue] - default value if not found
 * @returns {*} parameter value (auto-convert to number if defaultValue is number) or default
 * @example
 * // Current URL: https://example.com?id=1
 * urlParam('id');        // => '1'
 * urlParam('age', 18);   // => 18 (not found, return default)
 * urlParam('count', 0);  // => 25 (found '25', auto-convert to number)
 */
function urlParam(name, defaultValue) {
  const params = urlParams();
  const value = params[name];

  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  // 如果默认值是 number，自动转换
  if (typeof defaultValue === "number") {
    const num = Number(value);
    return isNaN(num) ? defaultValue : num;
  }

  return value;
}

module.exports = { url, baseUrl, urlParams, urlParam };
