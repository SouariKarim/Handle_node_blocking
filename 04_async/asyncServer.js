const express = require('express');
const app = express();
const fetch = require('node-fetch'); //node-fetch is a library used to make http request in nodejs.

// this is not a blocking route beavause of the node-fetch
app.get('/calltoslowserver', async (req, res) => {
  // this call is not a blocking task because the node-fetch returns a promise and deal with the 
  //blocking by it self
  // the fetching is an I/O operation wich takes time to be resolved and it is not a heavy calculation
  // wich takes memory so the async/await is the solurion for not blocking the main thread of this request
  const result = await fetch('http://localhost:5000/slowrequest'); //fetch returns a promise
  const resJson = await result.json();
  res.json(resJson);
});

// this route will not be blocked if runs with the other route , because the obove route is not blocking , the fetch returns a promise and the async/await handles that promise
app.get('/testrequest', (req, res) => {
  res.send('I am unblocked now');
});

app.listen(4000, () => console.log('listening on port 4000'));
