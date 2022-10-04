// execute the script mentionned in my.bat when we run the file

const { spawn } = require('node:child_process');
const bat = spawn('cmd.exe', ['/c', 'my.bat']);

// log the output of the commands
bat.stdout.on('data', (data) => {
  console.log(data.toString());
});

// log the error 
bat.stderr.on('data', (data) => {
  console.error(data.toString());
});

// when the script is completed log a message
bat.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
});