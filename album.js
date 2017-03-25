// API key: 596bfe5bae097e1c9f7dd354901bc20c

var Module = (function (){




// var albumValue = $('#albumInput').val();
// console.log(albumValue);


// let albumValue = document.getElementById('albumInput');

// document.querySelector('form.createAlbumStack').addEventListener('submit', function (e) {

//     //prevent the normal submission of the form
//     e.preventDefault();

//     console.log(albumValue.value);    
// });

// prints out album 

// let getAlbumInfo = (function() {
//     $.ajax({
//         method: 'GET',
//         url: 'http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=596bfe5bae097e1c9f7dd354901bc20c&artist=Cher&album=Believe&format=json',
//         dataType: 'JSON',
//         success: function(data) {
//             $('#success #albumName').html(data.album.name);
//             $('#success #artistName').html(data.album.artist);
//             $('#success #albumImage').html('<img src="' + data.album.image[3]['#text'] + '" />');
//             console.log(data);
//             // $('#success #artistBio').html(data.artist.bio.content);
//         },
//         error: function(code, message) {
//             $('#error').html('Error Code: ' + code + ', Error Message: ' + message);
//         }
//     });
// })


// getAlbumInfo();

// console logar album ovan för att se hur det ser ut 

// let consoleAlbumInfo = (function() {
//     $.ajax({
//         method: 'GET',
//         url: 'http://ws.audioscrobbler.com/2.0/',
//         data: 'method=album.getinfo&' +
//             'api_key=596bfe5bae097e1c9f7dd354901bc20c&' +
//             'artist=DVSN&' +
//             'album=sept 5th&' +
//             'format=json',
//         dataType: 'JSON',
//         success: function(response) {
//             data = response;
//             console.log(data);
//             // $('#success #albumName').html(data.album.name);
//             // $('#success #artistName').html(data.album.artist);
//             // $('#success #albumImage').html('<img src="' + data.album.image[3]['#text'] + '" />');
//             // $('#success #artistBio').html(data.artist.bio.content);
//         },
//         error: function(code, message) {
//             $('#error').html('Error Code: ' + code + ', Error Message: ' + message);
//         }
//     });
// })

// consoleAlbumInfo();


let showChosenAlbum = function() {
	let albumValue = document.getElementById("albumInput").value;

	console.log(albumValue);

	//if the album value input is empty - return false otherwise run the code

	if (albumValue === '') {
		return false;
		console.log(false);
	} else {

    $.ajax({
        method: 'GET',

        url: 'http://ws.audioscrobbler.com/2.0/?method=album.search&api_key=596bfe5bae097e1c9f7dd354901bc20c&format=json&limit=4&album=' + albumValue,
        dataType: 'JSON',
        success: function(response) {
        	data = response;
        	listOfAlbums.innerHTML = "";
            let albums = response.results.albummatches.album; //to shorten code in html chunck 
            console.log(data);
            var html = "";
            for (var i = 0; i < albums.length; i++) {
                html += `

                   <div class = "col-xs-12 col-sm-6 col-md-6 col-lg-3">
        <p><img class ="img-rounded" src="${albums[i].image[3]['#text']}"></p>
        <div class ="text-centered">
		<p class ="text-centered">Artist : ${albums[i].artist}</p>
		<p class ="text-centered">Album Name : ${albums[i].name}</p></br>
		</div>
		<div class ="wrapper-center">
		<button class="addButton btn btn-secondary" id="${i}" type="button">Add to Collection</button>
		<button class="removeButton btn btn-secondary" id="${i}" type="button">Remove</button>
		</div>
		</div>
		</div>`;
          }
               listOfAlbums.innerHTML = html;
               bindClick();

        },
        error: function(code, message) {
            $('#error').html('Error Code: ' + code + ', Error Message: ' + message);
        }
    });
} //slut på else 

}


//function that appends chosen album to list1 in 

let addToList = (function(id) {
	console.log(id);
	let getList = document.getElementById("list1"); 
	getList.appendChild(id);

//remove button 

//Add button

})



console.log(showChosenAlbum());

//function that binds click to all buttons

function bindClick(){
	let addbuttons = document.getElementsByClassName('addButton');
	for(let i = 0; i < addbuttons.length; i++){
	addbuttons[i].addEventListener('click', function(){
		addToList(this.parentElement.parentElement); //hämtar parent elementet av wrapper-center där button ligger vilket är col-xs-12
	})
	}

}





let albumValue = document.getElementById("albumButton").addEventListener("click", showChosenAlbum);

})();
