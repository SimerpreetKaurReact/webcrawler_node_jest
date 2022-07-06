const { isTag } = require("domhandler");
const { checkBoolean, addUniqueLinks, runService } = require("../../index.js");
const worker = require("../../worker");

// worker.cheerio.load = jest.fn();

// describe("Worker.getHTML", () => {
//   it("should have a get html function", () => {
//     expect(typeof worker.getHTML).toBe("function");
//   });
//   it("should call cheerio.load ", () => {
//     worker.getHTML();
//     expect(worker.cheerio.load).toBeCalled();
//   });
// });
//cleanhtml check if it returns an array of strings
