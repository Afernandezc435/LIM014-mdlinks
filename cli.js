const mdLinks = require("./index.js");
const utils = require("./md-links.js");
const { Command, option } = require("commander");

const chalk = require("chalk");

const program = new Command();
program.option(
  "-v, --validate",
  "to validate the links inside of a markdown file",
  false
);
program.option(
  "-s, --stats",
  "to show basic stats about the links (total of links and unique ones)",
  false
);

program.parse(process.argv);
let options = {
  validate: program._optionValues.validate,
  stats: program._optionValues.stats,
};

mdLinks(process.argv[1], {
  validate: options.validate,
}).then((links) => {
  if (options.stats) {
    let stats = utils.stats(links);
    console.log("Total: ", links.length);
    console.log("Unique: ", stats.unique);
    if (options.validate) {
      console.log("Broken: ", stats.broken);
    }
  } else {
    links.forEach((link) => {
      console.log(
        `${link.file} ${chalk.blue(link.href)} ${
          options.validate
            ? link.status === "OK"
              ? chalk.green(link.status) + " " + link.statusCode
              : chalk.red(link.status) + " " + link.statusCode
            : ""
        } ${link.text}`
      );
    });
  }
});
