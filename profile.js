//Problem: we need a simple way to look at a user's badge count and javascript points.

//Solution: Use Node.js to connect to treehouse api to get profile information to print out.
var http = require("http");
var https = require("https");


//Print out message
function printMessage(username, badgeCount, points) {
  var message = username + " has "+ badgeCount + " total badge(s) and " + points + " points in JavaScript";
  console.log(message);
}

//Print out error message
function printError(error){
    console.error(error.message);
}

function get(username) {
  //Connect to the API URL (http://teamtreehouse.com/username.json)
  var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response){
    var body = "";
    //Read the Data
    response.on('data', function (chunk) {
        body += chunk;
      });
    response.on('end', function (){
      if(response.statusCode == 200 ) {
        try {
          //Parse the Data
          var profile = JSON.parse(body);
          //Print the Data
          printMessage(username, profile.badges.length, profile.points.JavaScript);
        } catch(error) {
          //Parse Error
          printError(error);
        }
      } else {
        //Status Code Error
        printError({message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
      }
    });
  });

  //Connection Error
  request.on("error", printError)
}



//for this profile module we want to export a function called get
module.exports.get = get;
