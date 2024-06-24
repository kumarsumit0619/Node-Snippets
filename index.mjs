import { readFile, readFileSync, writeFile, writeFileSync } from "fs";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
// import { URL } from "url";
//////////////////////////////////////////////
// Files
//Blocking code
/*
const textIn = readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);
const textOut = `This is something about avocado: ${textIn}`;
writeFileSync("./txt/output.txt", textOut);
*/

//Non Blockibng Code
// readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   readFile(`./tx  t/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);
//       writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("your file has been written ✌✌😎");
//       });
//     });
//   });
// });
// console.log("Reading still...");

//////////////////////////////////////////////
// SERVER

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = readFileSync(`${__dirname}/dev-data/data.json`, "utf-8"); //"./dev-data/data.json"
const dataObj = JSON.parse(data);

const server = createServer((req, res) => {
  const pathName = req.url;
  console.log(req.url);

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW");
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world-header",
    });
    res.end("<h1>Page not found</h1>");
  }
  //   res.end("Hello from the server!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
