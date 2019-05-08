const { resolve } = require("path");
const { ensureDir, copy, remove } = require("fs-extra");

const clientDistPath = resolve(__dirname, "../client/dist");
const clientPublicPath = resolve(__dirname, "../client/public");

const copyFrontPublic = async () => {
  console.log("Copying front public files to dist...");
  await remove(clientDistPath);
  await ensureDir(clientDistPath);
  await copy(clientPublicPath, clientDistPath);
  console.log("Copy ok!");
};

copyFrontPublic();
