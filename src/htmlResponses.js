const fs = require('fs');

const readHTML = (filepath) => fs.readFileSync(`${__dirname}/${filepath}`);

const pages = {
  index: readHTML('../client/client.html'),
  2: readHTML('../client/client2.html'),
  3: readHTML('../client/client3.html'),
  default: readHTML('../client/client.html'),
};

const loadPage = (pageID) => {
  const page = pages[pageID] || pages.default;

  return (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(page);
    response.end();
  };
};

module.exports = {
  loadPage,
};
