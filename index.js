const fs = require("fs");
const fetch = require("node-fetch");
const path = require("path");
//constante con un objeto vacio para llevarlo a los test
const mdLinks = {};

//función que verifica la ruta ingresada
const existRoute = (route) => {
  return fs.existsSync(route);
};

//para convertir ruta de relativa a absoluta
const convertPath = (pathRoute) => {
  return path.resolve(pathRoute);
};

//para validar si es un archivo o un directorio
const isDirOrFile = (test) => {
  const isDir = fs.statSync(test);
  return isDir.isDirectory();
};

//función para recorrer un directorio y encontrar archivo .md
const listMardownRecursive = (route) => {
  const files = [];
  const directory = fs.readdirSync(route);

  const filterFile = directory.filter((file) => path.extname(file) === ".md");
  filterFile.forEach((elem) => {
    const validFiles = path.join(route, elem);
    files.push(validFiles);
  });

  const filterDir = directory.filter((dir) =>
    isDirOrFile(path.join(route, dir))
  );
  filterDir.forEach((dir) => {
    const arr = listMardownRecursive(path.join(route, dir));
    files.push(...arr);
  });

  return files;
};

//funcion para extraer los links
const getLinks = (route) => {
  const linksArray = [];
  const md = fs.readFileSync(route).toString();

  const regex = /!*\[(.+?)\]\((.+?)\)/gi; // Mediante una expresión regular le decimos que extraiga los links que esten dentro de los corchetes y los parentesis
  const textRegex = /\[(\w+.+?)\]/gi; // Solo lo que se encuentre dentro de los corchetes
  const urlRegex = /\((\w+.+?)\)/gi; // Solo lo que se encuentre dentro de los parentesis

  let links = md.match(regex);

  links.forEach((link) => {
    let onlyString = link
      .match(textRegex)[0]
      .substring(1, link.match(textRegex)[0].length - 1);

    let onlyUrl = link
      .match(urlRegex)[0]
      .substring(1, link.match(urlRegex)[0].length - 1);

    linksArray.push({
      text: onlyString,
      url: onlyUrl,
      file: route,
    });
  });

  return linksArray;
};

mdLinks.convertPath = convertPath;
mdLinks.existRoute = existRoute;
mdLinks.isDirOrFile = isDirOrFile;
mdLinks.listMardownRecursive = listMardownRecursive;
mdLinks.getLinks = getLinks;

module.exports = mdLinks;

/* TESTS */
//constante de prueba
const test = __dirname + "/test";
//constante de prueba para la lectura de archivos
const readFile = test + "/dir-tests/chao.md";
//constante de prueba para la lectura de archivcos y obtener los links
const fileHtml = "hola.html";

console.log("Exist Route: ", existRoute(test));
console.log("Is directory: ", isDirOrFile(test));
console.log(convertPath(test));

let arr = listMardownRecursive(test);
console.log("MD Files: ", arr);
console.log("GetLinks: ", getLinks(readFile));
/*
if (arr.length === 0) {
  // error return
} else {
  let links = [];
  arr.forEach((file) => {
    links.push(...getLinks(file));
  });
  console.log(links);
}
*/
