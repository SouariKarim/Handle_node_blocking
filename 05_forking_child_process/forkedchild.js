process.on('message', (message) => {
  //child process is listening for messages by the parent process
  const result = isPrime(message.number); // get the number to calculate from the parent process via the message
  process.send(result); // send the result of the calculation to the parent process , the result here is the result of the isPrime function wich is an object
  process.exit(); // make sure to use exit() to prevent orphaned processes
});

// in the forked child file we put the function with the heavy tasks
function isPrime(number) {
  let isPrime = true;

  for (let i = 3; i < number; i++) {
    if (number % i === 0) {
      isPrime = false;
      break;
    }
  }
  // the result returned to the parent process
  return {
    number: number,
    isPrime: isPrime,
  };
}
