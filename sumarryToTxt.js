const stopWords = require('stopword');
const json=require('./response.json');
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
const getSkills=(json)=>{

//fetching the tags and skills from response json
for(let i=0;i<json.length;i++){
  fs.appendFileSync('./outputFiles/summary.txt',json[i].tagsAndSkills);
}

//reading the text file of tags and skills fetched
const Data=fs.readFileSync('./outputFiles/summary.txt','utf-8');

//removing all punctuation and stopwords and storing in a new variable
const newData=Data.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
.replace(/\s{2,}/g, " ").toLowerCase();

//writing the new data to a new file
fs.appendFileSync('./outputFiles/newData.txt',newData);
console.log("Done!")
}

//filter skills using dictionary
const getFilteredSkills=()=>{
  
  //gets the unfiltered skills
  const rawSkills=fs.readFileSync('./outputFiles/newData.txt','utf-8');
  
  //filters the skills using regex
  let skills = [
    ...rawSkills
      .toString()
      .match(new RegExp(`\\b(${skillDict.join("|")})\\b`, "gi")), // Extracts the skills from text
  ];

  console.log(skills);

  //writes the filtered skills to a file
  fs.writeFileSync("./outputFiles/skills.txt", skills.join(" ").toLowerCase());
}

const rankSkills=()=>{
  const skills=fs.readFileSync('./outputFiles/skills.txt','utf-8');
  const skillCount={};
  skills.split(' ').forEach((skill)=>{
    if(skillCount[skill]){
      skillCount[skill]++;
    }
    else{
      skillCount[skill]=1;
    }
  })
  console.log(skillCount);
  fs.writeFileSync("./outputFiles/skillCount.txt",JSON.stringify(skillCount));
}


getSkills(json);
getFilteredSkills();
rankSkills();



