const mdLinks = require("../index.js");

describe("función mdLink  para convertir ruta relativa a absoluta", () => {
  it("is a functión", () => {
    expect(typeof mdLinks.convertPath).toBe("function");
  });

  it("error al cambiar de ruta", () => {
    expect(mdLinks.convertPath()).toBe("error");
  });
});
describe("funcion existFile para validar que archivo o directorio existan ", () => {
  test(`Se espera que retorne ./test/dir-tests`, () => {
    expect(mdLinks.existFile("./test/dir-tests")).toBe("./test/dir-tests");
  });
  test(`Se espera que retorne "El archivo o directorio no existen"`, () => {
    expect(mdLinks.existFile("./test/dir-tests/pizza")).toBe(
      "El archivo o directorio no existen"
    );
  });
});
describe("función existRoute para validar la existencia de la ruta ", () => {
  test(`Se espera que retorne ./test/dir-tests`, () => {
    expect(mdLinks.existRoute("./test/dir-tests")).toBe("./test/dir-tests");
  });
  test(`Se espera que retorne "La ruta ingresada no existe"`, () => {
    expect(mdLinks.existRoute("./test/dir-tests/pizza")).toBe(
      "La ruta ingresada no existe"
    );
  });
});
describe("Función isDirOrFile para verificar que sea un archivo o un directorio ", () => {
  test(`Se espera que retorne ./test/dir-tests`, () => {
    expect(mdLinks.isDirOrFile("./test/dir-tests")).toBe(
      "La ruta ingresada es un directorio:./test/dir-tests"
    );
  });
  test(`Se espera que retorne "La ruta ingresada es un archivo"`, () => {
    expect(mdLinks.isDirOrFile("./test/dir-tests/chao.md")).toBe(
      "La ruta ingresada es un archivo"
    );
  });
  test(`Se espera que retorne "La ruta ingresada es un directorio"`, () => {
    expect(mdLinks.isDirOrFile("./test/dir-tests")).toBe(
      "La ruta ingresada es un directorio"
    );
  });
});
