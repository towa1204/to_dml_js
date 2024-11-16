import { assertEquals } from "jsr:@std/assert@1";
import { newDDL, TableIdentifier, TableInfo } from "./ddl.ts";
import { ddl_info } from "./testdata/ddl_info_1.ts";

Deno.test("newDDL", () => {
  const result = newDDL(ddl_info);

  const expected: Map<TableIdentifier, TableInfo> = new Map([
    [
      "SCHEMA_A.TABLE_A",
      {
        schemaName: "SCHEMA_A",
        tableName: "TABLE_A",
        columns: new Map([["COL_1", "NUMBER"], ["COL_2", "VARCHAR"]]),
      },
    ],
    [
      "SCHEMA_A.TABLE_B",
      {
        schemaName: "SCHEMA_A",
        tableName: "TABLE_B",
        columns: new Map([["COL_1", "TIMESTAMP_TZ"]]),
      },
    ],
    [
      "SCHEMA_B.TABLE_A",
      {
        schemaName: "SCHEMA_B",
        tableName: "TABLE_A",
        columns: new Map([["COL_1", "TEXT"]]),
      },
    ],
  ]);
  assertEquals(result, expected);
});
