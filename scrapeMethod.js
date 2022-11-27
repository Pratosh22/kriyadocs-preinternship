const request= require('request');
const fs= require('fs');

//options for the request 
const options={
    //url to be scrapped
    url:'https://www.naukri.com/jobapi/v3/search?noOfResults=20&urlType=search_by_keyword&searchType=adv&keyword=tech stack&pageNo=1&wfhType=3&glbl_qcrc=1028&wfhType=3&glbl_qcrc=1028&seoKey=tech-stack-jobs&src=seo_srp&latLong=12.8996_80.2209',

    //added headers for authentication
    headers:{
        'authority':"www.naukri.com",
        "Connection": "keep-alive",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'",
        "Referer": " https://www.naukri.com/tech-stack-jobs?wfhType=3&glbl_qcrc=1028",
        "appid": "109",
        "authority":"www.naukri.com",
        "systemid":"109",
    },
    //setting the response to json
    json: true,
}

request(options,function(err,response,body){
    if (!err && response.statusCode == 200) {
        fs.appendFileSync("./response.json",JSON.stringify(response.body.jobDetails));
        console.log("written");
    }
    else{
        console.log(err);
    }
});