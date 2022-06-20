// Switch this to false when you want to use real fetching, true when you want to use the mock payloads
const DEBUG = true;

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

var searchFormEl = document.querySelector("#searchForm");
var titleInputEl = document.querySelector("#title");
var searchHistoryContainerEl = document.querySelector('.search-history-items')

const bookPayload = {
    allowAnonLogging: true,
    authors: ['Anthony Burgess'],
    averageRating: 4.5,
    canonicalVolumeLink: 'https://play.google.com/store/books/details?id=qUI8pbpCNJUC',
    categories: ['Fiction'],
    contentVersion: '1.8.9.0.preview.2',
    description: 'In this nightmare vision of a not-too-distant future, fifteen-year-old Alex and his three friends rob, rape, torture and murder - for fun. Alex is jailed for his vicious crimes and the State undertakes to reform him - but how and at what cost?',
    imageLinks: {smallThumbnail: 'http://books.google.com/books/content?id=…er&img=1&zoom=5&edge=curl&source=gbs_api', thumbnail: 'http://books.google.com/books/content?id=qU…cover&img=1&zoom=1&edge=curl&source=gbs_api'},
    infoLink: 'https://play.google.com/store/books/details?id=qUI8pbpCNJUC&source=gbs_api',
    language: 'en',
    maturityRating: 'NOT_MATURE',
    pageCount: 176,
    panelizationSummary: {containsEpubBubbles: false, containsImageBubbles: false},
    previewLink: 'http://books.google.ca/books?id=qUI8pbpCNJUC&printsec=frontcover&dq=A+Clockwork+Orange&hl=&cd=1&source=gbs_api',
    printType: 'BOOK',
    publishedDate: '2011-08-04',
    publisher: 'Penguin UK',
    title: 'A Clockwork Orange'
}

const moviePayload = {
    Actors: "Malcolm McDowell, Patrick Magee, Michael Bates",
    Awards: "Nominated for 4 Oscars. 12 wins & 24 nominations total",
    BoxOffice: "$26,617,553",
    Country: "United Kingdom, United States",
    DVD: "23 Oct 2007",
    Director: "Stanley Kubrick",
    Genre: "Crime, Sci-Fi",
    Language: "English",
    Metascore: "77",
    Plot: "In the future, a sadistic gang leader is imprisoned and volunteers for a conduct-aversion experiment, but it doesn't go as planned.",
    Poster: "https://m.media-amazon.com/images/M/MV5BMTY3MjM1Mzc4N15BMl5BanBnXkFtZTgwODM0NzAxMDE@._V1_SX300.jpg",
    Production: "N/A",
    Rated: "X",
    Ratings: [
        {
            Source: 'Internet Movie Database',
            Value: '8.3/10'
        },
        {
            Source: 'Rotten Tomatoes',
            Value: '87%'
        },
        {
            Source: 'Metacritic',
            Value: '77/100'
        }
    ],
    Released: "02 Feb 1972",
    Response: "True",
    Runtime: "136 min",
    Title: "A Clockwork Orange",
    Type: "movie",
    Website: "N/A",
    Writer: "Stanley Kubrick, Anthony Burgess",
    Year: "1971",
    imdbID: "tt0066921",
    imdbRating: "8.3",
    imdbVotes: "810,908"
};

const movieOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fc6b69c0damshf39a0c0e95d5241p10963bjsn7774c35cda52',
		'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
	}
};

function searchTitle(title) {
    const movieFetchString = `https://movie-database-alternative.p.rapidapi.com/?s=${title}&r=json&page=1`;
    const bookFetchString = `https://www.googleapis.com/books/v1/volumes?q=${title}`

    if (DEBUG) {
        // Do stuff with mock payloads
        movieResults(moviePayload);
        bookResults(bookPayload);
    }
        // Do stuff with real payloads
        fetch(movieFetchString, movieOptions)
        .then(data => data.json())
        .then(data => {
            const id = data.Search[0].imdbID;
            fetch(`https://movie-database-alternative.p.rapidapi.com/?r=json&i=${id}`, movieOptions)
            .then(response => response.json())
            .then(results => movieResults(results))
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err))

        fetch(bookFetchString)
	    .then(data => data.json())
	    .then(data => bookResults(data.items[0].volumeInfo))
	    .catch(err => console.error(err));
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

searchTitle("a clockwork orange");


// get value from input element

var formSubmitHandler = function(event){
    //if we don't have it form refresh too much
    event.preventDefault();

    var title = titleInputEl.value.trim();

    var titleArray = title.split(" ");
    for (var i=0; i < titleArray.length; i++) {
        titleArray[i] = titleArray[i].charAt(0).toUpperCase() + titleArray[i].slice(1).toLowerCase()
    };

    var correctedTitle = titleArray.join(" ");

    // NOT PUTTING ON THE PAGE YET
    // cityTitleEl.innerHTML = "<h2>" + correctedTitle + "</h2>";
    // currentWeatherContainerEl.appendChild(cityTitleEl);

        //load searchedCities (an array) from localStorage and turn strings back to objects
        var searchedTitles = JSON.parse(localStorage.getItem("searched-titles")) || [];
        //add the individal cityTitle item to the array of searched cities
        searchedTitles.push(correctedTitle);
        //add updated array to local storage
        localStorage.setItem("searched-titles", JSON.stringify(searchedTitles));
        displaySearchHistory();

}

// var searchedTitleButtonEl = document.querySelector("#search-history-items");



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

//displays on load of page
displaySearchHistory();

//add event listener to search history items
// searchedCityButtonEl.addEventListener("click", buttonClickHandler)

 // add event listeners to forms
searchFormEl.addEventListener('submit', formSubmitHandler);









