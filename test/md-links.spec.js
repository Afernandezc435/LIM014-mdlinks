const mdLinks = require("../index.js");
const mdResults = require("./md-links-mocks.js");

describe("función convertPath  para convertir ruta relativa a absoluta", () => {
  test("is a functión", () => {
    expect(typeof mdLinks.convertPath).toBe("function");
  });
  test(`Se espera que retorne true`, () => {
    expect(mdLinks.convertPath("./test/dir-tests")).toBe(
      __dirname + "/dir-tests"
    );
  });
});

describe("función existRoute para validar la existencia de la ruta ", () => {
  test("is a functión", () => {
    expect(typeof mdLinks.existRoute).toBe("function");
  });
  test("Se espera que retorne" + __dirname + "/dir-tests", () => {
    expect(mdLinks.existRoute(__dirname + "/dir-tests")).toBe(true);
  });
  test(`Se espera que retorne "La ruta ingresada no existe"`, () => {
    expect(mdLinks.existRoute(__dirname + "/dir-tests/pizza")).toBe(false);
  });
});

describe("Función isDirOrFile para verificar que sea un archivo o un directorio ", () => {
  test("is a functión", () => {
    expect(typeof mdLinks.isDirOrFile).toBe("function");
  });
  test(`Se espera que retorne true`, () => {
    expect(mdLinks.isDirOrFile(__dirname + "/dir-tests")).toBe(true);
  });
  test(`Se espera que retorne true`, () => {
    expect(mdLinks.isDirOrFile(__dirname + "/dir-tests/chao.md")).toBe(false);
  });
});

describe("función listMardownRecursive para recorrer un directorio y encontrar archivo .md ", () => {
  test("is a functión", () => {
    expect(typeof mdLinks.listMardownRecursive).toBe("function");
  });
  test(`Se espera que retorne ./test/dir-tests`, () => {
    expect(mdLinks.listMardownRecursive(__dirname + "/dir-tests")).toEqual(
      mdResults.listMardownRecursiveOk
    );
  });
  test(`Se espera que retorne un arreglo vacio`, () => {
    expect(mdLinks.listMardownRecursive(__dirname + "/dir-js")).toEqual([]);
  });
});

describe("función getLinks extraer los links de un archivo .md ", () => {
  test("is a functión", () => {
    expect(typeof mdLinks.getLinks).toBe("function");
  });
  test(`Se espera que retorne un arreglo de objetos con todos los links encontrados`, () => {
    expect(mdLinks.getLinks(__dirname + "/dir-tests/chao.md")).toEqual(
      mdResults.getLinksOk
    );
  });
});
