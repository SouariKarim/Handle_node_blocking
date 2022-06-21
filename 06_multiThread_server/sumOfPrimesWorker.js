const { workerData, parentPort } = require('worker_threads');
//workerData will be the second argument of the Worker constructor in multiThreadServer.js
// the wotkerData here is the object passed in the runWorker function in the parent file wich is { start : start1 , end : end1 }

const start = workerData.start;
const end = workerData.end;

// this is the heavy calculation tasks handled by the worker threads
var sum = 0;
for (var i = start; i <= end; i++) {
  for (var j = 2; j <= i / 2; j++) {
    if (i % j == 0) {
      break;
    }
  }
  if (j > i / 2) {
    sum += i;
  }
}

// when the calculation is done send a message to the parent
parentPort.postMessage({
  //send message with the result back to the parent process
  start: start,
  end: end,
  result: sum,
});
