import { assertEquals } from "jsr:@std/assert@1";
import { parseCSV, parseTSV } from "./parser.ts";

Deno.test("parseTSV", async () => {
	const tsvData = await Deno.readTextFile("./src/testdata/sample.tsv");

	const expected = [
		["name", "age", "location"],
		["Alice", "30", "New York"],
		["Bob", "25", "Los Angeles"],
	];

	const result = parseTSV(tsvData);
	assertEquals(result, expected);
});

Deno.test("parseCSV", async () => {
	const tsvData = await Deno.readTextFile("./src/testdata/sample.csv");

	const expected = [
		["name", "age", "location"],
		["Alice", "30", "New York"],
		["Bob", "25", "Los Angeles"],
	];

	const result = parseCSV(tsvData);
	assertEquals(result, expected);
});
