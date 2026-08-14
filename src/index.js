/**
 * menlu - MenLu's personal npm package
 * CommonJS entry (aggregates all feature modules)
 */

const { formatDate } = require("./format/date");
const { log } = require("./console/log");
const { list } = require("./console/list");
const { table } = require("./console/table");
const { divider } = require("./console/divider");
const { box } = require("./console/box");
const { uuid } = require("./encode/uuid");
const { numId } = require("./encode/numid");
const { toBase64, fromBase64 } = require("./encode/base64");
const { copyText } = require("./browser/copy");
const { setCookie, getCookie, removeCookie } = require("./browser/cookie");
const { url, baseUrl, urlParams, urlParam } = require("./browser/url");

const ML = {
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
};

module.exports = ML;
module.exports.ML = ML;
