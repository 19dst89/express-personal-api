var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaceSchema = new Schema({
  city: String,
  country: String
  description: String,
  yearWent: String,
  homeCity: String,
  homeCountry: String
})

var Place = mongoose.model('Place', PlaceSchema);

module.exports = Place