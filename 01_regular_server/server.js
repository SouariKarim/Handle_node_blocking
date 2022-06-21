const express = require('express');
const app = express();

// if we hit both routes in same time what happens

app.get('/getfibonacci', (req, res) => {
  const startTime = new Date();
  // this a heavy task that consumes memory so it will block other requests wich is handled by the event loop
  const result = fibonacci(parseInt(req.query.number)); //parseInt is for converting string to number
  const endTime = new Date();
  res.json({
    number: parseInt(req.query.number),
    fibonacci: result,
    time: endTime.getTime() - startTime.getTime() + 'ms',
  });
});

// this route will be blocked if the /getfibonaci is fired and  the request will be handled by the server if and only if the blicking route is resolved means the event loop is not blocked anymore
app.get('/c', (req, res) => {
  res.send('I am unblocked now');
});

const fibonacci = (n) => {
  if (n <= 1) {
    return 1;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
};

app.listen(3000, () => console.log('listening on port 3000'));
