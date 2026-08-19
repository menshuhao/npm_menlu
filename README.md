# menlu

> 📖 **在线文档（点击查看）：https://menshuhao.github.io/npm_menlu/**
>
> 💡 也可以在 [GitHub 仓库](https://github.com/menshuhao/npm_menlu) 首页点击 `Settings → Pages` 查看在线文档

menshuhao（MenLu）的个人 npm 工具库 —— 零依赖、开箱即用，支持 **JS / TS / Node / 浏览器 / 小程序**。

当前共 **20 个实用方法**，全部纯手写实现。

## 安装

```bash
npm install menlu
```

## 使用方式

> `ML` = **M**en**L**u，本工具库的命名空间对象，包含全部 20 个方法，调用形式为 `ML.xxx()`。
>
> 以下所有示例都以 `ML.xxx()` 写法为主；也支持按需具名导入（见文末）。

---

### 一、Vue 3 项目

#### Vue 3 + JS

**方式 A：页面引入（推荐，main.js 不用动）**

```vue
<!-- 任意页面 Home.vue -->
<script setup>
import ML from "menlu";

const now = ML.formatDate(new Date(), "YYYY-MM-DD");
const id = ML.uuid();
ML.log.success("页面加载");
</script>
```

**方式 B：全局挂载（main.js 加 2 行，页面零引入）**

```js
// main.js
import ML from "menlu";
globalThis.ML = ML; // JS 项目直接挂
```

```vue
<!-- 任意页面：什么都不用写，直接用 -->
<script setup>
const now = ML.formatDate(new Date(), "YYYY-MM-DD");
ML.log.success("页面加载");
</script>
```

**方式 C：模板中使用（配合方式 B）**

```js
// main.js
import ML from "menlu";
globalThis.ML = ML;
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

#### Vue 3 + TS

**和 JS 唯一区别**：全局挂载时写 `as any`（TS 语法要求），页面使用完全一样，且自带类型提示。

```ts
// main.ts
import ML from "menlu";
(globalThis as any).ML = ML; // TS 项目加 as any，无需任何其他声明（类型已内置在包中）
```

```vue
<!-- 任意页面：直接用，鼠标悬停有参数说明 -->
<script setup lang="ts">
const now: string = ML.formatDate(new Date(), "YYYY-MM-DD");
const id: string = ML.uuid();
const ok: Promise<boolean> = ML.copyText("要复制的内容");
</script>
```

> 也可以不用全局挂载，每个页面 `import ML from "menlu"` 即可（和 JS 写法一致）。

---

### 二、React 项目

React 没有 `$menlu` 这类的模板挂载机制，用法只有两种：**组件里引入** 或 **挂 window 全局**。

#### React + JS

**方式 A：组件内引入（推荐）**

```jsx
// src/App.jsx
import ML from "menlu";

function App() {
  const now = ML.formatDate(new Date(), "YYYY-MM-DD");
  const id = ML.uuid();

  return (
    <div>
      <p>当前时间：{now}</p>
      <p>UUID：{id}</p>
    </div>
  );
}
```

**方式 B：挂 window 全局（入口文件加 1 行）**

```js
// src/main.jsx / index.js
import ML from "menlu";
window.ML = ML; // JS 项目直接挂
```

```jsx
// 任意组件：不用 import，直接用
const token = ML.getCookie("token");
```

#### React + TS

```tsx
// src/App.tsx
import ML from "menlu";

function App() {
  const now: string = ML.formatDate(new Date(), "YYYY-MM-DD");
  const id: string = ML.uuid();
  const ok: Promise<boolean> = ML.copyText("复制");

  return (
    <div>
      <p>当前时间：{now}</p>
      <p>UUID：{id}</p>
    </div>
  );
}
```

**挂 window 全局（TS 项目加 as any）：**

```ts
// src/main.tsx
import ML from "menlu";
(window as any).ML = ML; // 类型已内置在包中，页面直接用 ML.xxx 有提示
```

---

### 三、Node 项目（CommonJS）

```js
const ML = require("menlu");

ML.formatDate(new Date());
ML.log.success("构建完成");
```

### 四、按需具名导入（打包体积最优化）

```js
import { formatDate, uuid, getCookie } from "menlu";
// 或混合使用
import ML, { formatDate } from "menlu";
```

---

### 四类项目对比速查

| 项目  | 语言 | 页面引入（推荐）                    | 全局挂载                             |
| ----- | ---- | ----------------------------------- | ------------------------------------ |
| Vue 3 | JS   | `import ML from "menlu"` → `ML.xxx` | main.js 2 行，页面零引入             |
| Vue 3 | TS   | 同上（自带类型提示）                | main.ts 2 行（`as any`），页面零引入 |
| React | JS   | 组件里 `import` → `ML.xxx`          | main.jsx 1 行 `window.ML = ML`       |
| React | TS   | 同上（自带类型提示）                | main.tsx 1 行（`as any`）            |

> 提醒：全局挂载（方式 B）适合团队统一约定；日常开发推荐页面引入，代码可追溯、利于 tree-shaking。

## 方法总览

### 🕐 日期时间

| 方法         | 功能       | 适用场景                 |
| ------------ | ---------- | ------------------------ |
| `formatDate` | 日期格式化 | 列表时间展示、日志时间戳 |

### ️ 控制台打印

> ️ 以下 5 个方法均为**控制台打印工具**，输出到终端或浏览器 DevTools，**非页面 UI 组件**。适用场景：Node 脚本调试、浏览器 `console` 美化。

| 方法      | 功能          | 适用场景               |
| --------- | ------------- | ---------------------- |
| `log`     | 彩色日志输出  | 调试信息、构建脚本提示 |
| `list`    | 列表/对象输出 | 终端查看数组、对象     |
| `table`   | 终端表格输出  | 终端数据报表           |
| `divider` | 分隔线        | 终端输出美化           |
| `box`     | 信息框        | 终端重点提示           |

### 🔐 编码与 ID

| 方法                      | 功能          | 适用场景               |
| ------------------------- | ------------- | ---------------------- |
| `uuid`                    | UUID v4 生成  | 前端生成唯一 ID        |
| `numId`                   | 纯数字随机 ID | 订单号、验证码、邀请码 |
| `toBase64` / `fromBase64` | Base64 编解码 | 中文/图片 base64 转换  |

### 🌐 浏览器工具

| 方法                                       | 功能               | 适用场景                    |
| ------------------------------------------ | ------------------ | --------------------------- |
| `copyText`                                 | 剪贴板复制         | 复制链接、邀请码（多端）    |
| `setCookie` / `getCookie` / `removeCookie` | Cookie 读写删      | 登录态、主题偏好            |
| `url`                                      | 获取完整 URL       | 页面地址、分享链接          |
| `baseUrl`                                  | 获取不带参数的 URL | 页面基础地址                |
| `urlParams`                                | 获取所有查询参数   | 解析 URL 参数               |
| `urlParam`                                 | 获取指定参数       | 读取 URL 参数（支持默认值） |

### 通用工具

| 方法         | 功能       | 适用场景                       |
| ------------ | ---------- | ------------------------------ |
| `mask`       | 数据脱敏   | 手机号、身份证、邮箱等敏感信息 |
| `maskString` | 纯函数脱敏 | 不依赖 Vue 的脱敏              |

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
import ML from "menlu";

ML.formatDate();
// => "2026-08-14"

ML.formatDate(new Date(2026, 7, 13, 14, 30, 5), "YYYY/MM/DD HH:mm:ss");
// => "2026/08/13 14:30:05"

ML.formatDate(new Date(2026, 7, 13, 14, 0), "YYYY年M月D日 HH:mm");
// => "2026年8月13日 14:00"

ML.formatDate("2026-08-13T09:00:00Z", "YY-MM-DD");
// => "26-08-13"

ML.formatDate(1783909805000, "MM-DD");
// => "07-13"（时间戳）

ML.formatDate(new Date(2026, 0, 5), "YYYY/MM/DD 第D天");
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
import ML from "menlu";

// 链式调用（推荐）：一眼看出日志级别
ML.log.info("构建完成"); // ℹ 青色 info
ML.log.success("部署成功"); // ✔ 绿色 success
ML.log.warn("接口响应慢"); // ⚠ 橙色 warn
ML.log.error("请求失败"); // ✘ 红色 error
```

> 也可以传第二个参数指定级别（旧写法，兼容）：`ML.log("部署成功", "success")`

**注意：** Node 终端（TTY）下使用 ANSI 彩色；浏览器控制台使用 `%c` 样式着色（DevTools 中显示彩色）；设置 `NO_COLOR` 或小程序等无控制台环境下降级为纯文本。

---

### 3. list —— 列表 / 对象输出

**参数：** `items`：`Array` 或 `Object`

**使用示例：**

```js
import ML from "menlu";

// 数组 → 圆点列表
ML.list(["苹果", "香蕉", "橘子"]);
// • 苹果
// • 香蕉
// • 橘子

// 对象 → 对齐的 key: value
ML.list({ name: "menlu", version: "0.0.1", desc: "个人工具库" });
// name   : menlu
// version: 0.0.1
// desc   : 个人工具库
```

---

### 4. table —— 表格输出

**参数：** `data`：`对象数组`（键名作为表头）或 `二维数组`（第一行作为表头）

**使用示例：**

```js
import ML from "menlu";

// 对象数组（推荐）
ML.table([
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
ML.table([
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
| `char`   | `string` | `'─'`  | 分隔线字符 |

**使用示例：**

```js
import ML from "menlu";

ML.divider();
// ────────────────────────────────────────

ML.divider(20, "*");
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
import ML from "menlu";

ML.box("打包完成，体积 28 KB", "success");
// ┌──────────────────────────┐
// │ 打包完成，体积 28 KB      │
// └──────────────────────────┘

ML.box("第一行\n第二行", "warn");
// ┌────────────┐
// │ 第一行     │
// │ 第二行     │
// └────────────┘
```

---

### 7. uuid —— 生成 UUID v4

**参数：** 无

**返回值：** `string`，形如 `550e8400-e29b-41d4-a716-446655440000`

**使用示例：**

```js
import ML from "menlu";

ML.uuid();
// => "550e8400-e29b-41d4-a716-446655440000"

// 常见用法：列表 key、订单号前缀
const id = "order_" + ML.uuid();
```

**实现说明：** 优先使用 `crypto.randomUUID()`（Node 19+ / 现代浏览器），否则用 16 字节加密随机数生成，安全性可靠。

---

### 8. numId —— 纯数字随机 ID

**参数：**

| 参数     | 类型     | 默认值 | 说明               |
| -------- | -------- | ------ | ------------------ |
| `length` | `number` | `10`   | 位数（范围 1-100） |

**返回值：** `string` 纯数字字符串（首位不会为 0，密码学安全）

**使用示例：**

```js
import ML from "menlu";

ML.numId();
// => "4839201745"（默认 10 位）

ML.numId(6);
// => "483920"（6 位：短信验证码场景）

ML.numId(4);
// => "4839"（4 位：支付验证码场景）

// 常见用法：订单号、邀请码
const orderNo = "ML" + ML.numId(16);
```

**实现说明：** 使用加密安全随机数（`crypto.getRandomValues`），100 次 8 位生成互不重复，适合订单号 / 验证码 / 邀请码。

---

### 9. toBase64 / fromBase64 —— Base64 编解码

**参数：** `text`：`string`（要编码的文本）；`base64`：`string`（要解码的 base64）

**返回值：** 编码后的 base64 字符串 / 解码后的原文

**使用示例：**

```js
import ML from "menlu";

// 中文、表情符号都安全（原生 btoa 对中文会报错，本方法已处理）
ML.toBase64("你好");
// => "5L2g5aW9"

ML.fromBase64("5L2g5aW9");
// => "你好"

ML.toBase64("Hello 👋");
ML.fromBase64(ML.toBase64("Hello 👋"));
// => "Hello 👋"（往返一致）

// 常见用法：图片 base64、接口参数编码
const imgBase64 = "data:image/png;base64," + ML.toBase64(rawData);
```

---

### 10. copyText —— 复制到剪贴板（多端适配）

**参数：** `text`：`string`（要复制的内容）

**返回值：** `Promise<boolean>` —— 成功返回 `true`，失败返回 `false`

**支持环境（自动按顺序降级适配）：**

1. **微信小程序**：`wx.setClipboardData`
2. **uni-app**（H5 / 小程序 / App）：`uni.setClipboardData`
3. **现代浏览器**：`navigator.clipboard.writeText`（需 https 或 localhost）
4. **旧浏览器**：隐藏 textarea + `execCommand` 降级方案

**使用示例：**

```js
import ML from "menlu";

// 按钮点击复制
async function onCopy() {
  const ok = await ML.copyText("https://github.com/menshuhao/npm_menlu");
  if (ok) {
    alert("复制成功");
  } else {
    alert("复制失败，请长按手动复制");
  }
}

// Vue 模板按钮（配合全局挂载 $menlu 后，见上方「使用方式」）
// <button @click="$menlu.copyText('邀请码 ML-8888')">复制邀请码</button>
```

**注意：** 在纯 Node 环境（无浏览器、无小程序 API）中返回 `false`，不会报错。

---

### 11. setCookie / getCookie / removeCookie —— Cookie 工具

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
import ML from "menlu";

// ① 数字 + unit 单位（unit 默认 's' 秒）
ML.setCookie("token", "abc", 7200, { unit: "s" }); // 7200 秒 = 2 小时
ML.setCookie("code", "123", 30, { unit: "m" }); // 30 分钟
ML.setCookie("flag", "1", 7, { unit: "d" }); // 7 天

// ② 字符串直接带单位：ms / s / m / h / d / w / y（毫秒/秒/分/时/天/周/年）
ML.setCookie("theme", "dark", "30d"); // 30 天
ML.setCookie("session", "x", "2h"); // 2 小时
ML.setCookie("fast", "y", "500ms"); // 500 毫秒

// ③ Date 对象：精确到期时间
ML.setCookie("vip", "1", new Date("2027-01-01"));

// ④ 不传 ttl：会话级 Cookie（关闭浏览器失效）
ML.setCookie("last_visit", "2026-08-14");
```

**options 配置项：**

```js
ML.setCookie("token", "abc123", 7, {
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
ML.getCookie("token"); // => "abc123"
ML.getCookie("不存在的名字"); // => null
```

#### removeCookie —— 删除 Cookie

**注意：** 删除时要和写入时使用**相同的 path / domain**，否则删不掉。

```js
ML.removeCookie("token"); // 默认删除 path='/' 的
ML.removeCookie("admin_token", { path: "/admin" }); // 指定 path 删除
```

#### 完整场景：登录 → 刷新恢复 → 登出

```js
// ① 登录成功，存 token（后台返回 expires_in 单位是秒，直接透传）
ML.setCookie("token", res.token, res.expires_in, { unit: "s" });

// ② 刷新页面后恢复登录态
const token = ML.getCookie("token");
if (token) {
  // 已登录...
}

// ③ 请求拦截器自动携带
config.headers.Authorization = "Bearer " + ML.getCookie("token");

// ④ 登出
ML.removeCookie("token");
```

**环境说明：** 非浏览器环境（Node / 小程序）下：`setCookie` / `removeCookie` 返回 `false`，`getCookie` 返回 `null`，不会报错。

> ⚠️ **安全提示：** 敏感 token 建议由后端设置 `HttpOnly` Cookie（脚本无法读取，防 XSS）；本工具设置的是普通 Cookie，脚本可读。

---

### 12. url / baseUrl / urlParams / urlParam —— URL 工具

#### url —— 获取当前页面完整 URL

```js
ML.url();
// => 'https://example.com/path?id=1&name=张三#section'
```

#### baseUrl —— 获取不带参数的 URL

```js
ML.baseUrl();
// => 'https://example.com/path'（不含 ?id=1&name=张三#section）
```

#### urlParams —— 获取所有查询参数

```js
ML.urlParams();
// 当前 URL: https://example.com?id=1&name=张三
// => { id: '1', name: '张三' }
```

#### urlParam —— 获取指定参数

**参数：**

| 参数           | 类型     | 默认值 | 说明                 |
| -------------- | -------- | ------ | -------------------- |
| `name`         | `string` | -      | 参数名               |
| `defaultValue` | `any`    | -      | 参数不存在时的默认值 |

**返回值：** 参数值（如果默认值是 number，自动转换为 number）

```js
ML.urlParam("id");
// => '1'

ML.urlParam("age", 18);
// => 18（不存在，返回默认值）

ML.urlParam("count", 0);
// => 25（存在 '25'，自动转 number）
```

**环境说明：** 非浏览器环境（Node）下：`url` / `baseUrl` 返回空字符串 `''`，`urlParams` 返回空对象 `{}`，`urlParam` 返回默认值。

---

### 13. ML.mask / ML.maskString —— 数据脱敏（通用工具）

**参数：**

| 参数        | 类型                    | 默认值 | 说明                                |
| ----------- | ----------------------- | ------ | ----------------------------------- |
| `source`    | `string \| Ref<string>` | -      | 原始值（字符串或 Vue ref/computed） |
| `prefixLen` | `number`                | `3`    | 保留前缀位数                        |
| `suffixLen` | `number`                | `4`    | 保留后缀位数                        |
| `maskChar`  | `string`                | `'*'`  | 掩码字符                            |

**返回值：**

- `ML.mask`：传入字符串返回字符串，传入 Vue ref 返回 computed
- `ML.maskString`：始终返回字符串（纯函数，不依赖 Vue）

**使用示例：**

```js
import ML from "menlu";

ML.mask("13812345678", { prefixLen: 3, suffixLen: 4 });
// => "138****5678"

// 自定义掩码字符
ML.mask("13812345678", { prefixLen: 3, suffixLen: 4, maskChar: "#" });
// => "138####5678"

ML.maskString("110101199001011234", 6, 4);
// => "110101********1234"

ML.maskString("13812345678", 3, 4, "#");
// => "138####5678"
```

```vue
<!-- Vue 3 -->
<script setup>
import { ref } from "vue";
import ML from "menlu";

const phone = ref("13812345678");
const maskedPhone = ML.mask(phone, { prefixLen: 3, suffixLen: 4 });
// => computed { value: "138****5678" }
</script>

<template>
  <div>手机号：{{ maskedPhone }}</div>
</template>
```

```jsx
// React
import { useMemo, useState } from "react";
import ML from "menlu";

function Component() {
  const [phone] = useState("13812345678");
  const [idCard] = useState("110101199001011234");

  // 默认参数
  const maskedPhone = useMemo(() => ML.mask(phone), [phone]);
  // => '138****5678'

  // 自定义参数
  const maskedId = useMemo(
    () => ML.mask(idCard, { prefixLen: 6, suffixLen: 4 }),
    [idCard],
  );
  // => '110101********1234'

  // 自定义掩码字符
  const maskedCustom = useMemo(
    () => ML.mask(phone, { prefixLen: 3, suffixLen: 4, maskChar: "#" }),
    [phone],
  );
  // => '138####5678'

  return (
    <div>
      <div>手机号：{maskedPhone}</div>
      <div>身份证：{maskedId}</div>
      <div>自定义：{maskedCustom}</div>
    </div>
  );
}
```

**注意：** `ML.mask` 在 Vue 环境下自动返回 computed，其他环境返回字符串。`ML.maskString` 始终返回字符串。

---

## License

MIT © menshuhao
