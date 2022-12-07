const stopWords = require('stopword');
const fs=require('fs');

const skillDict=["Java",
"ReactJS",
"MySQL",
"php",
"MongoDB",
"Redux",
"Angular",
"webdevelopment",
"Javascript",
"backend",
"python",
"nodejs",
"AI",
"ML",
"ArtificialIntelligence",
"MachineLearning",
"Deeplearning",
"flutter",
"css",
"html",
"js",
"nosql",
];

//getting skiils from response json
exports.getSkills=(json)=>{

//fetching the tags and skills from response json
for(let i=0;i<json.length;i++){
  fs.appendFileSync('./rawSkills.txt',json[i].tagsAndSkills);
}

//reading the text file of tags and skills fetched
const Data=fs.readFileSync('./rawSkills.txt','utf-8');

//removing all punctuation and stopwords and storing in a new variable
const newData=Data.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
.replace(/\s{2,}/g, " ").toLowerCase();

//writing the new data to a new file

fs.writeFileSync("./regexSkills.txt", "");
fs.appendFileSync('./regexSkills.txt',newData);
console.log("Done getSkills!")

//filter skills using dictionary
exports.getFilteredSkills=()=>{
  
  //gets the unfiltered skills
  const rawSkills=fs.readFileSync('./regexSkills.txt','utf-8');
  
  //filters the skills using regex

  let skills = [
    ...rawSkills
      .toString()
      .match(new RegExp(`\\b(${skillDict.join("|")})\\b`, "gi")), // Extracts the skills from text
  ];

  //writes the filtered skills to a file
  fs.writeFileSync("./filteredSkills.txt", "");
  fs.appendFileSync("./filteredSkills.txt", skills.join(" ").toLowerCase());
  console.log("Done filteredskills")
}

//rank the skills based on frequency
exports.rankSkills=()=>{
  const skills=fs.readFileSync('./filteredSkills.txt','utf-8');

  //splitting the skills into an array
  const skillCount={};
  skills.split(' ').forEach((skill)=>{
    
    if(skillCount[skill]){
      skillCount[skill]++;
    }
    else{
      skillCount[skill]=1;
    }
  });

  //rank the skills based on frequency
  fs.writeFileSync("./skillcount.json", "");

  //sorting the skills based on frequency
  const rankedSkills=Object.entries(skillCount).sort((a,b)=>b[1]-a[1]);
  fs.appendFileSync("./skillCount.json",JSON.stringify(rankedSkills));
  console.log("Ranked");
}
}
// getSkills(json);
// getFilteredSkills();
// rankSkills();



