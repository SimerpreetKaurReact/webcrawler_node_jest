"use strict";
const { workerData, parentPort } = require("worker_threads");
const axios = require("axios");
const cheerio = require("cheerio");
const url = require("url");

// Get HTML of the link and parse it to get all ahref from it
console.log("Link: ", workerData);
const parseUrl = url.parse(workerData);
const hostname = parseUrl.hostname;
const regex = new RegExp(`^${hostname}`, "g");

exports.getHTML = () => {
  return axios
    .get(workerData)
    .then((res) => {
      const $ = cheerio.load(res.data);
      const siteText = $.text();
      let linksList = [];
      $("a").each(function (i, link) {
        linksList.push($(link).attr("href"));
      });

      return linksList;
    })
    .catch((err) => console.log("Error Occured while fetching data"));
};

exports.cleanHTML = (linkResults) => {
  let array = [];
  linkResults.map((ele) => {
    if (regex.test(ele)) array.push(ele);
    else if (ele && ele.substring(0, 4) != "http") {
      let link = new URL(parseUrl.href);
      link.pathname = ele;
      array.push(link.href);
    }
  });
  return array;
};

exports.main = async () => {
  // Get the HTML
  let linkResults = await getHTML();

  // Clean the HTML and get new links in the domain
  let cleanResults = await cleanHTML(linkResults);

  // Return the links from the page
  parentPort.postMessage({ links: cleanResults, status: "Done" });
};

main();
