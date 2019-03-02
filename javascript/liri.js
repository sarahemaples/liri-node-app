require("dotenv").config();
const axios = require("axios");
var moment = require("moment");
var keys = require("./key");
var Spotify = require('node-spotify-api');
var fs = require("fs");

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
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
            break;
        case 'spotify-this-song':
            spotifyThis(name);
            break;
        case 'movie-this':
            movieThis(name);
            break;
        case 'do-what-it-says':
            doWhatItSays();
    }
}

//----------------------------------------------------
// BANDS IN TOWN CODE
//----------------------------------------------------
// executes if user requests 'concert-this'
function concertThis(name){
    // make sure user entered a band name
    if (name){
        // search Bands in Town api for band name
        axios.get("https://rest.bandsintown.com/artists/" + name.toString() + "/events?app_id=codingbootcamp&date=upcoming")
        .then(function (response) {
            // format response nicely
            response.data.forEach(function(e){
                console.log("\n--------------------------\n");
                console.log(e.venue.name);
                console.log(e.venue.city, response.data[0].venue.region);
                console.log(moment(e.datetime).format("MM/DD/YYYY"));
                console.log("\n--------------------------\n");
            })

        })
        // catch/log any errors
        .catch(function (error) {
            console.log(error);
        });
    } else {
        console.log("No band name entered. Please submit a new request.");
    }
}
//----------------------------------------------------
// SPOTIFY CODE
//----------------------------------------------------
// executes if user requests 'spotify-this-song'
function spotifyThis(name){
    if (name){
        spotify.search({ 
            type: 'track', 
            query: name
        }, function(err, response) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            if (response.tracks.items.length > 0){
                // loop through all the responses and format them nicely
                response.tracks.items.forEach(function(e){
                    console.log("\n--------------------------\n");
                    console.log(e.name);
                    console.log(e.album.artists[0].name);
                    console.log(e.album.name);
                    console.log(e.external_urls.spotify);
                    console.log("\n--------------------------\n");            });
            // if no songs appear, default 'the sign'
            } else {
                spotifyThis("The Sign, Ace of Base");
            }
    });
    } else {
        spotifyThis("The Sign, Ace of Base");
    }
}
//----------------------------------------------------
// OMDB CODE
//----------------------------------------------------
// executes if user requests 'movie-this'
function movieThis(name){
    // check a movie name was passed
    if (name){
        // search omdb with axios
        axios.get("https://www.omdbapi.com/?t="+name+"&y=&plot=short&apikey=trilogy")
            .then(function (response) {
                console.log(response);
                console.log("\n--------------------------\n");
                console.log(response.data);
                console.log("\n--------------------------\n");
                console.log(response.data.length);
                if (response){
                console.log("\n--------------------------\n");
                console.log("* "+response.data.Title);
                console.log("* "+response.data.Year);
                console.log("* IMDB Rating: "+response.data.Ratings[0].Value);
                console.log("* Rotten Tomatoes Rating: "+response.data.Ratings[1].Value);
                console.log("* "+response.data.Country);
                console.log("* "+response.data.Language);
                console.log("* "+response.data.Plot);
                console.log("* "+response.data.Actors);
                console.log("\n--------------------------\n");   
                } else {
                    movieThis("mr nobody");
                }
            })
                // catch/log any errors
                .catch(function (error) {
                    console.log(error);
                });
    } else {
        movieThis("mr nobody");
    }
}
//----------------------------------------------------
// DO WHAT IT SAYS CODE
//----------------------------------------------------
// executes if user requests 'do-what-it-says'
function doWhatItSays(){
    fs.readFile("../random.txt", "utf8", function(err, data){
        if (err) {
            return console.log(err);
        }
        var info = data.split(",");
        var command = info[0].trim().toString();

        var param = info[1].trim();
        
        userWantsTo(command, param);

        // call proper function
    //     switch(command){
    //         case 'concert-this':
    //             concertThis(param);
    //             break;
    //         case 'spotify-this-song':
    //             spotifyThis(param);
    //             break;
    //         case 'movie-this':
    //             movieThis(param);
    //             break;      
    //    }
    })
}
