/* 
    - process.argv : uses here for get link you will typing after command "npm start"
    - process.exit(1) : for block the code and don't retur undifined or value bug
*/

const { crawlingPage } = require("./main.js");

// get link from command line
function gettersLink() {
  if (process.argv.length < 3) {
    console.log("Please Type Link After 'start' world For Fetching");
    process.exit(1);
  }

  if (process.argv.length > 3) {
    console.log("Please Type Just One Link");
    process.exit(1);
  }

  const url = process.argv[2];
  crawlingPage(url);
}

gettersLink();
