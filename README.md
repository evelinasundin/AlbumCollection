# AlbumCollection
## Link to project:

https://evelinasundin.github.io/AlbumCollection/

## Technologies:

* jQuery ajax get() Method
* Bootstrap
* VanillaJS/ES6/jQuery
* Module pattern to structure code 
* HTML DOM Manipulation
* SASS

## API: 

I've used three different methods from Last FM's API. 

* album.search - Search for an album by name. Returns album matches sorted by relevance. With parameter limitation that limits search to 4 objects.

* album.getInfo - Get the metadata and tracklist for an album on Last.fm using the album name or a musicbrainz id.

* user.getTopAlbums - Get the top albums listened to by a user. You can stipulate a time period. Sends the overall chart by default.

Link to Last FM's web services: http://www.last.fm/api


## The application:

Search any album or artist in the first input field to get albums sorted by relevance. To specify - write both artist and album. When you hit search request is sent to get information from the api method: album.search. 
Type your lastfm username in the second input field to match your scrobbles with your most played album to be able to add these to your collection.  When you hit search request is sent to get information from the api method: user.getTopAlbums. 

Use the grey buttons to remove or add the albums to your collection. 
If you hover over the albums you will get information about how many times the album has been played and also when the date when the album was published. This is also a request that gets information from the api method: album.getInfo.
There is a pink play button - press it and it will take you to lastfms website from where you can see more information about the album and to listen to the music. 

## ToDo: 

* Be able to store the album collection in HTML 5 local storage 


## About me:
 
* By : Evelina Sundin 
* Course : Javascript 2
* School, class & program: Nackademin, Fend16 - Front-End development 
