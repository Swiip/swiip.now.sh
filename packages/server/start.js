const http = require("http");

const app = require("./index");

const server = http.createServer({}, app);

server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000/");
});
