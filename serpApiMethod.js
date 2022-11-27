const SerpApi = require("google-search-results-nodejs");
const dotenv= require('dotenv');
const fs = require("fs");

dotenv.config({ path: "./config.env" });
const search = new SerpApi.GoogleSearch(
  process.env.API_KEY,
);

//params for serp api request
const params = {
  device: "desktop",
  engine: "google_jobs",
  google_domain: "google.co.in",
  q: "nodejs python ai/ml",
  hl: "en",
  gl: "in",
  location: "Tamil Nadu, India",
};


// Show result as JSON
search.json(params, function (data) {
  //callback
  for (let i = 0; i < data.jobs_results.length; i++) {
    fs.appendFileSync("./outputFiles/serp.txt", data.jobs_results[i].description);
    // console.log(data.jobs_results[i].description);
  }
});

