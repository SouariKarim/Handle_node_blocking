const cluster = require('cluster');
if (cluster.isMaster) {
  console.log(`master process ${process.pid} started`);

  const cpuCount = require('os').cpus().length;
  console.log('cpuCount :' + cpuCount);

  for (let i; i < cpuCount; i++) {
    cluster.fork();
  }
} else {
  const http = require('http');
  const server = http.createServer((req, res) => {
    if (req.url === '/hello') {
      res.end('hello there !!');
    }
  });

  server.listen(1337);
  console.log('server listening on port');
}
