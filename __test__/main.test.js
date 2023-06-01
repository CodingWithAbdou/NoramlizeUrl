const { checkUrl } = require("../main.js");
const { test, expect } = require("@jest/globals");

test("test url without protocol (https and http ..)", () => {
  const input = "https://blog.abdou.com/story";
  const output = checkUrl(input);
  const expected = "blog.abdou.com/story";

  expect(output).toEqual(expected);
});

test("check the letter if uppercase or lowercase", () => {
  const input = "https://Blog.abdou.com";
  const output = checkUrl(input);
  const expected = "blog.abdou.com";

  expect(output).toEqual(expected);
});

test("remove backslash  if was in last site", () => {
  const input = "https://Blog.abdou.com/";
  const output = checkUrl(input);
  const expected = "blog.abdou.com";

  expect(output).toEqual(expected);
});
