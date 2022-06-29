const express = require('express');
const app = express();

// when we run both routes , two request at the same time , what happens

app.get('/isprime', async (req, res) => {
  const startTime = new Date();
  // the heavy task is handled by promises but that does not solve the problem of blocking the event loop , because it is not time consuming, 
  //it is not a matter of time here , it is memory consuming.
  const result = await isPrime(parseInt(req.query.number)); //parseInt is for converting string to number
  const endTime = new Date();
  res.json({
    number: parseInt(req.query.number),
    isprime: result,
    time: endTime.getTime() - startTime.getTime() + 'ms',
  });
});

// this request will be blocked if we run it with the other request , it will handled only if  the other route is calculated and resolved
app.get('/testrequest', (req, res) => {
  res.send('I am unblocked now');
});

// heavy computing task returning a promise
const isPrime = (number) => {
  return new Promise((resolve) => {
    let isPrime = true;
    for (let i = 3; i < number; i++) {
      if (number % i === 0) {
        isPrime = false;
        break;
      }
    }

    resolve(isPrime);
  });
};

app.listen(3000, () => console.log('listening on port 3000'));
