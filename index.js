const marked = require("marked");
const fs = require("fs");
const FileHound = require("filehound");
const fetch = require("node-fetch");
const path = require("path");
const { resolve } = require("path");
const { statsAndValidateLinks } = require("./user");

//Constante para obtener el directorio actual
const directorio = process.cwd();
//constante con un objeto vacio, para llevarlo a los test
const mdLinks = {};
//constante de prueba
const test = "./test/dir-tests";
//constante de prueba para la lectura de archivos
const readFile = "README.md";
//constante de prueba para la lectura de archivcos y obtener los links
const fileHtml = "hola.html";
//función que verifica la ruta ingresada
const existRoute = (route) =>
  fs.existsSync(route) ? route : "La ruta ingresada no existe";
//para convertir ruta de relativa a absoluta
const convertPath = (pathRoute) => {
  try {
    return path.resolve(pathRoute);
  } catch (err) {
    return "error";
  }
};
console.log(convertPath(directorio));
//para validar si archivo o directorio existen
const existFile = (route) =>
  fs.existsSync(route) ? route : "El archivo o directorio no existen";
console.log(existFile(test));

//para validar si es un archivo o un directorio
const isDirOrFile = (test) => {
  const isDir = fs.statSync(test);
  return isDir.isFile()
    ? "La ruta ingresada es un archivo" + test
    : "La ruta ingresada es un directorio:" + test;
};
console.log(isDirOrFile(test));
//función para recorrer un directorio y encontrar archivo .md

mdLinks.convertPath = convertPath;
mdLinks.existFile = existFile;
mdLinks.existRoute = existRoute;
mdLinks.isDirOrFile = isDirOrFile;
module.exports = mdLinks;
