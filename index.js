const utils = require("./md-links.js");

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    let arrayLinks = [];

    if (!utils.existRoute(path)) {
      reject("La ruta ingresada no existe");
    }

    let route = utils.convertPath(path);
    let isDir = utils.isDirOrFile(route);
    let array = [];
    if (isDir) {
      array = utils.listMardownRecursive(route);
    } else {
      array = [route];
    }

    if (array.length === 0) {
      reject("No se encontraron archivos con extensión *.md");
    }
    array.forEach((file) => {
      arrayLinks.push(...utils.getLinks(file));
    });

    if (arrayLinks.length === 0) {
      reject("No hay links");
    }

    if (options && options.validate) {
      utils.validateLinks(arrayLinks).then((result) => {
        resolve(result);
      });
    } else {
      resolve(arrayLinks);
    }
  });
};

module.exports = mdLinks;
