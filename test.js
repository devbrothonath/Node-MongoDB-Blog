const fs = require("fs");

// read file
fs.readFile("./docs/hello.txt", (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data.toString());
});

console.log("last line");

// write file
fs.writeFile("./docs/hello1.txt", "minasan, ohayo. genki desu ka?", () => {
  console.log("file written");
});

// directories
if (!fs.existsSync("./img")) {
  fs.mkdir("./img", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("dir created");
  });
}
