// const packageToMock = require("worker_threads");
process.argv = ["node", "index.js", "-n", "4", "https://www.flipkart.com"];
const { Worker } = require("worker_threads");

const { cheerioInit, getRegex } = require("../../worker");
const axios = require("axios");
const cheerio = require("cheerio");
const url = require("url");
// const getRegex = async () => {
//   // Get HTML of the link and parse it to get all ahref from it

//   const parseUrl = url.parse(workerData);
//   const hostname = parseUrl.hostname;
//   const regex = new RegExp(`^${hostname}`, "g");
//   return { parseUrl, hostname, regex };
// };
git@github.com:SimerpreetKaurReact/backend_node_service.git
describe("html", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  const link = "http://localhost:3000";
  // describe("getHtml", () => {
  //   it("should get html", async () => {
  //     packageToMock.workerData.mockResolvedValue("http://localhost:3000");
  //     axios.get.mockResolvedValueOnce({ data: "<a>http://localhost:3000</a>" });

  //     const actual = await getHtml(link);
  //     expect(axios.get).toHaveBeenCalledWith(link);
  //     expect(result).toEqual({ data: "<a>http://localhost:3000</a>" });
  //   });
  // });
  // describe("getHtml", () => {
  //   test("should get html", async () => {
  //     const getSpy = jest
  //       .spyOn(axios, "get")
  //       .mockResolvedValueOnce({ data: "<a>http://localhost:3000</a>" });
  //     const link = "http://localhost:3000";
  //     const actual = await getHTML(link);
  //     expect(actual).toEqual("<a>http://localhost:3000</a>");

  //     expect(getSpy).toBeCalledWith("http://localhost:3000");
  //   });
  // });
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
