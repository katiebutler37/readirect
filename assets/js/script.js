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
    publisher: 'Penguin UK'    
}

const moviePayload = {
    id: 'tt0066921',
    imdbid: 'tt0066921',
    score: 79,
    title: 'A Clockwork Orange',
    tmdbid: 185,
    traktid: 149,
    type: 'movie',
    year: 1971
};

const mdblistOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '67aa50c69bmsha26ae12f76ef7b7p1338d8jsnc6b5612e39cc',
		'X-RapidAPI-Host': 'mdblist.p.rapidapi.com'
	}
};

function searchTitle(title) {
    const movieFetchString = "https://mdblist.p.rapidapi.com/?m=true&s=" + title;
    const bookFetchString = "https://www.googleapis.com/books/v1/volumes?q=" + title;

    // fetch(movieFetchString, mdblistOptions)
	// .then(data => data.json())
	// .then(data => console.log(data.search[0]))
    console.log(moviePayload);
	// .catch(err => console.error(err));
    
    // fetch(bookFetchString)
	// .then(data => data.json())
	// .then(data => console.log(data.items[0].volumeInfo))
    console.log(bookPayload);
	// .catch(err => console.error(err));


}

searchTitle("A Clockwork Orange");













