// True for mockpayloads/auto-search, False for real fetching and normal app behaviour 
const DEBUG = false;

// Our title and search history items elements
var titleInputEl = document.querySelector("#title");
var searchHistoryContainerEl = document.querySelector('.search-history-items');

var moreMovieButtonEl = document.querySelector(".more-movie-btn");
var moreBookButtonEl = document.querySelector(".more-book-btn");

var searchedTitleGlobal = "";

function errorNoMatch() {
    console.log("search error");
    $("#search-error").addClass("is-active");
};

function errorNoConnection() {
    $("#server-error").addClass("is-active");
};

var closeModal = function (event) {
    event.preventDefault();
    $(".modal").removeClass("is-active");
};

// The function which gets all of our functions moving
var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();

    const title = $('#title').val().trim();
    
    if (title) {
        // display the columns
        showDisplay();
        //pass title to be fetched
        searchTitle(title);
    } else {
        //triggers an error modal
        errorNoMatch();
    } 
};

// By clicking on one of the saved searches this function gets triggered
var buttonClickHandler = function(event) {
    //grab text from button clicked and give it back to original fetch function
    var searchedTitle = event.target.textContent;
    titleInputEl.value = searchedTitle;
    
    searchTitle(searchedTitle);
    showDisplay();
};

async function fetchMovieData(title) {

    try {
        let initialResponse = await fetch(`https://movie-database-alternative.p.rapidapi.com/?s=${title}&r=json&page=1`, movieOptions);
        let initialData = await initialResponse.json();

        let finalResponse = await fetch(`https://movie-database-alternative.p.rapidapi.com/?r=json&i=${initialData.Search[0].imdbID}`, movieOptions);
        let finalData = await finalResponse.json();
    
        return finalData;
    }
    catch(err) {
        if (err.message === "Failed to fetch") {
            errorNoConnection();
        }
        else {
            errorNoMatch();
        }
    }
}

async function fetchBookData(title) {
    
    try {
        let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}`);
        let data = await response.json();
    
        return data.items[0].volumeInfo;
    }
    catch(err) {
        if (err.message === "Failed to fetch") {
            errorNoConnection();
        }
        else {
            errorNoMatch();
        }
    }
     
}

function searchTitle(title) {
  
    if (DEBUG) {
        // Do stuff with mock payloads
        displayMovieResults(moviePayload);
        displayBookResults(bookPayload);
        displayResultsTitle();
        compareResults(moviePayload, bookPayload);
    }
    else {

        let finalMovieData = {};
        let finalBookData = {};
   
        // Do stuff with real payloads in sequence
        fetchMovieData(title)
            .then((movie_data) => {
                finalMovieData = displayMovieResults(movie_data);
                return finalMovieData;
            })
            .then((movieData) => fetchBookData(movieData.Title)
                .then((bookData) => {
                    finalBookData = displayBookResults(bookData);
                    displayResultsTitle();
                    compareResults(finalMovieData, finalBookData)
                })                
            )
    }

}

var compareResults = function(movieData, bookData) {

    var averageMovieRating = movieData.Metascore;
    // Convert book rating to "out of 100" format
    var averageBookRating = bookData.averageRating * 20; 

    // Clear any comparison highlights currently showing
    $("#card-1").css("box-shadow", "10px 0px 25px rgba(0, 0, 0, 0.527)")
    $("#card-2").css("box-shadow", "10px 0px 25px rgba(0, 0, 0, 0.527)")

    // Apply highlight to medium with higher rating, or both if ratings are the same 
    if (averageBookRating > averageMovieRating){
        $("#card-1").css("box-shadow", "10px 0px 25px rgba(255, 230, 2, 0.767)");
    }
    if (averageMovieRating > averageBookRating){
        $("#card-2").css("box-shadow", "10px 0px 25px rgba(255, 230, 2, 0.767)");
    }
    if (averageBookRating === averageMovieRating){
        $("#card-1").css("box-shadow", "10px 0px 25px rgba(255, 230, 2, 0.767)");
        $("#card-2").css("box-shadow", "10px 0px 25px rgba(255, 230, 2, 0.767)");
    }
};


var displayResultsTitle = function (){
    //clear old display content
    $("#results").html("");

    // get value from input element
    var title = titleInputEl.value.trim();

    var titleArray = title.split(" ");
    for (var i=0; i < titleArray.length; i++) {
        titleArray[i] = titleArray[i].charAt(0).toUpperCase() + titleArray[i].slice(1).toLowerCase()
    };
    var displayTitle = titleArray.join(" ");
    searchedTitleGlobal = displayTitle;

    $("#searched-title").html("Displaying results for: " + displayTitle);
    $("#results").append($("#searched-title"));

   //dynamically create save button here, add the necessary styling classes and also append to the results container
   var saveReviewButtonEl = document.createElement("button");
   saveReviewButtonEl.classList = "button is-success is-responsive is-rounded is-medium";
   saveReviewButtonEl.setAttribute("id", "save-btn");
   saveReviewButtonEl.innerHTML = "<i class='fa-solid fa-check'></i>Save Review";
   //append to results container
   $("#results").append(saveReviewButtonEl);
   
    displaySearchHistory();

    //clear old input from form
    titleInputEl.value = "";
}

// Our star rating system
function getStarsHtml(rating, isBook) {

    if (isBook) {
        // change rating to 'out of 100' format
        rating = rating * 20;
    }

    if (0 <= rating && rating <= 10){
        return STARS['0.5'];
    }
    if (10 < rating && rating <= 20){
        return STARS['1.0'];
    }
    if (20 < rating && rating <= 30){
        return STARS['1.5'];
    }
    if (30 < rating && rating <= 40){
        return STARS['2.0'];
    }
    if (40 < rating && rating <= 50){
        return STARS['2.5'];
    }
    if (50 < rating && rating <= 60){
        return STARS['3.0'];
    }
    if (60 < rating && rating <= 70){
        return STARS['3.5'];
    }
    if (70 < rating && rating <= 80){
        return STARS['4.0'];
    }
    if (80 < rating && rating <= 90){
        return STARS['4.5'];
    }
    if (90 < rating && rating <= 100){
        return STARS['5.0'];
    }

}

// The movie data that will be displayed on the page
var displayMovieResults = function (results){
    $(".movie-cover").attr("src", results.Poster);
    $(".movie-title").text(results.Title);
    $(".movie-description").text(results.Plot);
    $(".movie-rating").html (getStarsHtml(results.Metascore, false));

    moreMovieButtonEl.setAttribute("href", `https://www.imdb.com/title/${results.imdbID}/criticreviews?ref_=tt_ov_rt`);

    return results;
}

// The book data that will be displayed on the page
var displayBookResults = function (results){
    $(".book-cover").attr("src", results.imageLinks.thumbnail);
    $(".book-title").text(results.title);
    $(".book-description").text(results.description);
    $(".book-rating").html(getStarsHtml(results.averageRating, true));

    return results;
}

// This function will ensure that our searches persist
var displaySearchHistory = function() {
    if (localStorage.length > 0) {
       //grab stored array of searched cities from localStorage
       var searchedTitles = JSON.parse(localStorage.getItem("searched-titles"));
       //to sort from most-least recent (searched) changing the order of reading it
       var recentSearchedTitles = searchedTitles.reverse();
       //to remove any duplicates for final display version
       var filteredSearchedTitles = [...new Set(recentSearchedTitles)];

       //clear old display content
       $('.search-history-items').html("");

       //loop through searchedCities array to display array but...
       for (i=0; i < filteredSearchedTitles.length; i++) {
           //...stop at index 9 to keep only the most recent 10 showing
           if (i>=10) {
               break;
           }
           searchHistoryContainerEl.innerHTML += "<button class='button is-rounded search-history-item'>" + filteredSearchedTitles[i] + "</button>"
       };
   };
};

if (DEBUG) {
    searchTitle("A Clockwork Orange");
}

function saveReview() {

     //load searchedTitles (an array) from localStorage and turn strings back to objects
     var searchedTitles = JSON.parse(localStorage.getItem("searched-titles")) || [];
     //add the individal title item to the array of searched titles
    //  .replace("Displaying results for: ", "");
    
     searchedTitles.push(searchedTitleGlobal);
     //add updated array to local storage
     localStorage.setItem("searched-titles", JSON.stringify(searchedTitles));

     displaySearchHistory();
}

// show the columns display and reposition the footer when the search button is clicked
var showDisplay = function (){
    // reveal the columns display
    $(".columns").removeAttr('id');
   // reposition the footer
    $("footer").css("position", "relative");
    // and hide the placeholder "Search A Title"
    $(".onload-display").css("display", "none");
};

//displays on load of page
displaySearchHistory();

//add event listener to search history items
searchHistoryContainerEl.addEventListener("click", buttonClickHandler);

//add event listener to save btn
$(document).on({
    "click": function () {
        saveReview();
}}, '#save-btn');

$(".modal-close").on("click", closeModal)
$(".modal-background").on("click", closeModal);

// add event listeners to forms
$(".search-form").on('submit', formSubmitHandler);
