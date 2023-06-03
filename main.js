const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function crawlingPage(urlPage) {
  try {
    console.log("... actively Crawling : ", urlPage);
    const response = await fetch(urlPage);
    if (response.status > 399) {
      console.log(
        `Error In fetch :${response.status} , On the Website : ${urlPage}`
      );
      return;
    }
    const contentType = response.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `Non HTML response ,| contetnt-type  :${contentType} , On the Website :  ${urlPage}`
      );
      return;
    }
    console.log(await response.text());
  } catch (err) {
    console.log(`Error : ${err.message}`);
  }
}

function getLinksFromHtml(HTMLDom, baseUrl) {
  const array = [];
  const dom = new JSDOM(HTMLDom);
  const links = dom.window.document.querySelectorAll("a");

  for (let i = 0; i < links.length; i++) {
    let link = links[i].href;

    if (link[0] === "/") {
      link = `${baseUrl}${link}`;
    }
    try {
      let newLink = new URL(link).href;

      if (newLink.slice(-1) === "/") {
        newLink = newLink.slice(0, -1);
      }

      array.push(newLink);
    } catch (err) {
      console.log("You Url Is NoT Valid :", err.message);
    }
  }
  return array;
}

const url = "https://Blog.abdou.com/";
function checkUrl(url) {
  const newUrl = new URL(url);

  const host = `${newUrl.hostname}${newUrl.pathname}`;
  if (host.length > 0 && host.slice(-1) === "/") {
    return host.slice(0, -1);
  }

  return host;
}

module.exports = {
  checkUrl,
  getLinksFromHtml,
  crawlingPage,
};
