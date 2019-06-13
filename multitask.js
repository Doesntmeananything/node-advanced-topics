const https = require("https");
const crypto = require("crypto");
const fs = require("fs");

const start = Date.now();

function doRequest() {
  https
    .request("https://www.google.com", res => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log("HTTPS:", Date.now() - start);
      });
    })
    .end();
}

function doHash() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log("Hash:", Date.now() - start);
  });
}

doRequest();

fs.readFile("multitask.js", "utf8", () => {
  console.log("FS:", Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();

/* Executing the file yields the following results:
  HTTPS: 266
  Hash: 1982
  FS: 1983
  Hash: 2030
  Hash: 2035
  Hash: 2036

  This tells us the following:
  1. HTTPS is executed **outside the threadpool** (as an OS operation), and is this finished first;
  2. FS is executed **within the threadpool**;
  3. As the threadpool is split into 4 threads, it starts processing the function calls, beginning with FS;
  4. However, FS cannot be processed immediately, because it is busy with accessing and reading the file, so the thread is then freed up for another process;
  5. The next Hash call is then executed in the first thread;
  6. The next thread looks if FS is ready to be executed, which is true in this case;
  7. The rest of the tasks are then finished.
*/
