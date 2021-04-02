const utils = require("../md-links.js");
const mdLinks = require("../index.js");
const mdResults = require("./md-links-mocks.js");

describe("función convertPath  para convertir ruta relativa a absoluta", () => {
  test("is a functión", () => {
    expect(typeof utils.convertPath).toBe("function");
  });
  test(`Se espera que retorne true`, () => {
    expect(utils.convertPath("./test/dir-tests")).toBe(
      __dirname + "/dir-tests"
    );
  });
});

describe("función existRoute para validar la existencia de la ruta ", () => {
  test("is a functión", () => {
    expect(typeof utils.existRoute).toBe("function");
  });
  test("Se espera que retorne" + __dirname + "/dir-tests", () => {
    expect(utils.existRoute(__dirname + "/dir-tests")).toBe(true);
  });
  test(`Se espera que retorne "La ruta ingresada no existe"`, () => {
    expect(utils.existRoute(__dirname + "/dir-tests/pizza")).toBe(false);
  });
});

describe("Función isDirOrFile para verificar que sea un archivo o un directorio ", () => {
  test("is a functión", () => {
    expect(typeof utils.isDirOrFile).toBe("function");
  });
  test(`Se espera que retorne true`, () => {
    expect(utils.isDirOrFile(__dirname + "/dir-tests")).toBe(true);
  });
  test(`Se espera que retorne true`, () => {
    expect(utils.isDirOrFile(__dirname + "/dir-tests/chao.md")).toBe(false);
  });
});

describe("función listMardownRecursive para recorrer un directorio y encontrar archivo .md ", () => {
  test("is a functión", () => {
    expect(typeof utils.listMardownRecursive).toBe("function");
  });
  test(`Se espera que retorne ./test/dir-tests`, () => {
    expect(utils.listMardownRecursive(__dirname)).toEqual(
      mdResults.listMardownRecursiveOk
    );
  });
  test(`Se espera que retorne ./test/dir-tests`, () => {
    expect(utils.listMardownRecursive(__dirname + "/dir-tests")).toEqual(
      mdResults.listMardownRecursiveDirTestOk
    );
  });
  test(`Se espera que retorne un arreglo vacio`, () => {
    expect(utils.listMardownRecursive(__dirname + "/dir-js")).toEqual([]);
  });
});

describe("función getLinks extraer los links de un archivo .md ", () => {
  test("is a functión", () => {
    expect(typeof utils.getLinks).toBe("function");
  });
  test(`Se espera que retorne un arreglo de objetos con todos los links encontrados`, () => {
    expect(utils.getLinks(__dirname + "/dir-tests/chao.md")).toEqual(
      mdResults.getLinksOk
    );
  });
});

describe("función validateLinks consulta y valida los links de un array de objetos con propiedad url, text, file", () => {
  test(`Se espera que retorne 404 para https://nodejs.org/api/paths.html`, () => {
    return utils.validateLinks(mdResults.inputValidateLinks).then((res) => {
      expect(res).toBe(mdResults.inputValidateLinks);
    });
  });
  test(`Se espera que retorne Ok para https://docs.npmmmmjs.com/getting-started/what-is-npm`, () => {
    return utils.validateLinks(mdResults.getLinksOk).then((res) => {
      expect(res).toBe(mdResults.getLinksOk);
    });
  });
});
describe("función stats que totaliza el stats de los links", () => {
  test(`Se espera 3 para arrayOfExample `, () => {
    expect(utils.stats(mdResults.arrayOfExample)).toEqual({
      broken: 2,
      unique: 5,
    });
  });
});
/***** TEST FUNCTIÓN MDLINKS API *****/
describe("mdLinks debería ser una función", () => {
  it("es una función", () => {
    expect(typeof mdLinks).toBe("function");
  });

  test("debería retornar un array de objetos con las propiedades: file, href y text del archivo chao.md", () => {
    return mdLinks(__dirname + "/dir-tests/chao.md").then((result) => {
      expect(result).toEqual(mdResults.mdLinksOk);
    });
  });

  test("debería retornar un array de objetos con las propiedades: file, href y text del archivo chao.md", () => {
    return mdLinks(__dirname + "/dir-tests/chao.md", { validate: false }).then(
      (result) => {
        expect(result).toEqual(mdResults.mdLinksOk);
      }
    );
  });

  test("debería retornar un array de objetos con las propiedades: file, href, text, status, statusCode del archivo chao.md", () => {
    return mdLinks(__dirname + "/dir-tests/chao.md", { validate: true }).then(
      (result) => {
        expect(result).toEqual(mdResults.mdLinksValidateOk);
      }
    );
  });

  test("debería retornar el error: La ruta ingresada no existe", () => {
    return mdLinks(__dirname + "/dir-tests/no_existe.md").catch((err) => {
      expect(err.toString()).toEqual("La ruta ingresada no existe");
    });
  });

  test("debería retornar el error: No se encontraron archivos con extensión *.md", () => {
    return mdLinks(__dirname + "/dir-js").catch((err) => {
      expect(err.toString()).toEqual(
        "No se encontraron archivos con extensión *.md"
      );
    });
  });
});
