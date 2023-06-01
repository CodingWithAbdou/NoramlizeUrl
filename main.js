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
};
