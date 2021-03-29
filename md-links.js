const { rejects } = require("assert");
const fs = require("fs");
const fetch = require("node-fetch");
const { resolve } = require("path");
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
      href: onlyUrl,
      file: route,
    });
  });

  return linksArray;
};
//Imprime en terminal links validos y erroneos
const validateLinks = (links, options = {}) => {
  return new Promise((resolve, reject) => {
    let fetchLinks = links.map((elem) => {
      return fetch(elem.href)
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            elem.status = "OK";
            elem.statusCode = res.status;
          } else {
            elem.status = "FAIL";
            elem.statusCode = res.status;
          }
        })
        .catch((err) => {
          elem.status = "FAIL";
          elem.statusCode = 500;
        });
    });

    Promise.all(fetchLinks).then((res) => {
      resolve(links);
    });
  });
};
//funcion que totaliza el stats de links
function stats(linksArray) {
  let href = [];
  Object.values(linksArray).forEach((linksArray) => {
    href.push(linksArray.href);
  });
  let uniqueLinks = [...new Set(href)];

  let brokenLinks = linksArray.filter((link) => link.status === "FAIL");
  let stats = {
    unique: uniqueLinks.length,
    broken: brokenLinks.length,
  };
  return stats;
}

mdLinks.existRoute = existRoute;
mdLinks.convertPath = convertPath;
mdLinks.isDirOrFile = isDirOrFile;
mdLinks.listMardownRecursive = listMardownRecursive;
mdLinks.getLinks = getLinks;
mdLinks.validateLinks = validateLinks;
mdLinks.stats = stats;

module.exports = mdLinks;
