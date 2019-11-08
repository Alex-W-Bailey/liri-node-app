require("dotenv").config();

const keys = require("./keys.js");
const axios = require('axios');
const fs = require('fs');
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

doAction(action, userInput);

function doAction(doThisAction, item){
    switch(doThisAction){
        case "concert-this":
            concertThis(item);
            break;
        case "spotify-this":
            spotifyThis(item);
            break;
        case "movie-this":
            movieThis(item);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break
    };
}


function concertThis(item){
    var artistName = item.trim();
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

function spotifyThis(item){
    spotify.search({type: 'track', query: item})
    .then(function(response){
        var dataRef = response.tracks.items[0];
        var artist = dataRef.artists[0].name;
        var songName = item;
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

function movieThis(item){
    var apiKey = keys.ombd.key;

    axios.get(`http://www.omdbapi.com/?t=${item}&apikey=${apiKey}`)
    .then(function(response){
        var movieDataRef = response.data;

        var title = movieDataRef.Title;
        var year = movieDataRef.Year.Value;
        var IMBD_Rating = movieDataRef.Ratings[0].Value;
        var Rotten_Rating = movieDataRef.Ratings[1].Value;
        var country = movieDataRef.Country;
        var lang = movieDataRef.Language;
        var plot = movieDataRef.Plot;
        var actors = movieDataRef.Actors;

        console.log(`
Movie Info
__________

Name: ${title}
Released: ${year}
IMBD Rating: ${IMBD_Rating}
Rotten Tomatoes: ${Rotten_Rating}
Country: ${country}
Language: ${lang}
Plot: ${plot}
Actors: ${actors}
        `)

    })
    .catch(function (error) {
        console.log(error);
      });
}

function doWhatItSays(){
    var text = fs.readFileSync('random.txt','utf8')
    
    //gets the action and the item from the random.txt file
    var actionAndItem = text.split(",");
    var action = actionAndItem[0];
    var item = actionAndItem[1];

    //do whatever the file says
    doAction(action, item);
}

