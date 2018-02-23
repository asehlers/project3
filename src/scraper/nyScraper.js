// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");

// Making a request for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
const nyScraper = () =>  request("https://www.dec.ny.gov/outdoor/7894.html", function(error, response, html) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(html);

  // An empty array to save the data that we'll scrape
  var results = [];

  // With cheerio, find each p-tag with the "title" class
  // (i: iterator. element: the current element)
  $("tr").each(function(i, element) {

    // Save the text of the element in a "title" variable
    var children = $(element).children();
    // console.log($(children)[0].name);
    if($(children)[0].name === "td"){
      var fishName = $(children[0]).text();
      var length = $(children[1]).text();
      var limit = $(children[2]).text();
      var season = $(children[3]).text();
      var regulationLocation = "Salt water";
      results.push({
        state: "New York",
        fishName: fishName,
        length: length,
        limit: limit,
        season: season,
        regulationLocation: regulationLocation
      });

    }

    // In the currently selected element, look at its child elements (i.e., its a-tags),
    // then save the values for any "href" attributes that the child elements may have

    // Save these results in an object that we'll push into the results array we defined earlier

  });

  // request({
  //   url:     '/api/regulation',
  //   type: "POST",
  //   json:    results[0]
  // }, function(error, response, body){
  //   console.log("error", error);
  //   console.log("response", response);
  //   console.log("body", body);
  // })
  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
  return results;
});

export default nyScraper;