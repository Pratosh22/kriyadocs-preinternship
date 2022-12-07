const http = require("http");
const { parse } = require("querystring");
const fs = require("fs");
const scrapper = require("./scrapeMethod");

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    const url = req.url;
    if (url === "/") {
      if (req.method === "POST") {
        collectRequestData(req, (result) => {
          console.log(result);
          //async
          scrapper.scrapeMethod(result.location,result.number,res);
        });
      } else {
        console.log("In home");
        //gets the html file and changes to string
        const home = fs.readFileSync("./view/index.html").toString();
        //homepage
        res.end(home);
      }
    }
  })
  .listen(8000);

function collectRequestData(request, callback) {
  const FORM_URLENCODED = "application/x-www-form-urlencoded";
  if (request.headers["content-type"] === FORM_URLENCODED) {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });
    request.on("end", () => {
      callback(parse(body));
    });
  } else {
    callback(null);
  }
}

