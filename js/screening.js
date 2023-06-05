const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// pages in function bellow is just empty opject for filling letter with array result of Crawling in The CurrentLinks

async function crawlingPage(baseUrl, currentUrl, pages) {
  // for check in the same
  const basUrlObj = new URL(baseUrl);
  const currentUrlObj = new URL(currentUrl);

  if (basUrlObj.hostname !== currentUrlObj.hostname) {
    return pages;
  }

  //  for check if the url Is nurmal

  const checkCurrentUrl = checkUrl(currentUrl);

  // for counte how many time have this site in page(entery)

  if (pages[checkCurrentUrl] > 0) {
    pages[checkCurrentUrl]++;
    return pages;
  }
  // give it number one  for increase this number if give this site another time one the top check of this comment

  pages[checkCurrentUrl] = 1;

  // for shawing when the program is process
  console.log("... Actively Crawling : ", currentUrl);

  // get the response from the urls enter in command line

  try {
    const response = await fetch(currentUrl);

    if (response.status > 399) {
      console.log(
        `Error In fetch :${response.status} , On the Website : ${currentUrl}`
      );

      return pages;
    }

    const contentType = response.headers.get("content-type");

    if (!contentType.includes("text/html")) {
      console.log(
        `Non HTML response ,| contetnt-type  :${contentType} , On the Website :  ${currentUrl}`
      );

      return pages;
    }

    // for get link in array from link after fetching

    const htmlBody = await response.text();
    const nextUrls = getLinksFromHtml(htmlBody, baseUrl);

    // loop on the array reserved and pass function carwling for all time repeat crawling to the end of the page
    for (const nextUrl of nextUrls) {
      pages = await crawlingPage(baseUrl, nextUrl, pages);
    }
  } catch (err) {
    console.log(`Error : ${err.message}`);
  }
  return pages;
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
