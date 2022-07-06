"use strict";
const { workerData, parentPort } = require("worker_threads");
const axios = require("axios");
const cheerio = require("cheerio");
const url = require("url");
console.log("Link: ", workerData);

const getRegex = async () => {
  // Get HTML of the link and parse it to get all ahref from it

  const parseUrl = url.parse(workerData);
  const hostname = parseUrl.hostname;
  const regex = new RegExp(`^${hostname}`, "g");
  return { parseUrl, hostname, regex };
};

const getHTML = async (url) => {
  // console.log(url);
  const { data } = await axios.get(url);
  return data;
};

const cheerioInit = async (url) => cheerio.load(await getHTML(url));

const getfiltered = async () => {
  const $ = await cheerioInit(workerData);

  //const $ = cheerio.load(res.data);
  const siteText = $.text();
  let linksList = [];
  $("a").each(function (i, link) {
    linksList.push($(link).attr("href"));
  });

  return linksList;
  // })
  // .catch((err) => console.log("Error Occured while fetching data"));
};

const cleanHTML = async (linkResults) => {
  let array = [];
  linkResults.map(async (ele) => {
    const { parseUrl, hostname, regex } = await getRegex();

    if (regex.test(ele)) array.push(ele);
    else if (ele && ele.substring(0, 4) != "http") {
      let link = new URL(parseUrl.href);
      link.pathname = ele;
      array.push(link.href);
    }
  });
  return array;
};

async function main() {
  // Get the HTML
  let linkResults = await getfiltered();

  // Clean the HTML and get new links in the domain
  let cleanResults = await cleanHTML(linkResults);

  // Return the links from the page
  parentPort.postMessage({ links: cleanResults, status: "Done" });
}

main();

module.exports = {
  cheerioInit,
  getHTML,
  getfiltered,
  main,
  cleanHTML,
  getRegex,
};
