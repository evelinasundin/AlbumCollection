/* Module pattern. Håller koden ganska ren, slipper this och prototype som annars kan fylla upp koden och göra den förvirrande. 
Det som kan vara svårt med module pattern är att hantera de returns som de inre funktionsobjekten levererar. 
Via namespacet (Module) kan vi komma åt de anonyma funktionerna inuti modulen.
Eftersom vi anropar till servrar är det bra att funktionerna är privata så dessa inte går att ändra */


const Module = (function() {

    return {

        // Request to get albums from user input sorted by relevance 

        requestChosenAlbum: () => {
            let albumValue = document.getElementById("albumInput").value;

            //start load since nothing in progress loading gif appears

            $(document).ajaxStart(function() {
                $("#loadgif").show();
            });

            //if the album value input is empty return false - otherwise run the request

            if (albumValue === '') {
                return false;
                console.log(false);
            } else {

                $.ajax({
                    method: 'GET',
                    url: 'https://ws.audioscrobbler.com/2.0/?method=album.search&api_key=596bfe5bae097e1c9f7dd354901bc20c&format=json&limit=4&album=' + albumValue,
                    dataType: 'JSON',
                    success: function(response) {
                        Module.showChosenAlbum(response);
                    },
                    error: function(code, message) {
                        $('#error').html('Error Code: ' + code + ', Error Message: ' + message);
                    }
                });
            }

        },

        //function that runs if the request = success 

        showChosenAlbum: (response) => {
            data = response;
            listOfAlbums.innerHTML = "";
             //const since this wont be reassigned 
            const albums = response.results.albummatches.album; //to shorten code in html chunk 
            console.log(data);
            let html = "";
            for (let i = 0; i < albums.length; i++) {
                html += `
<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
    <div class="image-wrapper">
        <div class="image-overlay">
            <div id="${i}" class="content"></div>
        </div>
        <div class=hover-wrap>
            <p><img class="img-rounded" src="${albums[i].image[3]['#text']}"></p>
        </div>
    </div>
    <div class="text-centered">
        <p class="text-centered"><b>Artist :</b> ${albums[i].artist}</p>
        <p class="text-centered"><b>Album Name :</b> ${albums[i].name}</p>
        </br>
    </div>
    <div class="wrapper-center">
        <button class="addButton btn btn-secondary" id="${i}" type="button">Add to Collection</button>
        <button class="removeButton btn btn-secondary" id="${i}" type="button">Remove</button>
    </div>
    <a href="${albums[i].url}" target=newtab><img src="img/play.svg" class="playLink content-center" height="50px" width="50px"></a>
</div>
</div>`;
                //sends artist, album name and index as parameters to albuminfo 
                Module.requestAlbumInfo(albums[i].artist, albums[i].name, i);
            }

            listOfAlbums.innerHTML = html;

            //apply button functions
            Module.bindClick();
            Module.bindClickRemove();

            //finish load 
            $(document).ajaxComplete(function() {
                $("#loadgif").hide();
            });

        },

        // Request to get a specific users top listened albums 


        requestUserTopAlbum: () => {

            //get the users lastfm username input from DOM 
            let userValue = document.getElementById("userInput").value;

            //start load since nothing in progress loading gif appears

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
                    url: 'https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=' + userValue + '&api_key=596bfe5bae097e1c9f7dd354901bc20c&format=json&limit=4+period=7day',
                    dataType: 'JSON',
                    success: function(response) {
                        Module.showUserTopAlbum(response);
                    },
                    error: function(code, message) {
                        $('#error').html('Error Code: ' + code + ', Error Message: ' + message);
                    }
                });
            }

        },

        // if requestUserTopAlbum = success - get information from requested objects and print in DOM 

        showUserTopAlbum: (response) => {
            data = response;
            listOfAlbums.innerHTML = "";
            //const since this wont be reassigned 
            const albums = response.topalbums.album; //to shorten code in html chunk 
            console.log(data);
            let html = "";
            for (let i = 0; i < albums.length; i++) {
                html += `
<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
    <div class="image-wrapper">
        <div class="image-overlay">
            <div id="${i}" class="content"></div>
        </div>
        <div class=hover-wrap>
            <p><img class="img-rounded" src="${albums[i].image[3]['#text']}"></p>
        </div>
    </div>
    <div class="text-centered">
        <p class="text-centered"><b>Artist :</b> ${albums[i].artist.name}</p>
        <p class="text-centered"><b>Album Name :</b> ${albums[i].name}</p>
        </br>
    </div>
    <div class="wrapper-center">
        <button class="addButton btn btn-secondary" id="${i}" type="button">Add to Collection</button>
        <button class="removeButton btn btn-secondary" id="${i}" type="button">Remove</button>
    </div>
    <a href="${albums[i].url}" target=newtab><img src="img/play.svg" class="playLink content-center" height="50px" width="50px"></a>
</div>
</div>`;
                //sends artist and album name as parameters to albuminfo 
                Module.requestUserAlbumInfo(albums[i].artist.name, albums[i].name, i);
            } 
            listOfAlbums.innerHTML = html;

            //apply button functions 
            Module.bindClick();
            Module.bindClickRemove();

            $(document).ajaxComplete(function() {
                $("#loadgif").hide();
            });
        },


        // Request to get information about albums

        requestAlbumInfo: (artistValue, albumValue, i) => {

            $.ajax({
                method: 'GET',
                url: "https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=596bfe5bae097e1c9f7dd354901bc20c&artist=" + artistValue + "&album=" + albumValue + "&format=json",
                dataType: 'JSON',
                success: function(response) {
                    Module.showAlbumInfo(response, i);
                },
                error: function(code, message) {
                    $('#error').html('Error Code: ' + code + ', Error Message: ' + message);
                }
            });
        },

        
        // if requstAlbumInfo = success - get information from requested albums and print in DOM 


        showAlbumInfo: (response, i) => {
            data = response;
            console.log(data);
            //get index and apply html dom 
            let content = document.getElementById(i);
            console.log(content);
            content.innerHTML = "";
             //const since this wont be reassigned 
            const info = response.album;
            let html = "";
            html += `
<div class="texthover">
    <p><b>Plays :</b> ${info.playcount}</p>
    <p><b>Published :</b> ${ info.wiki ? info.wiki.published : ''}</p>
    </br>
</div>
		`;

            content.innerHTML = html;
        },

        // Request to get information about albums from username input 

        requestUserAlbumInfo: (artistValue, albumValue, i) => {

            $.ajax({
                method: 'GET',
                url: "https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=596bfe5bae097e1c9f7dd354901bc20c&artist=" + artistValue + "&album=" + albumValue + "&format=json",
                dataType: 'JSON',
                success: function(response) {
                    Module.showUserAlbumInfo(response, i);

                },
                error: function(code, message) {
                    $('#error').html('Error Code: ' + code + ', Error Message: ' + message);
                }
            });
        },

        // if requstUserAlbumInfo = success - get information from requested albums and print in DOM 

        showUserAlbumInfo: (response, i) => {
            data = response;
            console.log(data);
            let content = document.getElementById(i);
            console.log(content);
            content.innerHTML = "";
             //const since this wont be reassigned 
            const info = response.album;
            console.log(response.album);
            let html = "";
            html += `
<div class="texthover">
    <p><b>Plays :</b> ${info.playcount}</p>
    <p><b>Published :</b> ${ info.wiki ? info.wiki.published : ''}</p>
    </br>
</div>
		`;


            content.innerHTML = html;
        },


        //function that appends chosen album to list1  

        addToList: (id) => {
            let getList = document.getElementById("list1");
            getList.appendChild(id);
        },

        // function that removes album

        removeAlbumInCollection: (removeid) => {

            removeid.parentElement.removeChild(removeid);

        },

        //function that binds click to all add buttons

        bindClick: () => {


            let addbuttons = document.getElementsByClassName('addButton');

            // for loop to put buttons on each and every object
            for (let i = 0; i < addbuttons.length; i++) {
                addbuttons[i].addEventListener('click', function() {
                    Module.addToList(this.parentElement.parentElement); //gets parent elementet of wrapper-center where button is which is col-xs-12
                })
            }

        },


        //function that binds click to all remove buttons

        bindClickRemove: () => {

            let removebuttons = document.getElementsByClassName('removeButton');

            // for loop to put buttons on each and every object
            for (let i = 0; i < removebuttons.length; i++) {
                removebuttons[i].addEventListener('click', function() {
                    Module.removeAlbumInCollection(this.parentElement.parentElement); //gets parent elementet of wrapper-center where button is which is col-xs-12

                })
            }
        },


        // modal 

        modal: () => {

            let modal = document.getElementById('myModal');

            let button = document.getElementById("infoButton");

            let close = document.getElementsByClassName("close")[0];

            button.onclick = function() {
                modal.style.display = "block";
            }

            // When the user clicks on x - close modal
            close.onclick = function() {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal - close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        },



        // press enter for search input field 1 

        pressEnterAlbum: () => {

            document.getElementById("albumInput")
                .addEventListener("keyup", function(event) {
                    event.preventDefault();
                    if (event.keyCode == 13) {
                        document.getElementById("albumButton").click();
                    }
                });

        },

        //press enter input field 2 

        pressEnterUser: () => {
            document.getElementById("userInput")
                .addEventListener("keyup", function(event) {
                    event.preventDefault();
                    if (event.keyCode == 13) {
                        document.getElementById("userButton").click();
                    }
                });

        },

        init: () => {

            Module.pressEnterAlbum();
            Module.pressEnterUser();
            // Module.showUserTopAlbum();
            Module.modal();

            let albumValue = document.getElementById("albumButton").addEventListener("click", Module.requestChosenAlbum);

            let userValue = document.getElementById("userButton").addEventListener("click", Module.requestUserTopAlbum)

        },
    };

})();

Module.init();
