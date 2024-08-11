// https://docs.snowflake.com/ja/sql-reference/intro-summary-data-types
export const formatFnMap = new Map<string, (val: string) => string>([
  ["NUMBER", format_NUMBER],
  ["VARCHAR", format_VARCHAR],
  ["DATE", format_VARCHAR],
  ["TEXT", format_VARCHAR],
  ["TIMESTAMP_TZ", format_VARCHAR],
]);

export function format_NUMBER(val: string) {
  if (val === "") return "null";
  return val;
}

export function format_VARCHAR(val: string) {
  if (val === "") return "null";
  return `'${val}'`;
}

// export function format_DATE(val: string) {
// 	return format_VARCHAR(val);
// }

// export function format_TIMESTAMP(val: string) {
// 	return format_VARCHAR(val);
// }

// export function format_TIMESTAMP_TZ(val: string) {
// 	return format_VARCHAR(val);
// }
