process.argv = ["node", "index.js", "-n", "4", "https://www.flipkart.com"];

let { main, checkBoolean, run } = require("../../index.js");
const { Worker } = require("worker_threads");

describe("Worker.checkBoolean", () => {
  test("should have a get html function", async () => {
    checkBoolean = jest.fn();
    expect(typeof main).toBe("function");
    main();
    expect(checkBoolean).toBeCalled();
  });
  //   it("should call cheerio.load ", async () => {
  //     const checkBoolean = jest.fn();
  //     checkBoolean.mockReturnValueOnce(1);
  //     const data = await main();
  //     expect(main).toBeCalled();
  //     expect(run).toBeCalled();
  //   });
});
