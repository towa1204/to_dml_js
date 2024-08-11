import { bundle } from "jsr:@deno/emit";

const input = "./src/index.ts";
const output = "./dist/index.js";

const result = await bundle(
  input,
  {
    minify: false,
    type: "module",
  },
);
const { code } = result;

const data = new TextEncoder().encode(code);
Deno.writeFileSync(output, data);
