export type LogType = "info" | "success" | "warn" | "error";

/**
 * Cookie 配置项。
 */
export interface CookieOptions {
  /** ttl 为数字时的单位：'ms' 毫秒 | 's' 秒 | 'm' 分 | 'h' 时 | 'd' 天 | 'w' 周 | 'y' 年（默认 's'） */
  unit?: "ms" | "s" | "m" | "h" | "d" | "w" | "y";
  /** Cookie 生效路径（默认 '/'，子路径需精确匹配） */
  path?: string;
  /** Cookie 生效域名（默认当前域） */
  domain?: string;
  /** 仅 HTTPS 连接传输（默认 false） */
  secure?: boolean;
  /** 跨站策略：'Strict' 同站 | 'Lax' 宽松 | 'None' 跨站（'None' 必须配合 secure: true） */
  sameSite?: "Strict" | "Lax" | "None";
}

/**
 * 日期格式化。
 *
 * @param date 日期，支持 Date 对象 / 时间戳 / 可解析的字符串（默认当前时间）
 * @param pattern 格式化模板（默认 'YYYY-MM-DD'），支持占位符：
 *   - 年：YYYY（2026）/ YY（26）
 *   - 月：MM（08 补零）/ M（8）
 *   - 日：DD（05 补零）/ D（5）
 *   - 时：HH（09 补零）/ H（9）
 *   - 分：mm（05 补零）/ m（5）
 *   - 秒：ss（07 补零）/ s（7）
 *   （大写字母补零，小写字母不补零）
 * @returns 格式化后的日期字符串
 * @throws {TypeError} 日期无效时抛出（如 new Date("abc")）
 * @example
 * formatDate(new Date(2026, 7, 5, 9, 5, 7), "YYYY年MM月DD日 HH:mm:ss");
 * // => "2026年08月05日 09:05:07"
 * formatDate(1783909805000, "YYYY/MM/DD"); // 支持时间戳 => "2026/07/13"
 */
export function formatDate(
  date?: Date | number | string,
  pattern?: string,
): string;

/**
 * 彩色日志输出（图标 + 颜色）。
 *
 * 输出效果与环境有关：
 * - Node 终端：ANSI 真彩色 + 图标（✔ 绿 / ⚠ 橙 / ✘ 红 / ℹ 青）
 * - 浏览器控制台：%c 样式着色（DevTools 可见）
 * - 无控制台环境或设置 NO_COLOR=1：纯文本降级，不报错
 *
 * 支持两种调用方式：
 * - 直接调用：log("部署成功", "success")
 * - 链式调用：log.success("部署成功")（推荐，更直观）
 *
 * @param message 要输出的内容（自动转字符串）
 * @param type 日志级别：'info' | 'success' | 'warn' | 'error'（默认 'info'）
 * @returns 原始 message（可继续使用）
 * @example
 * log("构建完成");            // ℹ 青色 info
 * log.success("部署成功");    // ✔ 绿色 success
 * log.warn("接口响应慢");     // ⚠ 橙色 warn
 * log.error("请求失败");      // ✘ 红色 error
 */
export interface Log {
  (message: string, type?: LogType): void;
  /** ℹ 青色普通信息 */
  info(message: string): void;
  /** ✔ 绿色成功 */
  success(message: string): void;
  /** ⚠ 橙色警告 */
  warn(message: string): void;
  /** ✘ 红色错误 */
  error(message: string): void;
}

export const log: Log;

/**
 * 以列表形式输出数组或对象（自动对齐）。
 *
 * - 数组：每项一行，圆点符号
 * - 对象：key 蓝色加粗、冒号对齐
 *
 * @param items 数组或对象
 * @example
 * list(["苹果", "香蕉"]);   // • 苹果 / • 香蕉
 * list({ name: "menlu", version: "0.0.1" }); // name: menlu（对齐）
 */
export function list(items: unknown[] | Record<string, unknown>): void;

/**
 * 输出带边框的表格（灰色边框，表头蓝色加粗）。
 *
 * 支持的输入：
 * - 对象数组：[{ 名称: "蛋糕", 价格: 28 }]，合并所有键作为表头
 * - 二维数组：[["名称", "价格"], ["蛋糕", 28]]，首行作表头
 *
 * 特性：自动计算列宽（中文对齐）、null/undefined 显示为空、
 * 空数组输出 "(empty)"
 *
 * @param data 表格数据
 * @example
 * table([{ 名称: "蛋糕", 价格: 28 }, { 名称: "咖啡", 价格: 18 }]);
 */
export function table(data: Record<string, unknown>[] | unknown[][]): void;

/**
 * 输出灰色水平分隔线。
 *
 * @param length 分隔线长度（默认 40，最小 1）
 * @param char 分隔线字符（默认 '─'）
 * @example
 * divider();        // ────────────────────────────────────────
 * divider(10, "═"); // ══════════
 */
export function divider(length?: number, char?: string): void;

/**
 * 输出带边框的信息框（灰色边框，内容按 type 着色，支持多行）。
 *
 * @param text 框内内容（\n 换行）
 * @param type 内容颜色：'info' | 'success' | 'warn' | 'error'（默认 'info'）
 * @example
 * box("打包完成", "success");
 * box("第一行\n第二行"); // 多行
 */
export function box(text: string, type?: LogType): void;

/**
 * 生成 UUID v4 字符串（128 位随机，自动降级兼容旧环境）。
 *
 * @returns UUID v4，形如 "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
 * @example
 * uuid(); // => "550e8400-e29b-41d4-a716-446655440000"
 */
export function uuid(): string;

/**
 * 生成纯数字随机 ID（密码学安全，首位不会为 0）。
 *
 * @param length 位数（默认 10，范围 1-100）
 * @returns 纯数字字符串
 * @example
 * numId();      // => "4839201745"（10 位）
 * numId(6);     // => "483920"（6 位，验证码场景）
 * numId(4);     // => "4839"
 */
export function numId(length?: number): string;

/**
 * Base64 编码（Unicode 安全，中文/emoji/特殊符号均可）。
 *
 * @param text 要编码的文本
 * @returns base64 字符串
 * @example
 * toBase64("你好"); // => "5L2g5aW9"
 * toBase64("Hello 世界"); // => "SGVsbG8g5LiW55WM"
 */
export function toBase64(text: string): string;

/**
 * Base64 解码（Unicode 安全）。
 *
 * @param base64 要解码的 base64 字符串
 * @returns 解码后的原文
 * @example
 * fromBase64("5L2g5aW9"); // => "你好"
 */
export function fromBase64(base64: string): string;

/**
 * 复制文本到剪贴板（多端自动适配）。
 *
 * 适配顺序：微信小程序 wx.setClipboardData → uni-app uni.setClipboardData →
 * 浏览器 navigator.clipboard（HTTPS 环境）→ 旧浏览器 textarea 降级
 *
 * @param text 要复制的内容
 * @returns Promise<boolean>，是否复制成功（纯 Node 无可用环境返回 false）
 * @example
 * const ok = await copyText("要复制的内容");
 * if (ok) log("已复制", "success");
 */
export function copyText(text: string): Promise<boolean>;

/**
 * 写入 Cookie。
 *
 * @param name Cookie 名称
 * @param value Cookie 值（自动 URL 编码，支持中文）
 * @param ttl 有效期，支持 4 种写法：
 *   - 数字 + options.unit 单位：如 7 + { unit: "d" } = 7 天
 *     （unit 可选：'ms' 毫秒 | 's' 秒 | 'm' 分 | 'h' 时 | 'd' 天 | 'w' 周 | 'y' 年，默认 's' 秒）
 *   - 字符串带单位：'30m' = 30 分钟 / '7d' = 7 天 / '2h' = 2 小时 / '500ms' / '1w' 周 / '1y' 年
 *   - Date 对象：精确到期时间
 *   - 省略：会话级 Cookie（关闭浏览器失效）
 * @param options 配置项，见 CookieOptions：unit（数字 ttl 的单位）、path（默认 '/'）、domain、secure、sameSite
 * @returns 是否设置成功（非浏览器环境返回 false）
 * @example
 * setCookie("token", "abc123", 7, { unit: "d", path: "/" }); // path 可选
 * setCookie("theme", "dark", "30d");
 */
export function setCookie(
  name: string,
  value: string,
  ttl?: number | string | Date,
  options?: CookieOptions,
): boolean;

/**
 * 读取 Cookie。
 *
 * @param name Cookie 名称
 * @returns Cookie 值，不存在时返回 null
 * @example
 * getCookie("token"); // => "abc123"
 * getCookie("nope");  // => null
 */
export function getCookie(name: string): string | null;

/**
 * 删除 Cookie（path/domain 需与写入时一致，否则删不掉）。
 *
 * @param name Cookie 名称
 * @param options 配置项（path 默认 '/'）
 * @returns 是否删除成功（非浏览器环境返回 false）
 * @example
 * removeCookie("token");
 * removeCookie("admin_token", { path: "/admin" });
 */
export function removeCookie(name: string, options?: CookieOptions): boolean;

/**
 * 获取当前页面完整 URL。
 *
 * @returns 完整 URL
 * @example
 * url(); // => 'https://example.com/path?id=1#section'
 */
export function url(): string;

/**
 * 获取当前页面 URL（不带查询参数）。
 *
 * @returns 不带参数的 URL（protocol + host + path）
 * @example
 * baseUrl(); // => 'https://example.com/path'
 */
export function baseUrl(): string;

/**
 * 获取当前页面 URL 的所有查询参数。
 *
 * @returns 参数键值对对象
 * @example
 * // 当前 URL: https://example.com?id=1&name=张三
 * urlParams(); // => { id: '1', name: '张三' }
 */
export function urlParams(): Record<string, string>;

/**
 * 获取当前页面 URL 的指定查询参数。
 *
 * @param name 参数名
 * @param defaultValue 参数不存在时的默认值（如果是 number，返回值自动转为 number）
 * @returns 参数值或默认值
 * @example
 * // 当前 URL: https://example.com?id=1
 * urlParam('id');        // => '1'
 * urlParam('age', 18);   // => 18（不存在，返回默认值）
 * urlParam('count', 0);  // => 25（存在 '25'，自动转 number）
 */
export function urlParam<T>(name: string, defaultValue: T): T;
export function urlParam(name: string): string;

/**
 * menlu 工具库命名空间对象，包含全部 18 个方法，调用形式为 ML.xxx()。
 *
 * 使用方式：
 *   import ML from "menlu";
 *   ML.formatDate(new Date(), "YYYY-MM-DD"); // 日期格式化
 *   ML.log("构建完成", "success");           // 彩色日志输出
 *   ML.uuid();                               // 生成 UUID v4
 *   await ML.copyText("要复制的内容");        // 复制到剪贴板
 *
 * 方法列表：formatDate / log / list / table / divider / box / uuid / numId /
 * toBase64 / fromBase64 / copyText / setCookie / getCookie / removeCookie / url / baseUrl / urlParams / urlParam
 */
declare const ML: {
  /** 日期格式化。参数：date（默认当前时间），pattern（默认 'YYYY-MM-DD'）。支持 YYYY MM DD HH mm ss 等占位符 */
  formatDate: typeof formatDate;
  /** 彩色日志输出。type：'info' | 'success' | 'warn' | 'error'（默认 'info'） */
  log: typeof log;
  /** 以列表形式输出数组或对象，自动对齐 */
  list: typeof list;
  /** 输出边框表格。支持对象数组（键名作为表头）或二维数组（首行作表头） */
  table: typeof table;
  /** 输出水平分隔线。参数：length（默认 40），char（默认 '-'） */
  divider: typeof divider;
  /** 输出带边框的信息框。type：'info' | 'success' | 'warn' | 'error'，支持多行 */
  box: typeof box;
  /** 生成 UUID v4 字符串，自动降级兼容旧环境 */
  uuid: typeof uuid;
  /** 生成纯数字随机 ID（默认 10 位，可指定位数），首位不会为 0 */
  numId: typeof numId;
  /** Base64 编码，Unicode 安全（中文/emoji 可用） */
  toBase64: typeof toBase64;
  /** Base64 解码，Unicode 安全 */
  fromBase64: typeof fromBase64;
  /** 复制文本到剪贴板（多端适配：微信小程序 / uni-app / 浏览器）。返回 Promise<boolean> */
  copyText: typeof copyText;
  /** 写入 Cookie。ttl 支持数字+unit / '7d' 字符串 / Date / 省略（会话级） */
  setCookie: typeof setCookie;
  /** 读取 Cookie，不存在返回 null */
  getCookie: typeof getCookie;
  /** 删除 Cookie，注意 path/domain 需与写入时一致 */
  removeCookie: typeof removeCookie;
  /** 获取当前页面完整 URL */
  url: typeof url;
  /** 获取当前页面 URL（不带查询参数） */
  baseUrl: typeof baseUrl;
  /** 获取当前页面 URL 的所有查询参数 */
  urlParams: typeof urlParams;
  /** 获取当前页面 URL 的指定查询参数，支持默认值 */
  urlParam: typeof urlParam;
};

type MLType = typeof ML;

// 全局变量声明：main.js/ts 挂载 (globalThis).ML 后，
// 页面无需 import 即可直接使用 ML.xxx（配合包内全局类型）
declare global {
  var ML: MLType;
}

export { ML };
export default ML;
