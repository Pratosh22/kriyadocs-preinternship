const request = require("request");
const fs = require("fs");
let location = "";
let noOfResults = "";
let pages = "1";
const scanner = require("./sumarryToTxt");

exports.scrapeMethod = function (location, noOfResults, res) {
  //options for the request
  const options = {
    //url to be scrapped
    url: `https://www.naukri.com/jobapi/v3/search?noOfResults=${noOfResults}&urlType=search_by_key_loc&searchType=adv&keyword=information%20technology&location=${location}&pageNo=${pages}&k=information%20technology&l=${location}&seoKey=information-technology-jobs-in-${location}&src=jobsearchDesk&latLong=13.147829334449968_80.06375121999095`,
    //added headers for authentication
    headers: {
      authority: "www.naukri.com",
      Connection: "keep-alive",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'",
      Referer: `https://www.naukri.com/information-technology-jobs-in-${location}?k=information%20technology&l=${location}`,
      appid: "109",
      authority: "www.naukri.com",
      systemid: "109",
    },
    //setting the response to json
    json: true,
  };

  request(options, function (err, response, body) {
    if (!err) {
      //clear files every request
      fs.writeFileSync("./response.json", "");
      fs.writeFileSync("./skillCount.json", "");
      fs.writeFileSync("./rawSkills.txt", "");
      fs.writeFileSync("./regexSkills.txt", "");
      fs.writeFileSync("./filteredSkills.txt", "");

      fs.appendFileSync(
        "./response.json",
        JSON.stringify(response.body.jobDetails)
      );
      console.log("res done");
      //reads the new response file
      const data = fs.readFileSync("./response.json", "utf-8");

      //converts the data to function below
      scanner.getSkills(JSON.parse(data));

      //filters the data
      scanner.getFilteredSkills();

      //rank the skills
      const s = scanner.rankSkills();

      if (s === 1) {
        res.end("No skills found");
      } else {
        //reads the html of the page to display rank skills
        const scrapeHtml = fs
          .readFileSync("./view/scrape.html", "utf-8")
          .toString();

        //stores the skillcount in a variable
        const skillCount = fs.readFileSync("./skillCount.json", "utf-8");

        //converting the json to object
        const skillCountObj = JSON.parse(skillCount);

        //getting the values of object
        const skillCountValues = Object.values(skillCountObj);

        const newArr = [].concat(...skillCountValues);

        //extract the numbers from new array and store in a new array
        const numbers = newArr.filter((item) => {
          return typeof item === "number";
        });

        //variable to store the html
        let skillCountString = "";

        //looping through the keys and values and storing in a string
        for (let i = 0; i < numbers.length; i++) {
          skillCountString += `<li>${newArr[i * 2]} : ${numbers[i]}</li>`;
        }

        const newBody = scrapeHtml.replace("${SKILLS}", skillCountString);

        res.end(newBody);
      }
    }
  });
};
