// This will store our credentials

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '67aa50c69bmsha26ae12f76ef7b7p1338d8jsnc6b5612e39cc',
		'X-RapidAPI-Host': 'mdblist.p.rapidapi.com'
	}
};

// Our search title function
var searchTitle = function(search){
    fetch('https://mdblist.p.rapidapi.com/?m=true&s=Batman', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
}

// searchTitle();


// our example payload
var results =
{
    "id": "tt2313197",
    "title": "Batman: The Dark Knight Returns, Part 1",
    "year": 2012,
    "score": 84,
    "type": "movie",
    "imdbid": "tt2313197",
    "tmdbid": 123025,
    "traktid": 84956
};



console.log(results);


