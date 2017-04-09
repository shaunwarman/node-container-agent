const Http = require('http');

const server = Http.createServer((req, res) => {
  const rand = Math.floor(Math.random() * 10);

  if (rand === 2) throw new Error('Server crash!');

  res.end('OK');
});

server.listen(3000, () => {
    console.log('Server listening... (I\'m useless though.)');
});
