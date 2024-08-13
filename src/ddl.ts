import { formatFnMap } from "./format.ts";
import { parseTSV } from "./parser.ts";

type ColumnInfo = Map<string, string>; // カラム名とデータ型のペア
type TableInfo = { columns: ColumnInfo }; // テーブル名とカラム情報
export type SchemaInfo = Map<string, TableInfo>; // スキーマ名とテーブル情報

export function newDDL(data: string) {
  const tsv = parseTSV(data);
  if (tsv[0].length !== 4) {
    throw new Error(`ddl_info length is not 4. actual: ${tsv[0].length}`);
  }

  // 先頭行を削除
  tsv.splice(0, 1);

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

export function genInsertSQL(
  data: string,
  ddls: Map<string, SchemaInfo>,
  { schema, table }: { schema: string; table: string },
) {
  // 投入データのパース
  const tsv = parseTSV(data);

  const tableColumns = ddls.get(schema)?.get(table)?.columns;
  if (tableColumns == undefined) {
    throw new Error(`schema: ${schema}, table: ${table}のいずれかが不正`);
  }

  const sqlColumnNames = Array.from(tableColumns.keys()).join(", ");

  const sqlColumnValues = tsv.map((row, rowNumber) => {
    // stringを返す
    // (col1, col2, col3)
    if (row.length !== tableColumns.size) {
      throw new Error(
        `${rowNumber + 1}行目: テーブルのカラム数とデータのカラム数が不一致`,
      );
    }

    // 3 : NUMBER toNUMBER
    const dataTypes = Array.from(tableColumns.values());
    const formattedValues = row.map((value, i) => {
      const formatFn = formatFnMap.get(dataTypes[i]);
      if (formatFn == undefined) {
        throw new Error(`${dataTypes[i]}型の変換関数は用意されていません`);
      }
      return formatFn(value);
    }).join(", ");

    return `(${formattedValues})`;
  }).join(", ");

  return `INSERT INTO ${table} (${sqlColumnNames}) VALUES ${sqlColumnValues}`;
}
