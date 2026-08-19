/**
 * menlu - MenLu's personal npm package
 * ESM entry (aggregates all feature modules)
 */

import { formatDate } from "./format/date.mjs";
import { log } from "./console/log.mjs";
import { list } from "./console/list.mjs";
import { table } from "./console/table.mjs";
import { divider } from "./console/divider.mjs";
import { box } from "./console/box.mjs";
import { uuid } from "./encode/uuid.mjs";
import { numId } from "./encode/numid.mjs";
import { toBase64, fromBase64 } from "./encode/base64.mjs";
import { copyText } from "./browser/copy.mjs";
import { setCookie, getCookie, removeCookie } from "./browser/cookie.mjs";
import { url, baseUrl, urlParams, urlParam } from "./browser/url.mjs";
import { mask, maskString } from "./mask/mask.mjs";

export {
  formatDate,
  log,
  list,
  table,
  divider,
  box,
  uuid,
  numId,
  toBase64,
  fromBase64,
  copyText,
  setCookie,
  getCookie,
  removeCookie,
  url,
  baseUrl,
  urlParams,
  urlParam,
  mask,
  maskString,
};

export const ML = {
  formatDate,
  log,
  list,
  table,
  divider,
  box,
  uuid,
  numId,
  toBase64,
  fromBase64,
  copyText,
  setCookie,
  getCookie,
  removeCookie,
  url,
  baseUrl,
  urlParams,
  urlParam,
  mask,
  maskString,
};

export default ML;
