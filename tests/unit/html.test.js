const { getHTML, cheerioInit, getRegex } = require("../../worker");
const axios = require("axios");
const cheerio = require("cheerio");
const { workerData } = require("worker_threads");
const url = require("url");
// const getRegex = async () => {
//   // Get HTML of the link and parse it to get all ahref from it

//   const parseUrl = url.parse(workerData);
//   const hostname = parseUrl.hostname;
//   const regex = new RegExp(`^${hostname}`, "g");
//   return { parseUrl, hostname, regex };
// };

describe("html", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe("getHtml", () => {
    it("should get html", async () => {
      const getSpy = jest
        .spyOn(axios, "get")
        .mockResolvedValueOnce({ data: "<a>http://localhost:3000</a>" });
      const actual = await getHTML("http://localhost:3000");
      expect(actual).toEqual("<a>http://localhost:3000</a>");
      expect(getSpy).toBeCalledWith("http://localhost:3000");
    });
  });
  describe("cheerioInit", () => {
    it("should initializes cheerio", async () => {
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
