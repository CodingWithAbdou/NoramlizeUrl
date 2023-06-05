const { sortPage } = require("../js/print.js");
const { expect } = require("@jest/globals");

test("sortPage test Printing mode  three url ", () => {
  const input = {
    "https://abdou.com/path1": 3,
    "https://abdou.com": 4,
    "https://abdou.com/path2": 33,
  };
  const output = sortPage(input);
  const expected = [
    ["https://abdou.com/path2", 33],
    ["https://abdou.com", 4],
    ["https://abdou.com/path1", 3],
  ];

  expect(output).toEqual(expected);
});

test("sortPage test Printing mode  five url ", () => {
  const input = {
    "https://abdou.com/path1": 3,
    "https://abdou.com": 4,
    "https://abdou.com/path2": 33,
    "https://abdou.com/path3": 22,
    "https://abdou.com/path4": 7,
  };
  const output = sortPage(input);
  const expected = [
    ["https://abdou.com/path2", 33],
    ["https://abdou.com/path3", 22],
    ["https://abdou.com/path4", 7],
    ["https://abdou.com", 4],
    ["https://abdou.com/path1", 3],
  ];

  expect(output).toEqual(expected);
});
