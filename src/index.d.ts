export type LogType = "info" | "success" | "warn" | "error";

export interface CookieOptions {
  unit?: "ms" | "s" | "m" | "h" | "d" | "w" | "y";
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}

export function formatDate(
  date?: Date | number | string,
  pattern?: string,
): string;

export function log(message: string, type?: LogType): void;
export function list(items: unknown[] | Record<string, unknown>): void;
export function table(data: Record<string, unknown>[] | unknown[][]): void;
export function divider(length?: number, char?: string): void;
export function box(text: string, type?: LogType): void;

export function uuid(): string;

export function toBase64(text: string): string;
export function fromBase64(base64: string): string;

export function copyText(text: string): Promise<boolean>;

export function setCookie(
  name: string,
  value: string,
  ttl?: number | string | Date,
  options?: CookieOptions,
): boolean;
export function getCookie(name: string): string | null;
export function removeCookie(name: string, options?: CookieOptions): boolean;

declare const menlu: {
  formatDate: typeof formatDate;
  log: typeof log;
  list: typeof list;
  table: typeof table;
  divider: typeof divider;
  box: typeof box;
  uuid: typeof uuid;
  toBase64: typeof toBase64;
  fromBase64: typeof fromBase64;
  copyText: typeof copyText;
  setCookie: typeof setCookie;
  getCookie: typeof getCookie;
  removeCookie: typeof removeCookie;
};

export default menlu;
