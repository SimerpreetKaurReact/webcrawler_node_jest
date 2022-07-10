const { getfiltered, cleanHTML } = require("./worker");
const { workerData, parentPort } = require("worker_threads");

const main = async () => {
  // Get the HTML
  let linkResults = await getfiltered();

  // Clean the HTML and get new links in the domain
  let cleanResults = await cleanHTML(linkResults);

  // Return the links from the page
  parentPort.postMessage({ links: cleanResults, status: "Done" });
};

main();
