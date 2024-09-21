/**
 * 任意の区切り文字でテキストをパースして2次元配列に変換する関数
 * @param data - パースするテキスト（CSVやTSVなど）
 * @param delimiter - データの区切り文字（CSVの場合は","、TSVの場合は"\t"）
 * @returns - 2次元配列
 * @throws - 列数が一致しない場合にエラーをスロー
 */
function parseDelimitedData(data: string, delimiter: string): string[][] {
  // 各行ごとに分割し、空行を除去する
  const rows = data.split("\n").filter((row) => row.trim() !== "");

  // 各行の列数を確認するために最初の行の列数を取得
  const columnCount = rows[0].split(delimiter).length;

  // 各行を指定された区切り文字で分割し、2次元配列に変換する
  const result = rows.map((row, index) => {
    const columns = row.split(delimiter);

    // 列数が一致しない場合はエラーをスロー
    if (columns.length !== columnCount) {
      throw new Error(
        `投入データの列数に一貫性がありません。\n` +
          `1行目: ${columnCount}列\n${index + 1}行目: ${columns.length}列`,
      );
    }

    return columns;
  });

  return result;
}

// CSV用のラッパー関数
export function parseCSV(csv: string): string[][] {
  return parseDelimitedData(csv, ",");
}

// TSV用のラッパー関数
export function parseTSV(tsv: string): string[][] {
  return parseDelimitedData(tsv, "\t");
}
