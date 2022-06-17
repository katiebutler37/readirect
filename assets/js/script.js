const bookPayload = {
    title: 'THE ALCHEMIST',
    allowAnonLogging: false,
    authors: ['PAULO COELHO'],
    averageRating: 5,
    canonicalVolumeLink: 'https://books.google.com/books/about/THE_ALCHEMIST.html?hl=&id=Kc9CiaS9q_wC',
    contentVersion: '1.2.1.0.preview.0',
    imageLinks: {smallThumbnail: 'http://books.google.com/books/content?id=…c=frontcover&img=1&zoom=5&source=gbs_api', thumbnail: 'http://books.google.com/books/content?id=Kc…tsec=frontcover&img=1&zoom=1&source=gbs_api'},
    infoLink: 'http://books.google.ca/books?id=Kc9CiaS9q_wC&dq=the+alchemist&hl=&source=gbs_api',
    language: 'en',
    maturityRating: 'NOT_MATURE',
    panelizationSummary: {containsEpubBubbles: false, containsImageBubbles: false},
    previewLink: 'http://books.google.ca/books?id=Kc9CiaS9q_wC&q=the+alchemist&dq=the+alchemist&hl=&cd=1&source=gbs_api',
    printType: 'BOOK',
    ratingsCount: 1,
    readingModes: {text: false, image: false}
}

const moviePayload = {
    "id": "tt2313197",
    "title": "Batman: The Dark Knight Returns, Part 1",
    "year": 2012,
    "score": 84,
    "type": "movie",
    "imdbid": "tt2313197",
    "tmdbid": 123025,
    "traktid": 84956
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

searchTitle("batman");













