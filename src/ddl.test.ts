import { assertEquals } from "jsr:@std/assert@1";
import { newDDL, SchemaInfo } from "./ddl.ts";
import { ddl_info } from "./testdata/ddl_info_1.ts";

Deno.test("newDDL", () => {
  const result = newDDL(ddl_info);

  const expected: Map<string, SchemaInfo> = new Map([
    [
      "SCHEMA_A",
      new Map([
        ["TABLE_A", {
          "columns": new Map([["COL_1", "NUMBER"], ["COL_2", "VARCHAR"]]),
        }],
        ["TABLE_B", {
          "columns": new Map([["COL_1", "TIMESTAMP_TZ"]]),
        }],
      ]),
    ],
    [
      "SCHEMA_B",
      new Map([
        ["TABLE_A", {
          "columns": new Map([["COL_1", "TEXT"]]),
        }],
      ]),
    ],
  ]);

  assertEquals(result, expected);
});
