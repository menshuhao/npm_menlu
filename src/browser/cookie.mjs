/**
 * menlu - browser utilities: cookie
 * ESM entry (thin wrapper around the CommonJS implementation)
 */

import browserCookie from "./cookie.js";

export const setCookie = browserCookie.setCookie;
export const getCookie = browserCookie.getCookie;
export const removeCookie = browserCookie.removeCookie;

export default { setCookie, getCookie, removeCookie };
