 # liri-node-app

### What Each Command Does

1. `node liri.js concert-this <artist/band name here>`

This searches the Bands in Town Artist Events API for the user specified artist and renders concert dates and location information for the upcoming months.

![Upcoming 'Street Sects' Shows](images/concert.png)

If no band name is entered, the program will prompt the user to submit  a new request.

![Message Shown When No Band Name Passed](images/concert-no-band.png)


2. `node liri.js spotify-this-song '<song name here>'`

This returns information for songs on Spotify matching the search term.

![7 Rings](images/7-rings.png)

If no song is entered, or there are no results, the program default searches "The Sign" by Ace of Base.

![No Song Enteres](images/ace-of-base.png)

3. `node liri.js movie-this '<movie name here>'`

This outputs relevant information about the movie entered.

![The Princess Bride](images/princess.png)

If no movie is entered, the program default searches 'Mr. Nobody'.

![No Movie Queried](images/nobody.png)

4. `node liri.js do-what-it-says`

This command reads a random.txt file and executes the command specified.

![random.txt](images/random.png)

![Result](images/mrBrightside.png)

### Demo Video: 

[![Demo Video](http://img.youtube.com/vi/4zhYM-pADlM/0.jpg)](http://www.youtube.com/watch?v=4zhYM-pADlM)

