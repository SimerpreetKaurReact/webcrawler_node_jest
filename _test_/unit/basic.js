const { isTag } = require("domhandler");
const { checkBoolean, addUniqueLinks, runService } = require("../../index.js");
const worker = require("../../worker");

describe("Worker.getHTML", () => {
  it("should have a get html function", () => {
    expect(typeof worker.getHTML).toBe("function");
  });
});
//cleanhtml check if it returns an array of strings
