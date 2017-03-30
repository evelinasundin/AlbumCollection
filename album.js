// API key: 596bfe5bae097e1c9f7dd354901bc20c
/* Module pattern. Håller koden ganska ren, slipper this och prototype som annars kan fylla upp koden och göra den förvirrande. 
Det som kan vara svårt med module pattern är att hantera de returns som de inre funktionsobjekten levererar. 
Via namespacet (Module) kan vi komma åt de anonyma funktionerna inuti modulen. */

const Module = (function() { 

	return {

    showChosenAlbum: () => {
        let albumValue = document.getElementById("albumInput").value;

        //start load since nothing in progress loading gif appears

        $(document).ajaxStart(function() {
            $("#loadgif").show();
        });

        console.log(albumValue);

        //if the album value input is empty return false - otherwise run the code

        if (albumValue === '') {
            return false;
            console.log(false);
        } else {

            $.ajax({
                method: 'GET',
                url: 'https://ws.audioscrobbler.com/2.0/?method=album.search&api_key=596bfe5bae097e1c9f7dd354901bc20c&format=json&limit=4&album=' + albumValue,
                dataType: 'JSON',
                success: function(response) {
                    data = response;
                    listOfAlbums.innerHTML = "";
                    let albums = response.results.albummatches.album; //to shorten code in html chunk 
                    console.log(data);
                    let html = "";
                    for (let i = 0; i < albums.length; i++) {
                        html += `
                   <div class = "col-xs-12 col-sm-6 col-md-6 col-lg-3">
                    <div class="image-wrapper">
 					 <div class="image-overlay">
   		 <div id="${i}" class="content"></div>
 			 </div>
  			 <div class=hover-wrap><p><img class="img-rounded" src="${albums[i].image[3]['#text']}"></p></div>
			</div>
        <div class ="text-centered">
		<p class ="text-centered"><b>Artist :</b> ${albums[i].artist}</p>
		<p class ="text-centered"><b>Album Name :</b> ${albums[i].name}</p></br>
		</div>
		<div class ="wrapper-center">
		<button class="addButton btn btn-secondary" id="${i}" type="button">Add to Collection</button>
		<button class="removeButton btn btn-secondary" id="${i}" type="button">Remove</button>
		</div>
		<a href = "${albums[i].url}" target=newtab><img src="img/play.svg" class="playLink content-center" height="50px" width="50px"></a> 
		</div>
		</div>`;
                        //sends artist, album name and index as parameters to albuminfo 
                        Module.getAlbumInfo(albums[i].artist, albums[i].name, i);
                    } //slut på for-loop
                    listOfAlbums.innerHTML = html;

                    //apply button functions
                    Module.bindClick();
                    Module.bindClickRemove();
                   
                   //finish load 
                    $(document).ajaxComplete(function() {
                        $("#loadgif").hide();
                    });

                },
                error: function(code, message) {
                    $('#error').html('Error Code: ' + code + ', Error Message: ' + message);
                }
            });
        } //slut på else 

    },


    showUserTopAlbum: () => {
        let userValue = document.getElementById("userInput").value;

        $(document).ajaxStart(function() {
            $("#loadgif").show();
        });

        //if the user value input is empty return false - otherwise run the code

        if (userValue === '') {
            return false;
            console.log(false);
        } else {



            $.ajax({
                method: 'GET',
                url: 'https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=' + userValue + '&api_key=596bfe5bae097e1c9f7dd354901bc20c&format=json&limit=4',
                dataType: 'JSON',
                success: function(response) {
                    data = response;
                    listOfAlbums.innerHTML = "";
                    let albums = response.topalbums.album; //to shorten code in html chunk 
                    console.log(data);
                    let html = "";
                    for (let i = 0; i < albums.length; i++) {
                        html += `
                   <div class = "col-xs-12 col-sm-6 col-md-6 col-lg-3">
                    <div class="image-wrapper">
 					 <div class="image-overlay">
   		 <div id="${i}" class="content"></div>
 			 </div>
  			 <div class=hover-wrap><p><img class="img-rounded" src="${albums[i].image[3]['#text']}"></p></div>
			</div>
        <div class ="text-centered">
		<p class ="text-centered"><b>Artist :</b> ${albums[i].artist.name}</p>
		<p class ="text-centered"><b>Album Name :</b> ${albums[i].name}</p></br>
		</div>
		<div class ="wrapper-center">
		<button class="addButton btn btn-secondary" id="${i}" type="button">Add to Collection</button>
		<button class="removeButton btn btn-secondary" id="${i}" type="button">Remove</button>
		</div>
		<a href = "${albums[i].url}" target=newtab><img src="img/play.svg" class="playLink content-center" height="50px" width="50px"></a> 
		</div>
		</div>`;
                        //sends artist and album name as parameters to albuminfo 
                        Module.getUserAlbumInfo(albums[i].artist.name, albums[i].name, i);
                    } //slut på for-loop
                    listOfAlbums.innerHTML = html;
                    Module.bindClick();
                   Module.bindClickRemove();

                    $(document).ajaxComplete(function() {
                        $("#loadgif").hide();
                    });

                },
                error: function(code, message) {
                    $('#error').html('Error Code: ' + code + ', Error Message: ' + message);
                }
            });
        } //slut på else 

    },



    // information when you hoover over image

   getAlbumInfo: (artistValue, albumValue, i) => {

        $.ajax({
            method: 'GET',
            url: "https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=596bfe5bae097e1c9f7dd354901bc20c&artist=" + artistValue + "&album=" + albumValue + "&format=json",
            dataType: 'JSON',
            success: function(response) {
                data = response;
                console.log(data);
                //get index and apply html dom 
                let content = document.getElementById(i);
                console.log(content);
                content.innerHTML = "";
                let info = response.album;
                let html = "";
                html += `
            	<div class = "texthover">
		<p><b>Plays :</b> ${info.playcount}</p>
		<p><b>Published :</b> ${ info.wiki ? info.wiki.published : ''}</p>
		</br>
		</div>
		`;

                //console.log(data);
                content.innerHTML = html;
                //console.log(content);
            },
            error: function(code, message) {
                $('#error').html('Error Code: ' + code + ', Error Message: ' + message);
            }
        });
    },

    //user specified info when you hoover over image 

    getUserAlbumInfo: (artistValue, albumValue, i) => {

        $.ajax({
            method: 'GET',
            url: "https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=596bfe5bae097e1c9f7dd354901bc20c&artist=" + artistValue + "&album=" + albumValue + "&format=json",
            dataType: 'JSON',
            success: function(response) {
                data = response;
                console.log(data);
                let content = document.getElementById(i);
                console.log(content);
                content.innerHTML = "";
                let info = response.album;
                console.log(response.album);
                let html = "";
                html += `
            	<div class = "texthover">
		<p><b>Plays :</b> ${info.playcount}</p>
		<p><b>Published :</b> ${ info.wiki ? info.wiki.published : ''}</p>
		</br>
		</div>
		`;

                //console.log(data);
                content.innerHTML = html;
                //console.log(content);
            },
            error: function(code, message) {
                $('#error').html('Error Code: ' + code + ', Error Message: ' + message);
            }
        });
    },





    //function that appends chosen album to list1 in 

    addToList: (id) => {
        console.log(id);
        let getList = document.getElementById("list1");
        getList.appendChild(id);
    },

    // function that removes album

    removeAlbumInCollection: (removeid) => {

        console.log(removeid.parentElement);

        removeid.parentElement.removeChild(removeid);

    },


    //function that binds click to all add buttons

    bindClick: () => {

        //for addButton

        let addbuttons = document.getElementsByClassName('addButton');
        for (let i = 0; i < addbuttons.length; i++) {
            addbuttons[i].addEventListener('click', function() {
                Module.addToList(this.parentElement.parentElement); //hämtar parent elementet av wrapper-center där button ligger vilket är col-xs-12
            })
        }

    },


    //function that binds click to all remove buttons

    bindClickRemove: () => {

        let removebuttons = document.getElementsByClassName('removeButton');
        for (let i = 0; i < removebuttons.length; i++) {
            removebuttons[i].addEventListener('click', function() {
                Module.removeAlbumInCollection(this.parentElement.parentElement); //hämtar parent elementet av wrapper-center där button ligger vilket är col-xs-12
                //removeAlbum(this.parentElement.parentElement.parentElement);
            })
        }
    },



    // modal

    modal: () => {

        var modal = document.getElementById('myModal');

        // Get the button that opens the modal
        var btn = document.getElementById("infoButton");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        btn.onclick = function() {
            modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    },



    // press enter for search

    pressEnterAlbum: () => {

        document.getElementById("albumInput")
            .addEventListener("keyup", function(event) {
                event.preventDefault();
                if (event.keyCode == 13) {
                    document.getElementById("albumButton").click();
                }
            });

    },

    pressEnterUser: () =>  {
        document.getElementById("userInput")
            .addEventListener("keyup", function(event) {
                event.preventDefault();
                if (event.keyCode == 13) {
                    document.getElementById("userButton").click();
                }
            });

    },

    init: () =>{

    Module.pressEnterAlbum();
    Module.pressEnterUser();
    Module.showUserTopAlbum();
    Module.modal();

    let albumValue = document.getElementById("albumButton").addEventListener("click", Module.showChosenAlbum);

    let userValue = document.getElementById("userButton").addEventListener("click", Module.showUserTopAlbum)

},
};

})();

Module.init();
