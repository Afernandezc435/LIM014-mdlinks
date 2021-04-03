const utils = require("./md-links.js");

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    let arrayLinks = [];

    if (!utils.existRoute(path)) {
      reject("The route not exist");
    }

    let route = utils.convertPath(path);
    let isDir = utils.isDirOrFile(route);
    let array = [];
    if (isDir) {
      array = utils.listMardownRecursive(route);
    } else if (utils.isMD(route)) {
      array = [route];
    } else {
      reject("no files found *.md");
    }

    if (array.length === 0) {
      reject("no files found *.md");
    }
    array.forEach((file) => {
      arrayLinks.push(...utils.getLinks(file));
    });

    if (arrayLinks.length === 0) {
      reject("No links");
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
