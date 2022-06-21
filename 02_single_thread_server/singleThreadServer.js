const express = require('express');
const app = express();

// this is a blocking function it takes time to calculate the sum of prime numbers
function sumOfPrimes(n) {
  var sum = 0;
  for (var i = 2; i <= n; i++) {
    for (var j = 2; j <= i / 2; j++) {
      if (i % j == 0) {
        break;
      }
    }
    if (j > i / 2) {
      sum += i;
    }
  }
  return sum;
}

app.get('/sumofprimes', (req, res) => {
  const startTime = new Date().getTime();
  // this calculation is handled by the event loop ,  and the event loop takes only one CPU core (one thread ) to resolve this calculation , so it will be blocked
  const sum = sumOfPrimes(req.query.number);
  const endTime = new Date().getTime();
  res.json({
    number: req.query.number,
    sum: sum,
    timeTaken: (endTime - startTime) / 1000 + ' seconds',
  });
});

// this route will be blocked if the /sumofprimes is fired and  the request will be handled by the server if and only if the blicking route is resolved means the event loop is not blocked anymore
app.get('/testrequest', (req, res) => {
  res.send('I am unblocked now');
});

app.listen(6767, () => console.log('listening on port 6767'));
