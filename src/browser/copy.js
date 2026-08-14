/**
 * menlu - browser utilities: copyText
 * CommonJS implementation
 */

function fallbackCopy(text) {
  if (typeof document === "undefined") return false;

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  document.body.removeChild(textarea);
  return ok;
}

function platformCopy(api, text) {
  return new Promise((resolve) => {
    api.setClipboardData({
      data: text,
      success: () => resolve(true),
      fail: () => resolve(false),
    });
  });
}

/**
 * Copy text to the clipboard across platforms.
 *
 * Detection order:
 *   1. wx.setClipboardData (WeChat Mini Program)
 *   2. uni.setClipboardData (uni-app: H5 / Mini Program / App)
 *   3. navigator.clipboard.writeText (modern browsers, https / localhost)
 *   4. hidden textarea + execCommand (older browsers, non-secure origins)
 *   5. resolves false when nothing is available (e.g. plain Node.js)
 *
 * @param {*} text - content to copy, will be stringified
 * @returns {Promise<boolean>} resolves to true on success, false otherwise
 */
function copyText(text) {
  const value = String(text == null ? "" : text);

  if (typeof wx !== "undefined" && typeof wx.setClipboardData === "function") {
    return platformCopy(wx, value);
  }

  if (
    typeof uni !== "undefined" &&
    typeof uni.setClipboardData === "function"
  ) {
    return platformCopy(uni, value);
  }

  if (
    typeof navigator !== "undefined" &&
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === "function"
  ) {
    return navigator.clipboard.writeText(value).then(
      () => true,
      () => fallbackCopy(value),
    );
  }

  return Promise.resolve(fallbackCopy(value));
}

module.exports = { copyText };
