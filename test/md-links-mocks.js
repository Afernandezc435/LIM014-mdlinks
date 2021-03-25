const mdResults = {
  listMardownRecursiveOk: [
    __dirname + "/dir-tests/chao.md",
    __dirname + "/dir-tests/hola.md",
  ],
  listMardownRecursiveError: [],
  getLinksOk: [
    {
      text: "NPM",
      url: "https://docs.npmmmmjs.com/getting-started/what-is-npm",
      file: __dirname + "/dir-tests/chao.md",
    },
    {
      text: "NPM",
      url: "https://nodejs.org/api/paths.html",
      file: __dirname + "/dir-tests/chao.md",
    },
    {
      text: "md-links",
      url:
        "https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg",
      file: __dirname + "/dir-tests/chao.md",
    },
  ],
};

module.exports = mdResults;
