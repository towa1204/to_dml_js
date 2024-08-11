import { parseTSV } from "./parser.ts";

type ColumnInfo = Map<string, string>; // カラム名とデータ型のペア
type TableInfo = { columns: ColumnInfo }; // テーブル名とカラム情報
type SchemaInfo = Map<string, TableInfo>; // スキーマ名とテーブル情報

export function newDDL(data: string) {
  const tsv = parseTSV(data);
  if (tsv[0].length !== 4) {
    throw new Error(`ddl_info length is not 4. actual: ${tsv[0].length}`);
  }

  const result = new Map<string, SchemaInfo>();

  tsv.forEach(([schema, tableName, columnName, dataType]) => {
    if (!result.has(schema)) {
      result.set(schema, new Map<string, TableInfo>());
    }

    const schemaMap = result.get(schema)!;

    if (!schemaMap.has(tableName)) {
      schemaMap.set(tableName, { columns: new Map<string, string>() });
    }

    const tableInfo = schemaMap.get(tableName)!;
    tableInfo.columns.set(columnName, dataType);
  });

  return result;
}
