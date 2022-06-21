// this is the first solution using forked child processes

const express = require('express');
const app = express();
const { fork } = require('child_process');

app.get('/isprime', (req, res) => {
  // make a call to the forked child process to ask for halp and pass any needed arguments
  const childProcess = fork('./forkedchild.js'); //the first argument to fork() is the name of the js file to be run by the child process
  childProcess.send({ number: parseInt(req.query.number) }); //send method is used to send message to child process through IPC , seend the number that we want to do with the consuming memory task
  const startTime = new Date();
  childProcess.on('message', (message) => {
    //on("message") method is used to listen for messages send by the child process
    // the message argument is the result of the calculation done in the child process file (isPrime function)
    const endTime = new Date();
    res.json({
      ...message, // the result of the calculation done by the child process
      time: endTime.getTime() - startTime.getTime() + 'ms',
    });
  });
});

// this route wont be blocked if we run it in parallel with the above route wich is handled by a child processes
app.get('/testrequest', (req, res) => {
  res.send('I am unblocked now');
});

app.listen(3636, () => console.log('listening on port 3636'));

// Separate memory is allocated for each child process which means that there is a time and resource overhead.
// Only parent to child process communication is possible and there is no child to child communication.
// this can be solved using the thread pool or the worker threads
