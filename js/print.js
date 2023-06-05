// print the final  Result

function printyReport(pages) {
  console.log("=".repeat(60));
  console.log("** START REPORT");
  console.log("=".repeat(60));

  const sortedPages = sortPage(pages);

  for (const sortedPage of sortedPages) {
    const urlName = sortedPage[0];
    const repeat = sortedPage[1];
    console.log(`Found ${repeat} Links To Page :${urlName}`);
  }

  console.log("=".repeat(60));
  console.log("** END REPORT");
  console.log("=".repeat(60));
}

// For Descending Order for show

function sortPage(pages) {
  const pagesArray = Object.entries(pages);

  pagesArray.sort((a, b) => b[1] - a[1]);

  return pagesArray;
}

module.exports = {
  sortPage,
  printyReport,
};
