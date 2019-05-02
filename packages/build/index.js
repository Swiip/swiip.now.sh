const { join } = require("path");
const { readFile, ensureDir, copy, remove } = require("fs-extra");

const clientDistPath = join(__dirname, "../client/dist");
const clientPublicPath = join(__dirname, "../client/public");
const clientPackagePath = join(__dirname, "../client/package.json");
const clientVendorPath = join(__dirname, "../client/dist/vendor");
const nodeModulesPath = join(__dirname, "../../node_modules");

const copyFrontPublic = async () => {
  console.log("Copying front public files to dist...");
  await remove(clientDistPath);
  await ensureDir(clientDistPath);
  await copy(clientPublicPath, clientDistPath);
  console.log("Copy ok!");
};

const copyFrontVendor = async () => {
  console.log("Copying front libs to client vendor dir...");
  const clientPackageString = await readFile(clientPackagePath);
  const clientPackage = JSON.parse(clientPackageString);
  const dependencies = Object.keys(clientPackage.dependencies);
  await ensureDir(clientVendorPath);
  const copies = dependencies.map(dependency =>
    copy(join(nodeModulesPath, dependency), join(clientVendorPath, dependency))
  );
  await Promise.all(copies);
  console.log("Copy ok!");
};

copyFrontPublic().then(copyFrontVendor);
