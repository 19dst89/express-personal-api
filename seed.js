// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}
var place_list = [
  {
    city: "Paris",
    country: "France",
    description: "Went snowboarding in the alps for 2 weeks with family",
    yearWent: "2002",
    homeCity: "Doha",
    homeCountry: "Qatar"
  },
  {
    city: "Zurich",
    country: "Switzerland",
    description: "Went snowboarding for 2 weeks for a school trip",
    yearWent: "2004",
    homeCity: "Doha",
    homeCountry: "Qatar"
  }
];

db.Place.remove({}, function(err){
  db.Place.create(place_list, function(err, places){
    if (err) { return console.log('err', err); }
    console.log("created", places.length, "places");
    process.exit();
  });
})