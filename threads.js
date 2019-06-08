const crypto = require("crypto");

const start = Date.now();
// Sample hashing functions where
// we check how long they will take to run
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("1:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("2:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("3:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("4:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("5:", Date.now() - start);
});

/* These tests show that 
1) the functions are being executed at the same time
2) the functions are being processed in the thread pool of libuv, which contains 4 threads
3) the first 4 function calls are offloaded to the thread pool, completely filling it, which increases the time to process for the CPU
4) the last function, occupying only one thread, is then processed much quicker, but not concurrently
*/
