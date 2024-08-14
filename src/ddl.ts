import { formatFnMap } from "./format.ts";
import { parseTSV } from "./parser.ts";

type ColumnInfo = Map<string, string>; // カラム名とデータ型のペア
export type TableInfo = {
  schemaName: string;
  tableName: string;
  columns: ColumnInfo;
};
export type TableIdentifier = string;

export function newDDL(data: string): Map<TableIdentifier, TableInfo> {
  const tsv = parseTSV(data);
  if (tsv[0].length !== 4) {
    throw new Error(`ddl_info length is not 4. actual: ${tsv[0].length}`);
  }
  // 先頭行を削除
  tsv.splice(0, 1);

  const result = new Map<TableIdentifier, TableInfo>();

  tsv.forEach(([schemaName, tableName, columnName, dataType]) => {
    const tableIdentifier: TableIdentifier = `${schemaName}.${tableName}`;
    if (!result.has(tableIdentifier)) {
      result.set(tableIdentifier, {
        schemaName: schemaName,
        tableName: tableName,
        columns: new Map<string, string>(),
      });
    }

    const tableInfo = result.get(tableIdentifier)!;
    tableInfo.columns.set(columnName, dataType);
    result.set(tableIdentifier, tableInfo);
  });

  return result;
}

export function genInsertSQL(
  data: string,
  tableInfo: TableInfo,
) {
  // 投入データのパース
  const tsv = parseTSV(data);

  const tableColumns = tableInfo.columns;
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

  return `INSERT INTO ${tableInfo.tableName} (${sqlColumnNames}) VALUES ${sqlColumnValues}`;
}
