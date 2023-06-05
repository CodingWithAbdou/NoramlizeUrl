const { checkUrl, getLinksFromHtml } = require("../js/screening.js");
const { expect } = require("@jest/globals");

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

test("remove backslash  if was it in last site with https protocol", () => {
  const input = "https://Blog.abdou.com/";
  const output = checkUrl(input);
  const expected = "blog.abdou.com";

  expect(output).toEqual(expected);
});

test("remove backslash  if was it in last site with http protocol", () => {
  const input = "http://Blog.abdou.com/";
  const output = checkUrl(input);
  const expected = "blog.abdou.com";

  expect(output).toEqual(expected);
});

test("getLinksFromHtml Full Link", () => {
  const inpoutHTML = `
  <html>
    <body>
        <a href="http://blog.abdou.com">blog.abdou.com</a>
    </body>
  </html>`;
  const output = getLinksFromHtml(inpoutHTML);
  const expected = ["http://blog.abdou.com"];

  expect(output).toEqual(expected);
});

test("getLinksFromHtml Just Path", () => {
  const inpoutHTML = `
  <html>
    <body>
        <a href="/resume">blog.abdou.com</a>
    </body>
  </html>`;
  const baseUrl = "https://blog.abdou.com";
  const output = getLinksFromHtml(inpoutHTML, baseUrl);
  const expected = ["https://blog.abdou.com/resume"];

  expect(output).toEqual(expected);
});

test("getLinksFromHtml many of links", () => {
  const inpoutHTML = `
  <html>
    <body>
        <a href="/resume">blog.abdou.com</a>
        <a href="https://blog.abdou2.com/resume">blog.abdou2.com</a>
        <a href="/resume">blog.abdou.com</a>
    </body>
  </html>`;
  const baseUrl = "https://blog.abdou.com";
  const output = getLinksFromHtml(inpoutHTML, baseUrl);
  const expected = [
    "https://blog.abdou.com/resume",
    "https://blog.abdou2.com/resume",
    "https://blog.abdou.com/resume",
  ];

  expect(output).toEqual(expected);
});

test("getLinksFromHtml pass Invalid url", () => {
  const inpoutHTML = `
  <html>
    <body>
        <a href="invalid">invalid</a>
    </body>
  </html>`;
  const baseUrl = "https://blog.abdou.com";
  const output = getLinksFromHtml(inpoutHTML, baseUrl);
  const expected = [];

  expect(output).toEqual(expected);
});
