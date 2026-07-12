const http = require('http');
const app = require('./app');

const server = app.listen(5043, () => {
  http.get('http://127.0.0.1:5043/api/members', (res) => {
    console.log('status', res.statusCode);
    let body = '';
    res.on('data', (chunk) => {
      body += chunk;
    });
    res.on('end', () => {
      console.log(body);
      server.close();
    });
  }).on('error', (err) => {
    console.error(err.message);
    server.close();
  });
});
