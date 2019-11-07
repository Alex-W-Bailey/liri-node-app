require("dotenv").config();

const keys = require("./keys.js");
const axios = require('axios');
const Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var argv = process.argv;
var action = argv[2];

var userInput = "";

if(argv.length > 3){
    for(var i = 3; i < argv.length; i++){
        userInput += argv[i] + " ";
    }
}


switch(action){
    case "concert-this":
        concertThis();
        break;
    case "spotify-this":
        spotifyThis();
        break;
    case "movie-this":
        movieThis();
        break;

}

if(action === "concert-this"){
    concertThis();
}
else if(action === "spotify-this"){
    spotifyThis();
}

function concertThis(){
    var artistName = userInput.trim();
    console.log(artistName);

    var concertURL = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

    axios.get(concertURL)
    .then(function(response){
        var venueName = response.data[0].venue.name;
        var venueLoc = response.data[0].venue.city + ", " + response.data[0].venue.region;
        var uglyDate = response.data[0].datetime;
        var betterDate = uglyDate.split("T");
        var cleanDate = betterDate[0].split("-");
    
        var uglyTime = betterDate[1].split(":");
        var betterTime = parseInt(uglyTime);

        var timeInt = 0;

        if(betterTime > 12){
            timeInt = betterTime - 12;
        }
        else{
            timeInt = betterTime;
        }


        console.log(cleanDate[1] + "/" + cleanDate[2] + "/" + cleanDate[0]);

        console.log(`
NEXT CONCERT
____________

${venueName}
${venueLoc}
${cleanDate[1] + "/" + cleanDate[2] + "/" + cleanDate[0]} @ ${timeInt + ":00 PM"}

        `);
    })
    .catch(function(error){
        console.log("Error...");
    })
}

function spotifyThis(){
    spotify.search({type: 'track', query: userInput})
    .then(function(response){
        var dataRef = response.tracks.items[0];
        var artist = dataRef.artists[0].name;
        var songName = userInput;
        var previewLink = dataRef.external_urls.spotify;
        var album = dataRef.album.name

        console.log(`
SONG INFO
_________

Artist: ${artist}
Song: ${songName}
Preview: ${previewLink}
Album: ${album}
        `)
    })
    .catch(function(err){
        console.log(err);
    })
}

function movieThis(){
    var apiKey = keys.ombd.key;

    console.log("API Key: " + apiKey);

    axios.get(`http://www.omdbapi.com/?t=${userInput}&apikey=${apiKey}`)
    .then(function(response){
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
      });
}

