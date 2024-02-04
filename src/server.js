const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const mediaHandler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const requestHandler = {
  '/': htmlHandler.loadPage('index'),
  '/page2': htmlHandler.loadPage('2'),
  '/page3': htmlHandler.loadPage('3'),
  '/party.mp4': mediaHandler.getParty,
  '/bling.mp3': mediaHandler.getBling,
  '/bird.mp4': mediaHandler.getBird,
  default: htmlHandler.loadPage('index'),
};

const onRequest = (request, response) => {
  console.log(request.url);

  const parsedUrl = new URL(request.url, `http://localhost:${port}`);
  const handler = requestHandler[parsedUrl.pathname];

  if (handler) handler(request, response);
  else requestHandler.default(request, response);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
