process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require("cluster");

// Is the file being executed in master mode?
if (cluster.isMaster) {
  // Execute index.js again in child mode
  cluster.fork();
  cluster.fork();
} else {
  // Child that acts like a server
  const crypto = require("crypto");
  const express = require("express");
  const app = express();

  app.get("/", (req, res) => {
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
      res.send("Hi there");
    });
  });

  app.get("/fast", (req, res) => {
    res.send("This was fast!");
  });

  app.listen(3000, () => {
    console.log("App is listening on port 3000...");
  });
}
