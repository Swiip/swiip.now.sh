const { join } = require("path");
const { remove, copy } = require("fs-extra");

const sourcePath = join(__dirname, "../client");
const distPath = join(__dirname, "../../dist");

const run = async () => {
  await remove(distPath);
  await copy(sourcePath, distPath, {
    filter: path => {
      const keep = !path.endsWith("package.json");
      if (keep) {
        console.log("copying", path, "to", distPath);
      }
      return keep;
    }
  });
};

run();
