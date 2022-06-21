// this is the second solution using the thread workers

// Worker threads can be used to solve the above-mentioned caveats with child processes because worker threads share memory and communication between threads is possible.

// the number of threads created should be equal to number of cpu cores.

const express = require('express');
const app = express();
const { Worker } = require('worker_threads');

// function to run the workers
function runWorker(workerData) {
  return new Promise((resolve, reject) => {
    //first argument is filename of the worker
    const worker = new Worker('./sumOfPrimesWorker.js', {
      workerData, // the data that will pass to the worker in the other file as argument
    });
    worker.on('message', resolve); //This promise is gonna resolve when messages comes back from the worker thread
    // when the calculation is done in the worker thread , it will send the result to this parent and wich once receiving that message , it will resolve
    worker.on('error', reject); // when an error occurs from the worker thread the parent will reject

    // if exit or something happens inside the worker thread reject an error
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

function divideWorkAndGetSum() {
  // we are hardcoding the value 600000 for simplicity and dividing it
  //into 4 equal parts
  // we devided the number ub 4 numbers so we will create 4 workers and each worker will handle a separate and equal amount of calculation

  // the number of threads created should be equal to number of cpu cores.
  // first chunk of the number we want to calculate
  const start1 = 2;
  const end1 = 150000;
  // second chunk of the number
  const start2 = 150001;
  const end2 = 300000;
  // third chunk of the number
  const start3 = 300001;
  const end3 = 450000;
  // fourth chunk of the number
  const start4 = 450001;
  const end4 = 600000;
  //allocating each worker seperate parts
  // intialting an instance of a worker and passing to it the worker data wich is the below object
  const worker1 = runWorker({ start: start1, end: end1 });
  const worker2 = runWorker({ start: start2, end: end2 });
  const worker3 = runWorker({ start: start3, end: end3 });
  const worker4 = runWorker({ start: start4, end: end4 });
  //Promise.all resolve only when all the promises inside the array has resolved
  return Promise.all([worker1, worker2, worker3, worker4]);
}

app.get('/sumofprimeswiththreads', async (req, res) => {
  const startTime = new Date().getTime();
  // when hitting this route start all the process of the worker thread
  // the runWorkers  function will be created and linked to the file of the worker threads
  // this divideWorkAndGetSum function will use the runworkers function to create 4 threads as equal to the number of core CPU we want to devide to heavy calculation on

  const sum = await divideWorkAndGetSum()
    .then(
      (
        values //values is an array containing all the resolved values
      ) => values.reduce((accumulator, part) => accumulator + part.result, 0) //reduce is used to sum all the results from the workers
    )
    .then((finalAnswer) => finalAnswer);

  const endTime = new Date().getTime();
  res.json({
    number: 600000,
    sum: sum,
    timeTaken: (endTime - startTime) / 1000 + ' seconds',
  });
});

app.listen(7777, () => console.log('listening on port 7777'));
