# menlu

MenLu's personal npm package.

## Install

```bash
npm install menlu
```

## Usage

```js
// CommonJS
const {
  formatDate,
  log,
  list,
  table,
  divider,
  box,
  uuid,
  toBase64,
  fromBase64,
  copyText,
  setCookie,
  getCookie,
  removeCookie,
} = require("menlu");

// ESM
import {
  formatDate,
  log,
  list,
  table,
  divider,
  box,
  uuid,
  toBase64,
  fromBase64,
  copyText,
  setCookie,
  getCookie,
  removeCookie,
} from "menlu";
```

### formatDate

Format a date with a pattern string.

```js
formatDate();
// => 2026-08-13

formatDate(new Date(2026, 7, 13, 14, 30, 5), "YYYY/MM/DD HH:mm:ss");
// => 2026/08/13 14:30:05

formatDate(new Date(2026, 7, 13, 14, 0), "YYYY年M月D日 HH:mm");
// => 2026年8月13日 14:00

formatDate("2026-08-13T09:00:00Z", "YY-MM-DD");
// => 26-08-13
```

Supported tokens: `YYYY` `YY` `MM` `M` `DD` `D` `HH` `H` `mm` `m` `ss` `s`.

It accepts a `Date` instance, a timestamp, or any string parseable by `new Date()`.
Throws a `TypeError` when the date is invalid.

## Console utilities

Colored terminal output helpers. Colors are used in Node TTY terminals
(disabled when `NO_COLOR` is set); in browsers they fall back to plain text.

### log(message, type)

Print a colored log line with a level icon.

```js
log("Build finished"); // ℹ info (cyan)
log("Deploy ok", "success"); // ✔ success (green)
log("Slow request", "warn"); // ⚠ warn (orange)
log("Request failed", "error"); // ✘ error (red)
```

### list(items)

Print an array or an object as a readable list.

```js
list(["apple", "banana"]); // bullet points
list({ name: "menlu", version: "0.0.1" }); // aligned key: value
```

### table(data)

Print a bordered table with a blue bold header row. Accepts an array of
objects (keys become headers) or an array of arrays (first row is the header).

```js
table([
  { name: "Strawberry cake", price: 28, stock: 10 },
  { name: "Purple taro", price: 18, stock: 25 },
]);
```

### divider(length, char)

Print a grey horizontal divider line (default 40 chars).

```js
divider();
divider(20, "*");
```

### box(text, type)

Print a grey-bordered box with a colored message inside (multi-line supported).

```js
box("Bundle built, 28 KB", "success");
```

### uuid

Generate a random UUID v4 string. Uses `crypto.randomUUID` when available
(Node 19+ / modern browsers), otherwise falls back to 16 cryptographically
random bytes.

```js
uuid();
// => "550e8400-e29b-41d4-a716-446655440000"
```

### toBase64(text) / fromBase64(base64)

Base64 encode/decode. Unicode-safe: text is UTF-8 encoded first, so Chinese
characters work (native `btoa()` would throw on them).

```js
toBase64("你好");
// => 5L2g5aW9
fromBase64("5L2g5aW9");
// => 你好
```

### setCookie(name, value, ttl, options) / getCookie(name) / removeCookie(name, options)

Browser cookie helpers (resolves `false` / `null` outside browsers).
Values and names are URI-encoded automatically.

TTL accepts:

- number + `options.unit` (`'ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'y'`, default `'s'`)
- string with a unit suffix, e.g. `'2h'`, `'30m'`, `'7d'`, `'500ms'`
- `Date` instance for an exact expiry
- omit for a session cookie

```js
setCookie("token", "abc123", 7200, {
  unit: "s",
  path: "/",
  secure: true,
  sameSite: "Lax",
});
setCookie("theme", "dark", "30d");
getCookie("token"); // => 'abc123'
getCookie("nope"); // => null
removeCookie("token"); // same path/domain as when set
```

> Note: for sensitive tokens prefer an HttpOnly cookie set by the backend;
> JS-set cookies are readable by scripts (XSS).

### copyText(text)

Copy text to the clipboard across platforms (resolves `false` when
nothing is available, e.g. plain Node.js). Detection order:

1. `wx.setClipboardData` (WeChat Mini Program)
2. `uni.setClipboardData` (uni-app: H5 / Mini Program / App)
3. `navigator.clipboard.writeText` (modern browsers, https / localhost)
4. hidden textarea + `execCommand` (older browsers, non-secure origins)

```js
const ok = await copyText("要复制的内容");
if (ok) {
  log("已复制", "success");
} else {
  log("复制失败，请手动复制", "warn");
}
```

## License

MIT
