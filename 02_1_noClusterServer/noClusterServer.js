const express = require('express');
const app = express();

// simple node js application using only one thread ,one CPU core , there is no cluster , no child process and no thred workers
app.get('/', (req, res) => {
  for (let i = 0; i < 2e6; i++) {}
  res.send(`hello from server ${process.pid}`);
});

app.listen(4444, () => console.log('listening on port 4444'));
