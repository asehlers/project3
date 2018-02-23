// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");

// Making a request for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
const scraper = (address, values) => { request(address, function(error, response, html) {

	// Load the HTML into cheerio and save it to a variable
	// '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
	var $ = cheerio.load(html);

	// An empty array to save the data that we'll scrape
	var results = [];

	// With cheerio, find each p-tag with the "title" class
	// (i: iterator. element: the current element)
	$(values[6]).each(function(i, element) {

		// Save the text of the element in a "title" variable
		var children = $(element).children();
		// console.log($(children)[0].name);
		if($(children)[0].name === "td"){
			var value0 = $(children[0]).text();
			var value1 = $(children[1]).text();
			var value2 = $(children[2]).text();
			var value3 = $(children[3]).text();
			var value4 = $(children[3]).text();
			results.push({
				state: values[4],
				[values[0]]: value0,
				[values[1]]: value2,
				[values[2]]: value3,
				[values[3]]: value4,
				regulationLocation: values[5]
			});
			}

		// In the currently selected element, look at its child elements (i.e., its a-tags),
		// then save the values for any "href" attributes that the child elements may have

		// Save these results in an object that we'll push into the results array we defined earlier
			// console.log(results);

			request({
				url:  'http://localhost:8080/api/regulation',
				method: "POST",
				body:  results[results.length-1],
				json: true
			}, function(error, response, body){
				console.log("error", error);
				// console.log("response", response);
				// console.log("body", body);
			})			
		});
	});
};

module.exports = scraper;