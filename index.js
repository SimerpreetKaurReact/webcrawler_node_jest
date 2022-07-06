"use strict";
const { Worker } = require("worker_threads");
let n = 2;
let website = process.argv[2];

if (process.argv[2] == "-n") {
  n = process.argv[3];
  website = process.argv[4];
}

//for handling pages with 404, 500 statuses, and storing a log of those
let errorLog = [];

// Calling the worker
function runService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", { workerData });
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(
          new Error(`Stopped the Worker Thread with the exit code: ${code}`)
        );
    });
  });
}

let links = [website];
async function run(link) {
  const result = await runService(link);
  // console.log('Result: ', result.links);
  --runningWorkers;
  // Add unique links to the list
  await addUniqueLinks(result.links);
  // console.log('New List: ', links);
  main();
}

function addUniqueLinks(list) {
  links.push(list);
  links = links.flat();
  links = [...new Set(links)];
}

function checkBoolean() {
  // Count the links
  let count = links.length;
  let pending = count - linkIndex;
  // ******** Use this to test for 5 links only *********
  //let testingUnit = test > 5 ? 0 : test;
  //return Math.min(n - runningWorkers, pending, testingUnit) > 0;
  // Check how many workers are running
  return Math.min(n - runningWorkers, pending) > 0;
}

let runningWorkers = 0;
let linkIndex = 0;
let test = 1;

function main() {
  // Running the workers
  // console.log('Links: ', links);
  while (checkBoolean()) {
    let link = links[linkIndex];
    linkIndex++;
    test++;
    runningWorkers++;
    run(link).catch((err) => {
      --runningWorkers;
      throw new Error("Error Occurred on link");
      //console.error("Error Occurred on link: ", link, err);
    });
  }
}

main();

process.on("unhandledRejection", (err) => {
  //console.log("unhandledRejection", err.name, err.message);
  errorLog.push({ err: err.message, timestamp: Date.now() });
});
process.on("uncaughtException", (err) => {
  errorLog.push({ err: err.message, timestamp: Date.now() });
  //normally server is closed on such errors, or error log is maintained
  //since we are not connected to db, so storing error messages in array
  // of objects with timestamp
});
