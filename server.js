// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: false, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/19dst89/express_self_api/README.md", // CHANGE ME
    baseUrl: "https://murmuring-forest-24449.herokuapp.com/", // CHANGE ME
    endpoints: [
      // Profile Endpoints
      {
        method: "GET",
        path: "/api",
        description: "Describes all available endpoints"
      },
      {
        method: "GET",
        path: "/api/profile",
        description: "Data about me", // Info about Daniel
        name: "Daniel Thompson",
        githubLink: "https://github.com/19dst89",
        githubProfileImage: "https://avatars2.githubusercontent.com/u/19444505?v=3&u=9f88aee27b50439d42594fff366e079fe8939113&s=400",
        personalSiteLink: "www.google.com",
        currentCity: "San Francisco",
        pets: [{name: "Lynx", type: "Cat"}, {name: "Ziggy", type: "Cat"}, {name: "Marley", type: "Dog", breed: "Labrador"}, {name: "Bailey", type: "Dog", breed: "Labrador"}]
      },
      // Places endpoints
      {
        method: "GET",
        path: "/api/places",
        description: "All the places I have lived"
      },
      {
        method: "GET",
        path: "/api/places/:id",
        description: "Get information about a certain place I lived"
      },
      {
        method: "POST",
        path: "/api/places",
        description: "Add a new place"
      },
      {
        method: "PUT",
        path: "/api/places/:id",
        description: "Edit a place"
      },
      {
        method: "DELETE",
        path: "/api/places/:id",
        description: "Remove a place"
      }
    ]
  })
});

var profileStuff = {
        description: "Data about me", // Info about Daniel
        name: "Daniel Thompson",
        githubLink: "https://github.com/19dst89",
        githubProfileImage: "https://avatars2.githubusercontent.com/u/19444505?v=3&u=9f88aee27b50439d42594fff366e079fe8939113&s=400",
        personalSiteLink: "www.google.com",
        currentCity: "San Francisco",
        pets: [{name: "Lynx", type: "Cat"}, {name: "Ziggy", type: "Cat"}, {name: "Marley", type: "Dog", breed: "Labrador"}, {name: "Bailey", type: "Dog", breed: "Labrador"}]
      }
app.get('/api/profile', function(req, res){
  res.json(profileStuff);
})



// Places Routes

// Get all the places
app.get('/api/places', function(req, res){
  db.Place.find({})
  .exec(function(err, places){
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(places);
  });
});

// GET one place by id
app.get('/api/places/:id', function(req, res){
  db.Place.findById(req.params.id)
    .exec(function(err, place){
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json(place);
    });
});

// create new place
app.post('/api/places', function(req, res) {
  var newPlace = new db.Place({
    city: req.body.city,
    country: req.body.country,
    description: req.body.description,
    yearWent: req.body.yearWent,
    homeCity: req.body.homeCity,
    homeCountry: req.body.homeCountry
  });
  newPlace.save(function(err, savedPlace){
    if (err) {
     return console.log(err);
    }
    res.json(savedPlace);
  });
});

// delete a place
app.delete('/api/places/:id', function(req, res) {
  var placeId = req.params.id;

  db.Place.findOneAndRemove({ _id: placeId }, function(err, deletedPlace) {
    if (err) {
      return console.log(err);
    }
    res.json(deletedPlace);
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
















