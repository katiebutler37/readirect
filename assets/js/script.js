const DEBUG = true;

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
        console.log(moviePayload);
        console.log(bookPayload);
    }
    else {
        // Do stuff with real payloads
        fetch(movieFetchString, movieOptions)
        .then(data => data.json())
        .then(data => {
            const id = data.Search[0].imdbID;
            fetch(`https://movie-database-alternative.p.rapidapi.com/?r=json&i=${id}`, movieOptions)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err))

        fetch(bookFetchString)
	    .then(data => data.json())
	    .then(data => console.log(data.items[0].volumeInfo))
	    .catch(err => console.error(err));
    }
}

searchTitle("A Clockwork Orange");













