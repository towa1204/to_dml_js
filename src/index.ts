import { genInsertSQL, newDDL, SchemaInfo } from "./ddl.ts";

let ddls: Map<string, SchemaInfo> | null = null;
let schemaTableMap: Map<string, { schema: string; table: string }> | null =
  null;

function load(ddl_info: string) {
  ddls = newDDL(ddl_info);

  // スキーマ.テーブル => {schema: string, table: string}
  // ↑特定のスキーマ.テーブルが選択されたときのkeyにつかう
  schemaTableMap = new Map<string, { schema: string; table: string }>();
  for (const [schema, table_info] of ddls) {
    for (const table of table_info.keys()) {
      schemaTableMap.set(`${schema}.${table}`, {
        schema: schema,
        table: table,
      });
    }
  }
  console.log(schemaTableMap);
  console.log(ddls);

  // スキーマ.テーブル の一覧を取得しDOMを生成
  // データを用意（ここではサンプルデータとして配列を使用）
  createSideBar(schemaTableMap.keys());
}
load(ddl_info);

function createSideBar(tableNames: IterableIterator<string>) {
  // サイドバーのコンテナを取得
  const sidebar = document.getElementById("sidebar");

  // 項目を動的に生成して追加する
  for (const tableName of tableNames) {
    const div = document.createElement("div");
    div.className = "sidebar-item";
    div.id = tableName;
    div.textContent = tableName;

    // クリックイベントを追加
    div.addEventListener("click", function () {
      // 既存のactiveクラスを全て除去
      document.querySelectorAll(".sidebar-item").forEach((el) => {
        el.classList.remove("active");
      });

      // クリックされた項目にactiveクラスを追加
      this.classList.add("active");
    });

    // サイドバーに項目を追加
    sidebar?.appendChild(div);
  }
}

// Generateボタンがクリックされた時の処理
document.getElementById("generate-button")?.addEventListener("click", () => {
  // サイドバーのバリデーション
  const selectedTable = document.querySelector("#sidebar .active");
  if (selectedTable == null) {
    alert("サイドバーからテーブル名を選択してください");
    return;
  }

  // 入力テキストエリアが空の場合のバリデーション
  const inputTextArea = document.getElementById("input-textarea");
  if (
    inputTextArea == null || !(inputTextArea instanceof HTMLTextAreaElement)
  ) {
    throw new Error("Not Found or invalid type #output-textarea");
  }
  const inputText = inputTextArea.value;
  if (inputText === "") {
    alert("データが空です。入力してください");
    return;
  }

  // オプションの値を取得

  // ### SQL生成処理 ###
  let sql: string | null = null;
  if (ddls !== null && schemaTableMap !== null) {
    const tableName = schemaTableMap.get(selectedTable.id);
    if (tableName == undefined) {
      throw new Error(`${selectedTable.id}の値が不正`);
    }
    try {
      sql = genInsertSQL(inputText, ddls, tableName);
    } catch (err) {
      alert(err.message);
      return;
    }
  }

  const outputTextArea = document.getElementById("output-textarea");
  if (
    outputTextArea == null || !(outputTextArea instanceof HTMLTextAreaElement)
  ) {
    throw new Error("Not Found or invalid type #output-textarea");
  }
  if (sql !== null) {
    outputTextArea.value = sql;
    console.log("set");
  }
});

// コピーボタンがクリックされた時の処理
document.getElementById("copy-button")?.addEventListener("click", () => {
  const outputTextarea = document.getElementById("output-textarea");
  if (
    outputTextarea == null || !(outputTextarea instanceof HTMLTextAreaElement)
  ) {
    throw new Error("Not Found or invalid type #output-textarea");
  }

  navigator.clipboard.writeText(outputTextarea.value);

  const copyButton = document.getElementById("copy-button");
  if (copyButton) {
    copyButton.innerHTML = "Copied";
    setTimeout(() => (copyButton.innerHTML = "Copy"), 500);
  }
});
