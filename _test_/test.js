const axios = require("axios");
const { getHtml, cleanHtml, getLinks } = require("../index.js");
//mock top level functions
jest.mock("axios");
//test you can fetch data from link using axios
test("mock axios get function", async () => {
  const data = [
    "/apple-iphone-12-white-64-gb/p/itm8b88bdc03cd79?otracker=undefined_footer_footer",
    "/apple-iphone-12-pro-graphite-512-gb/p/itmdf0ffb4f2150f?otracker=undefined_footer_footer",
    "/apple-iphone-12-blue-128-gb/p/itm02853ae92e90a?otracker=undefined_footer_footer",
  ];
  const payload = { data };
  // Now mock axios get method
  axios.get = jest.getHtml().mockResolvedValue(payload);
  await expect(getHtml()).resolves.toEqual(data);
});

test("string matchers", () => {
  var string1 =
    "/apple-iphone-12-white-64-gb/p/itm8b88bdc03cd79?otracker=undefined_footer_footer"; // test for success match

  expect(string1).toMatch(/apple-iphone-12/);
});
