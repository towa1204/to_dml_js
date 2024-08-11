import { format_NUMBER, format_VARCHAR } from "./format.ts";

Deno.test("format_NUMBER", () => {
  const tests = [
    { in: "30", out: "30" },
    { in: "5.1", out: "5.1" },
    { in: "-5.1", out: "-5.1" },
    { in: "0.004", out: "0.004" },
    { in: "", out: "null" },
  ];

  for (const test of tests) {
    const result = format_NUMBER(test.in);
    if (result !== test.out) {
      throw new Error(
        `Failed for case in=${test.in}, out=${test.out}: got ${result}`,
      );
    }
  }
});

Deno.test("format_VARCHAR", () => {
  const tests = [
    { in: "てすと", out: "'てすと'" },
    { in: "5.1", out: "'5.1'" },
    { in: "", out: "null" },
  ];

  for (const test of tests) {
    const result = format_VARCHAR(test.in);
    if (result !== test.out) {
      throw new Error(
        `Failed for case in=${test.in}, out=${test.out}: got ${result}`,
      );
    }
  }
});
