const mdLink = require("./md-links.js");

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    let arrayLinks = [];

    if (!mdLink.existRoute(path)) {
      reject("La ruta ingresada no existe");
    }

    let route = mdLink.convertPath(path);
    let isDir = mdLink.isDirOrFile(route);
    let array = [];
    if (isDir) {
      array = mdLink.listMardownRecursive(route);
    } else {
      array = [route];
    }

    if (array.length === 0) {
      reject("No se encontraron archivos con extensión *.md");
    }
    array.forEach((file) => {
      arrayLinks.push(...mdLink.getLinks(file));
    });

    if (arrayLinks.length === 0) {
      reject("No hay links");
    }

    if (!options.validate) {
      resolve(arrayLinks);
    } else {
      mdLink
        .validateLinks(arrayLinks)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err.error);
        });
    }
  });
};

module.exports = mdLinks;

const test = __dirname + "/test";
//constante de prueba para la lectura de archivos

mdLinks(test, { validate: true })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
