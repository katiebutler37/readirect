// True for mockpayloads/auto-search, False for real fetching and normal app behaviour 
const DEBUG = false;

// Our Movie card variables which will hold the fetched data
var movieCover = document.querySelector(".movie-cover");
var movieTitle = document.querySelector(".movie-title");
var movieRating = document.querySelector(".movie-rating");
var movieReview1 = document.getElementById("movie-review-1");
var movieReview2 = document.getElementById("movie-review-2");
var movieReview3 = document.getElementById("movie-review-3");

// HTML elements related to books 
var bookCover = document.querySelector(".book-cover");
var bookTitle = document.querySelector(".book-title");
var bookRating = document.querySelector(".book-rating");

var titleInputEl = document.querySelector("#title");
var searchFormEl = document.querySelector(".search-form");
var searchedTitleEl = document.querySelector("#searched-title");
var resultsContainerEl = document.querySelector("#results");
var searchHistoryContainerEl = document.querySelector('.search-history-items')

const movieOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fc6b69c0damshf39a0c0e95d5241p10963bjsn7774c35cda52',
		'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
	}
};

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
    
    // get value from input element
    var title = titleInputEl.value.trim();
    
    if (title) {
        // display the columns
        showDisplay();
        //pass title to be fetched
      searchTitle(title);
    } else {
        //needs to be replaced with function to trigger a modal later
      alert('Please enter a title');
    }

    
};

async function fetchMovieData(title) {

    let initialResponse = await fetch(`https://movie-database-alternative.p.rapidapi.com/?s=${title}&r=json&page=1`, movieOptions);
    let initialData = await initialResponse.json();

    let finalResponse = await fetch(`https://movie-database-alternative.p.rapidapi.com/?r=json&i=${initialData.Search[0].imdbID}`, movieOptions);
    let finalData = await finalResponse.json();

    return finalData;
}

async function fetchBookData(title) {
    
    let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}`);
    let data = await response.json();

    return data.items[0].volumeInfo;
     
}

function searchTitle(title) {

    if (DEBUG) {
        // Do stuff with mock payloads
        movieResults(moviePayload);
        bookResults(bookPayload);
        displayResultsTitle();
    }
    else {
        // Do stuff with real payloads in sequence
        fetchMovieData(title)
            .then((data) => movieResults(data))
            .then((data) => { // 'data' here is the movie data, ready to be fed into the book fetching below, if desired 
                fetchBookData(title)
                .then((data) => bookResults(data))
            })
            .then(() => displayResultsTitle())
    }

}


var displayResultsTitle = function (){
    //clear old display content
    resultsContainerEl.innerHTML = "";

    // get value from input element
    var title = titleInputEl.value.trim();

    var titleArray = title.split(" ");
    for (var i=0; i < titleArray.length; i++) {
        titleArray[i] = titleArray[i].charAt(0).toUpperCase() + titleArray[i].slice(1).toLowerCase()
    };
    var displayTitle = titleArray.join(" ");

    searchedTitleEl.innerHTML = "Displaying results for: " + displayTitle;
    resultsContainerEl.appendChild(searchedTitleEl);

   //may want load local storage array, push into array, and set updated search history array to local storage here

   //dynamically create save button here, add the necessary styling classes and also append to the results container
   var saveReviewButtonEl = document.createElement("button");
   saveReviewButtonEl.classList = "button is-success is-responsive is-rounded is-medium";
   saveReviewButtonEl.setAttribute("id", "save-btn");
   saveReviewButtonEl.innerHTML = "<i class='fa-solid fa-check'></i>Save Review";
   //append to results container
   resultsContainerEl.appendChild(saveReviewButtonEl);

    //load searchedCities (an array) from localStorage and turn strings back to objects
    var searchedTitles = JSON.parse(localStorage.getItem("searched-titles")) || [];
    //add the individal cityTitle item to the array of searched cities
    searchedTitles.push(displayTitle);
    //add updated array to local storage
    localStorage.setItem("searched-titles", JSON.stringify(searchedTitles));
    displaySearchHistory();
}


var movieResults = function (results){
    movieCover.setAttribute("src", results.Poster);
    movieTitle.textContent = results.Title;
    // this is our Star rating system based on the MetaScore
    if (results.Metascore <= 20){
        movieRating.textContent = "⭐";
    }
    if (results.Metascore > 20 && results.Metascore <= 40){
        movieRating.textContent = "⭐⭐";
    }
    if (results.Metascore > 40 && results.Metascore <= 60){
        movieRating.textContent = "⭐⭐⭐";
    }
    if (results.Metascore > 60 && results.Metascore <= 80){
        movieRating.textContent = "⭐⭐⭐⭐";
    }
    if (results.Metascore > 80 && results.Metascore <= 100){
        movieRating.textContent = "⭐⭐⭐⭐⭐";
    }
    movieReview1.textContent = results.Ratings[0].Source + " (IMDB) | " + results.Ratings[0].Value;
    movieReview2.textContent = results.Ratings[1].Source + " | " + results.Ratings[1].Value;
    movieReview3.textContent = results.Ratings[2].Source + " | " + results.Ratings[2].Value;
    
    return results;

}

var bookResults = function (results){
    bookCover.setAttribute("src", results.imageLinks.thumbnail);
    bookTitle.textContent = results.title;

    // round to nearest integer
    const rating = Math.round(results.averageRating);
    
    if (rating === 1){
        movieRating.textContent = "⭐";
    }
    if (rating === 2){
        movieRating.textContent = "⭐⭐";
    }
    if (rating === 3){
        movieRating.textContent = "⭐⭐⭐";
    }
    if (rating === 4){
        movieRating.textContent = "⭐⭐⭐⭐";
    }
    if (rating === 5){
        movieRating.textContent = "⭐⭐⭐⭐⭐";
    }

}

var displaySearchHistory = function() {
    if (localStorage.length > 0) {
       //grab stored array of searched cities from localStorage
       var searchedTitles = JSON.parse(localStorage.getItem("searched-titles"));
       //to sort from most-least recent (searched) changing the order of reading it
       var recentSearchedTitles = searchedTitles.reverse();
       //to remove any duplicates for final display version
       var filteredSearchedTitles = [...new Set(recentSearchedTitles)];

       //clear old display content
       searchHistoryContainerEl.innerHTML = "";

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

// show the columns display and reposition the footer when the search button is clicked
var showDisplay = function (){
    // reveal the columns display
    $("#hidden-onload").css("display", "flex");
    // reposition the footer
    $("footer").css("position", "relative");
    // and hide the placeholder "Search A Title"
    $(".onload-display").css("display", "none");
};

//displays on load of page
displaySearchHistory();
// add event listeners to forms
searchFormEl.addEventListener('submit', formSubmitHandler);
