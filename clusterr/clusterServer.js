// cluster is another way of solving this problem

//  In an Http server, the cluster module uses child_process.fork() to automatically fork processes and sets up a master-slave architecture where the parent process distributes the incoming request to the child processes in a round-robin fashion

const cluster = require('cluster');
const http = require('http');
const cpuCount = require('os').cpus().length; //returns number of cores our cpu have

if (cluster.isMaster) {
  masterProcess();
} else {
  childProcess();
}

// this function will only run on the master process
function masterProcess() {
  console.log(`Master process ${process.pid} is running`);

  //fork workers.

  for (let i = 0; i < cpuCount; i++) {
    console.log(`Forking process number ${i}...`);
    // creating childProcess basing on the number of CPU cors found in the system
    cluster.fork(); //creates new node js processes
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);

    cluster.fork(); //forks a new process if any process dies
  });
}

function childProcess() {
  const express = require('express');
  const app = express();
  //workers can share TCP connection

  app.get('/', (req, res) => {
    res.send(`hello from server ${process.pid}`);
  });

  app.listen(5555, () =>
    console.log(`server ${process.pid} listening on port 5555`)
  );
}

// explanation : when we run the code , first the conditon cluster.isMaster is set to true , so the masterProcess function is run and creates forked childProcess based on the number of CPU cors found in the system

// then the cluster.isMaster is set to false and all the other jobs are handled in the forker childProcesses . so in this example the childProcess() function is executed 4 times and 4 instances of an express server are created. and the request are distributed to the four servers in a round-robin fashion . this hep us to use 100% of the CPU system
