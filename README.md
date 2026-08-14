# menlu

门术豪（MenLu）的个人 npm 工具库 —— 零依赖、开箱即用，支持 **JS / TS / Node / 浏览器 / 小程序**。

当前共 **13 个实用方法**，全部纯手写实现。

## 安装

```bash
npm install menlu
```

## 使用方式（两种，任选其一）

> `ML` = **M**en**L**u，本工具库的命名空间对象，包含全部 13 个方法，调用形式为 `ML.xxx()`。

### 方式一：页面引入（推荐，最标准）

**main.js 完全不用改**，哪个页面要用，就在哪个页面 `import ML`：

```js
// main.js / main.ts —— 保持原样，不用动
```

```vue
<!-- 任意页面 -->
<script setup>
import ML from "menlu"; // 页面里引入一次

const now = ML.formatDate(new Date(), "YYYY-MM-DD"); // ML.xxx 直接调用
const id = ML.uuid();
ML.log("页面加载", "success");
await ML.copyText("复制成功");
const token = ML.getCookie("token");
</script>
```

- ✅ 不用改 main.js/ts
- ✅ 标准写法，代码可追溯，利于 tree-shaking
- ✅ TS 项目自带类型提示，无需任何额外声明

**Node 项目（CommonJS）：**

```js
const ML = require("menlu");
ML.formatDate(new Date());
```

### 方式二：全局挂载（最省事）

**main.js / main.ts 加 2 行**，之后所有页面直接用，连 import 都不用写：

```js
// main.js / main.ts
import ML from "menlu";
(globalThis as any).ML = ML;   // 挂到全局
```

```vue
<!-- 任意页面：什么都不用写，直接用 -->
<script setup>
const now = ML.formatDate(new Date(), "YYYY-MM-DD");
ML.log("页面加载", "success");
const id = ML.uuid();
</script>
```

- ✅ 页面零代码接入（TS 项目也不用建声明文件，类型已内置在包中）
- ⚠️ 全局变量形式，项目里看不出方法来源，建议团队内统一约定

### 方式三：按需具名导入（打包体积最优化）

```js
import { formatDate, uuid } from "menlu";
// 或
import ML, { formatDate } from "menlu";
```

### 补充：Vue 模板中直接使用

配合方式二，模板里用 `$menlu` 直接访问：

```js
// main.js / main.ts
import ML from "menlu";
(globalThis as any).ML = ML;
app.config.globalProperties.$menlu = ML;
```

```vue
<template>
  <!-- 模板里直接用 $menlu -->
  <p>{{ $menlu.formatDate(item.time, "YYYY-MM-DD") }}</p>
</template>
<script>
// Options API 里用 this.$menlu
export default {
  methods: {
    getToken() {
      return this.$menlu.getCookie("token");
    },
  },
};
</script>
```

## 方法总览

| 方法                                       | 功能          | 适用场景                 |
| ------------------------------------------ | ------------- | ------------------------ |
| `formatDate`                               | 日期格式化    | 列表时间展示、日志时间戳 |
| `log`                                      | 彩色日志输出  | 终端调试、构建脚本提示   |
| `list`                                     | 列表/对象输出 | 终端查看数组、对象       |
| `table`                                    | 表格输出      | 终端数据报表             |
| `divider`                                  | 分隔线        | 终端输出美化             |
| `box`                                      | 信息框        | 终端重点提示             |
| `uuid`                                     | UUID v4 生成  | 前端生成唯一 ID          |
| `toBase64` / `fromBase64`                  | Base64 编解码 | 中文/图片 base64 转换    |
| `copyText`                                 | 剪贴板复制    | 复制链接、邀请码（多端） |
| `setCookie` / `getCookie` / `removeCookie` | Cookie 读写删 | 登录态、主题偏好         |

---

## 详细文档

### 1. formatDate —— 日期格式化

**参数：**

| 参数      | 类型                       | 默认值         | 说明                                   |
| --------- | -------------------------- | -------------- | -------------------------------------- |
| `date`    | `Date \| number \| string` | `new Date()`   | 日期对象 / 时间戳 / 可解析的日期字符串 |
| `pattern` | `string`                   | `'YYYY-MM-DD'` | 格式化模板                             |

**支持的时间占位符：**

| 占位符        | 含义              | 示例      |
| ------------- | ----------------- | --------- |
| `YYYY` / `YY` | 4 位 / 2 位年份   | 2026 / 26 |
| `MM` / `M`    | 补零 / 不补零月份 | 08 / 8    |
| `DD` / `D`    | 补零 / 不补零日期 | 13 / 13   |
| `HH` / `H`    | 补零 / 不补零小时 | 14 / 14   |
| `mm` / `m`    | 补零 / 不补零分钟 | 05 / 5    |
| `ss` / `s`    | 补零 / 不补零秒   | 09 / 9    |

**返回值：** `string` 格式化后的日期字符串

**使用示例：**

```js
import { formatDate } from "menlu";

formatDate();
// => "2026-08-14"

formatDate(new Date(2026, 7, 13, 14, 30, 5), "YYYY/MM/DD HH:mm:ss");
// => "2026/08/13 14:30:05"

formatDate(new Date(2026, 7, 13, 14, 0), "YYYY年M月D日 HH:mm");
// => "2026年8月13日 14:00"

formatDate("2026-08-13T09:00:00Z", "YY-MM-DD");
// => "26-08-13"

formatDate(1783909805000, "MM-DD");
// => "07-13"（时间戳）

formatDate(new Date(2026, 0, 5), "YYYY/MM/DD 第D天");
// => "2026/01/05 第5天"（普通字符原样输出）
```

**注意：** 传入无效日期会抛出 `TypeError` 异常。

---

### 2. log —— 彩色日志输出

**参数：**

| 参数      | 类型                                       | 默认值   | 说明         |
| --------- | ------------------------------------------ | -------- | ------------ |
| `message` | `string`                                   | -        | 要输出的内容 |
| `type`    | `'info' \| 'success' \| 'warn' \| 'error'` | `'info'` | 日志级别     |

**使用示例：**

```js
import { log } from "menlu";

log("构建完成"); // ℹ 青色 info
log("部署成功", "success"); // ✔ 绿色 success
log("接口响应慢", "warn"); // ⚠ 橙色 warn
log("请求失败", "error"); // ✘ 红色 error
```

**注意：** Node 终端（TTY）下使用 ANSI 彩色；浏览器控制台使用 `%c` 样式着色（DevTools 中显示彩色）；设置 `NO_COLOR` 或小程序等无控制台环境下降级为纯文本。

---

### 3. list —— 列表 / 对象输出

**参数：** `items`：`Array` 或 `Object`

**使用示例：**

```js
import { list } from "menlu";

// 数组 → 圆点列表
list(["苹果", "香蕉", "橘子"]);
// • 苹果
// • 香蕉
// • 橘子

// 对象 → 对齐的 key: value
list({ name: "menlu", version: "0.0.1", desc: "个人工具库" });
// name   : menlu
// version: 0.0.1
// desc   : 个人工具库
```

---

### 4. table —— 表格输出

**参数：** `data`：`对象数组`（键名作为表头）或 `二维数组`（第一行作为表头）

**使用示例：**

```js
import { table } from "menlu";

// 对象数组（推荐）
table([
  { 名称: "草莓蛋糕", 价格: 28, 库存: 10 },
  { 名称: "香芋奶茶", 价格: 18, 库存: 25 },
]);
// ┌────────────┬──────┬──────┐
// │ 名称       │ 价格 │ 库存 │
// ├────────────┼──────┼──────┤
// │ 草莓蛋糕   │ 28   │ 10   │
// │ 香芋奶茶   │ 18   │ 25   │
// └────────────┴──────┴──────┘

// 二维数组
table([
  ["名称", "价格"],
  ["草莓蛋糕", 28],
]);
```

**注意：** 表头为蓝色加粗，自动适配中文宽度对齐。

---

### 5. divider —— 分隔线

**参数：**

| 参数     | 类型     | 默认值 | 说明       |
| -------- | -------- | ------ | ---------- |
| `length` | `number` | `40`   | 分隔线长度 |
| `char`   | `string` | `'-'`  | 分隔线字符 |

**使用示例：**

```js
import { divider } from "menlu";

divider();
// ----------------------------------------

divider(20, "*");
// ********************
```

---

### 6. box —— 信息框

**参数：**

| 参数   | 类型                                       | 默认值   | 说明                 |
| ------ | ------------------------------------------ | -------- | -------------------- |
| `text` | `string`                                   | -        | 框内内容（支持换行） |
| `type` | `'info' \| 'success' \| 'warn' \| 'error'` | `'info'` | 内容颜色             |

**使用示例：**

```js
import { box } from "menlu";

box("打包完成，体积 28 KB", "success");
// ┌──────────────────────────┐
// │ ✔ 打包完成，体积 28 KB    │
// └──────────────────────────┘

box("第一行\n第二行", "warn");
// ┌────────────┐
// │ ⚠ 第一行   │
// │   第二行   │
// └────────────┘
```

---

### 7. uuid —— 生成 UUID v4

**参数：** 无

**返回值：** `string`，形如 `550e8400-e29b-41d4-a716-446655440000`

**使用示例：**

```js
import { uuid } from "menlu";

uuid();
// => "550e8400-e29b-41d4-a716-446655440000"

// 常见用法：列表 key、订单号前缀
const id = "order_" + uuid();
```

**实现说明：** 优先使用 `crypto.randomUUID()`（Node 19+ / 现代浏览器），否则用 16 字节加密随机数生成，安全性可靠。

---

### 8. toBase64 / fromBase64 —— Base64 编解码

**参数：** `text`：`string`（要编码的文本）；`base64`：`string`（要解码的 base64）

**返回值：** 编码后的 base64 字符串 / 解码后的原文

**使用示例：**

```js
import { toBase64, fromBase64 } from "menlu";

// 中文、表情符号都安全（原生 btoa 对中文会报错，本方法已处理）
toBase64("你好");
// => "5L2g5aW9"

fromBase64("5L2g5aW9");
// => "你好"

toBase64("Hello 👋");
fromBase64(toBase64("Hello 👋"));
// => "Hello 👋"（往返一致）

// 常见用法：图片 base64、接口参数编码
const imgBase64 = "data:image/png;base64," + toBase64(rawData);
```

---

### 9. copyText —— 复制到剪贴板（多端适配）

**参数：** `text`：`string`（要复制的内容）

**返回值：** `Promise<boolean>` —— 成功返回 `true`，失败返回 `false`

**支持环境（自动按顺序降级适配）：**

1. **微信小程序**：`wx.setClipboardData`
2. **uni-app**（H5 / 小程序 / App）：`uni.setClipboardData`
3. **现代浏览器**：`navigator.clipboard.writeText`（需 https 或 localhost）
4. **旧浏览器**：隐藏 textarea + `execCommand` 降级方案

**使用示例：**

```js
import { copyText } from "menlu";

// 按钮点击复制
async function onCopy() {
  const ok = await copyText("https://github.com/menshuhao/npm_menlu");
  if (ok) {
    alert("复制成功");
  } else {
    alert("复制失败，请长按手动复制");
  }
}

// Vue 模板按钮
// <button @click="copyText('邀请码 ML-8888')">复制邀请码</button>
```

**注意：** 在纯 Node 环境（无浏览器、无小程序 API）中返回 `false`，不会报错。

---

### 10. setCookie / getCookie / removeCookie —— Cookie 工具

#### setCookie —— 写入 Cookie

**参数：**

| 参数      | 类型                       | 默认值 | 说明                                 |
| --------- | -------------------------- | ------ | ------------------------------------ |
| `name`    | `string`                   | -      | Cookie 名称                          |
| `value`   | `string`                   | -      | Cookie 值（自动 URL 编码，支持中文） |
| `ttl`     | `number \| string \| Date` | 不传   | 有效期（见下方说明）                 |
| `options` | `object`                   | `{}`   | 配置项                               |

**ttl 有效期支持 4 种写法：**

```js
// ① 数字 + unit 单位（unit 默认 's' 秒）
setCookie("token", "abc", 7200, { unit: "s" }); // 7200 秒 = 2 小时
setCookie("code", "123", 30, { unit: "m" }); // 30 分钟
setCookie("flag", "1", 7, { unit: "d" }); // 7 天

// ② 字符串直接带单位：ms / s / m / h / d / w / y（毫秒/秒/分/时/天/周/年）
setCookie("theme", "dark", "30d"); // 30 天
setCookie("session", "x", "2h"); // 2 小时
setCookie("fast", "y", "500ms"); // 500 毫秒

// ③ Date 对象：精确到期时间
setCookie("vip", "1", new Date("2027-01-01"));

// ④ 不传 ttl：会话级 Cookie（关闭浏览器失效）
setCookie("last_visit", "2026-08-14");
```

**options 配置项：**

```js
setCookie("token", "abc123", 7, {
  unit: "d", // 单位（默认 's'）
  path: "/", // 路径（默认 '/'，全站可用）
  domain: "example.com", // 域名
  secure: true, // 仅 https 传输
  sameSite: "Lax", // 'Strict' | 'Lax' | 'None'
});
```

#### getCookie —— 读取 Cookie

**返回值：** `string | null`（不存在时返回 `null`）

```js
getCookie("token"); // => "abc123"
getCookie("不存在的名字"); // => null
```

#### removeCookie —— 删除 Cookie

**注意：** 删除时要和写入时使用**相同的 path / domain**，否则删不掉。

```js
removeCookie("token"); // 默认删除 path='/' 的
removeCookie("admin_token", { path: "/admin" }); // 指定 path 删除
```

#### 完整场景：登录 → 刷新恢复 → 登出

```js
// ① 登录成功，存 token（后台返回 expires_in 单位是秒，直接透传）
setCookie("token", res.token, res.expires_in, { unit: "s" });

// ② 刷新页面后恢复登录态
const token = getCookie("token");
if (token) {
  // 已登录...
}

// ③ 请求拦截器自动携带
config.headers.Authorization = "Bearer " + getCookie("token");

// ④ 登出
removeCookie("token");
```

**环境说明：** 非浏览器环境（Node / 小程序）下：`setCookie` / `removeCookie` 返回 `false`，`getCookie` 返回 `null`，不会报错。

> ⚠️ **安全提示：** 敏感 token 建议由后端设置 `HttpOnly` Cookie（脚本无法读取，防 XSS）；本工具设置的是普通 Cookie，脚本可读。

---

## License

MIT © 门术豪
