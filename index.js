"use strict";
const { Worker } = require("worker_threads");
let n = 2;
let website = process.argv[2];

if (process.argv[2] == "-n") {
  n = process.argv[3];
  website = process.argv[4];
}

// console.log(website, n);

// Calling the worker
exports.runService = (workerData) => {
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
};

let links = [website];
exports.run = async (link) => {
  const result = await runService(link);
  // console.log('Result: ', result.links);
  --runningWorkers;
  // Add unique links to the list
  await addUniqueLinks(result.links);
  // console.log('New List: ', links);
  main();
};

exports.addUniqueLinks = (list) => {
  links.push(list);
  links = links.flat();
  links = [...new Set(links)];
};

exports.checkBoolean = () => {
  // Count the links
  let count = links.length;
  let pending = count - linkIndex;
  // ******** Use this to test for 5 links only *********
  //let testingUnit = test > 5 ? 0 : test;
  //return Math.min(n - runningWorkers, pending, testingUnit) > 0;
  // Check how many workers are running
  return Math.min(n - runningWorkers, pending) > 0;
};

let runningWorkers = 0;
let linkIndex = 0;
let test = 1;
exports.main = () => {
  // Running the workers
  // console.log('Links: ', links);
  while (checkBoolean()) {
    let link = links[linkIndex];
    linkIndex++;
    test++;
    runningWorkers++;
    run(link).catch((err) => {
      --runningWorkers;
      console.error("Error Occurred on link: ", link);
    });
  }
};

main();
