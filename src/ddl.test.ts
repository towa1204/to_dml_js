import { newDDL } from "./ddl.ts";
import { ddl_info } from "./testdata/ddl_info_1.ts";

// TODO: シンプルなもので確認する
Deno.test("newDDL", () => {
  const result = newDDL(ddl_info);
  console.log(result);
});
