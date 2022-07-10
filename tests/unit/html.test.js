// const packageToMock = require("worker_threads");
process.argv = ["node", "index.js", "-n", "4", "https://www.flipkart.com"];
const { Worker } = require("worker_threads");

const { cheerioInit, getRegex, getHtml } = require("../../worker");
const axios = require("axios");
const cheerio = require("cheerio");
const url = require("url");

describe("html", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("getHtml", () => {
    test("should get html", async () => {
      const getSpy = jest
        .spyOn(axios, "get")
        .mockResolvedValueOnce({ data: "<a>http://localhost:3000</a>" });
      const link = "http://localhost:3000";
      const actual = await getHtml(link);
      expect(actual).toEqual("<a>http://localhost:3000</a>");

      expect(getSpy).toBeCalledWith("http://localhost:3000");
    });
  });
  describe("cheerioInit", () => {
    test("should initializes cheerio", async () => {
      const loadSpy = jest.spyOn(cheerio, "load").mockImplementation();
      const getSpy = jest
        .spyOn(axios, "get")
        .mockResolvedValueOnce({ data: "<a>http://localhost:3000</a>" });
      await cheerioInit("http://localhost:3000");
      expect(loadSpy).toHaveBeenCalledWith("<a>http://localhost:3000</a>");
      expect(getSpy).toBeCalledWith("http://localhost:3000");
    });
  });
});
