/**
 * menlu - URL utility toolkit
 * ESM entry (thin wrapper around the CommonJS implementation)
 */

import browserUrl from "./url.js";

export const url = browserUrl.url;
export const baseUrl = browserUrl.baseUrl;
export const urlParams = browserUrl.urlParams;
export const urlParam = browserUrl.urlParam;

export default { url, baseUrl, urlParams, urlParam };
