const utils = require("../md-links.js");
const mdLinks = require("../index.js");
const mdResults = require("./md-links-mocks.js");

describe("function convertPath  convert relative to absolute path", () => {
  test("is a functión", () => {
    expect(typeof utils.convertPath).toBe("function");
  });
  test(`waiting for true`, () => {
    expect(utils.convertPath("./test/dir-tests")).toBe(
      __dirname + "/dir-tests"
    );
  });
});

describe("function existRoute validate existence of the route ", () => {
  test("is a functión", () => {
    expect(typeof utils.existRoute).toBe("function");
  });
  test("waiting for" + __dirname + "/dir-tests", () => {
    expect(utils.existRoute(__dirname + "/dir-tests")).toBe(true);
  });
  test(`waiting for "The route not exist"`, () => {
    expect(utils.existRoute(__dirname + "/dir-tests/pizza")).toBe(false);
  });
});

describe("Function isDirOrFile verify is file or directory", () => {
  test("is a function", () => {
    expect(typeof utils.isDirOrFile).toBe("function");
  });
  test(`waiting for true`, () => {
    expect(utils.isDirOrFile(__dirname + "/dir-tests")).toBe(true);
  });
  test(`waiting for false`, () => {
    expect(utils.isDirOrFile(__dirname + "/dir-tests/chao.md")).toBe(false);
  });
});

describe("Función isMD verify file extension *.md ", () => {
  test("is a functión", () => {
    expect(typeof utils.isMD).toBe("function");
  });
  test(`waiting for false`, () => {
    expect(utils.isMD(__dirname + "/dir-js/p.js")).toBe(false);
  });
  test(`waiting for true`, () => {
    expect(utils.isMD(__dirname + "/dir-tests/chao.md")).toBe(true);
  });
});

describe("function listMardownRecursive for browse directory and find file .md ", () => {
  test("is a functión", () => {
    expect(typeof utils.listMardownRecursive).toBe("function");
  });
  test(`waiting for ./test/dir-tests`, () => {
    expect(utils.listMardownRecursive(__dirname)).toEqual(
      mdResults.listMardownRecursiveOk
    );
  });
  test(`waiting for ./test/dir-tests`, () => {
    expect(utils.listMardownRecursive(__dirname + "/dir-tests")).toEqual(
      mdResults.listMardownRecursiveDirTestOk
    );
  });
  test(`waiting for array`, () => {
    expect(utils.listMardownRecursive(__dirname + "/dir-js")).toEqual([]);
  });
});

describe("function getLinks extract the links file .md ", () => {
  test("is a functión", () => {
    expect(typeof utils.getLinks).toBe("function");
  });
  test(`waiting for object array with all the links`, () => {
    expect(utils.getLinks(__dirname + "/dir-tests/chao.md")).toEqual(
      mdResults.getLinksOk
    );
  });
});

describe("function validateLinks validate the links of object array  property: url, text, file", () => {
  test(`waiting 404 for https://nodejs.org/api/paths.html`, () => {
    return utils.validateLinks(mdResults.inputValidateLinks).then((res) => {
      expect(res).toBe(mdResults.inputValidateLinks);
    });
  });
  test(`waiting Ok for https://docs.npmmmmjs.com/getting-started/what-is-npm`, () => {
    return utils.validateLinks(mdResults.getLinksOk).then((res) => {
      expect(res).toBe(mdResults.getLinksOk);
    });
  });
});
describe("función stats totalize links stats", () => {
  test(`waiting  3 for arrayOfExample `, () => {
    expect(utils.stats(mdResults.arrayOfExample)).toEqual({
      broken: 2,
      unique: 5,
    });
  });
});
/***** TEST FUNCTIÓN MDLINKS API *****/
describe("mdLinks is a función", () => {
  it("is a function", () => {
    expect(typeof mdLinks).toBe("function");
  });

  test("waiting for object array property: file, href and text of file chao.md", () => {
    return mdLinks(__dirname + "/dir-tests/chao.md").then((result) => {
      expect(result).toEqual(mdResults.mdLinksOk);
    });
  });

  test("waiting for object array property: file, href and text of file chao.md", () => {
    return mdLinks(__dirname + "/dir-tests/chao.md", { validate: false }).then(
      (result) => {
        expect(result).toEqual(mdResults.mdLinksOk);
      }
    );
  });

  test("waiting for object array property: file, href, text, status, statusCode of file chao.md", () => {
    return mdLinks(__dirname + "/dir-tests/chao.md", { validate: true }).then(
      (result) => {
        expect(result).toEqual(mdResults.mdLinksValidateOk);
      }
    );
  });

  test("waiting for error: The route not exist", () => {
    return mdLinks(__dirname + "/dir-tests/no_existe.md").catch((err) => {
      expect(err.toString()).toEqual("The route not exist");
    });
  });

  test("waiting for error: no files found*.md", () => {
    return mdLinks(__dirname + "/dir-js").catch((err) => {
      expect(err.toString()).toEqual("no files found *.md");
    });
  });

  test("waiting for error: no files found  *.md", () => {
    return mdLinks(__dirname + "/dir-js/p.js").catch((err) => {
      expect(err.toString()).toEqual("no files found *.md");
    });
  });
});
