const mdResults = {
  inputValidateLinks: [
    {
      text: "NPM",
      href: "https://nodejs.org/api/paths.html",
      file: "/home/yami/apps/LIM014-mdlinks/test/dir-tests/chao.md",
    },
  ],
  listMardownRecursiveOk: [
    __dirname + "/dir-tests/chao.md",
    __dirname + "/dir-tests/hola.md",
  ],
  listMardownRecursiveError: [],
  getLinksOk: [
    {
      text: "NPM",
      href: "https://docs.npmmmmjs.com/getting-started/what-is-npm",
      file: __dirname + "/dir-tests/chao.md",
    },
    {
      text: "NPM",
      href: "https://nodejs.org/api/paths.html",
      file: __dirname + "/dir-tests/chao.md",
    },
    {
      text: "md-links",
      href:
        "https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg",
      file: __dirname + "/dir-tests/chao.md",
    },
  ],
  validateLinksOk: [
    {
      text: "NPM",
      href: "https://nodejs.org/api/paths.html",
      file: "/home/yami/apps/LIM014-mdlinks/test/dir-tests/chao.md",
      statusCode: 404,
      status: "Not Found",
    },
  ],
  arrayOfExample: [
    {
      text: "NPM",
      href: "https://docs.npmmmmjs.com/getting-started/what-is-npm",
      file: "/home/yami/apps/LIM014-mdlinks/test/dir-tests/chao.md",
      status: "FAIL",
      statusCode: 500,
    },
    {
      text: "NPM",
      href: "https://nodejs.org/api/paths.html",
      file: "/home/yami/apps/LIM014-mdlinks/test/dir-tests/chao.md",
      status: "FAIL",
      statusCode: 404,
    },
    {
      text: "md-links",
      href:
        "https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg",
      file: "/home/yami/apps/LIM014-mdlinks/test/dir-tests/chao.md",
      status: "OK",
      statusCode: 200,
    },
    {
      text: "Leer un directorio",
      href:
        "https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback",
      file: "/home/yami/apps/LIM014-mdlinks/test/dir-tests/hola.md",
      status: "OK",
      statusCode: 200,
    },
    {
      text: "Path",
      href: "https://nodejs.org/api/path.html",
      file: "/home/yami/apps/LIM014-mdlinks/test/dir-tests/hola.md",
      status: "OK",
      statusCode: 200,
    },
  ],
};

module.exports = mdResults;
