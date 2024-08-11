import { assertEquals } from "jsr:@std/assert@1";
import { parse } from "./ddl.ts";

Deno.test("url test", () => {
  const url = new URL("./foo.js", "https://deno.land/");
  assertEquals(url.href, "https://deno.land/foo.js");
});

Deno.test("ddl_info_1 test", async () => {
  const { ddl_info } = await import("./testdata/ddl_info_1.ts");
  parse(ddl_info);
});
