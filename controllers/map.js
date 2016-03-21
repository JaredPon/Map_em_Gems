var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var turf = require('turf');
var fs = require('fs');

exports.show = function(req, res) {
  res.render('map', {
    title: 'Map'
  });
};


exports.postSearch = function(req, res) {
  // set clientNum to clientid (passed in through getjson)
  var clientNum = +req.query.clientnum;
  var TNRNMBRD = +req.query.TNRNMBRD;
  var TNRTPDSCRP = req.query.TNRTPDSCRP;
  var GDTDT = req.query.GDTDT+'000000';
  var ownerName = req.query.ownerName;
  var ne_lat = JSON.parse(req.query.ne_lat);
  var ne_lng = JSON.parse(req.query.ne_lng);
  var sw_lat = JSON.parse(req.query.sw_lat);
  var sw_lng = JSON.parse(req.query.sw_lng);
  var sw = [sw_lng, sw_lat];
  var nw = [sw_lng, ne_lat];
  var ne = [ne_lng, ne_lat];
  var se = [ne_lng, sw_lat];

  Date.prototype.yyyymmdd = function() {
   var yyyy = (this.getFullYear() -1).toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
  };

  d = new Date();
  var oneYearAgo = d.yyyymmdd() + "000000";

  var geoQuery =
    {"geometry": {$geoWithin: {$geometry: {type : "Polygon" ,coordinates: [[sw, nw, ne, se, sw]]}}}};

    // Build an array to use in the query
  var array = [];

  if (clientNum !== 0)
    array.push({ 'properties.CLIENTNUM': clientNum });

  if (TNRNMBRD !== 0)
  array.push({ 'properties.TNRNMBRD': TNRNMBRD });

  if (TNRTPDSCRP !== "")
  array.push({ 'properties.TNRTPDSCRP': TNRTPDSCRP });

  if (GDTDT !== "000000")
  array.push({ 'properties.GDTDT': { $lt: GDTDT }});
  array.push({ 'properties.GDTDT': { $gt: oneYearAgo }});

  if (ownerName !== "")
  array.push({ 'properties.OWNER_NAME': ownerName });


  // Geo Query Stuff (Nick)
  array.push(geoQuery);

  mongoose.model('Claim').find({
    $and:array
    }, function(err, claims){
      res.json(claims);
    });
// };
};
