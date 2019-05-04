const { resolve, relative, dirname, join } = require("path");
const { readFile, writeFile, ensureDir, copy, remove } = require("fs-extra");

const clientDistPath = resolve(__dirname, "../client/dist");
const clientPublicPath = resolve(__dirname, "../client/public");
const clientPackagePath = resolve(__dirname, "../client/package.json");
const clientImportsPath = resolve(__dirname, "../client/dist/imports");
const rootPath = resolve(__dirname, "../..");

const copyFrontPublic = async () => {
  console.log("Copying front public files to dist...");
  await remove(clientDistPath);
  await ensureDir(clientDistPath);
  await copy(clientPublicPath, clientDistPath);
  console.log("Copy ok!");
};

const importDestPath = importKey =>
  resolve(clientImportsPath, `${importKey}.js`);

const relativeIportDestPath = importKey =>
  relative(clientDistPath, importDestPath(importKey));

const copyOneVendor = async (importKey, imports) => {
  const filePath = join(rootPath, imports[importKey]);
  let content = (await readFile(filePath)).toString();
  Object.keys(imports)
    .filter(key => importKey !== key)
    .forEach(key => {
      content = content.replace(
        new RegExp(`(from\\s*["'])${key}(["'])`),
        `$1/${relativeIportDestPath(key)}$2`
      );
    });
  const destPath = importDestPath(importKey);
  await ensureDir(dirname(destPath));
  console.log(
    "Copy",
    imports[importKey],
    "to",
    relativeIportDestPath(importKey)
  );
  return writeFile(destPath, content);
};

const copyFrontVendor = async () => {
  console.log("Copying front libs to client imports dir...");
  const clientPackageString = await readFile(clientPackagePath);
  const clientPackage = JSON.parse(clientPackageString);
  await ensureDir(clientImportsPath);
  const copies = Object.keys(clientPackage.imports).map(importKey =>
    copyOneVendor(importKey, clientPackage.imports)
  );
  await Promise.all(copies);
  console.log("Copy ok!");
};

copyFrontPublic().then(copyFrontVendor);
