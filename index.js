const cluster = require("cluster");
const express = require("express");
const app = express();

// Is the file being executed in master mode?
if (cluster.isMaster) {
  // Execute again in child mode
  cluster.fork();
} else {
  // Child that acts like a server
  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  }

  app.get("/", (req, res) => {
    doWork(5000);
    res.send("Hi there");
  });

  app.listen(3000, () => {
    console.log("App is listening on port 3000...");
  });
}
