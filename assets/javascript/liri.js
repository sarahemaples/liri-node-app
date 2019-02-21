require("dotenv").config();
const axios = require("axios");
var moment = require("moment");

var keys = require("./key")
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: "y1a99482f90264d02abee261614c62ceb",
    secret: "279605414e724bbf87eeb408ccc4169f"
});

// grab user args
var action = process.argv[2];
var name = process.argv[3];

// call userWantsTo function to get this ball rolling
userWantsTo(action, name);

// function takes in the action the user wants to perform then
// calls proper function to complete execution
function userWantsTo(action, name){
    switch(action){
        case 'concert-this':
            concertThis(name);
        case 'spotify-this-song':
            spotifyThis(name);
        case 'movie-this':
        case 'do-what-it-says':
    }
}

//----------------------------------------------------
// BANDS IN TOWN CODE
//----------------------------------------------------
// executes if user requests 'concert-this'
function concertThis(name){
    // search Bands in Town api for band name
    axios.get("https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp&date=upcoming")
    .then(function (response) {
        // format response nicely
        response.data.forEach(function(e){
            console.log("------------------------------------");
            console.log(e.venue.name);
            console.log(e.venue.city, response.data[0].venue.region);
            console.log(moment(e.datetime).format("MM/DD/YYYY"));
            console.log("------------------------------------");
        })
    })
    // catch/log any errors
    .catch(function (error) {
        console.log(error);
    });

}
//----------------------------------------------------
// SPOTIFY CODE
//----------------------------------------------------
// executes if user requests 'spotify-this-song'
function spotifyThis(name){
    spotify.search({ 
        type: 'track', 
        query: 'All the Small Things' 
    }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data); 
});
}


//----------------------------------------------------
// STUFF TO HELP WITH SPOTIFY API BELOW

// https://www.npmjs.com/package/node-spotify-api
