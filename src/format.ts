export function format_NUMBER(val: string) {
	if (val === "") return "null";
	return val;
}

export function format_VARCHAR(val: string) {
	if (val === "") return "null";
	return `'${val}'`;
}

export function format_DATE(val: string) {
	return format_VARCHAR(val);
}

export function format_TIMESTAMP(val: string) {
	return format_VARCHAR(val);
}

export function format_TIMESTAMP_TZ(val: string) {
	return format_VARCHAR(val);
}
