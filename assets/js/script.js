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

// fetch('https://www.googleapis.com/books/v1/volumes?q=the+alchemist')
//   .then(response => response.json())
//   .then(data => console.log(data.items[0].volumeInfo));

console.log(bookPayload);